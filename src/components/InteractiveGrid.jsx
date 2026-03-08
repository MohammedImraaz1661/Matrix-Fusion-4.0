import { useCallback, useEffect, useRef } from 'react';

const CELL_SIZE = 70;
const GLOW_COLOR = { r: 95, g: 28, b: 155 }; // #5F1C9B
const BORDER_ALPHA = 0.02;
const PROXIMITY = 150;
const HOVER_ALPHA = 0.40;
const FADE_SPEED = 0.04;

/* ── Autonomous glow settings (mobile) ─────────────────── */
const WANDER_SPEED = 0.6;
const WANDER_RADIUS = 220;
const MOBILE_PROXIMITY = 120;
const MOBILE_HOVER_ALPHA = 0.18;

const InteractiveGrid = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const cellAlphasRef = useRef([]);
    const animFrameRef = useRef(null);
    const gridRef = useRef({ rows: 0, cols: 0 });
    const scrollRef = useRef(0);
    const isTouchRef = useRef(false);
    const wanderRef = useRef({ x: 0, y: 0, angle: 0, cx: 0, cy: 0 });

    /* Offscreen canvas caching static grid lines (rebuilt on resize) */
    const gridImageRef = useRef(null);

    const buildGridImage = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const { rows, cols } = gridRef.current;
        const offscreen = document.createElement('canvas');
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;
        const octx = offscreen.getContext('2d');
        const borderStyle = `rgba(${GLOW_COLOR.r}, ${GLOW_COLOR.g}, ${GLOW_COLOR.b}, ${BORDER_ALPHA})`;
        octx.strokeStyle = borderStyle;
        octx.lineWidth = 0.5;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * CELL_SIZE;
                const y = row * CELL_SIZE;
                octx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
            }
        }
        gridImageRef.current = offscreen;
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const { rows, cols } = gridRef.current;
        const alphas = cellAlphasRef.current;

        const isTouch = isTouchRef.current;
        const proximity = isTouch ? MOBILE_PROXIMITY : PROXIMITY;
        const hoverAlpha = isTouch ? MOBILE_HOVER_ALPHA : HOVER_ALPHA;

        /* ── Update wandering glow on mobile ──────────────── */
        let mouse;
        if (isTouch) {
            const w = wanderRef.current;
            w.angle += WANDER_SPEED * 0.008;
            w.x = w.cx + Math.sin(w.angle * 1.0) * WANDER_RADIUS;
            w.y = w.cy + Math.cos(w.angle * 0.7) * WANDER_RADIUS * 0.6;
            mouse = { x: w.x, y: w.y };
        } else {
            mouse = mouseRef.current;
        }

        /* ── Determine which rows to compute glow for ──────
           On mobile we skip the row-range optimisation entirely
           because Lenis smooth-scroll can desync the native
           scroll offset from the visual position, causing the
           glow band to visibly jump. Mobile has fewer columns
           so full-pass is cheap. Desktop keeps the optimisation. */
        let startRow, endRow;
        if (isTouch) {
            startRow = 0;
            endRow = rows;
        } else {
            const scrollY = scrollRef.current;
            const viewH = window.innerHeight;
            startRow = Math.max(0, Math.floor((scrollY - proximity) / CELL_SIZE));
            endRow = Math.min(rows, Math.ceil((scrollY + viewH + proximity) / CELL_SIZE));
        }

        // Clear full canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Stamp the static grid lines (covers ALL rows)
        if (gridImageRef.current) {
            ctx.drawImage(gridImageRef.current, 0, 0);
        }

        // Compute & draw glow
        for (let row = startRow; row < endRow; row++) {
            for (let col = 0; col < cols; col++) {
                const idx = row * cols + col;
                const x = col * CELL_SIZE;
                const y = row * CELL_SIZE;

                const cx = x + CELL_SIZE / 2;
                const cy = y + CELL_SIZE / 2;
                const dx = mouse.x - cx;
                const dy = mouse.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let targetAlpha = 0;
                if (dist < CELL_SIZE * 0.6) {
                    targetAlpha = hoverAlpha;
                } else if (dist < proximity) {
                    targetAlpha = Math.max(0, (1 - dist / proximity)) * 0.1;
                }

                if (alphas[idx] === undefined) alphas[idx] = 0;
                if (alphas[idx] < targetAlpha) {
                    alphas[idx] = targetAlpha;
                } else {
                    alphas[idx] += (targetAlpha - alphas[idx]) * FADE_SPEED;
                    if (alphas[idx] < 0.001) alphas[idx] = 0;
                }

                if (alphas[idx] > 0) {
                    ctx.fillStyle = `rgba(${GLOW_COLOR.r}, ${GLOW_COLOR.g}, ${GLOW_COLOR.b}, ${alphas[idx]})`;
                    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                }
            }
        }

        animFrameRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const isTouch = ('ontouchstart' in window) ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(hover: none)').matches;
        isTouchRef.current = isTouch;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.scrollWidth;
            canvas.height = parent.scrollHeight;
            const cols = Math.ceil(canvas.width / CELL_SIZE) + 1;
            const rows = Math.ceil(canvas.height / CELL_SIZE) + 1;
            gridRef.current = { rows, cols };
            cellAlphasRef.current = new Array(rows * cols).fill(0);

            // Rebuild the static grid image after resize
            buildGridImage();

            if (isTouch) {
                wanderRef.current.cx = canvas.width / 2;
                wanderRef.current.cy = window.innerHeight / 2;
                wanderRef.current.x = wanderRef.current.cx;
                wanderRef.current.y = wanderRef.current.cy;
            }
        };

        resize();

        const handleMouseMove = (e) => {
            if (isTouch) return;
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        const handleScroll = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            scrollRef.current = -rect.top;

            // Keep wander glow near current viewport on mobile
            if (isTouch) {
                wanderRef.current.cy = -rect.top + window.innerHeight / 2;
            }
        };

        const handleTouchMove = (e) => {
            if (!isTouch) return;
            const touch = e.touches[0];
            if (!touch) return;
            const parent = canvas.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();
            wanderRef.current.cx = touch.clientX - rect.left;
            wanderRef.current.cy = touch.clientY - rect.top;
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        const resizeTimer = setTimeout(resize, 2000);

        animFrameRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchmove', handleTouchMove);
            clearTimeout(resizeTimer);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [draw, buildGridImage]);

    return (
        <canvas
            ref={canvasRef}
            className="interactive-grid-canvas"
        />
    );
};

export default InteractiveGrid;

import { useCallback, useEffect, useRef } from 'react';

const CELL_SIZE = 90;
const GLOW_COLOR = { r: 183, g: 171, b: 152 }; // #b7ab98
const BORDER_ALPHA = 0.02;
const PROXIMITY = 150;
const HOVER_ALPHA = 0.30;
const FADE_SPEED = 0.04;

const InteractiveGrid = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const cellAlphasRef = useRef([]);
    const animFrameRef = useRef(null);
    const gridRef = useRef({ rows: 0, cols: 0 });
    const scrollRef = useRef(0);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const { rows, cols } = gridRef.current;
        const mouse = mouseRef.current;
        const alphas = cellAlphasRef.current;

        // Only redraw the visible portion + buffer
        const scrollY = scrollRef.current;
        const viewH = window.innerHeight;
        const startRow = Math.max(0, Math.floor((scrollY - PROXIMITY) / CELL_SIZE));
        const endRow = Math.min(rows, Math.ceil((scrollY + viewH + PROXIMITY) / CELL_SIZE));

        // Clear only visible area
        ctx.clearRect(0, startRow * CELL_SIZE, canvas.width, (endRow - startRow) * CELL_SIZE);

        // Pre-set stroke style once (same for all cells)
        const borderStyle = `rgba(${GLOW_COLOR.r}, ${GLOW_COLOR.g}, ${GLOW_COLOR.b}, ${BORDER_ALPHA})`;

        for (let row = startRow; row < endRow; row++) {
            for (let col = 0; col < cols; col++) {
                const idx = row * cols + col;
                const x = col * CELL_SIZE;
                const y = row * CELL_SIZE;

                // Calculate proximity to mouse
                const cx = x + CELL_SIZE / 2;
                const cy = y + CELL_SIZE / 2;
                const dx = mouse.x - cx;
                const dy = mouse.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let targetAlpha = 0;
                if (dist < CELL_SIZE * 0.6) {
                    targetAlpha = HOVER_ALPHA;
                } else if (dist < PROXIMITY) {
                    targetAlpha = Math.max(0, (1 - dist / PROXIMITY)) * 0.1;
                }

                // Smooth animation
                if (alphas[idx] === undefined) alphas[idx] = 0;
                if (alphas[idx] < targetAlpha) {
                    alphas[idx] = targetAlpha;
                } else {
                    alphas[idx] += (targetAlpha - alphas[idx]) * FADE_SPEED;
                    if (alphas[idx] < 0.001) alphas[idx] = 0;
                }

                // Draw glow fill
                if (alphas[idx] > 0) {
                    ctx.fillStyle = `rgba(${GLOW_COLOR.r}, ${GLOW_COLOR.g}, ${GLOW_COLOR.b}, ${alphas[idx]})`;
                    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                }

                // Draw grid lines
                ctx.strokeStyle = borderStyle;
                ctx.lineWidth = 0.5;
                ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
            }
        }

        animFrameRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        // Skip entirely on touch devices
        const isTouch = ('ontouchstart' in window) ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(hover: none)').matches;
        if (isTouch) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.scrollWidth;
            canvas.height = parent.scrollHeight;
            const cols = Math.ceil(canvas.width / CELL_SIZE) + 1;
            const rows = Math.ceil(canvas.height / CELL_SIZE) + 1;
            gridRef.current = { rows, cols };
            cellAlphasRef.current = new Array(rows * cols).fill(0);
        };

        resize();

        const handleMouseMove = (e) => {
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
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Delayed resize to catch dynamic content height
        const resizeTimer = setTimeout(resize, 2000);

        animFrameRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(resizeTimer);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [draw]);

    // Don't render canvas on touch devices at all
    if (typeof window !== 'undefined' &&
        (('ontouchstart' in window) || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className="interactive-grid-canvas"
        />
    );
};

export default InteractiveGrid;

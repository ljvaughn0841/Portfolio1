import { useEffect, useRef } from "react";

const PIXEL = 4;
const BG_COLOR = "#0d0e1f";
const GRID_SIZE = PIXEL * 10;

function initStars(cols, rows) {
  return Array.from({ length: Math.floor(cols * rows * 0.022) }, () => ({
    col: Math.floor(Math.random() * cols),
    row: Math.floor(Math.random() * rows),
    phase: Math.random() * Math.PI * 2,
    speed: 0.004 + Math.random() * 0.009,
    maxAlpha: 0.06 + Math.random() * 0.16,
    size: Math.random() > 0.82 ? 2 : 1,
    r: 18 + Math.floor(Math.random() * 18),
    g: 18 + Math.floor(Math.random() * 15),
    b: 55 + Math.floor(Math.random() * 65),
  }));
}

function initFloaters(W, H) {
  return Array.from({ length: 6 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    phase: Math.random() * Math.PI * 2,
    radius: 18 + Math.random() * 28,
    r: 40 + Math.floor(Math.random() * 30),
    g: 30 + Math.floor(Math.random() * 20),
    b: 90 + Math.floor(Math.random() * 60),
  }));
}

function snap(v) {
  return Math.floor(v / PIXEL) * PIXEL;
}

export default function PixelBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H, stars, floaters;

    function init() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const cols = Math.floor(W / PIXEL);
      const rows = Math.floor(H / PIXEL);
      stars = initStars(cols, rows);
      floaters = initFloaters(W, H);
    }

    function draw() {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(28,28,72,0.55)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= W; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      for (const f of floaters) {
        f.x += f.vx;
        f.y += f.vy;
        f.phase += 0.006;
        const r2 = f.radius * 4;
        if (f.x < -r2) f.x = W + r2;
        if (f.x > W + r2) f.x = -r2;
        if (f.y < -r2) f.y = H + r2;
        if (f.y > H + r2) f.y = -r2;
        const gA = (Math.sin(f.phase) * 0.5 + 0.5) * 0.05;
        for (let dx = -r2; dx <= r2; dx += PIXEL) {
          for (let dy = -r2; dy <= r2; dy += PIXEL) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > r2) continue;
            const a = gA * (1 - dist / r2) ** 2;
            if (a < 0.003) continue;
            ctx.fillStyle = `rgba(${f.r},${f.g},${f.b},${a.toFixed(3)})`;
            ctx.fillRect(snap(f.x + dx), snap(f.y + dy), PIXEL, PIXEL);
          }
        }
      }

      for (const s of stars) {
        s.phase += s.speed;
        const a = ((Math.sin(s.phase) + 1) * 0.5) * s.maxAlpha;
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${a.toFixed(3)})`;
        ctx.fillRect(s.col * PIXEL, s.row * PIXEL, PIXEL * s.size, PIXEL * s.size);
      }

      animId = requestAnimationFrame(draw);
    }

    function handleResize() {
      init();
    }

    window.addEventListener("resize", handleResize);
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
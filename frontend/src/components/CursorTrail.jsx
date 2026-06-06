import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const trail = [];
    let mouse = { x: -999, y: -999 };
    let smoothX = -999;
    let smoothY = -999;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
let isMoving = false;
    let moveTimer;
    const handleMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x != null && y != null) {
        mouse = { x, y };
        isMoving = true;
        clearTimeout(moveTimer);
     moveTimer = setTimeout(() => { isMoving = false; }, 60);
      }
    };

    let frame;
    const draw = () => {
    

   if (mouse.x !== -999 && isMoving) {
        smoothX += (mouse.x - smoothX) * 0.12;
        smoothY += (mouse.y - smoothY) * 0.12;
    trail.push({ x: smoothX, y: smoothY, age: 0, maxAge: 120 });
      }
      if (!isMoving) {
        trail.length = 0;
        smoothX = mouse.x;
        smoothY = mouse.y;
      }
     if (trail.length > 60) trail.shift();

      // Age points
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age++;
        if (trail[i].age > trail[i].maxAge) {
          trail.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Draw smooth ribbon using bezier curves
      if (trail.length > 3) {
        // Outer soft glow layer
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length - 2; i++) {
          const cpx = (trail[i].x + trail[i + 1].x) / 2;
          const cpy = (trail[i].y + trail[i + 1].y) / 2;
          const alpha = Math.max(0, 1 - trail[i].age / trail[i].maxAge);
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, cpx, cpy);
        }
      ctx.strokeStyle = "rgba(160,240,120,0.08)";
        ctx.lineWidth = 18;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Middle silk layer
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length - 2; i++) {
          const cpx = (trail[i].x + trail[i + 1].x) / 2;
          const cpy = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, cpx, cpy);
        }
ctx.strokeStyle = "rgba(190,255,150,0.14)";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Bright core thread
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length - 2; i++) {
          const cpx = (trail[i].x + trail[i + 1].x) / 2;
          const cpy = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, cpx, cpy);
        }
        ctx.strokeStyle = "rgba(220,255,180,0.22)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgba(160,240,100,0.2)";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
// Beautiful cursor — lotus/sparkle design
      const cx = mouse.x;
      const cy = mouse.y;
      if (cx === -999) { frame = requestAnimationFrame(draw); return; }
      const t = Date.now() * 0.002;

      // Outer rotating ring
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(180,255,140,${0.2 + Math.sin(t) * 0.1})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(220,255,180,0.8)";
      ctx.shadowColor = "rgba(160,255,100,0.5)";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 4 rotating sparkle petals
      for (let i = 0; i < 4; i++) {
        const angle = t + (i / 4) * Math.PI * 2;
        const px = cx + Math.cos(angle) * 8;
        const py = cy + Math.sin(angle) * 8;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,255,160,${0.4 + Math.sin(t + i) * 0.2})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

   // Init smooth position to offscreen — no auto trail
    smoothX = -999;
    smoothY = -999;

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("resize", handleResize);
   setTimeout(() => draw(), 100);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
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
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
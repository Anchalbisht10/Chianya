import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useChianya } from "../context/ChianyaContext";
import ShareCard from "../components/ShareCard";
import { avatarLines } from "../avatar/avatarLines";
import { sendToAntar, logSession } from "../services/api";
// ── Deep forest consciousness atmosphere ──────────────────────
function ForestConsciousnessAtmosphere() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    let W, H;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d");

    // ── Moving square stars — old magical fast style ──────
    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.75,
      size: Math.random() * 2.0 + 0.5,
      vx: (Math.random() - 0.5) * 0.00038,
      vy: -(Math.random() * 0.00028 + 0.00007),
      alpha: Math.random() * 0.50 + 0.14,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.020 + 0.007,
      warm: Math.random() > 0.58,
    }));

    // ── Floating orbs — soft, few ─────────────────────────
    const orbs = Array.from({ length: 6 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.7,
      r: Math.random() * 24 + 10,
      vx: (Math.random() - 0.5) * 0.00016,
      vy: (Math.random() - 0.5) * 0.00010,
      alpha: Math.random() * 0.06 + 0.02,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.005 + 0.002,
      teal: Math.random() > 0.5,
    }));

    // ── Root filaments from base ──────────────────────────
    const roots = Array.from({ length: 12 }, () => ({
      x: Math.random(),
      startY: 1.02,
      endY: 0.52 + Math.random() * 0.33,
      alpha: Math.random() * 0.09 + 0.035,
      width: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.007 + 0.003,
      isPink: Math.random() > 0.65,
    }));

    // ── Fog strips ────────────────────────────────────────
    const fogStrips = Array.from({ length: 3 }, (_, i) => ({
      y: 0.52 + i * 0.12,
      alpha: 0.055 + i * 0.018,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0035 + Math.random() * 0.0035,
    }));

    // ── Forest silhouette ─────────────────────────────────
    const sil = Array.from({ length: 30 }, (_, i) => ({
      t: i / 29,
      h: 0.10 + Math.random() * 0.13 + Math.sin(i * 1.9) * 0.055,
    }));

    // ── Grass blades — Ground.js organic style ────────────
    // Only at the bottom, no colorful mountains
    const bladeCount = 34;
    const blades = Array.from({ length: bladeCount }, (_, i) => ({
      xRatio: 0.01 + (i / bladeCount) * 0.98 + Math.sin(i * 2.5) * 0.008,
      heightRatio: 0.075 + Math.sin(i * 1.6 + 0.4) * 0.030
                 + Math.sin(i * 3.1) * 0.016
                 + Math.sin(i * 5.5) * 0.008,
      phase: i * 0.20 + Math.random() * 0.35,
      swayAmp: 4.5 + Math.random() * 5.0,
      swayAmp2: 1.8 + Math.random() * 2.5,
      swaySpeed: 0.020 + Math.random() * 0.010,
      swaySpeed2: 0.013 + Math.random() * 0.007,
      width: 1.2 + Math.random() * 1.3,
      isPink: i % 7 === 0,
      alpha: 0.38 + Math.random() * 0.28,
      hasSeed: i % 2 === 0,
    }));

    let t = 0; let frame;

    const draw = () => {
      if (!W || !H) { frame = requestAnimationFrame(draw); return; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // ── Sky gradient ──────────────────────────────────
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.82);
      sky.addColorStop(0,   "rgba(2,7,12,0.98)");
      sky.addColorStop(0.38,"rgba(3,12,18,0.96)");
      sky.addColorStop(0.72,"rgba(4,16,11,0.94)");
      sky.addColorStop(1,   "rgba(5,20,9,0.90)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H * 0.82);

      // ── Central radial glow ───────────────────────────
      const cg = ctx.createRadialGradient(W*0.5, H*0.32, 0, W*0.5, H*0.32, W*0.52);
      cg.addColorStop(0,  "rgba(15,60,22,0.26)");
      cg.addColorStop(0.5,"rgba(6,30,12,0.10)");
      cg.addColorStop(1,  "rgba(2,8,4,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H * 0.82);

      // ── Square stars — moving, magical ────────────────
      stars.forEach(s => {
        const pulse = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
        const a = s.alpha * (0.35 + 0.65 * pulse);
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0;
        if (s.y < 0) s.y = 0.74; if (s.y > 0.74) s.y = 0;
        const px = s.x * W;
        const py = s.y * H;
        const sz = s.size * (0.80 + 0.20 * pulse);
        ctx.shadowColor = s.warm
          ? "rgba(255,238,148,0.65)"
          : "rgba(138,232,178,0.65)";
        ctx.shadowBlur = 7;
        ctx.fillStyle = s.warm
          ? `rgba(255,240,155,${a})`
          : `rgba(155,245,192,${a})`;
        ctx.fillRect(px - sz/2, py - sz/2, sz, sz);
        ctx.shadowBlur = 0;
      });

      // ── Fog strips ────────────────────────────────────
      fogStrips.forEach(f => {
        const fg = ctx.createLinearGradient(0, H*f.y - 16, 0, H*f.y + 16);
        fg.addColorStop(0, `rgba(6,40,15,0)`);
        fg.addColorStop(0.5, `rgba(6,40,15,${f.alpha + 0.015 * Math.sin(t*f.speed+f.phase)})`);
        fg.addColorStop(1, `rgba(6,40,15,0)`);
        ctx.fillStyle = fg;
        ctx.fillRect(0, H*f.y - 16, W, 32);
      });

      // ── Floating orbs ─────────────────────────────────
      orbs.forEach(o => {
        const pulse = Math.sin(t * o.speed + o.phase) * 0.5 + 0.5;
        const a = o.alpha * (0.45 + 0.55 * pulse);
        o.x += o.vx; o.y += o.vy;
        if (o.x < -0.1) o.x = 1.1; if (o.x > 1.1) o.x = -0.1;
        if (o.y < -0.05) o.y = 0.75; if (o.y > 0.75) o.y = -0.05;
        const grd = ctx.createRadialGradient(o.x*W, o.y*H, 0, o.x*W, o.y*H, o.r);
        if (o.teal) {
          grd.addColorStop(0, `rgba(35,175,125,${a})`);
          grd.addColorStop(1, `rgba(35,175,125,0)`);
        } else {
          grd.addColorStop(0, `rgba(48,192,68,${a})`);
          grd.addColorStop(1, `rgba(48,192,68,0)`);
        }
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(o.x*W, o.y*H, o.r, 0, Math.PI*2);
        ctx.fill();
      });

      // ── Forest silhouette ─────────────────────────────
      ctx.fillStyle = "rgba(2,14,4,0.85)";
      ctx.beginPath();
      ctx.moveTo(0, H * 0.82);
      sil.forEach(s => {
        ctx.lineTo(s.t * W, H * (0.68 - s.h));
      });
      ctx.lineTo(W, H * 0.82);
      ctx.closePath();
      ctx.fill();

      // Second softer layer
      ctx.fillStyle = "rgba(4,20,6,0.50)";
      ctx.beginPath();
      ctx.moveTo(0, H * 0.82);
      sil.forEach(s => {
        ctx.lineTo(s.t * W, H * (0.72 - s.h * 0.6));
      });
      ctx.lineTo(W, H * 0.82);
      ctx.closePath();
      ctx.fill();

      // ── Earth zone ────────────────────────────────────
      const earth = ctx.createLinearGradient(0, H * 0.78, 0, H);
      earth.addColorStop(0, "rgba(5,22,7,0)");
      earth.addColorStop(0.35, "rgba(9,34,11,0.2)");
      earth.addColorStop(1, "rgba(15,50,13,0.5)");
      ctx.fillStyle = earth;
      ctx.fillRect(0, H * 0.78, W, H * 0.22);

      // ── Root filaments ────────────────────────────────
      roots.forEach(r => {
        const pulse = Math.sin(t * r.speed + r.phase);
        const a = r.alpha * (0.55 + 0.45 * pulse);
        ctx.beginPath();
        ctx.moveTo(r.x * W, r.startY * H);
        ctx.quadraticCurveTo(
          r.x * W + Math.sin(t * 0.011 + r.phase) * 18,
          (r.startY + r.endY) / 2 * H,
          r.x * W + Math.cos(r.phase) * 13, r.endY * H
        );
        ctx.strokeStyle = r.isPink
          ? `rgba(182,88,142,${a * 0.72})`
          : `rgba(52,186,52,${a})`;
        ctx.lineWidth = r.width;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r.x * W + Math.cos(r.phase) * 13, r.endY * H, r.width * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = r.isPink
          ? `rgba(195,98,152,${a * 0.38})`
          : `rgba(75,218,60,${a * 0.30})`;
        ctx.fill();
      });

      // ── Organic grass — Ground.js style, bottom only ──
      const grassBase = H * 0.81;

      blades.forEach(b => {
        const bx = b.xRatio * W;
        const bh = b.heightRatio * H;
        const sway  = Math.sin(t * b.swaySpeed  + b.phase) * b.swayAmp;
        const sway2 = Math.sin(t * b.swaySpeed2 + b.phase * 1.3) * b.swayAmp2;

        const tipX = bx + sway + sway2 * 1.5;
        const tipY = grassBase - bh;
        const ctrlX = bx + sway * 0.46 + sway2;
        const ctrlY = grassBase - bh * 0.50;

        // Gradient fade — natural look
        const grad = ctx.createLinearGradient(bx, grassBase, tipX, tipY);
        if (b.isPink) {
          grad.addColorStop(0,   `rgba(178,92,145,${b.alpha * 0.88})`);
          grad.addColorStop(0.5, `rgba(200,112,158,${b.alpha * 0.65})`);
          grad.addColorStop(1,   `rgba(215,128,168,${b.alpha * 0.14})`);
        } else {
          grad.addColorStop(0,   `rgba(30,155,42,${b.alpha * 0.85})`);
          grad.addColorStop(0.45,`rgba(46,178,55,${b.alpha * 0.60})`);
          grad.addColorStop(1,   `rgba(70,202,78,${b.alpha * 0.10})`);
        }

        ctx.beginPath();
        ctx.moveTo(bx, grassBase);
        ctx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = b.width;
        ctx.lineCap = "round";
        ctx.stroke();

        if (b.hasSeed) {
          ctx.beginPath();
          ctx.ellipse(
            tipX, tipY - bh * 0.038,
            b.isPink ? 1.8 : 1.5,
            b.isPink ? 4.8 : 4.4,
            0, 0, Math.PI * 2
          );
          ctx.fillStyle = b.isPink
            ? `rgba(208,115,162,${b.alpha * 0.35})`
            : `rgba(55,180,52,${b.alpha * 0.32})`;
          ctx.fill();
        }
      });

      // ── Fireflies ─────────────────────────────────────
      for (let i = 0; i < 5; i++) {
        const fx = W * (0.07 + ((i * 0.18 + t * 0.0019 + Math.sin(t * 0.006 + i) * 0.05)) % 0.86);
        const fy = H * 0.70 - Math.abs(Math.sin(t * 0.0088 + i * 1.38)) * H * 0.13;
        const fa = (Math.sin(t * 0.033 + i) * 0.5 + 0.5) * 0.52;
        ctx.shadowColor = "rgba(118,255,108,0.48)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(fx, fy, 1.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138,255,115,${fa})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Bottom mist ───────────────────────────────────
      const mist = ctx.createLinearGradient(0, H * 0.74, 0, H * 0.88);
      mist.addColorStop(0, "rgba(6,38,12,0)");
      mist.addColorStop(0.5, "rgba(6,38,12,0.20)");
      mist.addColorStop(1, "rgba(6,38,12,0)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, H * 0.74, W, H * 0.14);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      t++;
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        borderRadius: "inherit",
      }}
    />
  );
}

export default function Companion() {
  const navigate = useNavigate();
const { feelings, setAvatarLine, setCurrentMode, avatarLine } = useChianya();
const [showCard, setShowCard] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();
  const [sessionId, setSessionId] = useState(null);

const initialized = useRef(false);

useEffect(() => {
  if (initialized.current) return;
  initialized.current = true;
  setCurrentMode("antar");
  setAvatarLine(avatarLines.companion);
  callAntar(
    `The user arrived feeling: ${feelings.join(", ") || "something heavy"}. Open with a single warm, grounded reflection and one gentle question. 2-3 sentences only.`,
    true
  );
}, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const callAntar = async (userMsg, isOpening = false) => {
  setLoading(true);
  if (!isOpening) {
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
  }
try {
    const data = await sendToAntar(userMsg, feelings, sessionId);
    const reply = data.reply || "The forest is still here. So am I.";
    if (data.sessionId) setSessionId(data.sessionId);
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
   if (messages.length === 0) {
  logSession("antar", feelings || [], {}).catch(()=>{});
}
  } catch {
    setMessages(prev => [...prev, {
      role: "assistant",
      content: "The forest is still here. So am I. Take your time.",
    }]);
  }
  setLoading(false);
};
  const send = () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    callAntar(msg);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)",
      }}
    >
      <div style={{
        background: "rgba(3,12,5,0.88)",
        border: "0.5px solid rgba(65,175,50,0.2)",
        borderRadius: "clamp(16px,3vw,24px)",
        padding: "clamp(1.4rem,3vw,2rem)",
        maxWidth: 540, width: "100%",
        height: "clamp(500px,78vh,640px)",
        backdropFilter: "blur(32px)",
        display: "flex", flexDirection: "column",
        boxShadow: "0 0 80px rgba(18,140,18,0.08)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Atmosphere — behind everything */}
        <ForestConsciousnessAtmosphere />

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          position: "relative", zIndex: 2,
        }}>
          <motion.button
onClick={() => { setShowCard(true); setTimeout(() => navigate("/modes"), 2500); }}
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 24px rgba(50,192,42,0.2)",
              borderColor: "rgba(90,222,62,0.52)",
              color: "rgba(180,250,148,0.96)"
            }}
            style={{
              background: "rgba(6,34,7,0.68)",
              border: "0.5px solid rgba(68,178,46,0.28)",
              borderRadius: 24, color: "rgba(120,208,84,0.52)",
              fontSize: 11, cursor: "pointer", letterSpacing: "0.22em",
              fontFamily: "Georgia, serif", padding: "6px 18px",
              backdropFilter: "blur(12px)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
       >← Return</motion.button>

          <div style={{
            fontSize: "clamp(9px,1.6vw,10px)", letterSpacing: "0.28em",
            color: "rgba(95,198,72,0.36)",
            fontFamily: "Georgia, serif",
            textAlign: "right",
            maxWidth: "45%",
            lineHeight: 1.4,
          }}>ANTAR · INNER GUIDE</div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", display: "flex",
          flexDirection: "column", gap: 12,
          paddingRight: 4, marginBottom: "1rem",
          position: "relative", zIndex: 2,
          scrollbarWidth: "none",
        }}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                maxWidth: "88%",
                alignSelf: m.role === "assistant" ? "flex-start" : "flex-end",
                background: m.role === "assistant"
                  ? "rgba(6,30,8,0.78)"
                  : "rgba(12,55,12,0.65)",
                border: m.role === "assistant"
                  ? "0.5px solid rgba(65,185,50,0.22)"
                  : "0.5px solid rgba(95,218,68,0.28)",
                borderRadius: m.role === "assistant"
                  ? "4px 14px 14px 14px"
                  : "14px 4px 14px 14px",
                padding: "12px 15px",
                fontSize: "clamp(12px,2.2vw,13px)",
                color: m.role === "assistant"
                  ? "rgba(162,238,132,0.88)"
                  : "rgba(185,250,152,0.92)",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                lineHeight: 1.85,
                backdropFilter: "blur(8px)",
              }}
            >
              {m.role === "assistant" && (
                <div style={{
                  fontSize: "clamp(8px,1.4vw,9px)", letterSpacing: "0.22em",
                  color: "rgba(95,200,68,0.36)", marginBottom: 5,
                  fontStyle: "normal",
                }}>ANTAR</div>
              )}
              {m.content}
            </motion.div>
          ))}

          {loading && (
            <div style={{
              alignSelf: "flex-start",
              background: "rgba(6,30,8,0.78)",
              border: "0.5px solid rgba(65,185,50,0.22)",
              borderRadius: "4px 14px 14px 14px",
              padding: "12px 18px",
              display: "flex", gap: 6,
              backdropFilter: "blur(8px)",
            }}>
              {[0,1,2].map(i => (
                <motion.div key={i}
                  animate={{ opacity:[0.2,0.8,0.2], y:[0,-4,0] }}
                  transition={{ duration:1.2, repeat:Infinity, delay:i*0.3 }}
                  style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "rgba(120,225,80,0.65)",
                  }}
                />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          display: "flex", gap: 10,
          position: "relative", zIndex: 2,
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); send();
              }
            }}
            placeholder="Share what is on your heart..."
            rows={2}
            style={{
              flex: 1, padding: "11px 14px", borderRadius: 14,
              border: "0.5px solid rgba(70,182,52,0.22)",
              background: "rgba(4,22,6,0.72)",
              color: "rgba(162,238,132,0.92)",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: "clamp(12px,2.2vw,13px)",
              resize: "none", outline: "none", lineHeight: 1.65,
              backdropFilter: "blur(12px)",
            }}
          />
          <motion.button
            onClick={send}
            disabled={loading || !input.trim()}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "0 18px", borderRadius: 14,
              border: "0.5px solid rgba(98,220,68,0.42)",
              background: loading || !input.trim()
                ? "rgba(8,38,10,0.52)"
                : "rgba(10,62,12,0.75)",
              color: "rgba(182,252,148,0.92)",
              fontSize: 18, cursor: loading || !input.trim() ? "default" : "pointer",
              transition: "all 0.3s", alignSelf: "stretch",
            }}
          >↑</motion.button>
        </div>
      </div>
      {showCard && (
  <ShareCard
    feeling={feelings[0] || "anxious"}
    antarLine={avatarLine}
    mode="antar"
    onClose={() => setShowCard(false)}
  />
)}
    </motion.div>
  );
}
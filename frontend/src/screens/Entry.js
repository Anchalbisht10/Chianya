import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useChianya } from "../context/ChianyaContext";
import { avatarLines } from "../avatar/avatarLines";
import { feelingResponses } from "../data/wisdom";


const FEELINGS = [
  "anxious","heavy","scattered","numb",
  "overwhelmed","tired","lost","restless",
  "hollow","stuck","hurt","lonely",
];

// Atmospheric canvas — lake + forest silhouette + fireflies
function AtmosphericBg({ width, height }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = width  * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // Fireflies
    const flies = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      vx: (Math.random()-0.5) * 0.22,
      vy: (Math.random()-0.5) * 0.14,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.005,
    }));

    // Lake ripples
    const ripples = Array.from({ length: 4 }, (_, i) => ({
      x: width * 0.15 + Math.random() * width * 0.7,
      y: height * 0.72 + Math.random() * height * 0.18,
      r: Math.random() * 15,
      maxR: 25 + Math.random() * 20,
      speed: 0.14 + Math.random() * 0.1,
      alpha: 0.08 + Math.random() * 0.06,
    }));

    let t = 0; let frame;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Sky — dark teal/navy
      const sky = ctx.createLinearGradient(0, 0, 0, height * 0.68);
      sky.addColorStop(0,   "rgba(4,14,24,0.96)");
      sky.addColorStop(0.6, "rgba(6,22,28,0.92)");
      sky.addColorStop(1,   "rgba(8,28,22,0.88)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height * 0.68);

      // Forest silhouette
      ctx.fillStyle = "rgba(4,20,8,0.82)";
      ctx.beginPath();
      ctx.moveTo(0, height * 0.66);
      const steps = 24;
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        const baseY = height * 0.55;
        const treeH = (Math.sin(i * 1.8 + 0.5) * 0.5 + 0.5) * height * 0.14 +
                      (Math.sin(i * 3.2) * 0.5 + 0.5) * height * 0.06;
        ctx.lineTo(x, baseY - treeH);
      }
      ctx.lineTo(width, height * 0.66);
      ctx.closePath();
      ctx.fill();

      // Lighter silhouette layer
      ctx.fillStyle = "rgba(8,32,12,0.55)";
      ctx.beginPath();
      ctx.moveTo(0, height * 0.68);
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        const treeH = (Math.sin(i * 2.3 + 1.2) * 0.5 + 0.5) * height * 0.1 +
                      (Math.sin(i * 4.1) * 0.5 + 0.5) * height * 0.04;
        ctx.lineTo(x, height * 0.60 - treeH);
      }
      ctx.lineTo(width, height * 0.68);
      ctx.closePath();
      ctx.fill();

      // Lake surface
      const lakeGrad = ctx.createLinearGradient(0, height*0.66, 0, height);
      lakeGrad.addColorStop(0,   "rgba(14,44,62,0.7)");
      lakeGrad.addColorStop(0.4, "rgba(10,32,48,0.65)");
      lakeGrad.addColorStop(1,   "rgba(4,16,24,0.85)");
      ctx.fillStyle = lakeGrad;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.66);
      // Gentle water edge
      for (let i = 0; i <= 40; i++) {
        const x = (i / 40) * width;
        const wy = height * 0.66 + Math.sin(t * 0.018 + i * 0.5) * 1.2;
        ctx.lineTo(x, wy);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Lake shimmer lines
      for (let i = 0; i < 8; i++) {
        const ly = height * 0.68 + Math.random() * height * 0.18;
        const lx = Math.random() * width * 0.8 + width * 0.1;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx + Math.random() * 40 - 20, ly);
        ctx.strokeStyle = `rgba(140,220,255,${Math.random()*0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Ripples
      ripples.forEach(rip => {
        rip.r += rip.speed;
        if (rip.r > rip.maxR) rip.r = 0;
        const a = rip.alpha * (1 - rip.r / rip.maxR);
        ctx.beginPath();
        ctx.ellipse(rip.x, rip.y, rip.r * 1.8, rip.r * 0.4, 0, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(120,200,240,${a})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      // Fireflies
      flies.forEach(f => {
        const pulse = Math.sin(t * f.speed + f.phase);
        const a = f.alpha * (0.5 + 0.5 * pulse);
        ctx.shadowColor = "rgba(120,255,120,0.5)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(140,255,140,${a})`;
        ctx.fill();
        ctx.shadowBlur = 0;
        f.x += f.vx + Math.sin(t * 0.008 + f.phase) * 0.15;
        f.y += f.vy + Math.cos(t * 0.006 + f.phase) * 0.1;
        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height * 0.7;
        if (f.y > height * 0.72) f.y = 0;
      });

      // Mist
      const mist = ctx.createLinearGradient(0, height*0.58, 0, height*0.75);
      mist.addColorStop(0, "rgba(12,48,32,0)");
      mist.addColorStop(0.5,"rgba(12,48,32,0.14)");
      mist.addColorStop(1, "rgba(12,48,32,0)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, height*0.58, width, height*0.17);

      // Forest edge glow
      const glow = ctx.createLinearGradient(0, height*0.48, 0, height*0.66);
      glow.addColorStop(0, "rgba(40,160,60,0)");
      glow.addColorStop(0.7,"rgba(40,160,60,0.04)");
      glow.addColorStop(1, "rgba(40,160,60,0.1)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, height*0.48, width, height*0.18);

      t++;
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [width, height]);

  return (
    <canvas ref={canvasRef} style={{
      position:"absolute", inset:0,
      width:"100%", height:"100%",
      borderRadius:"inherit",
      pointerEvents:"none", opacity:0.88,
    }} />
  );
}

export default function Entry() {
const { setFeelings, setAvatarLine } = useChianya();
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const cardRef = useRef();
  const [cardSize, setCardSize] = useState({ w:480, h:600 });


  useEffect(() => {
    const hasVisited = localStorage.getItem("chianya_visited");
    if (hasVisited) {
      setAvatarLine(avatarLines.returning);
    }
    localStorage.setItem("chianya_visited", "true");
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    const obs = new ResizeObserver(entries => {
      const el = entries[0].contentRect;
      setCardSize({ w: el.width, h: el.height });
    });
    obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

 const toggle = (f) => setSelected(prev =>
  prev.includes(f) ? [] : [f]
);

  const enter = () => {
    setFeelings(selected);
    setAvatarLine(avatarLines.modes);
    navigate("/modes");
  };

  const activeFeeling = selected[0];
  const reflection = activeFeeling && feelingResponses[activeFeeling]?.reflection;

  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      exit={{ opacity:0 }}
      transition={{ duration:1.2 }}
      style={{
        position:"absolute", inset:0, zIndex:10,
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"clamp(1rem,3vw,2rem)", overflowY:"auto",
      }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity:0, y:28, scale:0.96 }}
        animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
        style={{
          background:"rgba(3,14,5,0.9)",
          border:"0.5px solid rgba(70,180,50,0.18)",
          borderRadius:"clamp(16px,3vw,24px)",
          padding:"clamp(1.6rem,4vw,2.8rem)",
          maxWidth:500, width:"100%",
          backdropFilter:"blur(28px)",
          boxShadow:"0 0 80px rgba(20,140,20,0.09)",
          position:"relative", overflow:"hidden",
        }}
      >
        <AtmosphericBg width={cardSize.w} height={cardSize.h} />

        {/* Title */}
        <motion.div
          initial={{ opacity:0, y:16 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.2, duration:1 }}
          style={{ textAlign:"center", marginBottom:"clamp(0.8rem,2vw,1.5rem)", position:"relative" }}
        >
          <div style={{
            fontSize:"clamp(30px,7vw,44px)", fontWeight:300,
            letterSpacing:"0.18em",
            color:"rgba(172,242,142,0.96)",
            fontFamily:"Georgia, serif",
            textShadow:"0 0 50px rgba(58,222,58,0.3)",
            marginBottom:6,
          }}>Chianya</div>
          <div style={{
            fontSize:"clamp(9px,1.8vw,11px)", letterSpacing:"0.38em",
            color:"rgba(98,200,75,0.36)", fontFamily:"Georgia, serif",
          }}>forest of consciousness</div>
        </motion.div>

        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }}
          transition={{ delay:0.5, duration:1 }}
          style={{ height:"0.5px", background:"rgba(78,182,58,0.16)",
            marginBottom:"clamp(0.9rem,2.2vw,1.6rem)", position:"relative" }}
        />

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:0.8, duration:1 }}
          style={{
            textAlign:"center", fontSize:"clamp(12px,2.5vw,14px)",
            color:"rgba(148,225,118,0.65)",
            lineHeight:2, fontFamily:"Georgia, serif", fontStyle:"italic",
            marginBottom:"clamp(1rem,2.5vw,1.6rem)", position:"relative",
          }}
        >
          You don't have to explain anything.<br/>
          Just arrive as you are.<br/>
          <span style={{ fontSize:"clamp(10px,2vw,12px)", opacity:0.48 }}>
            What are you carrying right now?
          </span>
        </motion.p>

        {/* Feeling words */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:1, duration:0.8 }}
          style={{
            display:"flex", flexWrap:"wrap",
            gap:"clamp(6px,1.5vw,10px)", justifyContent:"center",
            marginBottom:"clamp(0.9rem,2vw,1.5rem)", position:"relative",
          }}
        >
          {FEELINGS.map((f, i) => {
            const isSel = selected.includes(f);
            return (
              <motion.button key={f}
                initial={{ opacity:0, scale:0.75 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ delay:1+i*0.055 }}
                onClick={() => toggle(f)}
                // onMouseEnter={() => setHovered(f)}
                // onMouseLeave={() => setHovered(null)}
                whileHover={{ scale:1.12, y:-3 }}
                whileTap={{ scale:0.95 }}
                style={{
                  padding:"clamp(6px,1.2vw,9px) clamp(14px,2.8vw,20px)",
                  borderRadius:40,
                  border:isSel
                    ?"0.5px solid rgba(118,232,78,0.72)"
                    :"0.5px solid rgba(68,162,48,0.28)",
                  background:isSel
                    ?"rgba(18,102,14,0.8)"
                    :"rgba(7,30,7,0.62)",
                  color:isSel
                    ?"rgba(188,252,152,0.98)"
                    :"rgba(125,212,95,0.62)",
                  fontSize:"clamp(11px,2.2vw,13px)",
                  cursor:"pointer",
                  fontFamily:"Georgia, serif", fontStyle:"italic",
                  transition:"all 0.35s ease",
                  boxShadow:isSel?"0 0 22px rgba(58,202,38,0.18)":"none",
                }}
              >{f}</motion.button>
            );
          })}
        </motion.div>

        {/* Antar speaks */}
        <AnimatePresence mode="wait">
          {reflection && (
            <motion.div key={activeFeeling}
              initial={{ opacity:0, y:14, scale:0.97 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:-10, scale:0.97 }}
              transition={{ duration:0.65, ease:"easeOut" }}
              style={{
                marginBottom:"clamp(0.8rem,2vw,1.3rem)",
                padding:"clamp(11px,2.2vw,15px) clamp(13px,2.8vw,18px)",
                borderRadius:14,
                borderLeft:"2px solid rgba(78,202,58,0.42)",
                background:"rgba(7,32,7,0.65)",
                fontSize:"clamp(11px,2.1vw,13px)",
                color:"rgba(162,236,132,0.87)",
                lineHeight:1.95,
                fontFamily:"Georgia, serif", fontStyle:"italic",
                position:"relative",
              }}
            >
              <div style={{
                fontSize:"clamp(8px,1.4vw,9px)", letterSpacing:"0.24em",
                color:"rgba(98,202,68,0.38)", marginBottom:6, fontStyle:"normal",
              }}>ANTAR SPEAKS</div>
              {reflection}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter button */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.button
              initial={{ opacity:0, y:12 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.7 }}
              onClick={enter}
              whileHover={{ scale:1.04, boxShadow:"0 0 42px rgba(48,202,38,0.22)" }}
              whileTap={{ scale:0.97 }}
              style={{
                width:"100%", padding:"clamp(12px,2.6vw,15px)",
                borderRadius:40,
                border:"0.5px solid rgba(102,222,70,0.5)",
                background:"rgba(11,62,10,0.72)",
                color:"rgba(182,250,148,0.96)",
                fontSize:"clamp(12px,2.4vw,14px)", cursor:"pointer",
                letterSpacing:"0.14em",
                fontFamily:"Georgia, serif", fontStyle:"italic",
                transition:"all 0.4s",
                boxShadow:"0 0 24px rgba(38,182,28,0.12)",
                position:"relative",
              }}
            >Enter the Sanctuary</motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
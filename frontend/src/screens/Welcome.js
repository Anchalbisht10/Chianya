import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useChianya } from "../context/ChianyaContext";
import { useEffect, useRef, useState } from "react";

// Dreamy lake + floating stars canvas — INSIDE card only
function DreamyBackground({ width, height }) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = width  * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // Stars
    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.65,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5
        ? `rgba(220,210,100,`
        : `rgba(180,230,255,`,
    }));

    // Lake ripples
    const ripples = Array.from({ length: 6 }, (_, i) => ({
      x: width * 0.2 + Math.random() * width * 0.6,
      y: height * 0.62 + Math.random() * height * 0.25,
      r: 0, maxR: 30 + Math.random() * 40,
      speed: 0.18 + Math.random() * 0.12,
      alpha: 0.12 + Math.random() * 0.08,
      delay: i * 1200,
    }));

    let t = 0; let frame;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Sky gradient — faded blue/teal
      const sky = ctx.createLinearGradient(0, 0, 0, height * 0.65);
      sky.addColorStop(0,   "rgba(8,22,38,0.92)");
      sky.addColorStop(0.5, "rgba(10,30,42,0.88)");
      sky.addColorStop(1,   "rgba(12,38,32,0.82)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height * 0.65);

      // Lake — soft sky-blue
      const lake = ctx.createLinearGradient(0, height*0.62, 0, height);
      lake.addColorStop(0, "rgba(18,52,72,0.72)");
      lake.addColorStop(0.4,"rgba(14,42,58,0.68)");
      lake.addColorStop(1,  "rgba(8,24,34,0.82)");
      ctx.fillStyle = lake;
      ctx.beginPath();
      ctx.ellipse(width/2, height*0.68, width*0.52, height*0.12, 0, 0, Math.PI*2);
      ctx.fill();

      // Lake shimmer
      for (let i=0;i<12;i++) {
        const lx = width*0.18 + Math.random()*width*0.64;
        const ly = height*0.65 + Math.random()*height*0.1;
        ctx.beginPath();
        ctx.arc(lx, ly, Math.random()*1.2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(180,240,255,${Math.random()*0.12})`;
        ctx.fill();
      }

      // Floating stars
      stars.forEach(s => {
        const pulse = Math.sin(t * s.speed + s.phase);
        const a = s.alpha * (0.7 + 0.3 * pulse);
        // Draw star with slight glow
        ctx.shadowColor = s.color + "0.6)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x + Math.sin(t*0.004+s.phase)*1.5, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = s.color + a + ")";
        ctx.fill();
        ctx.shadowBlur = 0;

        // Star reflection in lake
        if (s.y < height*0.65) {
          const ry = height*0.65 + (height*0.65 - s.y)*0.25;
          ctx.beginPath();
          ctx.arc(s.x, ry, s.r*0.6, 0, Math.PI*2);
          ctx.fillStyle = s.color + (a*0.3) + ")";
          ctx.fill();
        }
      });

      // Ripples
      ripples.forEach(rip => {
        rip.r += rip.speed;
        if (rip.r > rip.maxR) rip.r = 0;
        const a = rip.alpha * (1 - rip.r/rip.maxR);
        ctx.beginPath();
        ctx.ellipse(rip.x, rip.y, rip.r, rip.r*0.28, 0, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(160,220,255,${a})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // Soft mist layer
      const mist = ctx.createLinearGradient(0, height*0.55, 0, height*0.78);
      mist.addColorStop(0, "rgba(20,60,50,0)");
      mist.addColorStop(0.5,"rgba(20,60,50,0.18)");
      mist.addColorStop(1,  "rgba(20,60,50,0)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, height*0.55, width, height*0.23);

      t++;
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [width, height]);

  return (
    <canvas ref={canvasRef}
      style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        borderRadius:"inherit", pointerEvents:"none",
        opacity: 0.85,
      }}
    />
  );
}

export default function Welcome() {
  const navigate = useNavigate();
  const { setAvatarLine } = useChianya();
  const [phase, setPhase] = useState(0);
  const [cardSize, setCardSize] = useState({ w:480, h:600 });
  const cardRef = useRef();

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2800),
      setTimeout(() => setPhase(3), 4500),
    ];
    return () => t.forEach(clearTimeout);
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

  const enter = () => {
    setAvatarLine("What are you carrying right now? The forest holds space for all of it.");
   navigate("/auth");
  };

  return (
    <div style={{
      position:"absolute", inset:0, zIndex:10,
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"1rem",
    }}>
      {/* Sacred outer rings */}
      <motion.div
        initial={{ opacity:0, scale:0.4 }}
        animate={{ opacity:phase>=1?1:0, scale:phase>=1?1:0.4 }}
        transition={{ duration:2.4, ease:"easeOut" }}
        style={{
          position:"absolute",
          width:"clamp(280px,65vw,520px)",
          height:"clamp(280px,65vw,520px)",
          borderRadius:"50%",
          border:"0.5px solid rgba(80,200,60,0.1)",
          pointerEvents:"none",
        }}
      />

      {/* Main card */}
      <motion.div
        ref={cardRef}
       initial={{ opacity:0, scale:0.88 }}
animate={{ opacity:1, scale:1 }}
transition={{ duration:3, ease:[0.16,1,0.3,1] }}
        style={{
          position:"relative",
          background:"transparent",
border:"none",
borderRadius:0,
padding:"clamp(2rem,5vw,3rem)",
maxWidth:480, width:"100%",
backdropFilter:"none",
boxShadow:"none",
overflow:"visible",
display:"flex", flexDirection:"column",
alignItems:"center", textAlign:"center",
        }}
      >
        {/* Dreamy background — inside card only
        <DreamyBackground width={cardSize.w} height={cardSize.h}/> */}

        {/* Cinematic title */}
        <motion.div
          initial={{ opacity:0, y:-20, letterSpacing:"0.7em" }}
          animate={{
            opacity: phase>=1?1:0,
            y: phase>=1?0:-20,
            letterSpacing: phase>=1?"0.26em":"0.7em",
          }}
          transition={{ duration:2, ease:[0.16,1,0.3,1] }}
          style={{ position:"relative", zIndex:2, marginBottom:6 }}
        >
          <motion.div
            animate={{ y:[0,-4,0], textShadow:[
              "0 0 60px rgba(80,220,80,0.35), 0 0 120px rgba(40,160,40,0.18)",
              "0 0 90px rgba(100,240,100,0.55), 0 0 180px rgba(60,200,60,0.28)",
              "0 0 60px rgba(80,220,80,0.35), 0 0 120px rgba(40,160,40,0.18)",
            ]}}
            transition={{ duration:4.5, repeat:Infinity, ease:"easeInOut" }}
            style={{
              fontSize:"clamp(42px,10vw,70px)",
              fontWeight:300,
              color:"rgba(175,248,148,0.97)",
              fontFamily:"Georgia, serif",
              letterSpacing:"0.26em",
            }}
          >
            Chianya
          </motion.div>
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:phase>=1?1:0 }}
            transition={{ delay:0.8, duration:1.4 }}
            style={{
              fontSize:"clamp(9px,1.8vw,11px)",
              letterSpacing:"0.44em",
              color:"rgba(100,210,80,0.36)",
              fontFamily:"Georgia, serif",
              marginTop:7,
            }}
          >
            forest of consciousness
          </motion.div>
        </motion.div>

        {/* Monk */}
        <motion.div
         initial={{ opacity:0, scale:0.6, y:80 }}
          animate={{
            opacity:phase>=2?1:0,
            scale:phase>=2?1:0.6,
            y:phase>=2?0:80,
          }}
          transition={{ duration:3.5, ease:[0.16,1,0.3,1] }}
          style={{ position:"relative", zIndex:2 }}
        >
          <motion.div
            animate={{ y:[0,-13,0] }}
            transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }}
          >
            <WelcomeMonk/>
          </motion.div>
        </motion.div>

        {/* Welcome text */}
        <motion.div
          initial={{ opacity:0, y:12 }}
          animate={{ opacity:phase>=2?1:0, y:phase>=2?0:12 }}
          transition={{ duration:1.2, delay:0.5 }}
          style={{
            position:"relative", zIndex:2,
            marginTop:"clamp(0.3rem,1vw,0.7rem)",
            marginBottom:"clamp(0.8rem,2vw,1.3rem)",
          }}
        >
          <div style={{
            fontSize:"clamp(13px,3vw,16px)",
            color:"rgba(148,232,122,0.76)",
            fontFamily:"Georgia, serif",
            fontStyle:"italic", lineHeight:2,
          }}>
            Welcome, dear one.<br/>
            <span style={{ fontSize:"clamp(11px,2.2vw,13px)", opacity:0.5 }}>
              The forest of consciousness awaits.
            </span>
          </div>
        </motion.div>

        {/* Enter button — cinematic */}
        <motion.button
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:phase>=3?1:0, y:phase>=3?0:24 }}
          transition={{ duration:2, ease:[0.16,1,0.3,1] }}
          onClick={enter}
          whileHover={{
            scale:1.07,
            boxShadow:"0 0 60px rgba(55,210,55,0.3), 0 0 120px rgba(30,160,30,0.15)",
          }}
          whileTap={{ scale:0.96 }}
          style={{
            position:"relative", zIndex:2,
            padding:"clamp(13px,2.8vw,17px) clamp(42px,9vw,76px)",
            borderRadius:50,
            border:"0.5px solid rgba(108,228,80,0.5)",
            background:"rgba(10,52,10,0.75)",
            color:"rgba(180,250,150,0.97)",
            fontSize:"clamp(13px,2.6vw,16px)",
            cursor:"pointer",
            fontFamily:"Georgia, serif",
            fontStyle:"italic",
            letterSpacing:"0.18em",
            backdropFilter:"blur(22px)",
            boxShadow:"0 0 32px rgba(35,180,35,0.16), inset 0 0 28px rgba(20,100,20,0.12)",
            transition:"all 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          Enter the Sanctuary
        </motion.button>
      </motion.div>
    </div>
  );
}

// Monk SVG — same detailed version as before
function WelcomeMonk() {
  return (
    <svg width="clamp(200px,42vw,290px)" height="clamp(240px,50vw,345px)"
      viewBox="0 0 220 260" style={{ overflow:"visible", display:"block", margin:"0 auto" }}>
      <motion.ellipse cx="110" cy="110" rx="92" ry="98"
        fill="none" stroke="rgba(80,210,60,0.07)" strokeWidth="26"
        animate={{ rx:[92,99,92], ry:[98,105,98], opacity:[0.3,0.7,0.3] }}
        transition={{ duration:5.5, repeat:Infinity, ease:"easeInOut" }}/>
      <motion.circle cx="110" cy="55" r="48"
        fill="none" stroke="rgba(105,225,80,0.28)" strokeWidth="1.5"
        animate={{ r:[48,52,48], opacity:[0.4,1,0.4] }}
        transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}/>
      <circle cx="110" cy="55" r="42"
        fill="none" stroke="rgba(80,200,58,0.12)" strokeWidth="0.8"/>
      {[...Array(16)].map((_,i) => {
        const a=(i/16)*Math.PI*2;
        return <motion.circle key={i}
          cx={110+Math.cos(a)*48} cy={55+Math.sin(a)*48}
          r="1.7" fill="rgba(142,245,102,0.52)"
          animate={{ opacity:[0.15,0.92,0.15] }}
          transition={{ duration:2.1, repeat:Infinity, delay:i*0.12 }}/>;
      })}
      <motion.ellipse cx="110" cy="58" rx="29" ry="31"
        fill="rgba(118,178,84,0.74)" stroke="rgba(152,215,102,0.42)" strokeWidth="0.8"
        animate={{ ry:[31,32.5,31] }}
        transition={{ duration:4.5, repeat:Infinity, ease:"easeInOut" }}/>
      <ellipse cx="110" cy="30" rx="11" ry="7.5" fill="rgba(98,158,64,0.84)"/>
      <motion.g animate={{ scaleY:[1,0.06,1] }}
        transition={{ duration:7, repeat:Infinity, delay:2.5 }}
        style={{ transformOrigin:"95px 60px" }}>
        <ellipse cx="95" cy="60" rx="6.2" ry="4.8" fill="rgba(18,48,8,0.92)"/>
        <circle cx="96.5" cy="58.5" r="1.3" fill="rgba(202,255,182,0.92)"/>
      </motion.g>
      <motion.g animate={{ scaleY:[1,0.06,1] }}
        transition={{ duration:7, repeat:Infinity, delay:2.5 }}
        style={{ transformOrigin:"125px 60px" }}>
        <ellipse cx="125" cy="60" rx="6.2" ry="4.8" fill="rgba(18,48,8,0.92)"/>
        <circle cx="126.5" cy="58.5" r="1.3" fill="rgba(202,255,182,0.92)"/>
      </motion.g>
      <path d="M 86 51 Q 95 48 104 50" fill="none" stroke="rgba(38,80,14,0.78)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 116 50 Q 125 48 134 51" fill="none" stroke="rgba(38,80,14,0.78)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 99 78 Q 110 86 121 78" fill="none" stroke="rgba(38,100,18,0.78)" strokeWidth="1.9" strokeLinecap="round"/>
      <ellipse cx="98" cy="76" rx="6.5" ry="3.8" fill="rgba(100,202,60,0.14)" transform="rotate(-12,98,76)"/>
      <ellipse cx="122" cy="76" rx="6.5" ry="3.8" fill="rgba(100,202,60,0.14)" transform="rotate(12,122,76)"/>
      <motion.circle cx="110" cy="46" r="2.9" fill="rgba(125,258,100,0.82)"
        animate={{ opacity:[0.38,1,0.38], r:[2.9,3.5,2.9] }}
        transition={{ duration:3.2, repeat:Infinity }}/>
      <circle cx="110" cy="46" r="1.2" fill="rgba(222,255,202,1)"/>
      <ellipse cx="80" cy="62" rx="5.2" ry="9.5"
        fill="rgba(108,168,74,0.68)" stroke="rgba(152,212,92,0.32)" strokeWidth="0.7"/>
      <ellipse cx="140" cy="62" rx="5.2" ry="9.5"
        fill="rgba(108,168,74,0.68)" stroke="rgba(152,212,92,0.32)" strokeWidth="0.7"/>
      <rect x="99" y="87" width="22" height="16" rx="9" fill="rgba(114,172,78,0.62)"/>
      <motion.path
        d="M 26 118 Q 16 166 18 240 Q 58 252 110 254 Q 162 252 202 240 Q 204 166 194 118 Q 156 138 110 140 Q 64 138 26 118 Z"
        fill="rgba(18,92,18,0.67)" stroke="rgba(48,162,38,0.38)" strokeWidth="1"
        animate={{ d:[
          "M 26 118 Q 16 166 18 240 Q 58 252 110 254 Q 162 252 202 240 Q 204 166 194 118 Q 156 138 110 140 Q 64 138 26 118 Z",
          "M 26 118 Q 15 168 17 240 Q 58 253 110 255 Q 162 253 203 240 Q 205 168 194 118 Q 156 139 110 141 Q 64 139 26 118 Z",
          "M 26 118 Q 16 166 18 240 Q 58 252 110 254 Q 162 252 202 240 Q 204 166 194 118 Q 156 138 110 140 Q 64 138 26 118 Z",
        ]}}
        transition={{ duration:5.8, repeat:Infinity, ease:"easeInOut" }}/>
      <path d="M 73 105 Q 69 149 71 240 Q 90 250 110 251 Q 130 250 149 240 Q 151 149 147 105 Q 130 118 110 119 Q 90 118 73 105 Z"
        fill="rgba(38,142,38,0.39)" stroke="rgba(68,192,58,0.28)" strokeWidth="0.8"/>
      <path d="M 26 118 Q 59 103 110 100 Q 161 103 194 118"
        fill="rgba(23,108,20,0.66)" stroke="rgba(53,172,43,0.42)" strokeWidth="1"/>
      <path d="M 33 113 Q 23 151 31 176 Q 46 190 65 186"
        fill="none" stroke="rgba(17,90,16,0.72)" strokeWidth="14" strokeLinecap="round"/>
      <path d="M 187 113 Q 197 151 189 176 Q 174 190 155 186"
        fill="none" stroke="rgba(17,90,16,0.72)" strokeWidth="14" strokeLinecap="round"/>
      <motion.g animate={{ y:[0,-3.5,0] }}
        transition={{ duration:5.2, repeat:Infinity, ease:"easeInOut" }}>
        <ellipse cx="90" cy="192" rx="21" ry="11.5"
          fill="rgba(108,170,72,0.6)" stroke="rgba(152,222,102,0.36)" strokeWidth="0.8"
          transform="rotate(-21,90,192)"/>
        <ellipse cx="130" cy="192" rx="21" ry="11.5"
          fill="rgba(108,170,72,0.6)" stroke="rgba(152,222,102,0.36)" strokeWidth="0.8"
          transform="rotate(21,130,192)"/>
        <ellipse cx="110" cy="185" rx="9.5" ry="13.5"
          fill="rgba(108,170,72,0.5)" stroke="rgba(152,222,102,0.3)" strokeWidth="0.6"/>
        <path d="M 86 179 Q 110 171 134 179" fill="none"
          stroke="rgba(162,232,112,0.56)" strokeWidth="1.9" strokeLinecap="round"/>
        {[...Array(11)].map((_,i)=>{
          const a=(i/11)*Math.PI+0.07;
          return <motion.circle key={i}
            cx={110+Math.cos(a)*33} cy={196+Math.sin(a)*12.5}
            r="2.3" fill="rgba(26,122,18,0.88)"
            stroke="rgba(76,202,58,0.52)" strokeWidth="0.5"
            animate={{ opacity:[0.48,1,0.48] }}
            transition={{ duration:2.1, repeat:Infinity, delay:i*0.14 }}/>;
        })}
      </motion.g>
      {[70,88,110,132,150].map((x,i)=>(
        <motion.circle key={i} cx={x} cy={9} r={1.7}
          fill="rgba(142,255,102,0.88)"
          animate={{ cy:[9,-26,9], opacity:[0,0.88,0] }}
          transition={{ duration:3.1+i*0.42, repeat:Infinity, delay:i*0.62, ease:"easeInOut" }}/>
      ))}
      <motion.ellipse cx="110" cy="255" rx="60" ry="9.5"
        fill="rgba(38,185,38,0.1)"
        animate={{ rx:[60,68,60], opacity:[0.35,0.82,0.35] }}
        transition={{ duration:4.2, repeat:Infinity, ease:"easeInOut" }}/>
      {[...Array(9)].map((_,i)=>{
        const a=(i/9)*Math.PI*2;
        return <motion.ellipse key={i}
          cx={110+Math.cos(a)*25} cy={255+Math.sin(a)*6.5}
          rx="11.5" ry="4.8"
          fill="rgba(18,125,18,0.18)" stroke="rgba(58,205,48,0.22)" strokeWidth="0.5"
          transform={`rotate(${(i/9)*360},${110+Math.cos(a)*25},${255+Math.sin(a)*6.5})`}
          animate={{ opacity:[0.28,0.78,0.28] }}
          transition={{ duration:3.2, repeat:Infinity, delay:i*0.2 }}/>;
      })}
    </svg>
  );
}
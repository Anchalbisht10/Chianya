import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useChianya } from "../context/ChianyaContext";
import { avatarLines } from "../avatar/avatarLines";
import { logSession } from "../services/api";

function EarthAtmosphere() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio||1;
    canvas.width=canvas.offsetWidth*dpr;
    canvas.height=canvas.offsetHeight*dpr;
    const ctx=canvas.getContext("2d");
    ctx.scale(dpr,dpr);
    const W=canvas.offsetWidth, H=canvas.offsetHeight;

    // Root filaments
    const roots=Array.from({length:10},(_,i)=>({
      x:W*(0.08+Math.random()*0.84),
      startY:H,
      endY:H*(0.3+Math.random()*0.45),
      alpha:Math.random()*0.14+0.06,
      width:Math.random()*1.8+0.6,
      phase:Math.random()*Math.PI*2,
      speed:Math.random()*0.008+0.003,
      isPink:Math.random()>0.6,
    }));

    // Forest silhouette
    const drawSilhouette=()=>{
      ctx.fillStyle="rgba(5,22,8,0.55)";
      ctx.beginPath();
      ctx.moveTo(0,H*0.65);
      const steps=20;
      for(let i=0;i<=steps;i++){
        const x=(i/steps)*W;
        const th=(Math.sin(i*1.7+0.4)*0.5+0.5)*H*0.15+
                 (Math.sin(i*3.2)*0.5+0.5)*H*0.06;
        ctx.lineTo(x,H*0.5-th);
      }
      ctx.lineTo(W,H*0.65); ctx.closePath(); ctx.fill();
    };

    let t=0; let frame;
    const draw=()=>{
      ctx.clearRect(0,0,W,H);

      // Sky
      const sky=ctx.createLinearGradient(0,0,0,H*0.65);
      sky.addColorStop(0,"rgba(4,14,22,0.88)");
      sky.addColorStop(1,"rgba(6,24,16,0.82)");
      ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*0.65);

      drawSilhouette();

      // Earth zone
      const earth=ctx.createLinearGradient(0,H*0.62,0,H);
      earth.addColorStop(0,"rgba(8,30,10,0)");
      earth.addColorStop(0.4,"rgba(14,48,14,0.2)");
      earth.addColorStop(1,"rgba(22,65,16,0.45)");
      ctx.fillStyle=earth; ctx.fillRect(0,H*0.62,W,H*0.38);

      // Root lines
      roots.forEach(r=>{
        const pulse=Math.sin(t*r.speed+r.phase);
        const a=r.alpha*(0.6+0.4*pulse);
        ctx.beginPath();
        ctx.moveTo(r.x,r.startY);
        ctx.quadraticCurveTo(
          r.x+Math.sin(t*0.011+r.phase)*22,
          (r.startY+r.endY)/2,
          r.x+Math.cos(r.phase)*16, r.endY
        );
        ctx.strokeStyle=r.isPink
          ?`rgba(185,90,145,${a*0.8})`
          :`rgba(55,185,55,${a})`;
        ctx.lineWidth=r.width; ctx.stroke();
        ctx.beginPath();
        ctx.arc(r.x+Math.cos(r.phase)*16,r.endY,r.width*2,0,Math.PI*2);
        ctx.fillStyle=r.isPink
          ?"rgba(200,100,155,0.3)"
          :"rgba(80,220,65,0.28)";
        ctx.fill();
      });

      // Fireflies
      for(let i=0;i<4;i++){
        const fx=W*(0.1+((i*0.22+t*0.002+Math.sin(t*0.006+i)*0.05))%0.8);
        const fy=H*0.52-Math.abs(Math.sin(t*0.009+i*1.4))*45;
        const fa=(Math.sin(t*0.035+i)*0.5+0.5)*0.52;
        ctx.shadowColor="rgba(120,255,100,0.5)";
        ctx.shadowBlur=8;
        ctx.beginPath();
        ctx.arc(fx,fy,1.3,0,Math.PI*2);
        ctx.fillStyle=`rgba(138,255,110,${fa})`;
        ctx.fill();
        ctx.shadowBlur=0;
      }

      t++; frame=requestAnimationFrame(draw);
    };
    draw();
    return()=>cancelAnimationFrame(frame);
  },[]);
  return (
    <canvas ref={canvasRef} style={{
      position:"absolute",inset:0,width:"100%",height:"100%",
      borderRadius:"inherit",pointerEvents:"none",opacity:0.85,
    }}/>
  );
}

export default function Release() {
  const navigate = useNavigate();
  const { setAvatarLine } = useChianya();
  const [text, setText] = useState("");
  const [released, setReleased] = useState(false);
  const canvasRef = useRef();

  useEffect(() => { setAvatarLine(avatarLines.release); }, []);

const doRelease = () => {
  if (!text.trim()) return;
  setReleased(true);
  logSession("release", [], {}).catch(()=>{});
  const canvas = canvasRef.current;
  if (!canvas) return;
  const dpr = window.devicePixelRatio||1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr,dpr);
  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight;

  const display = text.length > 28 ? text.slice(0,28)+"…" : text;
  let alpha=1, t=0;

  // Energy particles rising then falling into earth
  const particles = Array.from({length:55}, () => ({
    x: W/2 + (Math.random()-0.5)*90,
    y: H*0.42 + Math.random()*H*0.25,
    vx: (Math.random()-0.5)*1.1,
    vy: -(Math.random()*1.2+0.3),
    r: Math.random()*2.2+0.6,
    alpha: Math.random()*0.55+0.2,
    color: Math.random()>0.4
      ? "rgba(65,185,55,"
      : Math.random()>0.5
        ? "rgba(100,210,80,"
        : "rgba(180,100,140,",
    lifespan: 80+Math.random()*60,
    age:0,
  }));

  let frame;
  const draw = () => {
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle="rgba(3,14,5,0.96)";
    ctx.fillRect(0,0,W,H);

    // Text rising + dissolving
    if (alpha > 0) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `italic ${13+t*0.035}px Georgia`;
      ctx.fillStyle = `rgba(162,238,132,${alpha})`;
      ctx.textAlign = "center";
      ctx.fillText(display, W/2, H*0.38 - t*0.28);
      ctx.restore();
      alpha -= 0.007;
    }

    // Particles
    particles.forEach(p => {
      p.age++;
      p.x += p.vx + Math.sin(t*0.04+p.x)*0.18;
      // Rise then fall
      p.vy += p.age < 55 ? -0.015 : 0.028;
      p.y += p.vy;
      const lifeAlpha = p.alpha * Math.max(0, 1 - p.age/p.lifespan);
      if (lifeAlpha <= 0) return;
      ctx.shadowColor = "rgba(80,200,60,0.3)";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color + lifeAlpha + ")";
      ctx.fill();
      ctx.shadowBlur=0;
    });

    // Earth absorption glow
    if (t > 55) {
      const absorbAlpha = Math.min(1,(t-55)/60)*0.55;
      const eg=ctx.createLinearGradient(0,H*0.7,0,H);
      eg.addColorStop(0,`rgba(40,165,40,${absorbAlpha*0.4})`);
      eg.addColorStop(0.5,`rgba(20,120,20,${absorbAlpha*0.25})`);
      eg.addColorStop(1,`rgba(10,60,10,0)`);
      ctx.fillStyle=eg;
      ctx.fillRect(0,H*0.7,W,H*0.3);
    }

    // Completion text
    if (t > 120) {
      const ca = Math.min(1,(t-120)/40);
      ctx.font=`italic 12px Georgia`;
      ctx.fillStyle=`rgba(90,195,65,${ca*0.42})`;
      ctx.textAlign="center";
      ctx.fillText("released into the forest", W/2, H*0.75);
    }

    t++;
    if (t < 260) frame=requestAnimationFrame(draw);
  };
  draw();
};
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      transition={{duration:1.2}}
      style={{
        position:"absolute",inset:0,zIndex:10,
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:"clamp(1rem,3vw,2rem)",
      }}>
      <div style={{
        background:"rgba(3,14,5,0.91)",
        border:"0.5px solid rgba(70,180,50,0.2)",
        borderRadius:"clamp(16px,3vw,24px)",
        padding:"clamp(1.8rem,4vw,2.8rem)",
        maxWidth:480,width:"100%",backdropFilter:"blur(28px)",
        position:"relative", overflow:"hidden",
      }}>
        <EarthAtmosphere/>
        <motion.button onClick={()=>navigate("/modes")}
          whileHover={{scale:1.06,boxShadow:"0 0 24px rgba(52,192,42,0.2)",
            borderColor:"rgba(92,222,62,0.5)",color:"rgba(182,250,148,0.95)"}}
          style={{
            background:"rgba(7,36,7,0.65)",
            border:"0.5px solid rgba(70,180,48,0.28)",
            borderRadius:24,color:"rgba(122,208,84,0.52)",
            fontSize:11,cursor:"pointer",letterSpacing:"0.22em",
            fontFamily:"Georgia, serif",padding:"6px 18px",marginBottom:"1.2rem",
            backdropFilter:"blur(12px)",
            transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",display:"block",
          }}>← Return</motion.button>

        <div style={{
          fontSize:"clamp(9px,1.8vw,10px)",letterSpacing:"0.32em",
          color:"rgba(95,196,70,0.36)",fontFamily:"Georgia, serif",
          textAlign:"center",marginBottom:"1.2rem",
        }}>RELEASE INTO THE FOREST</div>

        <p style={{
          textAlign:"center",fontSize:"clamp(12px,2.4vw,13px)",
          color:"rgba(145,222,115,0.62)",fontFamily:"Georgia, serif",
          fontStyle:"italic",lineHeight:1.85,marginBottom:"1.4rem",
        }}>
          Write what is heavy. The roots will hold it.<br/>
          <span style={{opacity:0.48,fontSize:"clamp(11px,2vw,12px)"}}>
            Watch it dissolve back into the earth.
          </span>
        </p>

        {/* Dissolution canvas */}
        <canvas ref={canvasRef} style={{
          width:"100%",height:130,borderRadius:14,
          marginBottom:"1rem",display:"block",
          background:"rgba(3,14,5,0.88)",
          border:"0.5px solid rgba(55,160,38,0.18)",
        }}/>

        <AnimatePresence>
          {!released && (
            <motion.div initial={{opacity:1}} exit={{opacity:0,y:8}}
              transition={{duration:0.5}}>
              <textarea value={text} onChange={e=>setText(e.target.value)}
                placeholder="I am releasing..."
                rows={3}
                style={{
                  width:"100%",padding:"12px 14px",borderRadius:12,
                  border:"0.5px solid rgba(72,182,50,0.22)",
                  background:"rgba(5,26,5,0.68)",
                  color:"rgba(160,236,130,0.9)",
                  fontFamily:"Georgia, serif",fontStyle:"italic",
                  fontSize:"clamp(12px,2.2vw,14px)",
                  resize:"none",outline:"none",lineHeight:1.7,
                  marginBottom:"1rem",
                }}
              />
              <motion.button onClick={doRelease}
                whileHover={{scale:1.04,boxShadow:"0 0 38px rgba(46,198,36,0.2)"}}
                whileTap={{scale:0.97}}
                style={{
                  width:"100%",padding:"13px",borderRadius:40,
                  border:"0.5px solid rgba(100,220,68,0.5)",
                  background:"rgba(11,62,10,0.72)",
                  color:"rgba(182,250,148,0.96)",
                  fontSize:"clamp(12px,2.4vw,14px)",cursor:"pointer",
                  fontFamily:"Georgia, serif",fontStyle:"italic",
                  letterSpacing:"0.12em",transition:"all 0.4s",
                }}>Release into the Earth</motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {released && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}
            transition={{delay:4,duration:1.2}} style={{textAlign:"center"}}>
            <p style={{
              fontSize:"clamp(13px,2.5vw,15px)",
              color:"rgba(160,236,130,0.78)",fontFamily:"Georgia, serif",
              fontStyle:"italic",lineHeight:1.9,marginBottom:"1.4rem",
            }}>
              It is done. The forest holds it now.<br/>
              <span style={{opacity:0.5,fontSize:"clamp(11px,2vw,12px)"}}>
                You are a little lighter.
              </span>
            </p>
            <motion.button onClick={()=>navigate("/modes")}
              whileHover={{scale:1.04}}
              style={{
                width:"100%",padding:"12px",borderRadius:40,
                border:"0.5px solid rgba(100,222,70,0.48)",
                background:"rgba(11,62,10,0.72)",
                color:"rgba(182,250,148,0.96)",
                fontSize:"clamp(12px,2.4vw,14px)",cursor:"pointer",
                fontFamily:"Georgia, serif",fontStyle:"italic",
                letterSpacing:"0.12em",
              }}>Return to the Forest</motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
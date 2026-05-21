import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useChianya } from "../context/ChianyaContext";
import { avatarLines } from "../avatar/avatarLines";
import { logSession } from "../services/api";

const STEPS = [
  {count:"5",sense:"See",   hint:"Look slowly around. Name 5 things you can see."},
  {count:"4",sense:"Touch", hint:"Feel 4 things — weight, surface, warmth, texture."},
  {count:"3",sense:"Hear",  hint:"Listen. Name 3 sounds in this moment."},
  {count:"2",sense:"Smell", hint:"Notice 2 scents — air, fabric, even nothing."},
  {count:"1",sense:"Taste", hint:"One thing you can taste — water, breath, air."},
];

function GroundingCanvas({ width, height }) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height) return;
    const dpr = window.devicePixelRatio||1;
    canvas.width=width*dpr; canvas.height=height*dpr;
    const ctx=canvas.getContext("2d");
    ctx.scale(dpr,dpr);
    const roots=Array.from({length:12},(_,i)=>({
      x:width*(0.1+Math.random()*0.8),
      startY:height,
      endY:height*(0.5+Math.random()*0.35),
      alpha:Math.random()*0.12+0.04,
      width:Math.random()*1.5+0.5,
      phase:Math.random()*Math.PI*2,
      speed:Math.random()*0.008+0.003,
    }));
    let t=0; let frame;
    const draw=()=>{
      ctx.clearRect(0,0,width,height);
      // Earth base
      const earth=ctx.createLinearGradient(0,height*0.6,0,height);
      earth.addColorStop(0,"rgba(8,30,8,0)");
      earth.addColorStop(0.5,"rgba(12,40,10,0.15)");
      earth.addColorStop(1,"rgba(18,55,12,0.35)");
      ctx.fillStyle=earth;
      ctx.fillRect(0,0,width,height);
      // Root pulses
      roots.forEach(r=>{
        const pulse=Math.sin(t*r.speed+r.phase);
        const a=r.alpha*(0.6+0.4*pulse);
        ctx.beginPath();
        ctx.moveTo(r.x,r.startY);
        ctx.quadraticCurveTo(
          r.x+(Math.sin(t*0.01+r.phase)*20),
          (r.startY+r.endY)/2,
          r.x+(Math.cos(r.phase)*15),r.endY
        );
        ctx.strokeStyle=`rgba(60,180,40,${a})`;
        ctx.lineWidth=r.width;
        ctx.stroke();
        // Glow at tip
        ctx.beginPath();
        ctx.arc(r.x+(Math.cos(r.phase)*15),r.endY,r.width*1.5,0,Math.PI*2);
        ctx.fillStyle=`rgba(80,220,60,${a*0.5})`;
        ctx.fill();
      });
      t++; frame=requestAnimationFrame(draw);
    };
    draw();
    return()=>cancelAnimationFrame(frame);
  },[width,height]);
  return <canvas ref={canvasRef} style={{
    position:"absolute",inset:0,width:"100%",height:"100%",
    borderRadius:"inherit",pointerEvents:"none",opacity:0.6,
  }}/>;
}

export default function Ground() {
  const navigate = useNavigate();
 const { setAvatarLine, setCurrentMode } = useChianya();
  const [done, setDone] = useState([]);
  const cardRef = useRef();
  const [cardSize, setCardSize] = useState({w:480,h:600});
  const allDone = done.length === STEPS.length;
  useEffect(() => {
  if (allDone) logSession("ground", [], {}).catch(()=>{});
}, [allDone]);

  useEffect(() => { setAvatarLine(avatarLines.ground); }, []);
  setCurrentMode("ground");
  useEffect(() => {
    if(!cardRef.current)return;
    const obs=new ResizeObserver(e=>{
      const r=e[0].contentRect;
      setCardSize({w:r.width,h:r.height});
    });
    obs.observe(cardRef.current);
    return()=>obs.disconnect();
  },[]);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      transition={{duration:1.2}}
      style={{
        position:"absolute",inset:0,zIndex:10,
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:"clamp(1rem,3vw,2rem)",overflowY:"auto",
      }}>
      <div ref={cardRef} style={{
        background:"rgba(3,14,5,0.91)",
        border:"0.5px solid rgba(68,178,50,0.2)",
        borderRadius:"clamp(16px,3vw,24px)",
        padding:"clamp(1.8rem,4vw,2.8rem)",
        maxWidth:480,width:"100%",
        backdropFilter:"blur(28px)",position:"relative",overflow:"hidden",
      }}>
        <GroundingCanvas width={cardSize.w} height={cardSize.h}/>

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
            position:"relative",zIndex:2,
          }}>← Return</motion.button>

        <div style={{
          fontSize:"clamp(9px,1.8vw,10px)",letterSpacing:"0.32em",
          color:"rgba(95,196,70,0.36)",fontFamily:"Georgia, serif",
          textAlign:"center",marginBottom:"0.8rem",position:"relative",zIndex:2,
        }}>5 · 4 · 3 · 2 · 1 GROUNDING</div>

        <p style={{
          textAlign:"center",fontSize:"clamp(12px,2.4vw,13px)",
          color:"rgba(145,222,115,0.62)",fontFamily:"Georgia, serif",
          fontStyle:"italic",lineHeight:1.85,marginBottom:"1.4rem",
          position:"relative",zIndex:2,
        }}>
          Tap each sense as you notice it.<br/>
          <span style={{opacity:0.5}}>Come back to the present, step by step.</span>
        </p>

        <div style={{display:"flex",flexDirection:"column",gap:10,
          marginBottom:"1.4rem",position:"relative",zIndex:2}}>
          {STEPS.map((s,i)=>{
            const isDone=done.includes(i);
            return (
              <motion.div key={i}
                initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}}
                transition={{delay:i*0.12}}
                onClick={()=>!isDone&&setDone(prev=>[...prev,i])}
                whileHover={!isDone?{x:4,borderColor:"rgba(90,200,60,0.4)"}:{}}
                style={{
                  display:"flex",alignItems:"flex-start",gap:14,
                  padding:"clamp(10px,2vw,14px) clamp(12px,2.5vw,16px)",
                  borderRadius:14,
                  border:isDone
                    ?"0.5px solid rgba(98,218,66,0.42)"
                    :"0.5px solid rgba(66,160,46,0.22)",
                  background:isDone
                    ?"rgba(14,76,10,0.68)"
                    :"rgba(5,28,5,0.58)",
                  cursor:isDone?"default":"pointer",
                  transition:"all 0.4s",
                }}>
                <div style={{
                  width:28,height:28,borderRadius:"50%",flexShrink:0,
                  border:isDone?"none":"0.5px solid rgba(95,198,66,0.35)",
                  background:isDone?"rgba(58,198,38,0.45)":"rgba(13,53,10,0.62)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,
                  color:isDone?"rgba(188,252,152,0.95)":"rgba(95,198,66,0.45)",
                  fontFamily:"Georgia, serif",
                }}>
                  {isDone?"✓":s.count}
                </div>
                <div>
                  <div style={{
                    fontSize:"clamp(12px,2.2vw,13px)",fontWeight:500,
                    color:isDone?"rgba(182,250,145,0.95)":"rgba(142,218,108,0.76)",
                    fontFamily:"Georgia, serif",marginBottom:3,
                  }}>{s.sense}</div>
                  <div style={{
                    fontSize:"clamp(10px,1.8vw,11px)",
                    color:"rgba(95,180,70,0.47)",
                    fontFamily:"Georgia, serif",fontStyle:"italic",lineHeight:1.6,
                  }}>{s.hint}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {allDone&&(
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
              transition={{duration:0.8}} style={{position:"relative",zIndex:2}}>
              <div style={{
                padding:"14px 18px",borderRadius:14,
                borderLeft:"2px solid rgba(78,200,56,0.42)",
                background:"rgba(6,30,6,0.68)",
                fontSize:"clamp(12px,2.2vw,13px)",
                color:"rgba(160,236,130,0.88)",
                fontFamily:"Georgia, serif",fontStyle:"italic",
                lineHeight:1.9,marginBottom:"1rem",
              }}>
                You are here. You are safe.<br/>
                This moment holds you completely.
              </div>
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
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
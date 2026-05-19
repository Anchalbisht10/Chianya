import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useChianya } from "../context/ChianyaContext";
import { avatarLines } from "../avatar/avatarLines";
import { feelingResponses, principles } from "../data/wisdom";
import { useEffect, useRef, useState } from "react";
import { getCommunityStats } from "../services/api";

function ModeAtmosphere({ width, height }) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height) return;
    const dpr = window.devicePixelRatio||1;
    canvas.width=width*dpr; canvas.height=height*dpr;
    const ctx=canvas.getContext("2d");
    ctx.scale(dpr,dpr);

    const flies=Array.from({length:18},()=>({
      x:Math.random()*width,
      y:Math.random()*height*0.65,
      r:Math.random()*1.4+0.4,
      alpha:Math.random()*0.45+0.1,
      vx:(Math.random()-0.5)*0.2,
      vy:(Math.random()-0.5)*0.12,
      phase:Math.random()*Math.PI*2,
      speed:Math.random()*0.01+0.004,
    }));

    const ripples=[
      {x:width*0.28,y:height*0.76,r:5, maxR:30,speed:0.13,alpha:0.09},
      {x:width*0.62,y:height*0.8, r:18,maxR:38,speed:0.11,alpha:0.07},
      {x:width*0.45,y:height*0.73,r:0, maxR:24,speed:0.15,alpha:0.1},
    ];

    let t=0; let frame;
    const draw=()=>{
      ctx.clearRect(0,0,width,height);

      // Sky
      const sky=ctx.createLinearGradient(0,0,0,height*0.66);
      sky.addColorStop(0,"rgba(4,12,20,0.97)");
      sky.addColorStop(1,"rgba(6,22,18,0.9)");
      ctx.fillStyle=sky; ctx.fillRect(0,0,width,height*0.66);

      // Forest silhouette — further back, softer
      ctx.fillStyle="rgba(5,22,8,0.78)";
      ctx.beginPath();
      ctx.moveTo(0,height*0.66);
      const steps=28;
      for(let i=0;i<=steps;i++){
        const x=(i/steps)*width;
        const th=(Math.sin(i*1.6+0.3)*0.5+0.5)*height*0.12+
                 (Math.sin(i*3.4)*0.5+0.5)*height*0.05;
        ctx.lineTo(x,height*0.54-th);
      }
      ctx.lineTo(width,height*0.66); ctx.closePath(); ctx.fill();

      // Second silhouette layer
      ctx.fillStyle="rgba(8,30,10,0.5)";
      ctx.beginPath();
      ctx.moveTo(0,height*0.68);
      for(let i=0;i<=steps;i++){
        const x=(i/steps)*width;
        const th=(Math.sin(i*2.1+1.4)*0.5+0.5)*height*0.08+
                 (Math.sin(i*4.2)*0.5+0.5)*height*0.03;
        ctx.lineTo(x,height*0.6-th);
      }
      ctx.lineTo(width,height*0.68); ctx.closePath(); ctx.fill();

      // Lake — more natural elongated shape
      const lakeW=width*0.8;
      const lakeH=height*0.18;
      const lakeX=(width-lakeW)/2;
      const lakeY=height*0.67;
      const lakeGrad=ctx.createLinearGradient(0,lakeY,0,lakeY+lakeH);
      lakeGrad.addColorStop(0,"rgba(12,40,60,0.72)");
      lakeGrad.addColorStop(0.5,"rgba(8,28,44,0.68)");
      lakeGrad.addColorStop(1,"rgba(4,14,24,0.88)");
      ctx.fillStyle=lakeGrad;
      // Natural lake shape — not perfect ellipse
      ctx.beginPath();
      ctx.moveTo(lakeX+lakeW*0.08, lakeY+lakeH*0.5);
      ctx.bezierCurveTo(
        lakeX+lakeW*0.02, lakeY+lakeH*0.15,
        lakeX+lakeW*0.2,  lakeY,
        lakeX+lakeW*0.5,  lakeY+lakeH*0.05
      );
      ctx.bezierCurveTo(
        lakeX+lakeW*0.8,  lakeY+lakeH*0.1,
        lakeX+lakeW*0.98, lakeY+lakeH*0.3,
        lakeX+lakeW*0.95, lakeY+lakeH*0.65
      );
      ctx.bezierCurveTo(
        lakeX+lakeW*0.9,  lakeY+lakeH,
        lakeX+lakeW*0.1,  lakeY+lakeH,
        lakeX+lakeW*0.05, lakeY+lakeH*0.65
      );
      ctx.closePath();
      ctx.fill();

      // Water shimmer
      for(let i=0;i<6;i++){
        const sx=lakeX+Math.random()*lakeW*0.8+lakeW*0.1;
        const sy=lakeY+lakeH*0.2+Math.random()*lakeH*0.6;
        ctx.beginPath();
        ctx.moveTo(sx,sy); ctx.lineTo(sx+Math.random()*28-14,sy);
        ctx.strokeStyle=`rgba(120,200,240,${Math.random()*0.07})`;
        ctx.lineWidth=0.5; ctx.stroke();
      }

      // Ripples
      ripples.forEach(rip=>{
        rip.r+=rip.speed;
        if(rip.r>rip.maxR)rip.r=0;
        const a=rip.alpha*(1-rip.r/rip.maxR);
        ctx.beginPath();
        ctx.ellipse(rip.x,rip.y,rip.r*1.6,rip.r*0.35,0,0,Math.PI*2);
        ctx.strokeStyle=`rgba(100,190,230,${a})`;
        ctx.lineWidth=0.6; ctx.stroke();
      });

      // Fireflies
      flies.forEach(f=>{
        const pulse=Math.sin(t*f.speed+f.phase);
        const a=f.alpha*(0.5+0.5*pulse);
        ctx.shadowColor="rgba(100,255,100,0.45)";
        ctx.shadowBlur=7;
        ctx.beginPath();
        ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(130,255,120,${a})`;
        ctx.fill();
        ctx.shadowBlur=0;
        f.x+=f.vx+Math.sin(t*0.007+f.phase)*0.18;
        f.y+=f.vy+Math.cos(t*0.005+f.phase)*0.1;
        if(f.x<0)f.x=width; if(f.x>width)f.x=0;
        if(f.y<0)f.y=height*0.65; if(f.y>height*0.68)f.y=0;
      });

      // Mist
      const mist=ctx.createLinearGradient(0,height*0.6,0,height*0.76);
      mist.addColorStop(0,"rgba(10,45,28,0)");
      mist.addColorStop(0.5,"rgba(10,45,28,0.15)");
      mist.addColorStop(1,"rgba(10,45,28,0)");
      ctx.fillStyle=mist;
      ctx.fillRect(0,height*0.6,width,height*0.16);

      t++; frame=requestAnimationFrame(draw);
    };
    draw();
    return()=>cancelAnimationFrame(frame);
  },[width,height]);

  return <canvas ref={canvasRef} style={{
    position:"absolute",inset:0,width:"100%",height:"100%",
    borderRadius:"inherit",pointerEvents:"none",opacity:0.82,
  }}/>;
}

const MODES=[
  {id:"companion",name:"Antar",    desc:"speak with your inner guide", path:"/companion"},
  {id:"breathe",  name:"Breathe",  desc:"return to the breath",        path:"/breathe"},
  {id:"release",  name:"Release",  desc:"set something down",          path:"/release"},
  {id:"ground",   name:"Ground",   desc:"come back to now",            path:"/ground"},
  {id:"sit",      name:"Just Sit", desc:"nothing required of you",     path:"/sit"},
  {id:"wisdom",   name:"Wisdom",   desc:"a teaching for today",        path:"/wisdom"},
];

export default function ModeSelect() {
  const { feelings, setAvatarLine } = useChianya();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  useEffect(() => {
    getCommunityStats().then(data => setStats(data)).catch(() => {});
  }, []);
  const cardRef = useRef();
  const [cardSize, setCardSize] = useState({w:460,h:560});
  const primary = feelings[0]||"anxious";
  const response = feelingResponses[primary];
  const suggested = response?.practice||"breathe";
  const { todayReflection, setTodayReflection } = useChianya();
const [reflectOpen, setReflectOpen] = useState(false);
const [reflectInput, setReflectInput] = useState(todayReflection || "");

  useEffect(() => {
    if(!cardRef.current)return;
    const obs=new ResizeObserver(entries=>{
      const el=entries[0].contentRect;
      setCardSize({w:el.width,h:el.height});
    });
    obs.observe(cardRef.current);
    return()=>obs.disconnect();
  },[]);

  const go=(mode)=>{
    setAvatarLine(avatarLines[mode.id]||avatarLines.sit);
    navigate(mode.path);
  };

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      transition={{duration:1.2}}
      style={{
        position:"absolute",inset:0,zIndex:10,
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:"clamp(1rem,3vw,2rem)",overflowY:"auto",
      }}>
      <motion.div ref={cardRef}
        initial={{opacity:0,y:24,scale:0.96}}
        animate={{opacity:1,y:0,scale:1}}
        transition={{duration:1.2,ease:[0.16,1,0.3,1]}}
        style={{
          background:"rgba(3,14,5,0.9)",
          border:"0.5px solid rgba(68,178,50,0.18)",
          borderRadius:"clamp(16px,3vw,24px)",
          padding:"clamp(1.6rem,4vw,2.4rem)",
          maxWidth:480,width:"100%",
          backdropFilter:"blur(28px)",
          boxShadow:"0 0 80px rgba(18,140,18,0.1)",
          position:"relative",overflow:"hidden",
        }}>
        <ModeAtmosphere width={cardSize.w} height={cardSize.h}/>

        {/* Return button */}
        <motion.button onClick={()=>navigate("/entry")}
          whileHover={{scale:1.06,
            boxShadow:"0 0 28px rgba(55,200,45,0.22)",
            borderColor:"rgba(95,225,62,0.52)",
            color:"rgba(185,252,152,0.96)"}}
          whileTap={{scale:0.96}}
          style={{
            background:"rgba(7,36,7,0.65)",
            border:"0.5px solid rgba(72,182,50,0.28)",
            borderRadius:24,color:"rgba(125,210,86,0.52)",
            fontSize:"clamp(10px,1.8vw,11px)",cursor:"pointer",
            letterSpacing:"0.22em",fontFamily:"Georgia, serif",
            padding:"6px 18px",marginBottom:"clamp(1rem,2.5vw,1.5rem)",
            backdropFilter:"blur(12px)",
            transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",
            position:"relative",zIndex:2,
          }}>← Return</motion.button>

{/* ── Daily reflection prompt ── */}
<motion.div
  initial={{ opacity:0 }}
  animate={{ opacity:1 }}
  transition={{ delay:0.6, duration:1 }}
  style={{ position:"relative", zIndex:2, marginBottom:"1rem" }}
>
  {!reflectOpen ? (
    <motion.button
      onClick={() => setReflectOpen(true)}
      whileHover={{ scale:1.03, borderColor:"rgba(90,200,62,0.45)" }}
      style={{
        width:"100%",
        padding:"9px 16px",
        borderRadius:40,
        border:"0.5px solid rgba(68,175,50,0.22)",
        background:"rgba(5,24,6,0.55)",
        color:"rgba(128,212,92,0.52)",
        fontSize:"clamp(10px,1.8vw,11px)",
        cursor:"pointer",
        fontFamily:"Georgia, serif",
        fontStyle:"italic",
        letterSpacing:"0.14em",
        textAlign:"left",
        backdropFilter:"blur(10px)",
        transition:"all 0.35s",
        display:"flex",
        alignItems:"center",
        gap:10,
      }}
    >
      <span style={{ opacity:0.5, fontSize:14 }}>✦</span>
      {todayReflection
        ? "your reflection is saved for today"
        : "how are you feeling right now? write freely..."}
    </motion.button>
  ) : (
    <motion.div
      initial={{ opacity:0, y:8 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.5 }}
      style={{
        background:"rgba(4,18,5,0.75)",
        border:"0.5px solid rgba(68,175,50,0.22)",
        borderRadius:16,
        padding:"12px 14px",
        backdropFilter:"blur(14px)",
      }}
    >
      <div style={{
        fontSize:"clamp(9px,1.6vw,10px)",
        letterSpacing:"0.24em",
        color:"rgba(92,195,68,0.36)",
        fontFamily:"Georgia, serif",
        marginBottom:8,
      }}>TODAY'S REFLECTION</div>
      <textarea
        autoFocus
        value={reflectInput}
        onChange={e => setReflectInput(e.target.value)}
        placeholder="Write without judgment. This is only for you."
        rows={3}
        style={{
          width:"100%",
          background:"transparent",
          border:"none",
          outline:"none",
          color:"rgba(162,235,132,0.88)",
          fontFamily:"Georgia, serif",
          fontStyle:"italic",
          fontSize:"clamp(12px,2.2vw,13px)",
          lineHeight:1.8,
          resize:"none",
        }}
      />
      <div style={{ display:"flex", gap:8, marginTop:8 }}>
        <motion.button
          onClick={() => {
            setTodayReflection(reflectInput);
            setReflectOpen(false);
          }}
          whileHover={{ scale:1.04 }}
          style={{
            padding:"6px 18px",
            borderRadius:30,
            border:"0.5px solid rgba(90,210,62,0.42)",
            background:"rgba(10,58,10,0.68)",
            color:"rgba(175,248,142,0.9)",
            fontSize:11,
            cursor:"pointer",
            fontFamily:"Georgia, serif",
            fontStyle:"italic",
            letterSpacing:"0.1em",
          }}
        >save</motion.button>
        <button
          onClick={() => setReflectOpen(false)}
          style={{
            padding:"6px 14px",
            borderRadius:30,
            border:"none",
            background:"transparent",
            color:"rgba(95,185,62,0.35)",
            fontSize:11,
            cursor:"pointer",
            fontFamily:"Georgia, serif",
          }}
        >close</button>
      </div>
    </motion.div>
  )}
</motion.div>


        {/* Greeting */}
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}
          transition={{delay:0.3,duration:1}}
          style={{textAlign:"center",marginBottom:"1.4rem",position:"relative",zIndex:2}}>
          <div style={{
            fontSize:"clamp(12px,2.4vw,14px)",
            color:"rgba(145,225,115,0.7)",
            fontFamily:"Georgia, serif",fontStyle:"italic",lineHeight:1.9,marginBottom:7,
          }}>
            You are carrying{" "}
            <span style={{color:"rgba(135,238,102,0.92)"}}>
              {feelings.slice(0,3).join(", ")}
            </span>
          </div>
          {response&&(
  <div style={{
  fontSize:"clamp(10px,1.9vw,12px)",
  color:"rgba(92,196,70,0.44)",
  letterSpacing:"0.14em",
  fontFamily:"Georgia, serif",
  marginBottom:4,
}}>
  {principles[response.principle]}
</div>

          )}
        </motion.div>

        <motion.div initial={{scaleX:0}} animate={{scaleX:1}}
          transition={{delay:0.55,duration:1}}
          style={{height:"0.5px",background:"rgba(70,180,50,0.14)",
            marginBottom:"1.4rem",position:"relative",zIndex:2}}/>


          

<motion.button
          onClick={() => navigate("/feedback")}
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:0.8 }}
          whileHover={{ scale:1.04 }}
          style={{
            width:"100%", padding:"8px",
            borderRadius:40, marginBottom:"1rem",
            border:"0.5px solid rgba(68,175,50,0.2)",
            background:"rgba(4,18,5,0.55)",
            color:"rgba(95,185,70,0.5)",
            fontSize:"clamp(9px,1.6vw,10px)", cursor:"pointer",
            fontFamily:"Georgia, serif", fontStyle:"italic",
            letterSpacing:"0.18em", transition:"all 0.4s",
            position:"relative", zIndex:2,
          }}>
          ✦ voices from the forest
        </motion.button>


        <motion.button
          onClick={() => navigate("/resources")}
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:0.9 }}
          whileHover={{ scale:1.04 }}
          style={{
            width:"100%", padding:"8px",
            borderRadius:40, marginBottom:"1rem",
            border:"0.5px solid rgba(68,175,50,0.2)",
            background:"rgba(4,18,5,0.55)",
            color:"rgba(95,185,70,0.5)",
            fontSize:"clamp(9px,1.6vw,10px)", cursor:"pointer",
            fontFamily:"Georgia, serif", fontStyle:"italic",
            letterSpacing:"0.18em", transition:"all 0.4s",
            position:"relative", zIndex:2,
          }}>
          ✦ real support & resources
        </motion.button>


          {/* Community impact */}
        {stats && (
          <motion.div
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.7, duration:1 }}
            style={{
              position:"relative", zIndex:2,
              marginBottom:"1rem",
              padding:"12px 16px",
              borderRadius:14,
              border:"0.5px solid rgba(66,160,46,0.15)",
              background:"rgba(4,18,5,0.45)",
              display:"flex",
              justifyContent:"space-around",
              flexWrap:"wrap",
              gap:8,
            }}>
            {[
              { value: stats.breaths, label: "breaths taken" },
              { value: stats.releases, label: "things released" },
              { value: stats.conversations, label: "conversations" },
              { value: stats.users, label: "souls here" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{
                  fontSize:"clamp(16px,3vw,20px)",
                  color:"rgba(172,242,142,0.88)",
                  fontFamily:"Georgia, serif",
                  fontWeight:300,
                }}>{s.value || 0}</div>
                <div style={{
                  fontSize:"clamp(8px,1.4vw,9px)",
                  color:"rgba(85,175,62,0.38)",
                  fontFamily:"Georgia, serif",
                  fontStyle:"italic",
                  letterSpacing:"0.12em",
                }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}



        {/* Mode grid */}
        <div style={{
          display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
          gap:10,marginBottom:10,position:"relative",zIndex:2,
        }}>
          {MODES.map((m,i)=>{
            const isRec=m.id===suggested;
            return (
              <motion.div key={m.id}
                initial={{opacity:0,y:18}}
                animate={{opacity:1,y:0}}
                transition={{delay:0.5+i*0.1,duration:0.7}}
                onClick={()=>go(m)}
                whileHover={{y:-5,
                  boxShadow:isRec?"0 0 28px rgba(78,218,58,0.2)":"0 0 18px rgba(48,178,38,0.12)",
                  borderColor:isRec?"rgba(118,238,78,0.58)":"rgba(78,198,52,0.36)"}}
                style={{
                  padding:"clamp(0.9rem,2vw,1.1rem) clamp(0.5rem,1.5vw,0.8rem)",
                  borderRadius:16,
                  border:isRec?"0.5px solid rgba(118,232,78,0.5)":"0.5px solid rgba(66,160,46,0.22)",
                  background:isRec?"rgba(13,73,10,0.78)":"rgba(5,26,5,0.68)",
                  cursor:"pointer",textAlign:"center",
                  transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  position:"relative",backdropFilter:"blur(8px)",
                }}>
                {isRec&&(
                  <div style={{
                    position:"absolute",top:-9,left:"50%",transform:"translateX(-50%)",
                    fontSize:9,
                    background:"rgba(13,73,10,0.88)",
                    border:"0.5px solid rgba(98,225,66,0.4)",
                    borderRadius:20,padding:"2px 10px",
                    color:"rgba(180,252,145,0.92)",
                    letterSpacing:"0.14em",whiteSpace:"nowrap",
                  }}>for you</div>
                )}
                <div style={{
                  fontSize:"clamp(12px,2.2vw,13px)",
                  color:isRec?"rgba(185,252,148,0.96)":"rgba(148,222,112,0.82)",
                  fontWeight:500,fontFamily:"Georgia, serif",marginBottom:4,
                }}>{m.name}</div>
                <div style={{
                  fontSize:"clamp(9px,1.6vw,10px)",
                  color:"rgba(85,175,62,0.44)",
                  fontFamily:"Georgia, serif",fontStyle:"italic",lineHeight:1.5,
                }}>{m.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
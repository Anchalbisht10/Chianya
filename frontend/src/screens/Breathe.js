import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useChianya } from "../context/ChianyaContext";
import { avatarLines } from "../avatar/avatarLines";
import { logSession } from "../services/api";
const PHASES = [
  { label:"Inhale",  duration:4, scale:1.42, color:"rgba(40,200,220,0.55)"  },
  { label:"Hold",    duration:7, scale:1.42, color:"rgba(60,220,240,0.38)"  },
  { label:"Exhale",  duration:8, scale:1.0,  color:"rgba(20,160,185,0.45)"  },
];

// Teal spirit avatar — unique shape, different from monk
function TealBreathSpirit({ phase, done }) {
  const dur = PHASES[phase]?.duration || 4;
  const isEx = phase === 2;
  const isIn = phase === 0;

  return (
    <div style={{ position:"relative", display:"flex",
      justifyContent:"center", alignItems:"center",
      marginBottom:"1.2rem", height:180 }}>

      {/* Outer aura rings — teal */}
      {[160,130,100].map((size,i)=>(
        <motion.div key={i}
          animate={{
            scale: done?1: isEx ? 0.88-i*0.04 : 1.12+i*0.04,
            opacity: done?0.1: 0.15-i*0.04,
          }}
          transition={{ duration:dur, ease:"easeInOut" }}
          style={{
            position:"absolute",
            width:size, height:size, borderRadius:"50%",
            border:`0.5px solid rgba(40,220,240,${0.25-i*0.06})`,
            background:`radial-gradient(circle, rgba(20,180,210,${0.08-i*0.02}), transparent 70%)`,
          }}
        />
      ))}

      {/* Spirit SVG — different shape: teardrop/jellyfish style */}
      <motion.svg
        width="130" height="150" viewBox="0 0 120 140"
        animate={{
          scale: done?1: isEx ? 0.94 : isIn ? 1.06 : 1,
          y: done?0: isEx ? 3 : isIn ? -4 : -2,
        }}
        transition={{ duration:dur, ease:"easeInOut" }}
        style={{ overflow:"visible", position:"relative", zIndex:2 }}
      >
        {/* Halo — teal */}
        <motion.circle cx="60" cy="38" r="30"
          fill="none" stroke="rgba(40,220,240,0.3)" strokeWidth="1"
          animate={{ r:[30,33,30], opacity:[0.3,0.9,0.3] }}
          transition={{ duration:dur, repeat:Infinity, ease:"easeInOut" }}
        />
        {[...Array(8)].map((_,i)=>{
          const a=(i/8)*Math.PI*2;
          return <motion.circle key={i}
            cx={60+Math.cos(a)*30} cy={38+Math.sin(a)*30}
            r="1.2" fill="rgba(80,240,255,0.45)"
            animate={{opacity:[0.1,0.85,0.1]}}
            transition={{duration:2.5,repeat:Infinity,delay:i*0.2}}
          />;
        })}

        {/* Head — elongated teardrop */}
        <motion.path
          d="M 60 18 C 80 18 82 40 80 52 C 78 64 42 64 40 52 C 38 40 40 18 60 18 Z"
          fill="rgba(30,160,185,0.68)"
          stroke="rgba(60,220,245,0.45)" strokeWidth="0.8"
          animate={{
            d: isIn
              ? ["M 60 18 C 80 18 82 40 80 52 C 78 64 42 64 40 52 C 38 40 40 18 60 18 Z",
                 "M 60 16 C 82 16 84 40 82 53 C 80 66 40 66 38 53 C 36 40 38 16 60 16 Z",
                 "M 60 18 C 80 18 82 40 80 52 C 78 64 42 64 40 52 C 38 40 40 18 60 18 Z"]
              : ["M 60 18 C 80 18 82 40 80 52 C 78 64 42 64 40 52 C 38 40 40 18 60 18 Z",
                 "M 60 20 C 78 20 80 40 78 51 C 76 62 44 62 42 51 C 40 40 42 20 60 20 Z",
                 "M 60 18 C 80 18 82 40 80 52 C 78 64 42 64 40 52 C 38 40 40 18 60 18 Z"],
          }}
          transition={{ duration:dur, repeat:Infinity, ease:"easeInOut" }}
        />

        {/* Eyes — simple oval, teal glow */}
        <motion.g
          animate={{ scaleY:[1,0.07,1] }}
          transition={{ duration:6.5, repeat:Infinity, delay:2.5 }}
          style={{ transformOrigin:"50px 44px" }}
        >
          <ellipse cx="50" cy="44" rx="5.5" ry="4.5"
            fill="rgba(10,60,75,0.92)" />
          <ellipse cx="50" cy="44" rx="3.5" ry="3"
            fill="rgba(4,35,48,0.96)" />
          <circle cx="51.5" cy="42.5" r="1.2"
            fill="rgba(180,255,255,0.92)" />
        </motion.g>
        <motion.g
          animate={{ scaleY:[1,0.07,1] }}
          transition={{ duration:6.5, repeat:Infinity, delay:2.5 }}
          style={{ transformOrigin:"70px 44px" }}
        >
          <ellipse cx="70" cy="44" rx="5.5" ry="4.5"
            fill="rgba(10,60,75,0.92)" />
          <ellipse cx="70" cy="44" rx="3.5" ry="3"
            fill="rgba(4,35,48,0.96)" />
          <circle cx="71.5" cy="42.5" r="1.2"
            fill="rgba(180,255,255,0.92)" />
        </motion.g>

        {/* Brow lines — calm */}
        <path d="M 44 38 Q 50 35 56 37" fill="none"
          stroke="rgba(20,140,165,0.65)" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M 64 37 Q 70 35 76 38" fill="none"
          stroke="rgba(20,140,165,0.65)" strokeWidth="1.3" strokeLinecap="round"/>

        {/* Calm smile */}
        <path d="M 50 55 Q 60 61 70 55" fill="none"
          stroke="rgba(15,150,175,0.7)" strokeWidth="1.4" strokeLinecap="round"/>

        {/* Third eye — cyan */}
        <motion.circle cx="60" cy="30" r="2.2"
          fill="rgba(60,240,255,0.85)"
          animate={{ opacity:[0.35,1,0.35], r:[2.2,2.8,2.2] }}
          transition={{ duration:dur, repeat:Infinity }}
        />
        <circle cx="60" cy="30" r="1" fill="rgba(220,255,255,1)"/>

        {/* Body — flowing robe/cape */}
        <motion.path
          d="M 38 64 Q 28 90 30 125 Q 45 132 60 133 Q 75 132 90 125 Q 92 90 82 64 Q 72 72 60 74 Q 48 72 38 64 Z"
          fill="rgba(20,130,155,0.55)"
          stroke="rgba(40,200,225,0.3)" strokeWidth="0.8"
          animate={{
            d: isEx
              ? ["M 38 64 Q 28 90 30 125 Q 45 132 60 133 Q 75 132 90 125 Q 92 90 82 64 Q 72 72 60 74 Q 48 72 38 64 Z",
                 "M 40 64 Q 30 88 32 125 Q 46 131 60 132 Q 74 131 88 125 Q 90 88 80 64 Q 70 71 60 73 Q 50 71 40 64 Z",
                 "M 38 64 Q 28 90 30 125 Q 45 132 60 133 Q 75 132 90 125 Q 92 90 82 64 Q 72 72 60 74 Q 48 72 38 64 Z"]
              : ["M 38 64 Q 28 90 30 125 Q 45 132 60 133 Q 75 132 90 125 Q 92 90 82 64 Q 72 72 60 74 Q 48 72 38 64 Z",
                 "M 36 64 Q 26 92 28 125 Q 44 133 60 134 Q 76 133 92 125 Q 94 92 84 64 Q 74 73 60 75 Q 46 73 36 64 Z",
                 "M 38 64 Q 28 90 30 125 Q 45 132 60 133 Q 75 132 90 125 Q 92 90 82 64 Q 72 72 60 74 Q 48 72 38 64 Z"]
          }}
          transition={{ duration:dur, repeat:Infinity, ease:"easeInOut" }}
        />

        {/* Flowing cape sides */}
        <path d="M 38 65 Q 22 85 20 115" fill="none"
          stroke="rgba(30,170,195,0.25)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M 82 65 Q 98 85 100 115" fill="none"
          stroke="rgba(30,170,195,0.25)" strokeWidth="8" strokeLinecap="round"/>

        {/* Meditation hands — simple */}
        <motion.ellipse cx="60" cy="110" rx="18" ry="8"
          fill="rgba(25,145,170,0.48)" stroke="rgba(60,220,240,0.3)" strokeWidth="0.7"
          animate={{ ry: isIn?[8,9,8]:[8,7,8] }}
          transition={{ duration:dur, repeat:Infinity }}
        />

        {/* Breath particles — teal cyan */}
        {[44,52,60,68,76].map((x,i)=>(
          <motion.circle key={i} cx={x} cy={12} r={isIn?1.3:0.8}
            fill="rgba(60,240,255,0.82)"
            animate={{
              cy: isIn ? [12,-14,12] : [12,6,12],
              opacity: isIn ? [0,0.8,0] : [0,0.35,0],
            }}
            transition={{ duration:dur, repeat:Infinity, delay:i*0.36 }}
          />
        ))}

        {/* Lotus base */}
        <motion.ellipse cx="60" cy="133" rx="32" ry="5"
          fill="rgba(20,160,185,0.1)"
          animate={{ rx:[32,38,32], opacity:[0.3,0.7,0.3] }}
          transition={{ duration:dur, repeat:Infinity }}
        />
      </motion.svg>
    </div>
  );
}

export default function Breathe() {
  const navigate = useNavigate();
  const { setAvatarLine, setCurrentMode } = useChianya();
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(1);
  const [done, setDone] = useState(false);
  const TOTAL = 4;

  useEffect(() => {
    setAvatarLine(avatarLines.breathe);
    setCurrentMode("breathe");
    let p=0, c=1;
    const tick = () => setTimeout(() => {
      p = (p+1) % 3;
     if (p === 0) { c++; if (c > TOTAL) { setDone(true); logSession("breathing", [], { cycles: TOTAL }).catch(()=>{}); return; } setCycle(c); }
      setPhase(p); timer = tick();
    }, PHASES[p].duration * 1000);
    let timer = tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      transition={{duration:1.2}}
      style={{
        position:"absolute", inset:0, zIndex:10,
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"clamp(1rem,3vw,2rem)",
      }}>
      <div style={{
        background:"rgba(3,16,20,0.92)",
        border:"0.5px solid rgba(40,200,220,0.2)",
        borderRadius:"clamp(16px,3vw,24px)",
        padding:"clamp(2rem,5vw,3rem)",
        maxWidth:400, width:"100%",
        backdropFilter:"blur(28px)", textAlign:"center",
        boxShadow:"0 0 60px rgba(20,180,210,0.08)",
      }}>
        <motion.button onClick={()=>navigate("/modes")}
          whileHover={{scale:1.06,
            boxShadow:"0 0 24px rgba(30,200,225,0.2)",
            borderColor:"rgba(60,230,250,0.5)",
            color:"rgba(160,250,255,0.96)"}}
          style={{
            background:"rgba(5,40,52,0.65)",
            border:"0.5px solid rgba(35,185,210,0.28)",
            borderRadius:24,color:"rgba(55,200,225,0.5)",
            fontSize:11,cursor:"pointer",letterSpacing:"0.22em",
            fontFamily:"Georgia, serif",padding:"6px 18px",
            marginBottom:"1rem",
            backdropFilter:"blur(12px)",
            transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",display:"block",
          }}>← Return</motion.button>

        <div style={{
          fontSize:"clamp(9px,1.8vw,10px)",letterSpacing:"0.3em",
          color:"rgba(40,200,225,0.35)",fontFamily:"Georgia, serif",
          marginBottom:"1rem",
        }}>4 · 7 · 8 BREATHING</div>

        <TealBreathSpirit phase={phase} done={done}/>

        <motion.div key={phase}
          initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
          transition={{duration:0.5}}
          style={{
            fontSize:"clamp(18px,4vw,24px)",fontWeight:300,
            color:"rgba(140,240,255,0.92)",
            fontFamily:"Georgia, serif",fontStyle:"italic",
            letterSpacing:"0.08em",marginBottom:8,
          }}
        >
          {done?"Well done.":PHASES[phase].label}
        </motion.div>

        <div style={{
          fontSize:"clamp(11px,2vw,13px)",
          color:"rgba(40,190,215,0.42)",fontFamily:"Georgia, serif",
          marginBottom:"1.4rem",
        }}>
          {done?"Your breath has returned you.":`Cycle ${cycle} of ${TOTAL}`}
        </div>

        <div style={{height:2,background:"rgba(20,140,165,0.2)",
          borderRadius:2,marginBottom:"1.2rem"}}>
          <motion.div
            animate={{width:`${((cycle-1)/TOTAL)*100}%`}}
            style={{height:"100%",borderRadius:2,
              background:"rgba(40,210,235,0.52)"}}
          />
        </div>

        {done && (
          <motion.button initial={{opacity:0}} animate={{opacity:1}}
            onClick={()=>navigate("/modes")}
            whileHover={{scale:1.04}}
            style={{
              width:"100%",padding:"12px",borderRadius:40,
              border:"0.5px solid rgba(40,215,240,0.48)",
              background:"rgba(8,65,80,0.72)",
              color:"rgba(160,248,255,0.96)",
              fontSize:"clamp(12px,2.4vw,14px)",cursor:"pointer",
              fontFamily:"Georgia, serif",fontStyle:"italic",
              letterSpacing:"0.12em",
            }}>Return to the Forest</motion.button>
        )}
      </div>
    </motion.div>
  );
}
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useChianya } from "../context/ChianyaContext";
import { logSession } from "../services/api";
import { avatarLines } from "../avatar/avatarLines";


function SittingMonk() {
  return (
    <motion.svg
      width="180" height="160" viewBox="0 0 160 140"
      initial={{ opacity:0, scale:0.85 }}
      animate={{ opacity:1, scale:1 }}
      transition={{ duration:2, ease:"easeOut" }}
      style={{ overflow:"visible", display:"block", margin:"0 auto" }}
    >
      {/* Ambient rings */}
      {[50,70,90].map((r,i)=>(
        <motion.circle key={i} cx="80" cy="75" r={r}
          fill="none" stroke="rgba(80,200,60,0.06)"
          strokeWidth={10-i*2}
          animate={{ r:[r,r+5,r], opacity:[0.3,0.7,0.3] }}
          transition={{ duration:5+i, repeat:Infinity, ease:"easeInOut", delay:i*0.8 }}
        />
      ))}

      {/* Halo */}
      <motion.circle cx="80" cy="30" r="22"
        fill="none" stroke="rgba(100,225,78,0.22)" strokeWidth="1"
        animate={{ r:[22,24,22], opacity:[0.4,0.9,0.4] }}
        transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
      />

      {/* Head */}
      <motion.ellipse cx="80" cy="30" rx="16" ry="18"
        fill="rgba(112,175,80,0.72)" stroke="rgba(148,212,98,0.4)" strokeWidth="0.7"
        animate={{ ry:[18,18.8,18] }}
        transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
      />
      <ellipse cx="80" cy="14" rx="6.5" ry="4" fill="rgba(92,152,60,0.82)"/>

      {/* Eyes — gently closed */}
      <motion.path d="M 71 32 Q 76 29 81 32" fill="none"
        stroke="rgba(28,68,10,0.88)" strokeWidth="1.3" strokeLinecap="round"
        animate={{ d:[
          "M 71 32 Q 76 29 81 32",
          "M 71 32 Q 76 30 81 32",
          "M 71 32 Q 76 29 81 32",
        ]}}
        transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
      />
      <motion.path d="M 79 32 Q 84 29 89 32" fill="none"
        stroke="rgba(28,68,10,0.88)" strokeWidth="1.3" strokeLinecap="round"
        animate={{ d:[
          "M 79 32 Q 84 29 89 32",
          "M 79 32 Q 84 30 89 32",
          "M 79 32 Q 84 29 89 32",
        ]}}
        transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
      />

      {/* Subtle smile */}
      <path d="M 73 40 Q 80 44 87 40" fill="none"
        stroke="rgba(32,92,14,0.65)" strokeWidth="1.2" strokeLinecap="round"/>

      {/* Third eye */}
      <motion.circle cx="80" cy="22" r="1.6"
        fill="rgba(115,255,95,0.82)"
        animate={{ opacity:[0.3,1,0.3], r:[1.6,2,1.6] }}
        transition={{ duration:5, repeat:Infinity }}
      />

      {/* Ears */}
      <ellipse cx="63" cy="32" rx="3" ry="5.5"
        fill="rgba(102,162,70,0.65)" stroke="rgba(145,208,88,0.28)" strokeWidth="0.6"/>
      <ellipse cx="97" cy="32" rx="3" ry="5.5"
        fill="rgba(102,162,70,0.65)" stroke="rgba(145,208,88,0.28)" strokeWidth="0.6"/>

      {/* Neck */}
      <rect x="73" y="47" width="14" height="10" rx="5"
        fill="rgba(110,168,74,0.6)"/>

      {/* Seated robe — lotus position */}
      <motion.path
        d="M 20 90 Q 15 118 18 138 Q 50 145 80 146 Q 110 145 142 138 Q 145 118 140 90 Q 112 102 80 104 Q 48 102 20 90 Z"
        fill="rgba(14,84,14,0.7)" stroke="rgba(44,154,34,0.4)" strokeWidth="0.8"
        animate={{ d:[
          "M 20 90 Q 15 118 18 138 Q 50 145 80 146 Q 110 145 142 138 Q 145 118 140 90 Q 112 102 80 104 Q 48 102 20 90 Z",
          "M 20 90 Q 14 120 17 138 Q 50 146 80 147 Q 110 146 143 138 Q 146 120 140 90 Q 112 103 80 105 Q 48 103 20 90 Z",
          "M 20 90 Q 15 118 18 138 Q 50 145 80 146 Q 110 145 142 138 Q 145 118 140 90 Q 112 102 80 104 Q 48 102 20 90 Z",
        ]}}
        transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
      />
      <path d="M 36 57 Q 58 50 80 48 Q 102 50 124 57"
        fill="rgba(18,100,16,0.62)" stroke="rgba(48,164,38,0.4)" strokeWidth="0.8"/>

      {/* Lotus legs */}
      <ellipse cx="50" cy="125" rx="28" ry="12"
        fill="rgba(16,80,14,0.55)" stroke="rgba(42,152,32,0.3)" strokeWidth="0.7"/>
      <ellipse cx="110" cy="125" rx="28" ry="12"
        fill="rgba(16,80,14,0.55)" stroke="rgba(42,152,32,0.3)" strokeWidth="0.7"/>

      {/* Meditation hands — Dhyana mudra */}
      <ellipse cx="80" cy="115" rx="22" ry="10"
        fill="rgba(102,165,68,0.55)" stroke="rgba(145,218,95,0.32)" strokeWidth="0.7"/>
      <path d="M 60 112 Q 80 107 100 112" fill="none"
        stroke="rgba(152,225,105,0.48)" strokeWidth="1.3" strokeLinecap="round"/>

      {/* Slow rising particles — just a few */}
      {[60,70,80,90,100].map((x,i)=>(
        <motion.circle key={i} cx={x} cy={8} r={1}
          fill="rgba(130,250,100,0.7)"
          animate={{ cy:[8,-18,8], opacity:[0,0.7,0] }}
          transition={{
            duration:5+i*0.5, repeat:Infinity,
            delay:i*0.8, ease:"easeInOut"
          }}
        />
      ))}

      {/* Lotus base */}
      <motion.ellipse cx="80" cy="146" rx="48" ry="7"
        fill="rgba(32,175,32,0.09)"
        animate={{ rx:[48,55,48], opacity:[0.3,0.7,0.3] }}
        transition={{ duration:5, repeat:Infinity }}
      />
    </motion.svg>
  );
}

export default function JustSit() {
  const navigate = useNavigate();
  const { setAvatarLine, setCurrentMode } = useChianya();
useEffect(() => {
  setAvatarLine(avatarLines.sit);
  setCurrentMode("justSit");
  const timer = setTimeout(() => {
    logSession("justSit", [], { durationSeconds: 60 }).catch(()=>{});
  }, 60000);
  return () => clearTimeout(timer);
}, []);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      transition={{duration:2}}
      style={{
        position:"absolute",inset:0,zIndex:10,
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:"2rem",
      }}>
      <div style={{
        background:"rgba(3,14,5,0.9)",
        border:"0.5px solid rgba(62,170,46,0.18)",
        borderRadius:24,
        padding:"clamp(2rem,5vw,3.5rem)",
        maxWidth:400,width:"100%",
        backdropFilter:"blur(28px)",textAlign:"center",
      }}>
        <motion.button onClick={()=>navigate("/modes")}
          whileHover={{scale:1.06,boxShadow:"0 0 24px rgba(52,192,42,0.2)",
            borderColor:"rgba(92,222,62,0.5)",color:"rgba(182,250,148,0.95)"}}
          style={{
            background:"rgba(7,36,7,0.65)",
            border:"0.5px solid rgba(68,178,46,0.28)",
            borderRadius:24,color:"rgba(120,206,82,0.52)",
            fontSize:11,cursor:"pointer",letterSpacing:"0.22em",
            fontFamily:"Georgia, serif",padding:"6px 18px",marginBottom:"1.6rem",
            backdropFilter:"blur(12px)",
            transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",display:"block",
          }}>← Return</motion.button>

        <motion.div
          animate={{ y:[0,-8,0] }}
          transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }}
          style={{ marginBottom:"1.6rem" }}
        >
          <SittingMonk/>
        </motion.div>

        <div style={{
          fontSize:"clamp(15px,3.5vw,20px)",
          color:"rgba(168,240,140,0.84)",
          fontFamily:"Georgia, serif",fontStyle:"italic",
          lineHeight:2,marginBottom:"0.8rem",
        }}>
          Nothing to do.<br/>Nowhere to be.
        </div>
        <div style={{
          fontSize:"clamp(11px,2vw,13px)",
          color:"rgba(95,198,70,0.4)",
          fontFamily:"Georgia, serif",fontStyle:"italic",
        }}>
          Simply rest here, in the forest of consciousness.
        </div>

        <motion.button
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:10,duration:2}}
          onClick={()=>navigate("/modes")}
          style={{
            marginTop:"2rem",padding:"11px 32px",borderRadius:40,
            border:"0.5px solid rgba(98,220,68,0.35)",
            background:"rgba(10,60,10,0.62)",
            color:"rgba(180,250,146,0.86)",
            fontSize:13,cursor:"pointer",
            fontFamily:"Georgia, serif",fontStyle:"italic",
            letterSpacing:"0.12em",
          }}
        >Return to the Forest</motion.button>
      </div>
    </motion.div>
  );
}
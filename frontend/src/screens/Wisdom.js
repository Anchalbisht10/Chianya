import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useChianya } from "../context/ChianyaContext";
import ShareCard from "../components/ShareCard";
import { dailyInsights } from "../data/wisdom";
import { getWisdomToday } from "../services/api";
import { logSession } from "../services/api";

function CelestialSpirit({ pulsing=true }) {
  return (
    <motion.svg width="140" height="155" viewBox="0 0 140 155"
      style={{ overflow:"visible", display:"block", margin:"0 auto" }}>

      {/* Deep celestial aura — layered */}
      {[55,70,88,106].map((r,i)=>(
        <motion.circle key={i} cx="70" cy="65" r={r}
          fill="none"
          stroke={`rgba(${180+i*16},${215+i*10},255,${0.055-i*0.008})`}
          strokeWidth={12-i*2.5}
          animate={pulsing?{r:[r,r+6,r],opacity:[0.2,0.65,0.2]}:{}}
          transition={{duration:4.5+i,repeat:Infinity,ease:"easeInOut",delay:i*0.7}}
        />
      ))}

      {/* Silver halo with gems */}
      <motion.circle cx="70" cy="65" r="40"
        fill="none" stroke="rgba(215,235,255,0.32)" strokeWidth="1.2"
        strokeDasharray="4 6"
        animate={pulsing?{r:[40,43,40],opacity:[0.38,1,0.38],
          rotate:[0,360]}:{}}
        transition={{duration:18,repeat:Infinity,ease:"linear"}}
        style={{transformOrigin:"70px 65px"}}
      />
      {[...Array(12)].map((_,i)=>{
        const a=(i/12)*Math.PI*2;
        return (
          <motion.g key={i}>
            <motion.circle
              cx={70+Math.cos(a)*40} cy={65+Math.sin(a)*40}
              r="1.8" fill="rgba(210,235,255,0.65)"
              animate={pulsing?{opacity:[0.1,1,0.1],r:[1.8,2.4,1.8]}:{}}
              transition={{duration:2.4,repeat:Infinity,delay:i*0.18}}
            />
          </motion.g>
        );
      })}

      {/* Inner light circle */}
      <motion.circle cx="70" cy="65" r="28"
        fill="rgba(180,210,255,0.07)"
        stroke="rgba(200,228,255,0.18)" strokeWidth="0.6"
        animate={pulsing?{scale:[1,1.06,1],opacity:[0.6,1,0.6]}:{}}
        transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}
        style={{transformOrigin:"70px 65px"}}
      />

      {/* Head — wide oval, serene */}
      <motion.ellipse cx="70" cy="65" rx="24" ry="26"
        fill="rgba(190,215,248,0.65)"
        stroke="rgba(215,235,255,0.45)" strokeWidth="0.8"
        animate={pulsing?{ry:[26,27.5,26]}:{}}
        transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
      />

      {/* Crown — celestial rays */}
      {[...Array(7)].map((_,i)=>{
        const a=(-Math.PI/2)+((i-3)/6)*Math.PI*0.7;
        const len=12+Math.abs(i-3)*2;
        return (
          <motion.line key={i}
            x1={70+Math.cos(a)*24} y1={65+Math.sin(a)*26}
            x2={70+Math.cos(a)*(24+len)} y2={65+Math.sin(a)*(26+len)}
            stroke={`rgba(220,238,255,${0.35-Math.abs(i-3)*0.04})`}
            strokeWidth={1.5-Math.abs(i-3)*0.18} strokeLinecap="round"
            animate={pulsing?{opacity:[0.2,0.8,0.2]}:{}}
            transition={{duration:3,repeat:Infinity,delay:i*0.22}}
          />
        );
      })}

      {/* Ushnisha */}
      <ellipse cx="70" cy="40" rx="9" ry="6"
        fill="rgba(170,200,240,0.72)"/>
      <motion.circle cx="70" cy="35" r="3.5"
        fill="rgba(200,228,255,0.65)"
        animate={pulsing?{r:[3.5,4.2,3.5],opacity:[0.6,1,0.6]}:{}}
        transition={{duration:3.5,repeat:Infinity}}
      />

      {/* Eyes — half-open, wise */}
      <motion.g
        animate={pulsing?{scaleY:[1,0.08,1]}:{}}
        transition={{duration:7,repeat:Infinity,delay:2.8}}
        style={{transformOrigin:"57px 65px"}}>
        <ellipse cx="57" cy="65" rx="6.5" ry="5.2"
          fill="rgba(22,52,105,0.9)"/>
        <ellipse cx="57" cy="65" rx="4.2" ry="3.5"
          fill="rgba(8,25,65,0.96)"/>
        <circle cx="58.8" cy="63.2" r="1.3"
          fill="rgba(225,242,255,0.95)"/>
        <circle cx="57.2" cy="65.5" r="0.6"
          fill="rgba(100,180,255,0.6)"/>
      </motion.g>
      <motion.g
        animate={pulsing?{scaleY:[1,0.08,1]}:{}}
        transition={{duration:7,repeat:Infinity,delay:2.8}}
        style={{transformOrigin:"83px 65px"}}>
        <ellipse cx="83" cy="65" rx="6.5" ry="5.2"
          fill="rgba(22,52,105,0.9)"/>
        <ellipse cx="83" cy="65" rx="4.2" ry="3.5"
          fill="rgba(8,25,65,0.96)"/>
        <circle cx="84.8" cy="63.2" r="1.3"
          fill="rgba(225,242,255,0.95)"/>
        <circle cx="83.2" cy="65.5" r="0.6"
          fill="rgba(100,180,255,0.6)"/>
      </motion.g>

      {/* Brows */}
      <path d="M 49 57 Q 57 54.5 64 56" fill="none"
        stroke="rgba(80,130,195,0.62)" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M 76 56 Q 83 54.5 91 57" fill="none"
        stroke="rgba(80,130,195,0.62)" strokeWidth="1.3" strokeLinecap="round"/>

      {/* Lower eyelid */}
      <path d="M 50 69 Q 57 72 64 69" fill="none"
        stroke="rgba(120,168,228,0.28)" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M 76 69 Q 83 72 90 69" fill="none"
        stroke="rgba(120,168,228,0.28)" strokeWidth="0.8" strokeLinecap="round"/>

      {/* Nose */}
      <path d="M 70 70 Q 66 76 67 79 Q 70 80.5 73 79 Q 74 76 70 70"
        fill="rgba(155,192,235,0.28)" strokeWidth="0.5"/>

      {/* Serene smile — deep knowing */}
      <path d="M 59 79 Q 70 87 81 79" fill="none"
        stroke="rgba(100,155,215,0.7)" strokeWidth="1.6" strokeLinecap="round"/>
      <ellipse cx="58" cy="77" rx="6" ry="3.5"
        fill="rgba(140,190,245,0.14)" transform="rotate(-10,58,77)"/>
      <ellipse cx="82" cy="77" rx="6" ry="3.5"
        fill="rgba(140,190,245,0.14)" transform="rotate(10,82,77)"/>

      {/* Third eye — bright white star */}
      <motion.circle cx="70" cy="52" r="3"
        fill="rgba(240,248,255,0.95)"
        animate={pulsing?{opacity:[0.4,1,0.4],r:[3,3.8,3]}:{}}
        transition={{duration:3.5,repeat:Infinity}}
      />
      <circle cx="70" cy="52" r="1.3" fill="rgba(255,255,255,1)"/>
      {/* Star rays around third eye */}
      {[0,45,90,135,180,225,270,315].map((angle,i)=>(
        <motion.line key={i}
          x1={70+Math.cos(angle*Math.PI/180)*3.5}
          y1={52+Math.sin(angle*Math.PI/180)*3.5}
          x2={70+Math.cos(angle*Math.PI/180)*6.5}
          y2={52+Math.sin(angle*Math.PI/180)*6.5}
          stroke="rgba(220,240,255,0.5)" strokeWidth="0.8" strokeLinecap="round"
          animate={pulsing?{opacity:[0.1,0.7,0.1]}:{}}
          transition={{duration:2.5,repeat:Infinity,delay:i*0.18}}
        />
      ))}

      {/* Ears */}
      <ellipse cx="45" cy="67" rx="5.5" ry="9"
        fill="rgba(178,208,242,0.68)" stroke="rgba(210,232,255,0.32)" strokeWidth="0.7"/>
      <path d="M 45 60 Q 42 67 45 76" fill="none"
        stroke="rgba(145,190,235,0.28)" strokeWidth="0.9" strokeLinecap="round"/>
      <ellipse cx="95" cy="67" rx="5.5" ry="9"
        fill="rgba(178,208,242,0.68)" stroke="rgba(210,232,255,0.32)" strokeWidth="0.7"/>
      <path d="M 95 60 Q 98 67 95 76" fill="none"
        stroke="rgba(145,190,235,0.28)" strokeWidth="0.9" strokeLinecap="round"/>

      {/* Neck */}
      <rect x="62" y="89" width="16" height="14" rx="7"
        fill="rgba(175,205,240,0.62)"/>

      {/* Celestial robe — white/silver blue */}
      <motion.path
        d="M 18 108 Q 10 138 12 155 Q 42 162 70 163 Q 98 162 128 155 Q 130 138 122 108 Q 98 120 70 122 Q 42 120 18 108 Z"
        fill="rgba(155,190,235,0.52)"
        stroke="rgba(195,222,255,0.3)" strokeWidth="0.9"
        animate={pulsing?{d:[
          "M 18 108 Q 10 138 12 155 Q 42 162 70 163 Q 98 162 128 155 Q 130 138 122 108 Q 98 120 70 122 Q 42 120 18 108 Z",
          "M 18 108 Q 9 140 11 155 Q 42 163 70 164 Q 98 163 129 155 Q 131 140 122 108 Q 98 121 70 123 Q 42 121 18 108 Z",
          "M 18 108 Q 10 138 12 155 Q 42 162 70 163 Q 98 162 128 155 Q 130 138 122 108 Q 98 120 70 122 Q 42 120 18 108 Z",
        ]}:{}}
        transition={{duration:5.5,repeat:Infinity,ease:"easeInOut"}}
      />

      {/* Inner robe — lighter silver */}
      <path d="M 44 94 Q 40 130 42 155 Q 56 161 70 162 Q 84 161 98 155 Q 100 130 96 94 Q 84 104 70 106 Q 56 104 44 94 Z"
        fill="rgba(192,215,248,0.35)"
        stroke="rgba(220,238,255,0.22)" strokeWidth="0.8"/>

      {/* Shoulders */}
      <path d="M 18 108 Q 42 93 70 90 Q 98 93 122 108"
        fill="rgba(170,202,242,0.58)"
        stroke="rgba(205,228,255,0.38)" strokeWidth="0.9"/>

      {/* Robe folds */}
      {[36,54,70,86,104].map((x,i)=>(
        <path key={i}
          d={`M ${x} ${112+i%2*7} Q ${x+(i%2?4:-4)} 134 ${x+(i%2?2.5:-2.5)} 155`}
          fill="none"
          stroke={i%2===0?"rgba(128,168,225,0.16)":"rgba(168,202,242,0.12)"}
          strokeWidth={i%2===0?"1.1":"0.8"} strokeLinecap="round"/>
      ))}

      {/* Arms */}
      <path d="M 24 103 Q 14 130 22 150 Q 36 158 52 155"
        fill="none" stroke="rgba(148,188,235,0.58)" strokeWidth="12" strokeLinecap="round"/>
      <path d="M 116 103 Q 126 130 118 150 Q 104 158 88 155"
        fill="none" stroke="rgba(148,188,235,0.58)" strokeWidth="12" strokeLinecap="round"/>

      {/* Jnana mudra hands */}
      <motion.g animate={pulsing?{y:[0,-3,0]}:{}}
        transition={{duration:5.2,repeat:Infinity,ease:"easeInOut"}}>
        <ellipse cx="48" cy="150" rx="18" ry="10"
          fill="rgba(172,205,242,0.58)" stroke="rgba(210,232,255,0.34)" strokeWidth="0.8"
          transform="rotate(-16,48,150)"/>
        <ellipse cx="92" cy="150" rx="18" ry="10"
          fill="rgba(172,205,242,0.58)" stroke="rgba(210,232,255,0.34)" strokeWidth="0.8"
          transform="rotate(16,92,150)"/>
        <ellipse cx="70" cy="143" rx="10" ry="13"
          fill="rgba(172,205,242,0.48)" stroke="rgba(210,232,255,0.28)" strokeWidth="0.6"/>
        <path d="M 44 138 Q 70 130 96 138" fill="none"
          stroke="rgba(218,236,255,0.52)" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Crystal mala */}
        {[...Array(11)].map((_,i)=>{
          const a=(i/11)*Math.PI+0.06;
          return <motion.circle key={i}
            cx={70+Math.cos(a)*30} cy={154+Math.sin(a)*12}
            r="2.2" fill="rgba(155,200,245,0.82)"
            stroke="rgba(215,238,255,0.55)" strokeWidth="0.5"
            animate={pulsing?{opacity:[0.42,1,0.42]}:{}}
            transition={{duration:2.4,repeat:Infinity,delay:i*0.16}}
          />;
        })}
      </motion.g>

      {/* White/blue rising particles */}
      {[50,60,70,80,90].map((x,i)=>(
        <motion.circle key={i} cx={x} cy={16} r={1.4}
          fill="rgba(220,240,255,0.88)"
          animate={pulsing?{cy:[16,-20,16],opacity:[0,0.88,0]}:{}}
          transition={{duration:3.2+i*0.4,repeat:Infinity,delay:i*0.6}}
        />
      ))}

      {/* Lotus base — white/silver */}
      <motion.ellipse cx="70" cy="163" rx="58" ry="9"
        fill="rgba(180,215,255,0.1)"
        animate={pulsing?{rx:[58,66,58],opacity:[0.28,0.72,0.28]}:{}}
        transition={{duration:4.5,repeat:Infinity,ease:"easeInOut"}}
      />
      {[...Array(9)].map((_,i)=>{
        const a=(i/9)*Math.PI*2;
        return <motion.ellipse key={i}
          cx={70+Math.cos(a)*25} cy={163+Math.sin(a)*6}
          rx="11" ry="4.5"
          fill="rgba(175,212,248,0.15)"
          stroke="rgba(210,232,255,0.22)" strokeWidth="0.5"
          transform={`rotate(${(i/9)*360},${70+Math.cos(a)*25},${163+Math.sin(a)*6})`}
          animate={pulsing?{opacity:[0.22,0.72,0.22]}:{}}
          transition={{duration:3.5,repeat:Infinity,delay:i*0.18}}
        />;
      })}

      {/* Wisdom label */}
      <text x="70" y="130" textAnchor="middle"
        fontSize="6.5" fill="rgba(180,215,255,0.35)"
        fontFamily="Georgia, serif" fontStyle="italic">
        wisdom
      </text>
    </motion.svg>
  );
}

export default function Wisdom() {
  const navigate = useNavigate();
const { setAvatarLine, feelings, setCurrentMode, avatarLine } = useChianya();
const [showCard, setShowCard] = useState(false);
const [focusMode, setFocusMode] = useState(false);
const [today, setToday] = useState(dailyInsights[new Date().getDay() % dailyInsights.length]);

useEffect(() => {
  getWisdomToday(feelings || []).then(data => {
    if (data?.wisdom) {
logSession("wisdom", feelings || [], {}).catch(()=>{});
setTimeout(() => setShowCard(true), 3000);
      setToday({
        teaching: data.wisdom.teachingText,
        explanation: data.wisdom.reflection,
        principle: data.wisdom.tag,
        practice: data.wisdom.reflection,
      });
    }
  }).catch(() => {});
}, []);

useEffect(() => {
  setAvatarLine("A small truth for today's journey through the forest.");
  setCurrentMode("wisdom");
}, []);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      transition={{duration:1.2}}
      style={{
       position:"absolute", inset:0, zIndex:10,
        display:"flex", alignItems:"flex-start", justifyContent:"center",
        padding:"clamp(1rem,3vw,2rem)",
        paddingTop: "4.5rem",
        paddingBottom: "2rem",
        overflowY:"auto",
      }}>

      {/* Main wisdom card */}
      <AnimatePresence>
        {!focusMode && (
          <motion.div key="wisdom-main"
            initial={{opacity:0,y:24,scale:0.96}}
            animate={{opacity:1,y:0,scale:1}}
            exit={{opacity:0,scale:0.9,filter:"blur(8px)"}}
            transition={{duration:1,ease:[0.16,1,0.3,1]}}
            style={{
              background:"rgba(3,14,5,0.91)",
              border:"0.5px solid rgba(68,178,50,0.18)",
              borderRadius:"clamp(16px,3vw,24px)",
              padding:"clamp(1.8rem,4vw,2.8rem)",
              maxWidth:460,width:"100%",
              maxHeight:"78vh", overflowY:"auto",
              backdropFilter:"blur(28px)",
              boxShadow:"0 0 80px rgba(18,140,18,0.1)",
            }}>
            <motion.button onClick={()=>navigate("/modes")}
              whileHover={{scale:1.06,boxShadow:"0 0 24px rgba(52,192,42,0.2)",
                borderColor:"rgba(92,222,62,0.5)",color:"rgba(182,250,148,0.95)"}}
              style={{
                background:"rgba(7,36,7,0.65)",
                border:"0.5px solid rgba(68,178,46,0.28)",
                borderRadius:24,color:"rgba(120,206,82,0.52)",
                fontSize:11,cursor:"pointer",letterSpacing:"0.22em",
                fontFamily:"Georgia, serif",padding:"6px 18px",marginBottom:"1.5rem",
                backdropFilter:"blur(12px)",
                transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",display:"block",
              }}>← Return</motion.button>

            <div style={{textAlign:"center",marginBottom:"1rem"}}>
              <CelestialSpirit pulsing={true}/>
            </div>

            <div style={{
              fontSize:"clamp(9px,1.8vw,10px)",letterSpacing:"0.32em",
              color:"rgba(92,196,70,0.36)",fontFamily:"Georgia, serif",
              textAlign:"center",marginBottom:"1rem",
            }}>TODAY'S TEACHING</div>

            <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}
              transition={{delay:0.3,duration:1}}
              style={{
                fontSize:"clamp(17px,4vw,22px)",
                color:"rgba(172,245,145,0.94)",
                fontFamily:"Georgia, serif",fontStyle:"italic",
                lineHeight:1.65,textAlign:"center",marginBottom:"1.4rem",
              }}>
              "{today.teaching}"
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}}
              transition={{delay:0.7,duration:1}}
              style={{
                fontSize:"clamp(12px,2.3vw,13px)",
                color:"rgba(142,222,112,0.68)",fontFamily:"Georgia, serif",
                fontStyle:"italic",lineHeight:1.95,textAlign:"center",marginBottom:"1.5rem",
              }}>
              {today.explanation}
            </motion.div>

            <div style={{display:"flex",justifyContent:"center",marginBottom:"1.5rem"}}>
              <span style={{
                fontSize:"clamp(9px,1.7vw,10px)",letterSpacing:"0.22em",
                color:"rgba(92,196,70,0.58)",
                background:"rgba(12,58,10,0.5)",
                border:"0.5px solid rgba(85,192,58,0.25)",
                borderRadius:20,padding:"4px 18px",fontFamily:"Georgia, serif",
              }}>{today.principle}</span>
            </div>

            <motion.div initial={{scaleX:0}} animate={{scaleX:1}}
              transition={{delay:1,duration:0.9}}
              style={{height:"0.5px",background:"rgba(68,180,50,0.13)",marginBottom:"1.4rem"}}/>

            <motion.button onClick={()=>setFocusMode(true)}
              whileHover={{scale:1.04,boxShadow:"0 0 40px rgba(48,200,36,0.2)"}}
              whileTap={{scale:0.97}}
              style={{
                width:"100%",padding:"clamp(12px,2.6vw,15px)",borderRadius:40,
                border:"0.5px solid rgba(100,220,68,0.5)",
                background:"rgba(11,62,10,0.72)",
                color:"rgba(182,250,148,0.96)",
                fontSize:"clamp(12px,2.4vw,14px)",cursor:"pointer",
                fontFamily:"Georgia, serif",fontStyle:"italic",
                letterSpacing:"0.12em",
                transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}>Today's Practice →</motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focus mode */}
      <AnimatePresence>
        {focusMode && (
          <motion.div key="wisdom-focus"
            initial={{opacity:0,scale:1.08,filter:"blur(12px)"}}
            animate={{opacity:1,scale:1,filter:"blur(0px)"}}
            exit={{opacity:0,scale:0.94,filter:"blur(8px)"}}
            transition={{duration:1.1,ease:[0.16,1,0.3,1]}}
            style={{
              position:"fixed",inset:0,zIndex:20,
              display:"flex",alignItems:"center",justifyContent:"center",
              padding:"2rem",
              background:"rgba(2,8,3,0.94)",
              backdropFilter:"blur(32px)",
            }}>
            <motion.div
              animate={{ scale:[1,1.06,1], opacity:[0.2,0.5,0.2] }}
              transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }}
              style={{
                position:"absolute",
                width:"clamp(260px,58vw,460px)",
                height:"clamp(260px,58vw,460px)",
                borderRadius:"50%",
                background:"radial-gradient(circle, rgba(35,175,35,0.1) 0%, transparent 70%)",
                pointerEvents:"none",
              }}
            />

            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{delay:0.4,duration:1}}
              style={{maxWidth:400,width:"100%",textAlign:"center",position:"relative",zIndex:2}}>

              <div style={{marginBottom:"1.4rem"}}>
                <CelestialSpirit pulsing={true}/>
              </div>

              <div style={{
                fontSize:"clamp(9px,1.8vw,10px)",letterSpacing:"0.35em",
                color:"rgba(88,193,66,0.35)",fontFamily:"Georgia, serif",
                marginBottom:"clamp(1.2rem,3vw,1.8rem)",
              }}>TODAY'S PRACTICE</div>

              <div style={{
                fontSize:"clamp(14px,3.2vw,18px)",
                color:"rgba(172,248,145,0.9)",fontFamily:"Georgia, serif",
                fontStyle:"italic",lineHeight:2,
                marginBottom:"clamp(1.5rem,4vw,2.5rem)",
              }}>
             {today.explanation}
              <div style={{
                marginTop:"1.8rem",
                padding:"1.2rem 1.4rem",
                borderRadius:14,
                border:"0.5px solid rgba(78,202,58,0.28)",
                background:"rgba(6,30,6,0.65)",
                textAlign:"left",
              }}>
                <div style={{
                  fontSize:"clamp(8px,1.4vw,9px)",
                  letterSpacing:"0.24em",
                  color:"rgba(92,195,68,0.4)",
                  fontFamily:"Georgia, serif",
                  marginBottom:10,
                }}>YOUR PRACTICE</div>
                <div style={{
                  fontSize:"clamp(12px,2.2vw,13px)",
                  color:"rgba(162,238,132,0.88)",
                  fontFamily:"Georgia, serif",
                  fontStyle:"italic",
                  lineHeight:2,
                }}>
                  {today.tag === "awareness" && "Close your eyes. Notice one thought without following it. Watch it like a cloud passing. Do this for 2 minutes."}
                  {today.tag === "acceptance" && "Place one hand on your chest. Say silently: 'I allow this feeling to be here.' Repeat three times, slowly."}
                  {today.tag === "presence" && "Feel both feet on the ground. Take three slow breaths. Name five things you can see right now."}
                  {today.tag === "stillness" && "Set a timer for 3 minutes. Do nothing. No phone, no movement. Just breathe and let the silence be enough."}
                  {today.tag === "self-compassion" && "Think of something you criticized yourself for recently. Now say it to yourself as you would say it to a dear friend. Notice the difference."}
                  {today.tag === "impermanence" && "Think of one hard thing you have already survived. Sit with the fact that you are still here. That took strength."}
                  {today.tag === "detachment" && "Think of one outcome you are clinging to. Silently say: 'I care, and I release my grip.' Take one deep breath after."}
                  {!["awareness","acceptance","presence","stillness","self-compassion","impermanence","detachment"].includes(today.tag) && "Sit quietly for 3 minutes. Let today's teaching settle without trying to understand it. Understanding comes later."}
                </div>
              </div>
              </div>

              <motion.button onClick={()=>setFocusMode(false)}
                whileHover={{scale:1.06,boxShadow:"0 0 35px rgba(52,193,42,0.22)"}}
                whileTap={{scale:0.97}}
                style={{
                  padding:"clamp(11px,2.5vw,14px) clamp(32px,6vw,52px)",
                  borderRadius:40,
                  border:"0.5px solid rgba(96,218,66,0.45)",
                  background:"rgba(10,55,10,0.72)",
                  color:"rgba(178,248,148,0.94)",
                  fontSize:"clamp(12px,2.4vw,13px)",cursor:"pointer",
                  fontFamily:"Georgia, serif",fontStyle:"italic",
                  letterSpacing:"0.14em",backdropFilter:"blur(16px)",
                  transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}>Close Practice</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {showCard && (
  <ShareCard
    feeling={feelings[0] || "anxious"}
    antarLine={avatarLine}
    mode="justSit"
    onClose={() => setShowCard(false)}
  />
)}
    </motion.div>
  );
}

// ── Chianya Purpose Layer ─────────────────────────────────────
// Conceptual mapping of existing interactions to wellbeing meaning

export const chianyaMission = {
  tagline: "An immersive AI emotional reflection space for young minds.",
  purpose: "Chianya helps young people pause, reflect, and reconnect with their inner clarity — through immersive experience, not instruction.",
  positioning: [
    "Youth emotional awareness and reflection",
    "AI-assisted mindfulness and introspection",
    "Digital wellbeing exploration environment",
    "Mental clarity through immersive presence",
  ],
  alignment: [
    "WHO Mental Health Action Plan — youth focus",
    "UNESCO Global Education Framework — social-emotional learning",
    "UN SDG 3 — Good Health and Wellbeing",
    "UN SDG 4 — Quality Education (SEL dimension)",
  ],
};

export const interactionMeanings = {
  forestImmersion: {
    interaction: "3D forest environment",
    meaning: "Emotional calming environment — mirrors nature-based therapy principles",
    wellbeingDimension: "Nervous system regulation through ambient immersion",
  },
  buddhaPresence: {
    interaction: "Buddha/guide avatar presence",
    meaning: "Attention anchor — a stable non-judgmental presence for reflection",
    wellbeingDimension: "Mindfulness anchor and attentional grounding",
  },
  starInteractions: {
    interaction: "Star and particle interactions",
    meaning: "Reflection triggers — each star is a thought anchor or emotional prompt",
    wellbeingDimension: "Gentle cognitive activation without pressure",
  },
  cinematicTransitions: {
    interaction: "Screen transitions and mode changes",
    meaning: "Emotional state transitions — moving between internal states intentionally",
    wellbeingDimension: "Metacognitive awareness of shifting internal experience",
  },
  breatheMode: {
    interaction: "4-7-8 breathing with avatar",
    meaning: "Physiological self-regulation practice",
    wellbeingDimension: "Vagal tone activation — evidence-based stress reduction",
  },
  releaseMode: {
    interaction: "Write and dissolve interaction",
    meaning: "Expressive writing — a validated emotional processing technique",
    wellbeingDimension: "Cognitive defusion and emotional release",
  },
  groundMode: {
    interaction: "5-4-3-2-1 sensory grounding",
    meaning: "Sensory anchoring — clinical grounding protocol for anxiety",
    wellbeingDimension: "Present-moment awareness and anxiety interruption",
  },
  companionMode: {
    interaction: "Antar AI conversation",
    meaning: "Non-judgmental reflection partner — not therapy, but thoughtful mirroring",
    wellbeingDimension: "Self-expression, emotional labeling, reflective thinking",
  },
  wisdomMode: {
    interaction: "Daily teaching and practice",
    meaning: "Psychoeducation through contemplative wisdom",
    wellbeingDimension: "Cognitive reframing and perspective expansion",
  },
  justSitMode: {
    interaction: "Stillness mode",
    meaning: "Unstructured mindful presence — permission to simply be",
    wellbeingDimension: "Default mode network rest — reduces rumination",
  },
};

export const youthWellbeingFramework = {
  targetUsers: "Young people aged 14–28 navigating stress, anxiety, identity, and emotional complexity",
  coreNeed: "A non-clinical, non-prescriptive space for emotional reflection that feels safe, modern, and meaningful",
  differentiator: "Chianya does not diagnose, advise, or instruct. It creates conditions for the user to find their own clarity.",
  evidenceBase: [
    "Nature immersion reduces cortisol (Kaplan, 1995 — Attention Restoration Theory)",
    "Expressive writing improves emotional processing (Pennebaker, 1997)",
    "Mindfulness-based interventions effective for youth anxiety (Zoogman et al., 2015)",
    "Breathing regulation activates parasympathetic nervous system (Jerath et al., 2006)",
    "5-4-3-2-1 grounding used in CBT for anxiety interruption",
    "AI-assisted reflection shows promise for non-clinical mental health support (WHO, 2022)",
  ],
  notTherapy: "Chianya is a wellbeing exploration tool, not a clinical mental health intervention. It does not replace professional support.",
};
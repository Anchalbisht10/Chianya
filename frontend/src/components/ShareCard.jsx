import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

const feelingColors = {
  anxious:     { border: "rgba(255,180,60,0.6)",  bg: "rgba(255,180,60,0.08)",  text: "rgba(255,200,100,0.9)" },
  heavy:       { border: "rgba(100,140,255,0.6)",  bg: "rgba(100,140,255,0.08)", text: "rgba(140,180,255,0.9)" },
  lonely:      { border: "rgba(180,120,255,0.6)",  bg: "rgba(180,120,255,0.08)", text: "rgba(200,160,255,0.9)" },
  overwhelmed: { border: "rgba(255,100,100,0.6)",  bg: "rgba(255,100,100,0.08)", text: "rgba(255,140,140,0.9)" },
  restless:    { border: "rgba(255,200,60,0.6)",   bg: "rgba(255,200,60,0.08)",  text: "rgba(255,220,100,0.9)" },
  tired:       { border: "rgba(140,180,200,0.6)",  bg: "rgba(140,180,200,0.08)", text: "rgba(170,210,230,0.9)" },
  lost:        { border: "rgba(120,160,255,0.6)",  bg: "rgba(120,160,255,0.08)", text: "rgba(160,200,255,0.9)" },
  scattered:   { border: "rgba(255,160,80,0.6)",   bg: "rgba(255,160,80,0.08)",  text: "rgba(255,190,120,0.9)" },
  numb:        { border: "rgba(160,160,180,0.6)",  bg: "rgba(160,160,180,0.08)", text: "rgba(190,190,210,0.9)" },
  stuck:       { border: "rgba(180,140,100,0.6)",  bg: "rgba(180,140,100,0.08)", text: "rgba(210,180,140,0.9)" },
  hurt:        { border: "rgba(255,120,120,0.6)",  bg: "rgba(255,120,120,0.08)", text: "rgba(255,160,160,0.9)" },
  hollow:      { border: "rgba(140,140,160,0.6)",  bg: "rgba(140,140,160,0.08)", text: "rgba(180,180,200,0.9)" },
};

function MonkSmall() {
  return (
    <svg width="90" height="110" viewBox="0 0 220 260"
      style={{ overflow:"visible", filter:"drop-shadow(0 0 18px rgba(80,220,80,0.22))" }}>
      <ellipse cx="110" cy="110" rx="90" ry="95" fill="none" stroke="rgba(80,220,80,0.07)" strokeWidth="28"/>
      <ellipse cx="110" cy="110" rx="76" ry="80" fill="none" stroke="rgba(60,190,60,0.1)" strokeWidth="14"/>
      <circle cx="110" cy="58" r="42" fill="none" stroke="rgba(120,255,120,0.22)" strokeWidth="1.5"/>
      <ellipse cx="110" cy="58" rx="28" ry="30" fill="rgba(118,178,84,0.72)" stroke="rgba(152,215,102,0.42)" strokeWidth="0.8"/>
      <ellipse cx="110" cy="30" rx="10" ry="7" fill="rgba(98,158,64,0.84)"/>
      <ellipse cx="95" cy="57" rx="6.5" ry="5" fill="rgba(18,48,8,0.92)"/>
      <ellipse cx="95" cy="57" rx="4.5" ry="3.5" fill="rgba(8,28,4,0.96)"/>
      <circle cx="97" cy="55" r="1.4" fill="rgba(220,255,220,0.92)"/>
      <ellipse cx="125" cy="57" rx="6.5" ry="5" fill="rgba(18,48,8,0.92)"/>
      <ellipse cx="125" cy="57" rx="4.5" ry="3.5" fill="rgba(8,28,4,0.96)"/>
      <circle cx="127" cy="55" r="1.4" fill="rgba(220,255,220,0.92)"/>
      <path d="M 86 49 Q 95 46 103 48" fill="none" stroke="rgba(38,80,14,0.78)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 117 48 Q 125 46 134 49" fill="none" stroke="rgba(38,80,14,0.78)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 99 76 Q 110 82 121 76" fill="none" stroke="rgba(38,100,18,0.78)" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="110" cy="45" r="2.5" fill="rgba(125,255,100,0.82)"/>
      <rect x="100" y="86" width="20" height="16" rx="8" fill="rgba(114,172,78,0.62)"/>
      <path d="M 30 120 Q 20 165 22 235 Q 60 248 110 250 Q 160 248 198 235 Q 200 165 190 120 Q 155 138 110 140 Q 65 138 30 120 Z" fill="rgba(18,92,18,0.72)" stroke="rgba(48,162,38,0.42)" strokeWidth="1"/>
      <path d="M 30 120 Q 55 105 110 102 Q 165 105 190 120" fill="rgba(23,108,20,0.66)" stroke="rgba(53,172,43,0.42)" strokeWidth="1"/>
      <ellipse cx="92" cy="188" rx="20" ry="11" fill="rgba(108,170,72,0.6)" stroke="rgba(152,222,102,0.36)" strokeWidth="0.8" transform="rotate(-18,92,188)"/>
      <ellipse cx="128" cy="188" rx="20" ry="11" fill="rgba(108,170,72,0.6)" stroke="rgba(152,222,102,0.36)" strokeWidth="0.8" transform="rotate(18,128,188)"/>
      <ellipse cx="110" cy="182" rx="8" ry="12" fill="rgba(108,170,72,0.5)"/>
      <ellipse cx="110" cy="252" rx="60" ry="10" fill="rgba(38,185,38,0.08)"/>
    </svg>
  );
}

export default function ShareCard({ feeling, antarLine, mode, onClose }) {
  const cardRef = useRef();
  const colors = feelingColors[feeling] || feelingColors.anxious;

  const modeLabels = {
    breathing: "breathed",
    ground:    "grounded",
    release:   "released",
    justSit:   "sat in stillness",
    wisdom:    "received wisdom",
    antar:     "spoke with antar",
  };

  const download = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#030e05",
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = "chianya-moment.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const share = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#030e05",
        scale: 2,
        useCORS: true,
      });
      canvas.toBlob(async (blob) => {
        if (navigator.share && navigator.canShare) {
          const file = new File([blob], "chianya-moment.png", { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: "Chianya — Forest of Consciousness" });
            return;
          }
        }
        // Fallback — copy link
        await navigator.clipboard.writeText("https://chianya.vercel.app");
        alert("Link copied! Share it with someone who needs the forest.");
      });
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(1,8,2,0.85)",
        backdropFilter: "blur(12px)",
        padding: "clamp(1rem,3vw,2rem)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
        onClick={e => e.stopPropagation()}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
      >
        {/* Card */}
        <div
          ref={cardRef}
          style={{
            background: "#030e05",
            borderRadius: 20,
            padding: "1.6rem 1.6rem 1.2rem",
            width: "clamp(300px,85vw,400px)",
            border: "0.5px solid rgba(70,180,50,0.3)",
            fontFamily: "Georgia, serif",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            gap: "1.2rem",
            alignItems: "flex-start",
          }}>

          {/* Bottom glow */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
            background: "radial-gradient(ellipse at 50% 100%, rgba(20,100,20,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Monk */}
          <div style={{ flexShrink: 0 }}>
            <MonkSmall />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
            <div style={{
              fontSize: 9, letterSpacing: "0.28em",
              color: "rgba(92,195,68,0.35)", marginBottom: 10,
            }}>CHIANYA · FOREST OF CONSCIOUSNESS</div>

            <div style={{
              fontSize: 13, fontWeight: 300,
              color: "rgba(145,222,115,0.55)",
              fontStyle: "italic", marginBottom: 6,
            }}>today i carried</div>

            <div style={{
              display: "inline-block",
              padding: "5px 18px", borderRadius: 40,
              border: `0.5px solid ${colors.border}`,
              background: colors.bg,
              color: colors.text,
              fontSize: 16, fontStyle: "italic",
              letterSpacing: "0.08em", marginBottom: 14,
            }}>{feeling}</div>

            <div style={{
              background: "rgba(255,255,255,0.04)",
              borderLeft: "2px solid rgba(78,202,58,0.35)",
              padding: "10px 12px", marginBottom: 14,
              borderRadius: "0 8px 8px 0",
            }}>
              <div style={{
                fontSize: 8, letterSpacing: "0.22em",
                color: "rgba(92,195,68,0.32)", marginBottom: 5,
              }}>ANTAR SPOKE</div>
              <div style={{
                fontSize: 11,
                color: "rgba(162,238,132,0.75)",
                fontStyle: "italic", lineHeight: 1.85,
              }}>
                {antarLine || "The forest holds what you carry. You don't have to hold it alone."}
              </div>
            </div>

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{
                fontSize: 9, letterSpacing: "0.14em",
                color: "rgba(85,175,62,0.35)", fontStyle: "italic",
              }}>{modeLabels[mode] || "visited the forest"}</div>
              <div style={{
                fontSize: 8, color: "rgba(70,150,50,0.25)",
                fontStyle: "italic", letterSpacing: "0.1em",
              }}>chianya.vercel.app</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <motion.button
            onClick={download}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: "10px 24px", borderRadius: 40,
              border: "0.5px solid rgba(98,222,68,0.45)",
              background: "rgba(11,62,10,0.72)",
              color: "rgba(182,250,148,0.96)",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: 13, cursor: "pointer", letterSpacing: "0.12em",
            }}>↓ Download</motion.button>

          <motion.button
            onClick={share}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: "10px 24px", borderRadius: 40,
              border: "0.5px solid rgba(70,140,50,0.25)",
              background: "transparent",
              color: "rgba(125,212,95,0.6)",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: 13, cursor: "pointer", letterSpacing: "0.12em",
            }}>↗ Share</motion.button>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: "10px 20px", borderRadius: 40,
              border: "0.5px solid rgba(70,100,50,0.2)",
              background: "transparent",
              color: "rgba(85,175,62,0.35)",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: 12, cursor: "pointer", letterSpacing: "0.12em",
            }}>✕ close</motion.button>
        </div>

        <div style={{
          fontSize: 11, color: "rgba(85,175,62,0.25)",
          fontFamily: "Georgia, serif", fontStyle: "italic",
        }}>tap outside to close</div>
      </motion.div>
    </motion.div>
  );
}
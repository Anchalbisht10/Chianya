import { motion, AnimatePresence } from "framer-motion";
import { useChianya } from "../context/ChianyaContext";
import { useLocation } from "react-router-dom";

function MonkSVG() {
  return (
    <svg
      width="300"
      height="355"
      viewBox="0 0 220 260"
      style={{
        overflow: "visible",
        filter: "drop-shadow(0 0 35px rgba(80,220,80,0.18))",
      }}
    >
      {/* ── Divine outer aura — FOREST GREEN ── */}
      <motion.ellipse
        cx="110" cy="110" rx="90" ry="95"
        fill="none"
        stroke="rgba(80,220,80,0.08)"
        strokeWidth="28"
        animate={{ rx: [90,96,90], ry: [95,101,95], opacity: [0.4,0.9,0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.ellipse
        cx="110" cy="110" rx="76" ry="80"
        fill="none"
        stroke="rgba(60,190,60,0.12)"
        strokeWidth="14"
        animate={{ rx: [76,80,76], ry: [80,84,80] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* ── Halo ── */}
      <motion.circle
        cx="110" cy="58" r="42"
        fill="none"
        stroke="rgba(120,255,120,0.28)"
        strokeWidth="1.5"
        animate={{ r: [42,45,42], opacity: [0.5,1,0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.circle
        cx="110" cy="58" r="36"
        fill="none"
        stroke="rgba(80,220,80,0.16)"
        strokeWidth="0.8"
        animate={{ r: [36,38,36] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      {/* Halo dots */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 42;

        return (
          <motion.circle
            key={i}
            cx={110 + Math.cos(angle) * r}
            cy={58 + Math.sin(angle) * r}
            r="1.5"
            fill="rgba(160,255,160,0.55)"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        );
      })}

      {/* ── Head ── */}
      <motion.ellipse
        cx="110" cy="58" rx="28" ry="30"
        fill="rgba(118,178,84,0.72)"
        stroke="rgba(152,215,102,0.42)"
        strokeWidth="0.8"
        animate={{ ry: [30,31.5,30] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top knot */}
      <ellipse
        cx="110"
        cy="30"
        rx="10"
        ry="7"
        fill="rgba(98,158,64,0.84)"
      />

      {/* Eyes */}
      <motion.g
        animate={{ scaleY: [1, 0.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        style={{ transformOrigin: "95px 57px" }}
      >
        <ellipse cx="95" cy="57" rx="6.5" ry="5" fill="rgba(18,48,8,0.92)" />
        <ellipse cx="95" cy="57" rx="4.5" ry="3.5" fill="rgba(8,28,4,0.96)" />
        <circle cx="97" cy="55" r="1.4" fill="rgba(220,255,220,0.92)" />
      </motion.g>

      <motion.g
        animate={{ scaleY: [1, 0.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        style={{ transformOrigin: "125px 57px" }}
      >
        <ellipse cx="125" cy="57" rx="6.5" ry="5" fill="rgba(18,48,8,0.92)" />
        <ellipse cx="125" cy="57" rx="4.5" ry="3.5" fill="rgba(8,28,4,0.96)" />
        <circle cx="127" cy="55" r="1.4" fill="rgba(220,255,220,0.92)" />
      </motion.g>

      {/* Eyebrows */}
      <path
        d="M 86 49 Q 95 46 103 48"
        fill="none"
        stroke="rgba(38,80,14,0.78)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M 117 48 Q 125 46 134 49"
        fill="none"
        stroke="rgba(38,80,14,0.78)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Smile */}
      <path
        d="M 99 76 Q 110 82 121 76"
        fill="none"
        stroke="rgba(38,100,18,0.78)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Third eye */}
      <motion.circle
        cx="110"
        cy="45"
        r="2.5"
        fill="rgba(125,255,100,0.82)"
        animate={{ opacity: [0.4,1,0.4], r: [2.5,3,2.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Neck */}
      <rect
        x="100"
        y="86"
        width="20"
        height="16"
        rx="8"
        fill="rgba(114,172,78,0.62)"
      />

      {/* ── Outer robe ── */}
      <motion.path
        d="M 30 120 Q 20 165 22 235 Q 60 248 110 250 Q 160 248 198 235 Q 200 165 190 120 Q 155 138 110 140 Q 65 138 30 120 Z"
        fill="rgba(18,92,18,0.72)"
        stroke="rgba(48,162,38,0.42)"
        strokeWidth="1"
        animate={{
          d: [
            "M 30 120 Q 20 165 22 235 Q 60 248 110 250 Q 160 248 198 235 Q 200 165 190 120 Q 155 138 110 140 Q 65 138 30 120 Z",
            "M 30 120 Q 19 167 21 235 Q 60 249 110 251 Q 160 249 199 235 Q 201 167 190 120 Q 155 139 110 141 Q 65 139 30 120 Z",
            "M 30 120 Q 20 165 22 235 Q 60 248 110 250 Q 160 248 198 235 Q 200 165 190 120 Q 155 138 110 140 Q 65 138 30 120 Z",
          ]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner robe */}
      <path
        d="M 75 102 Q 70 140 72 235 Q 90 244 110 245 Q 130 244 148 235 Q 150 140 145 102 Q 128 115 110 116 Q 92 115 75 102 Z"
        fill="rgba(38,142,38,0.39)"
        stroke="rgba(68,192,58,0.28)"
        strokeWidth="0.8"
      />

      {/* Shoulder */}
      <path
        d="M 30 120 Q 55 105 110 102 Q 165 105 190 120"
        fill="rgba(23,108,20,0.66)"
        stroke="rgba(53,172,43,0.42)"
        strokeWidth="1"
      />

      {/* Arms */}
      <path
        d="M 38 115 Q 28 148 36 172 Q 50 185 68 182"
        fill="none"
        stroke="rgba(17,90,16,0.72)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      <path
        d="M 182 115 Q 192 148 184 172 Q 170 185 152 182"
        fill="none"
        stroke="rgba(17,90,16,0.72)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Hands */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse
          cx="92"
          cy="188"
          rx="20"
          ry="11"
          fill="rgba(108,170,72,0.6)"
          stroke="rgba(152,222,102,0.36)"
          strokeWidth="0.8"
          transform="rotate(-18, 92, 188)"
        />

        <ellipse
          cx="128"
          cy="188"
          rx="20"
          ry="11"
          fill="rgba(108,170,72,0.6)"
          stroke="rgba(152,222,102,0.36)"
          strokeWidth="0.8"
          transform="rotate(18, 128, 188)"
        />

        <ellipse
          cx="110"
          cy="182"
          rx="8"
          ry="12"
          fill="rgba(108,170,72,0.5)"
        />

        {/* Prayer beads */}
        {[...Array(10)].map((_, i) => {
          const angle = (i / 10) * Math.PI + Math.PI * 0.1;

          return (
            <motion.circle
              key={i}
              cx={110 + Math.cos(angle) * 30}
              cy={192 + Math.sin(angle) * 12}
              r="2.2"
              fill="rgba(26,122,18,0.88)"
              stroke="rgba(76,202,58,0.52)"
              strokeWidth="0.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            />
          );
        })}
      </motion.g>

      {/* Particles */}
      {[75, 90, 110, 130, 145].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={10}
          r={1.5}
          fill="rgba(142,255,102,0.88)"
          animate={{ cy: [10, -20, 10], opacity: [0, 0.9, 0] }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Lotus glow */}
      <motion.ellipse
        cx="110"
        cy="252"
        rx="60"
        ry="10"
        fill="rgba(38,185,38,0.1)"
        animate={{ rx: [60,68,60], opacity: [0.4,0.8,0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function Avatar() {
  const { avatarLine } = useChianya();
 const location = useLocation();

  if (location.pathname === "/") return null;
return (
  <div style={{
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
    pointerEvents: "none",
    transform: "scale(var(--avatar-scale, 1))",
    transformOrigin: "bottom right",
    paddingBottom: "clamp(0px, 1.5vh, 16px)",
    paddingRight: "clamp(0px, 1.5vw, 20px)",
  }}>
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={avatarLine}
          initial={{ opacity: 0, y: 12, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            maxWidth: 270,
               marginRight: 48,
            background: "rgba(8,28,8,0.88)",
            border: "0.5px solid rgba(120,255,120,0.25)",
            borderRadius: "18px 18px 4px 18px",
            padding: "14px 18px",
            fontSize: 13,
            color: "rgba(190,255,190,0.95)",
            lineHeight: 1.85,
            backdropFilter: "blur(20px)",
            textAlign: "right",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            letterSpacing: "0.02em",
            boxShadow: "0 0 35px rgba(60,200,60,0.12)",
          }}
        >
          {avatarLine}
        </motion.div>
      </AnimatePresence>

     {/* Monk */}
<motion.div
  initial={{
    opacity: 0,
    scale: 0.72,
    y: 40,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: [0, -10, 0],
  }}
  transition={{
    opacity: {
      duration: 1.8,
      ease: "easeOut",
    },
    scale: {
      duration: 1.8,
      ease: "easeOut",
    },
    y: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  style={{
    position: "relative",
    marginRight: 18,
    transformOrigin: "bottom center",
  }}
>
  <MonkSVG />
</motion.div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useChianya } from "../context/ChianyaContext";

function PinkBow() {
  return (
    <svg width="38" height="28" viewBox="0 0 38 28" style={{
      position: "absolute", left: -14, top: 18, zIndex: 3,
      filter: "drop-shadow(0 0 6px rgba(255,150,180,0.5))",
    }}>
      {/* Left loop */}
      <motion.ellipse cx="10" cy="14" rx="9" ry="6"
        fill="rgba(255,160,195,0.82)" stroke="rgba(255,190,215,0.6)" strokeWidth="0.8"
        transform="rotate(-20 10 14)"
        animate={{ scaleY: [1, 1.08, 1], opacity: [0.82, 1, 0.82] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse cx="10" cy="14" rx="9" ry="6"
        fill="none" stroke="rgba(255,210,225,0.4)" strokeWidth="0.5"
        transform="rotate(-20 10 14)"
      />
      {/* Right loop */}
      <motion.ellipse cx="28" cy="14" rx="9" ry="6"
        fill="rgba(255,140,180,0.78)" stroke="rgba(255,185,210,0.6)" strokeWidth="0.8"
        transform="rotate(20 28 14)"
        animate={{ scaleY: [1, 1.08, 1], opacity: [0.78, 0.96, 0.78] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Center knot */}
      <motion.ellipse cx="19" cy="14" rx="4.5" ry="4"
        fill="rgba(255,175,205,0.95)" stroke="rgba(255,215,230,0.7)" strokeWidth="0.7"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Ribbon tails */}
      <path d="M 16 17 Q 12 22 10 26" fill="none"
        stroke="rgba(255,160,195,0.65)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 22 17 Q 26 22 28 26" fill="none"
        stroke="rgba(255,140,180,0.6)" strokeWidth="2" strokeLinecap="round"/>
      {/* Shine */}
      <ellipse cx="16" cy="11" rx="2.5" ry="1.5"
        fill="rgba(255,240,245,0.45)" transform="rotate(-15 16 11)"/>
    </svg>
  );
}

export default function Creator() {
  const navigate = useNavigate();
  const { setAvatarLine, setCurrentMode } = useChianya();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setAvatarLine("Every forest has a gardener. This one is hers.");
    setCurrentMode("default");
  }, []);

  const skills = [
    "React.js", "Node.js", "Express.js", "MongoDB",
    "Framer Motion", "Canvas API", "JWT Auth", "REST APIs",
    "Groq AI", "Nodemailer", "Vercel", "Render", "PWA", "Git",
  ];

 const sections = [
    {
      label: "WHO I AM",
      text: "I am Anchal Bisht — a student, a builder, and someone who believes technology can hold space for human emotion. I created Chianya because I know what it feels like to carry something heavy with nowhere to put it down.",
    },
    {
      label: "WHY I BUILT THIS",
      text: "Chianya was born from a simple question: what if there was a space online that felt like sitting beside a calm lake at night — no judgment, no advice, just presence? I built the answer. Every line of code in this project is an attempt to make that feeling real for someone who needs it.",
    },
    {
      label: "WHERE THE NAME COMES FROM",
      text: "The project was first called Sattva — a Sanskrit word meaning purity of mind and clarity. It was beautiful, but something felt incomplete. Then one night, a word arrived: Chittaranya. It comes from two Sanskrit roots — Chitta, meaning consciousness, and Aranya, meaning forest, wildness, sacred inner space. Together they become forest of consciousness. That is what this is. We live in a world of extraordinary technology and comfort, and yet we have quietly lost our connection to something essential — to nature, to stillness, to the awareness that lives inside us. Chianya does not claim to restore that automatically. It is not magical. It is a tool, built with intention, designed so that when you arrive here, even briefly, you feel something natural. Something conscious. Something yours.",
    },
    {
      label: "WHAT THIS MEANS TO ME",
      text: "This is not just a portfolio project. It is my attempt to contribute something meaningful to the conversation about youth mental wellbeing. I built Chianya with honesty, care, and the belief that no one should have to carry this alone.",
    },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)",
      paddingTop: "4rem",
        paddingBottom: "clamp(80px,12vh,100px)",
        overflowY: "auto",
      }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    style={{
          background: "rgba(3,14,5,0.92)",
          border: "0.5px solid rgba(70,180,50,0.18)",
          borderRadius: "clamp(16px,3vw,24px)",
          padding: "clamp(1.8rem,4vw,2.8rem)",
          maxWidth: 520, width: "100%",
          backdropFilter: "blur(28px)",
          boxShadow: "0 0 80px rgba(20,140,20,0.09)",
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}>

        {/* Return button */}
        <motion.button onClick={() => navigate("/modes")}
          whileHover={{ scale: 1.06 }}
          style={{
            background: "rgba(7,36,7,0.65)",
            border: "0.5px solid rgba(70,180,48,0.28)",
            borderRadius: 24, color: "rgba(122,208,84,0.52)",
            fontSize: 11, cursor: "pointer", letterSpacing: "0.22em",
            fontFamily: "Georgia, serif", padding: "6px 18px",
            marginBottom: "2rem", backdropFilter: "blur(12px)",
            transition: "all 0.4s", display: "block",
          }}>← Return</motion.button>

        {/* Photo section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "1.8rem" }}>

          {/* Circle + bow wrapper */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: "1.2rem" }}>

            {/* Outer glow ring */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: -8,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(58,202,38,0.12) 0%, transparent 70%)",
                border: "0.5px solid rgba(98,222,68,0.2)",
                pointerEvents: "none",
              }}
            />

            {/* Rotating dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute", inset: -4,
                borderRadius: "50%",
                border: "0.5px dashed rgba(98,222,68,0.25)",
                pointerEvents: "none",
              }}
            />

            {/* Pink bow */}
            <PinkBow />

            {/* Photo circle */}
            <div style={{
              width: 150, height: 150,
              borderRadius: "50%",
              border: "1.5px solid rgba(98,222,68,0.4)",
              boxShadow: "0 0 40px rgba(58,202,38,0.18), inset 0 0 20px rgba(5,26,5,0.5)",
              overflow: "hidden",
              background: "rgba(5,26,5,0.68)",
              position: "relative",
            }}>
              {!imgError ? (
                <motion.img
                  src="/creator.jpg"
                  alt="Anchal Bisht"
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
                  animate={imgLoaded
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : {}}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{
                  width: "100%", height: "100%",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 56,
                }}>🌿</div>
              )}

              {/* Soft vignette overlay */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "radial-gradient(circle, transparent 55%, rgba(3,14,5,0.35) 100%)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Small sparkle dots around circle */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div key={i}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: 4, height: 4, borderRadius: "50%",
                  background: "rgba(180,255,140,0.7)",
                  top: "50%", left: "50%",
                  transform: `rotate(${angle}deg) translateX(82px) translateY(-50%)`,
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{
              fontSize: "clamp(22px,5vw,28px)", fontWeight: 300,
              letterSpacing: "0.18em", color: "rgba(172,242,142,0.96)",
              fontFamily: "Georgia, serif", marginBottom: 6,
            }}>
            Anchal Bisht
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{
              fontSize: "clamp(8px,1.6vw,10px)", letterSpacing: "0.32em",
              color: "rgba(98,200,75,0.36)", fontFamily: "Georgia, serif",
            }}>
            BUILDER · DREAMER · CREATOR OF CHIANYA
          </motion.div>
        </motion.div>

        <div style={{ height: "0.5px", background: "rgba(70,180,50,0.12)", marginBottom: "1.8rem" }} />

        {/* About sections */}
        {sections.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
            style={{ marginBottom: "1.6rem" }}>
            <div style={{
              fontSize: "clamp(8px,1.4vw,9px)", letterSpacing: "0.28em",
              color: "rgba(92,195,68,0.35)", fontFamily: "Georgia, serif",
              marginBottom: "0.6rem",
            }}>{s.label}</div>
            <div style={{
              fontSize: "clamp(12px,2.2vw,13px)",
              color: "rgba(140,218,110,0.68)",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              lineHeight: 2,
            }}>{s.text}</div>
          </motion.div>
        ))}

        <div style={{ height: "0.5px", background: "rgba(70,180,50,0.12)", marginBottom: "1.6rem" }} />

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ marginBottom: "1.8rem" }}>
          <div style={{
            fontSize: "clamp(8px,1.4vw,9px)", letterSpacing: "0.28em",
            color: "rgba(92,195,68,0.35)", fontFamily: "Georgia, serif",
            marginBottom: "1rem",
          }}>BUILT WITH</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((skill, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.05, duration: 0.6 }}
                whileHover={{ scale: 1.06, borderColor: "rgba(120,240,80,0.5)" }}
                style={{
                  fontSize: "clamp(9px,1.6vw,10px)",
                  color: "rgba(142,218,108,0.72)",
                  background: "rgba(5,26,5,0.68)",
                  border: "0.5px solid rgba(68,175,50,0.25)",
                  borderRadius: 20, padding: "4px 12px",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  letterSpacing: "0.08em", cursor: "default",
                  transition: "all 0.3s",
                }}>{skill}</motion.span>
            ))}
          </div>
        </motion.div>

        <div style={{ height: "0.5px", background: "rgba(70,180,50,0.12)", marginBottom: "1.4rem" }} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{
            textAlign: "center",
            fontSize: "clamp(10px,1.8vw,12px)",
            color: "rgba(85,175,62,0.28)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            lineHeight: 2,
          }}>
          © 2026 Anchal Bisht · All Rights Reserved<br/>
          Chianya — Forest of Consciousness
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
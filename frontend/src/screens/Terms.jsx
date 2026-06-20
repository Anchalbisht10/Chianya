import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useChianya } from "../context/ChianyaContext";

export default function Terms() {
  const navigate = useNavigate();
  const { setAvatarLine, setCurrentMode } = useChianya();

  useEffect(() => {
    setAvatarLine("The forest has one rule — arrive as you are. Everything else is here to protect you.");
    setCurrentMode("default");
  }, []);

  const sections = [
    {
      label: "WHO CAN USE CHIANYA",
      title: "Eligibility",
      text: "Chianya is open to anyone aged 13 and above. You do not need to create an account to use the core features. By using Chianya you agree that you will use it only for its intended purpose — emotional support and self-reflection — and not in ways that could harm yourself or others.",
    },
    {
      label: "WHAT CHIANYA IS",
      title: "Nature of Service",
      text: "Chianya is an emotional wellbeing platform. It is not a medical service, a therapy service, or a crisis intervention service. Antar is an AI companion — not a therapist, counsellor, or mental health professional. Nothing on Chianya constitutes medical advice, psychological diagnosis, or treatment. If you are in crisis, please contact a real human — iCall India: 9152987821.",
    },
    {
      label: "WHAT CHIANYA IS NOT",
      title: "Limitations",
      text: "Chianya does not replace professional mental health care. It does not provide diagnosis. It does not provide treatment. It does not provide crisis intervention beyond pointing users toward real human support. We are honest about these limitations because we believe honesty is the foundation of trust.",
    },
    {
      label: "YOUR RESPONSIBILITIES",
      title: "User Conduct",
      text: "You agree not to use Chianya to harm others, spread misinformation, or attempt to extract personal information from other users. You agree not to attempt to reverse-engineer, copy, or redistribute any part of Chianya without written permission from the author. You agree to use the platform with the same care and respect you would want others to bring to a shared sanctuary.",
    },
    {
      label: "OUR RESPONSIBILITIES",
      title: "What We Commit To",
      text: "We commit to keeping Chianya free and accessible. We commit to never selling your data or using it for advertising. We commit to maintaining the crisis safety layer so Antar always points toward real human support when needed. We commit to being honest about what Chianya is and what it is not. We commit to protecting your privacy as described in our Privacy Policy.",
    },
    {
      label: "INTELLECTUAL PROPERTY",
      title: "Ownership",
      text: "Chianya — Forest of Consciousness, including all code, design, visual assets, written content, AI prompt architecture, and character designs, is the exclusive intellectual property of Anchal Bisht © 2026. Unauthorized copying, reproduction, or redistribution is prohibited. The live application is available at chianya.vercel.app for personal use only.",
    },
    {
      label: "CHANGES",
      title: "Updates to These Terms",
      text: "We may update these terms as Chianya grows. When we do, we will update the date at the top of this page. Continued use of Chianya after changes means you accept the updated terms. We will always try to keep these terms honest, clear, and written in plain language.",
    },
    {
      label: "CONTACT",
      title: "Questions",
      text: "If you have questions about these terms, contact: anchal001bisht@gmail.com. We respond within 48 hours.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)",
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
          padding: "clamp(1.2rem,3vw,2rem)",
          maxWidth: 560, width: "100%",
          backdropFilter: "blur(28px)",
          maxHeight: "calc(100vh - 140px)",
          overflowY: "auto",
        }}>

        <motion.button
          onClick={() => navigate("/modes")}
          whileHover={{ scale: 1.06 }}
          style={{
            background: "rgba(7,36,7,0.65)",
            border: "0.5px solid rgba(70,180,48,0.28)",
            borderRadius: 24, color: "rgba(122,208,84,0.52)",
            fontSize: 11, cursor: "pointer", letterSpacing: "0.22em",
            fontFamily: "Georgia, serif", padding: "6px 18px",
            marginBottom: "1.5rem", backdropFilter: "blur(12px)",
            transition: "all 0.4s", display: "block",
          }}>← Return</motion.button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{
            fontSize: "clamp(22px,4vw,28px)", fontWeight: 300,
            letterSpacing: "0.18em", color: "rgba(172,242,142,0.96)",
            fontFamily: "Georgia, serif", marginBottom: 8,
          }}>Terms of Service</div>
          <div style={{
            fontSize: "clamp(9px,1.8vw,11px)", letterSpacing: "0.32em",
            color: "rgba(98,200,75,0.36)", fontFamily: "Georgia, serif",
          }}>CHIANYA — FOREST OF CONSCIOUSNESS</div>
          <div style={{
            fontSize: "clamp(9px,1.6vw,10px)",
            color: "rgba(85,175,62,0.25)",
            fontFamily: "Georgia, serif", marginTop: 6,
          }}>Last updated: June 2026</div>
        </motion.div>

        <div style={{
          height: "0.5px", background: "rgba(70,180,50,0.12)",
          marginBottom: "1.5rem",
        }} />

        {sections.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06, duration: 1 }}
            style={{ marginBottom: "1.4rem" }}>
            <div style={{
              fontSize: "clamp(8px,1.4vw,9px)", letterSpacing: "0.28em",
              color: "rgba(92,195,68,0.35)", fontFamily: "Georgia, serif",
              marginBottom: 4,
            }}>{s.label}</div>
            <div style={{
              fontSize: "clamp(11px,2vw,12px)",
              color: "rgba(172,242,142,0.85)",
              fontFamily: "Georgia, serif", fontWeight: 500, marginBottom: 6,
            }}>{s.title}</div>
            <div style={{
              fontSize: "clamp(10px,1.8vw,11px)",
              color: "rgba(125,205,95,0.62)",
              fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: 1.9,
            }}>{s.text}</div>
          </motion.div>
        ))}

        <div style={{
          height: "0.5px", background: "rgba(70,180,50,0.12)",
          marginBottom: "1.2rem",
        }} />

        <div style={{
          textAlign: "center", fontSize: "clamp(9px,1.6vw,10px)",
          color: "rgba(85,175,62,0.25)", fontFamily: "Georgia, serif", lineHeight: 2,
        }}>
          © 2026 Anchal Bisht · All Rights Reserved<br />
          Chianya — Forest of Consciousness
        </div>
      </motion.div>
    </motion.div>
  );
}
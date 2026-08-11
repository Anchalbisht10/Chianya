import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useChianya } from "../context/ChianyaContext";

export default function Privacy() {
  const navigate = useNavigate();
  const { setAvatarLine, setCurrentMode } = useChianya();

  useEffect(() => {
    setAvatarLine("Your privacy is not negotiable. The forest keeps no secrets about you.");
    setCurrentMode("default");
  }, [setAvatarLine, setCurrentMode]);
  

  const sections = [
    {
      label: "WHO WE ARE",
      title: "Our Commitment",
      text: "Chianya was built with privacy as a core value, not an afterthought. We understand that people who use this platform may be sharing deeply personal things — anxiety, loneliness, grief, confusion. We treat all of this with the highest respect and confidentiality.",
    },
    {
      label: "WHAT WE COLLECT",
      title: "Data We Hold",
      text: "When you create an account we collect your first name, email address, and password (stored as an encrypted hash — we never see your actual password). When you use Chianya we store your session activity, mood entries, and conversation history with Antar (only when logged in). We do NOT collect photos, government ID, bank information, or your precise location.",
    },
    {
      label: "RELEASE MODE",
      title: "What Is Never Stored",
      text: "Content written in Release mode is never stored — by architectural design, not just policy. When you release something into the forest, it is gone. We made this a structural decision in the codebase because we believe what you release should truly be released.",
    },
    {
      label: "ANTAR CONVERSATIONS",
      title: "Your Conversations With Antar",
      text: "Conversations with Antar are processed by Groq's AI API to generate responses. When you are logged in, conversation history is saved so Antar can maintain context. You can request deletion at any time. We do not use your conversations to train AI models. If Antar detects signs of serious distress, it responds with extra care and provides crisis support — this does not flag your account or share your information with anyone.",
    },
    {
      label: "PROTECTION",
      title: "How We Protect You",
      text: "Passwords are hashed using bcrypt — we cannot see or recover them. Authentication uses JWT tokens in httpOnly cookies, not accessible to JavaScript or third parties. All connections use HTTPS. Rate limiting prevents brute force attacks. Input validation protects against injection attacks.",
    },
    {
      label: "YOUR RIGHTS",
      title: "Your Rights Over Your Data",
      text: "You have the right to access all data we hold about you. You have the right to correct your profile at any time. You have the right to delete your account and all associated data permanently. You have the right to withdraw consent for conversation history saving at any time. To exercise any of these rights, contact: anchal001bisht@gmail.com",
    },
    {
      label: "ETHICS",
      title: "What We Will Never Do",
      text: "We will never sell your data. We will never share your data with advertisers. We will never use your emotional check-ins for any purpose other than providing you with Chianya's services. We will never show you advertising inside the sanctuary. The forest does not have a business model built on human pain.",
    },
    {
      label: "CRISIS SAFETY",
      title: "Crisis Situations",
      text: "If you express language indicating serious distress or self-harm risk, Antar will always — gently and warmly — point you toward real human support. In India: iCall helpline 9152987821. This is a safety feature, not a surveillance feature. Your conversation remains private.",
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
          padding: "clamp(1.8rem,4vw,2.8rem)",
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
            marginBottom: "2rem", backdropFilter: "blur(12px)",
            transition: "all 0.4s", display: "block",
          }}>← Return</motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            fontSize: "clamp(22px,4vw,28px)", fontWeight: 300,
            letterSpacing: "0.18em", color: "rgba(172,242,142,0.96)",
            fontFamily: "Georgia, serif", marginBottom: 8,
          }}>Privacy Policy</div>
          <div style={{
            fontSize: "clamp(9px,1.8vw,11px)", letterSpacing: "0.32em",
            color: "rgba(98,200,75,0.36)", fontFamily: "Georgia, serif",
          }}>CHIANYA — FOREST OF CONSCIOUSNESS</div>
          <div style={{
            fontSize: "clamp(9px,1.6vw,10px)",
            color: "rgba(85,175,62,0.25)",
            fontFamily: "Georgia, serif",
            marginTop: 8,
          }}>Last updated: June 2026 · Effective immediately</div>
        </motion.div>

        {/* Quick summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            background: "rgba(5,30,8,0.6)",
            border: "0.5px solid rgba(70,180,50,0.2)",
            borderRadius: 14,
            padding: "14px 18px",
            marginBottom: "2rem",
          }}>
          <div style={{
            fontSize: "clamp(8px,1.4vw,9px)",
            letterSpacing: "0.24em",
            color: "rgba(92,195,68,0.38)",
            fontFamily: "Georgia, serif",
            marginBottom: 10,
          }}>THE SHORT VERSION</div>
          {[
            "We never sell your data",
            "No photos ever required",
            "Release content is never stored — by design",
            "You can delete everything at any time",
            "Passwords encrypted — we cannot see them",
            "No ads. No trackers. No third-party data sharing",
            "Crisis situations always route to real human support",
          ].map((point, i) => (
            <div key={i} style={{
              fontSize: "clamp(11px,2vw,12px)",
              color: "rgba(140,218,110,0.65)",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              lineHeight: 2,
            }}>✓ {point}</div>
          ))}
        </motion.div>

        <div style={{
          height: "0.5px",
          background: "rgba(70,180,50,0.12)",
          marginBottom: "2rem",
        }} />

        {/* Sections */}
        {sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 1 }}
            style={{ marginBottom: "1.8rem" }}>
            <div style={{
              fontSize: "clamp(8px,1.4vw,9px)",
              letterSpacing: "0.28em",
              color: "rgba(92,195,68,0.35)",
              fontFamily: "Georgia, serif",
              marginBottom: 4,
            }}>{s.label}</div>
            <div style={{
              fontSize: "clamp(12px,2.2vw,13px)",
              color: "rgba(172,242,142,0.85)",
              fontFamily: "Georgia, serif",
              fontWeight: 500,
              marginBottom: 8,
            }}>{s.title}</div>
            <div style={{
              fontSize: "clamp(11px,2vw,12px)",
              color: "rgba(125,205,95,0.62)",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              lineHeight: 2,
            }}>{s.text}</div>
          </motion.div>
        ))}

        <div style={{
          height: "0.5px",
          background: "rgba(70,180,50,0.12)",
          marginBottom: "1.5rem",
        }} />

        <div style={{
          textAlign: "center",
          fontSize: "clamp(9px,1.6vw,10px)",
          color: "rgba(85,175,62,0.25)",
          fontFamily: "Georgia, serif",
          lineHeight: 2,
        }}>
          © 2026 Anchal Bisht · All Rights Reserved<br />
          Chianya — Forest of Consciousness<br />
          anchal001bisht@gmail.com
        </div>
      </motion.div>
    </motion.div>
  );
}
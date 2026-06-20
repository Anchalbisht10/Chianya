import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useChianya } from "../context/ChianyaContext";

export default function Accessibility() {
  const navigate = useNavigate();
  const { setAvatarLine, setCurrentMode } = useChianya();

  useEffect(() => {
    setAvatarLine("The forest belongs to everyone. No one should be left at the gate.");
    setCurrentMode("default");
  }, []);

  const sections = [
    {
      label: "OUR COMMITMENT",
      title: "Accessibility First",
      text: "Chianya was designed from the beginning to be accessible to as many people as possible. Accessibility is not a feature we added. It is a value we built around.",
    },
    {
      label: "DEVICE ACCESS",
      title: "Works on Any Device",
      text: "Chianya is fully mobile responsive and works on smartphones, tablets, and desktop computers. It is installable as a PWA directly from the browser with no app store required.",
    },
    {
      label: "CONNECTION",
      title: "Designed for Slow Networks",
      text: "Chianya is optimized for slow and unstable internet connections. We use lazy loading, compressed assets, and a backend keep-alive system to minimize wait times.",
    },
    {
      label: "NO ACCOUNT REQUIRED",
      title: "Guest Access Always Available",
      text: "Every core feature of Chianya is accessible without creating an account. Breathe, ground, release, receive wisdom, and sit in stillness without sharing any personal information.",
    },
    {
      label: "COST",
      title: "Free. Always.",
      text: "Chianya is completely free. There is no subscription, no premium tier, no in-app purchases. Emotional support should not be gated behind payment.",
    },
    {
      label: "LANGUAGE",
      title: "Plain Language",
      text: "All content is written in plain accessible English. We avoid clinical terminology and complex jargon. You are always welcome exactly as you are.",
    },
    {
      label: "VISUAL DESIGN",
      title: "Visual Accessibility",
      text: "Chianya uses high-contrast text on dark backgrounds and scalable font sizes. If you experience sensitivity to motion, you can reduce animations through your device accessibility settings.",
    },
    {
      label: "CRISIS ACCESS",
      title: "Crisis Resources Always Visible",
      text: "The Resources page with crisis helpline numbers including iCall India 9152987821 is always accessible from the forest menu without requiring login.",
    },
    {
      label: "FEEDBACK",
      title: "Help Us Improve",
      text: "If you encounter any barrier that prevents you from using Chianya please contact us at anchal001bisht@gmail.com. We treat accessibility feedback as a priority.",
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
          }}>
          Return
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{
            fontSize: "clamp(22px,4vw,28px)", fontWeight: 300,
            letterSpacing: "0.18em", color: "rgba(172,242,142,0.96)",
            fontFamily: "Georgia, serif", marginBottom: 8,
          }}>Accessibility</div>
          <div style={{
            fontSize: "clamp(9px,1.8vw,11px)", letterSpacing: "0.32em",
            color: "rgba(98,200,75,0.36)", fontFamily: "Georgia, serif",
          }}>CHIANYA — FOREST OF CONSCIOUSNESS</div>
          <div style={{
            fontSize: "clamp(10px,1.8vw,12px)",
            color: "rgba(140,218,110,0.55)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            marginTop: 8, lineHeight: 1.8,
          }}>The forest belongs to everyone.</div>
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
          2026 Anchal Bisht. All Rights Reserved.
          Chianya Forest of Consciousness
        </div>
      </motion.div>
    </motion.div>
  );
}
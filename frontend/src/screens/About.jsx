import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useChianya } from "../context/ChianyaContext";

export default function About() {
  const navigate = useNavigate();
  const { setAvatarLine, setCurrentMode } = useChianya();

  useEffect(() => {
    setAvatarLine("Every forest begins with a single seed. This one began with a question.");
    setCurrentMode("default");
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
     style={{
        position: "absolute", inset: 0, zIndex: 10,
      display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)",
        paddingTop: "6rem",
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
     padding: "clamp(1rem,2.5vw,1.5rem)",
          maxWidth: 520, width: "100%",
        maxHeight: "75vh", overflowY: "auto",
          backdropFilter: "blur(28px)",
          boxShadow: "0 0 80px rgba(20,140,20,0.09)",
          maxHeight: "75vh", overflowY: "auto",
        }}>

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

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            fontSize: "clamp(26px,5vw,34px)", fontWeight: 300,
            letterSpacing: "0.18em", color: "rgba(172,242,142,0.96)",
            fontFamily: "Georgia, serif", marginBottom: 8,
          }}>Why Chianya Exists</div>
          <div style={{
            fontSize: "clamp(11px,2vw,13px)",
            color: "rgba(145,222,115,0.5)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            lineHeight: 1.9,
          }}>
            Not as an app. As an answer to something real.
          </div>
        </motion.div>

        {/* The problem */}
        <Section delay={0.3} label="THE PROBLEM">
          There are millions of young people right now who are not okay. Not in a crisis way — just quietly carrying something heavy. Exam pressure. Career anxiety. The exhaustion of being always online, always performing, always expected to be fine.

          They are not sick enough for therapy. They are too overwhelmed to ask for help. And the world keeps moving around them as if nothing is wrong.

          Chianya was built for that moment. The 11 PM moment. The alone-in-a-crowd moment. The I-don't-even-know-what-I'm-feeling moment.
        </Section>

        <Divider />

        {/* What it is */}
        <Section delay={0.5} label="WHAT CHIANYA IS">
          Chianya is a forest. A digital sanctuary where young people can arrive exactly as they are — without explaining themselves, without being diagnosed, without being told what to do.

          Inside the forest, Antar waits. Not as a therapist. Not as a chatbot. As a presence — like sitting beside a calm lake at night with someone who truly listens.

          Users can breathe, release what is heavy, ground themselves in the present, receive wisdom, or simply sit in stillness. Each experience is backed by evidence — breathing techniques, grounding protocols, expressive writing — delivered not as clinical exercises but as moments of genuine care.
        </Section>

        <Divider />

        {/* Why it's different */}
        <Section delay={0.7} label="WHY IT IS DIFFERENT">
          Most wellness apps are built for people who already have the language for what they feel. Chianya is built for people who don't.

          It does not ask users to track moods on a scale of 1-10. It asks: what are you carrying right now?

          It does not offer productivity tips or motivational quotes. It offers silence, breath, and the felt sense of being received without judgment.

          It does not pretend to replace professional help. It exists in the space between "I'm fine" and "I need a therapist" — a space that has been largely ignored by both the wellness industry and the mental health system.
        </Section>

        <Divider />

        {/* Ethics */}
        <Section delay={0.9} label="WHAT WE COMMIT TO">
          Chianya will never diagnose. It will never manipulate. It will never make a user feel worse about themselves to keep them engaged.

          If someone is in crisis, Antar will always — gently, warmly — point them toward real human support. The iCall helpline. A trusted person. A professional.

          No user data is sold. No advertising exists inside the sanctuary. The forest does not have a business model built on human pain.
        </Section>

        <Divider />

        {/* Global alignment */}
        <Section delay={1.1} label="THE BIGGER PICTURE">
          Youth mental health is not a niche concern. The World Health Organization identifies it as one of the most urgent global health challenges of this decade. UNESCO frames emotional awareness and self-regulation as foundational to quality education. The UN Sustainable Development Goals call for wellbeing as a human right — not a luxury.

          Chianya is one small answer to a very large question: what does it look like when technology is built with genuine care for the humans using it?

          We don't know yet how far this forest can grow. But we know it needs to exist.
        </Section>

        <Divider />

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          style={{
            textAlign: "center",
            fontSize: "clamp(12px,2.2vw,14px)",
            color: "rgba(145,222,115,0.55)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            lineHeight: 2, marginTop: "0.5rem",
          }}>
          Built by a young person, for young people.<br/>
          With honesty, care, and the belief that<br/>
          <span style={{ color: "rgba(172,242,142,0.8)" }}>
            no one should have to carry this alone.
          </span>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}

function Section({ children, delay, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
      style={{ marginBottom: "1.8rem" }}>
      <div style={{
        fontSize: "clamp(8px,1.4vw,9px)", letterSpacing: "0.28em",
        color: "rgba(92,195,68,0.35)", fontFamily: "Georgia, serif",
        marginBottom: "0.8rem",
      }}>{label}</div>
      <div style={{
        fontSize: "clamp(12px,2.2vw,13px)",
        color: "rgba(140,218,110,0.68)",
        fontFamily: "Georgia, serif", fontStyle: "italic",
        lineHeight: 2,
      }}>{children}</div>
    </motion.div>
  );
<div style={{
          textAlign: "center",
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: "0.5px solid rgba(70,180,50,0.1)",
          fontSize: "clamp(8px,1.4vw,9px)",
          color: "rgba(85,175,62,0.25)",
          fontFamily: "Georgia, serif",
          letterSpacing: "0.18em",
          lineHeight: 2,
        }}>
          © 2026 Anchal Bisht · All Rights Reserved<br/>
          Chianya — Forest of Consciousness<br/>
          Unauthorized reproduction or use is prohibited.
        </div>

}

function Divider() {
  return (
    <div style={{
      height: "0.5px",
      background: "rgba(70,180,50,0.12)",
      marginBottom: "1.8rem",
    }} />
  );
}
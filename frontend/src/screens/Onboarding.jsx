import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    emoji: "🌿",
    title: "You don't have to be okay.",
    body: "Chianya is not a therapy app. It is not a productivity tool. It is simply a space — for you to arrive, exactly as you are, without explanation.",
  },
  {
    emoji: "🧘",
    title: "Meet Antar.",
    body: "Antar is your inner guide — an AI presence that listens without judgment, asks gentle questions, and holds space. Not a chatbot. A companion.",
  },
  {
    emoji: "🌊",
    title: "Six ways to find stillness.",
    body: "Breathe. Ground yourself. Release what is heavy. Sit in silence. Receive wisdom. Or simply talk. You choose what you need today.",
  },
  {
    emoji: "✦",
    title: "This is not therapy.",
    body: "Chianya does not diagnose, prescribe, or replace professional support. If you are in crisis, real help is always one tap away inside the app.",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const isLast = slide === SLIDES.length - 1;

  const next = () => {
    if (isLast) navigate("/auth");
    else setSlide(s => s + 1);
  };

  const skip = () => navigate("/auth");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)",
      }}>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(3,14,5,0.92)",
          border: "0.5px solid rgba(70,180,50,0.18)",
          borderRadius: "clamp(16px,3vw,24px)",
          padding: "clamp(2rem,5vw,3rem)",
          maxWidth: 440, width: "100%",
          backdropFilter: "blur(28px)",
          boxShadow: "0 0 80px rgba(20,140,20,0.09)",
          textAlign: "center",
        }}>

        {/* Skip */}
        <div style={{
          display: "flex", justifyContent: "flex-end",
          marginBottom: "1.5rem",
        }}>
          <button onClick={skip} style={{
            background: "none", border: "none",
            color: "rgba(85,175,62,0.3)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 11, cursor: "pointer", letterSpacing: "0.14em",
          }}>skip</button>
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.div key={slide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Emoji */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: "clamp(42px,10vw,58px)", marginBottom: "1.5rem" }}
            >
              {SLIDES[slide].emoji}
            </motion.div>

            {/* Title */}
            <div style={{
              fontSize: "clamp(18px,4vw,24px)", fontWeight: 300,
              letterSpacing: "0.12em",
              color: "rgba(172,242,142,0.96)",
              fontFamily: "Georgia, serif",
              marginBottom: "1.2rem",
              lineHeight: 1.4,
            }}>
              {SLIDES[slide].title}
            </div>

            {/* Body */}
            <div style={{
              fontSize: "clamp(12px,2.4vw,14px)",
              color: "rgba(140,218,110,0.65)",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              lineHeight: 2, marginBottom: "2rem",
            }}>
              {SLIDES[slide].body}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{
          display: "flex", justifyContent: "center",
          gap: 8, marginBottom: "2rem",
        }}>
          {SLIDES.map((_, i) => (
            <motion.div key={i}
              animate={{
                width: i === slide ? 20 : 6,
                background: i === slide
                  ? "rgba(142,232,108,0.8)"
                  : "rgba(70,140,50,0.3)",
              }}
              transition={{ duration: 0.4 }}
              style={{
                height: 6, borderRadius: 3, cursor: "pointer",
              }}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>

        {/* Next button */}
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.04, boxShadow: "0 0 42px rgba(48,202,38,0.22)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: "100%", padding: "clamp(12px,2.6vw,15px)",
            borderRadius: 40,
            border: "0.5px solid rgba(102,222,70,0.5)",
            background: "rgba(11,62,10,0.72)",
            color: "rgba(182,250,148,0.96)",
            fontSize: "clamp(12px,2.4vw,14px)", cursor: "pointer",
            letterSpacing: "0.14em",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            transition: "all 0.4s",
          }}>
          {isLast ? "Enter the Sanctuary" : "Continue →"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
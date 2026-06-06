import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useChianya } from "../context/ChianyaContext";

const CRISIS = [
  {
    name: "iCall",
    country: "India",
    number: "9152987821",
    desc: "Professional counselling by trained psychologists. Free for students.",
    hours: "Mon–Sat, 8am–10pm",
  },
  {
    name: "Vandrevala Foundation",
    country: "India",
    number: "1860-2662-345",
    desc: "24/7 mental health helpline. Free, confidential.",
    hours: "24 hours, 7 days",
  },
  {
    name: "AASRA",
    country: "India",
    number: "9820466627",
    desc: "Crisis intervention for those in emotional distress or suicidal crisis.",
    hours: "24 hours, 7 days",
  },
  {
    name: "Snehi",
    country: "India",
    number: "044-24640050",
    desc: "Emotional support and suicide prevention helpline.",
    hours: "24 hours, 7 days",
  },
];

const RESOURCES = [
  {
    title: "When to seek professional help",
    points: [
      "When feelings of sadness or anxiety last more than two weeks",
      "When daily life feels impossible to manage",
      "When you have thoughts of harming yourself or others",
      "When nothing seems to bring relief or joy",
    ],
  },
  {
    title: "What Chianya is and is not",
    points: [
      "Chianya is a space to pause, reflect, and breathe — not a therapist",
      "Antar is an AI guide, not a licensed mental health professional",
      "Nothing here replaces a real conversation with a trained counsellor",
      "If you are in crisis, please reach out to one of the helplines above",
    ],
  },
];

export default function Resources() {
  const navigate = useNavigate();
  const { setAvatarLine } = useChianya();

  useEffect(() => {
    setAvatarLine("You are not alone. Real support exists, and asking for it is courage.");
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)", overflowY: "auto",
      paddingTop: "clamp(5rem,12vh,7rem)",
    
      }}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(3,14,5,0.92)",
          border: "0.5px solid rgba(70,180,50,0.18)",
          borderRadius: "clamp(16px,3vw,24px)",
          padding: "clamp(1.6rem,4vw,2.4rem)",
        maxWidth: 520, width: "100%",
          backdropFilter: "blur(28px)",
          boxShadow: "0 0 80px rgba(20,140,20,0.09)",
          maxHeight: "75vh", overflowY: "auto",
        }}>

        {/* Header */}
        <motion.button onClick={() => navigate("/modes")}
          whileHover={{ scale: 1.06 }}
          style={{
            background: "rgba(7,36,7,0.65)",
            border: "0.5px solid rgba(70,180,48,0.28)",
            borderRadius: 24, color: "rgba(122,208,84,0.52)",
            fontSize: 11, cursor: "pointer", letterSpacing: "0.22em",
            fontFamily: "Georgia, serif", padding: "6px 18px",
            marginBottom: "1.6rem",
            backdropFilter: "blur(12px)", transition: "all 0.4s",
            display: "block",
          }}>← Return</motion.button>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            fontSize: "clamp(22px,4.5vw,28px)", fontWeight: 300,
            letterSpacing: "0.18em", color: "rgba(172,242,142,0.96)",
            fontFamily: "Georgia, serif", marginBottom: 8,
          }}>Real Support</div>
          <div style={{
            fontSize: "clamp(11px,2vw,13px)",
            color: "rgba(145,222,115,0.55)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            lineHeight: 1.9,
          }}>
            Chianya is a space to breathe and reflect.<br/>
            But some things need a human voice.
          </div>
        </div>

        {/* Crisis helplines */}
        <div style={{
          fontSize: "clamp(9px,1.6vw,10px)", letterSpacing: "0.28em",
          color: "rgba(92,195,68,0.38)", fontFamily: "Georgia, serif",
          marginBottom: "1rem",
        }}>CRISIS HELPLINES — INDIA</div>

        <div style={{
          display: "flex", flexDirection: "column", gap: 10,
          marginBottom: "2rem",
        }}>
          {CRISIS.map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "clamp(12px,2.5vw,16px)",
                borderRadius: 14,
                border: "0.5px solid rgba(66,160,46,0.22)",
                background: "rgba(5,22,5,0.58)",
              }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", marginBottom: 6,
              }}>
                <div>
                  <span style={{
                    fontSize: "clamp(13px,2.4vw,14px)", fontWeight: 500,
                    color: "rgba(172,242,142,0.92)",
                    fontFamily: "Georgia, serif",
                  }}>{c.name}</span>
                  <span style={{
                    fontSize: "clamp(9px,1.6vw,10px)",
                    color: "rgba(85,175,62,0.4)",
                    fontFamily: "Georgia, serif",
                    marginLeft: 8,
                  }}>{c.country}</span>
                </div>
                <a href={`tel:${c.number}`} style={{
                  fontSize: "clamp(12px,2.2vw,14px)",
                  color: "rgba(142,232,108,0.9)",
                  fontFamily: "Georgia, serif",
                  textDecoration: "none",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                }}>{c.number}</a>
              </div>
              <div style={{
                fontSize: "clamp(10px,1.8vw,11px)",
                color: "rgba(125,205,95,0.55)",
                fontFamily: "Georgia, serif", fontStyle: "italic",
                lineHeight: 1.6, marginBottom: 4,
              }}>{c.desc}</div>
              <div style={{
                fontSize: "clamp(9px,1.5vw,10px)",
                color: "rgba(85,175,62,0.32)",
                fontFamily: "Georgia, serif",
              }}>⏱ {c.hours}</div>
            </motion.div>
          ))}
        </div>

        <div style={{
          height: "0.5px", background: "rgba(70,180,50,0.14)",
          marginBottom: "2rem",
        }} />

        {/* Info sections */}
        {RESOURCES.map((r, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            style={{ marginBottom: "1.6rem" }}>
            <div style={{
              fontSize: "clamp(9px,1.6vw,10px)", letterSpacing: "0.28em",
              color: "rgba(92,195,68,0.38)", fontFamily: "Georgia, serif",
              marginBottom: "0.8rem",
            }}>{r.title.toUpperCase()}</div>
            <div style={{
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              {r.points.map((p, j) => (
                <div key={j} style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                }}>
                  <span style={{
                    color: "rgba(92,195,68,0.4)",
                    fontSize: 12, marginTop: 2, flexShrink: 0,
                  }}>✦</span>
                  <span style={{
                    fontSize: "clamp(11px,2vw,12px)",
                    color: "rgba(140,218,110,0.72)",
                    fontFamily: "Georgia, serif", fontStyle: "italic",
                    lineHeight: 1.75,
                  }}>{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div style={{
          height: "0.5px", background: "rgba(70,180,50,0.14)",
          marginBottom: "1.4rem",
        }} />

        {/* Bottom note */}
        <div style={{
          textAlign: "center",
          fontSize: "clamp(10px,1.8vw,12px)",
          color: "rgba(85,175,62,0.35)",
          fontFamily: "Georgia, serif", fontStyle: "italic",
          lineHeight: 1.9,
        }}>
          Asking for help is not weakness.<br/>
          It is the most honest thing a person can do.
        </div>
      </motion.div>
    </motion.div>
  );
}
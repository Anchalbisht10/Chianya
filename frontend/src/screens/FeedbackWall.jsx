import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { submitFeedback, getFeedback, deleteFeedback } from "../services/api";
import { useChianya } from "../context/ChianyaContext";

export default function FeedbackWall() {
  const navigate = useNavigate();
  const { feelings } = useChianya();
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ message: "", name: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getFeedback().then(data => {
      if (data?.feedbacks) setFeedbacks(data.feedbacks);
    }).catch(() => {});
  }, []);

  const submit = async () => {
    if (!form.message.trim()) { setError("Please write something."); return; }
    setLoading(true);
    setError("");
    try {
      const data = await submitFeedback({
        message: form.message,
        name: form.name || "Anonymous",
        feeling: feelings[0] || "",
      });
      if (data.success) {
        setSubmitted(true);
        setFeedbacks(prev => [data.feedback, ...prev]);
      }
    } catch {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)", overflowY: "auto",
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
          maxHeight: "88vh", overflowY: "auto",
        }}>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "1.6rem",
        }}>
          <motion.button onClick={() => navigate("/modes")}
            whileHover={{ scale: 1.06 }}
            style={{
              background: "rgba(7,36,7,0.65)",
              border: "0.5px solid rgba(70,180,48,0.28)",
              borderRadius: 24, color: "rgba(122,208,84,0.52)",
              fontSize: 11, cursor: "pointer", letterSpacing: "0.22em",
              fontFamily: "Georgia, serif", padding: "6px 18px",
              backdropFilter: "blur(12px)", transition: "all 0.4s",
            }}>← Return</motion.button>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <div style={{
            fontSize: "clamp(20px,4vw,26px)", fontWeight: 300,
            letterSpacing: "0.18em", color: "rgba(172,242,142,0.96)",
            fontFamily: "Georgia, serif", marginBottom: 6,
          }}>Voices from the Forest</div>
          <div style={{
            fontSize: "clamp(9px,1.8vw,11px)", letterSpacing: "0.28em",
            color: "rgba(98,200,75,0.36)", fontFamily: "Georgia, serif",
          }}>what others have carried and released here</div>
        </div>

        {/* Submit form */}
        <AnimatePresence>
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: "rgba(5,24,6,0.6)",
                border: "0.5px solid rgba(68,175,50,0.2)",
                borderRadius: 16, padding: "1.2rem",
                marginBottom: "1.6rem",
              }}>
              <div style={{
                fontSize: "clamp(9px,1.6vw,10px)", letterSpacing: "0.24em",
                color: "rgba(92,195,68,0.38)", fontFamily: "Georgia, serif",
                marginBottom: 10,
              }}>LEAVE YOUR REFLECTION</div>

              <textarea
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder="Share what this space gave you, or what you are carrying..."
                maxLength={500}
                rows={3}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 12,
                  border: "0.5px solid rgba(70,180,50,0.2)",
                  background: "rgba(4,18,5,0.72)",
                  color: "rgba(162,238,132,0.9)",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  fontSize: "clamp(12px,2.2vw,13px)",
                  resize: "none", outline: "none", lineHeight: 1.7,
                  marginBottom: 10,
                }}
              />

              <input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Your name (or leave blank for Anonymous)"
                style={{
                  width: "100%", padding: "8px 14px", borderRadius: 12,
                  border: "0.5px solid rgba(70,180,50,0.2)",
                  background: "rgba(4,18,5,0.72)",
                  color: "rgba(162,238,132,0.9)",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  fontSize: "clamp(11px,2vw,12px)",
                  outline: "none", marginBottom: 10,
                }}
              />

              {error && (
                <div style={{
                  color: "rgba(255,120,120,0.85)", fontSize: 11,
                  fontFamily: "Georgia, serif", marginBottom: 8,
                }}>{error}</div>
              )}

              <motion.button onClick={submit} disabled={loading}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%", padding: "10px",
                  borderRadius: 40,
                  border: "0.5px solid rgba(102,222,70,0.5)",
                  background: "rgba(11,62,10,0.72)",
                  color: "rgba(182,250,148,0.96)",
                  fontSize: "clamp(11px,2vw,13px)", cursor: "pointer",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  letterSpacing: "0.12em", transition: "all 0.4s",
                }}>
                {loading ? "releasing into the forest..." : "Release into the Forest ✦"}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: "center", padding: "1.2rem",
                marginBottom: "1.6rem",
                borderLeft: "2px solid rgba(78,202,58,0.42)",
                background: "rgba(6,30,6,0.65)",
                borderRadius: 14,
                color: "rgba(162,236,132,0.88)",
                fontFamily: "Georgia, serif", fontStyle: "italic",
                fontSize: "clamp(12px,2.2vw,13px)", lineHeight: 1.9,
              }}>
              The forest has received your words.<br/>
              <span style={{ opacity: 0.5, fontSize: "clamp(10px,1.8vw,11px)" }}>
                Thank you for leaving a piece of yourself here.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{
          height: "0.5px", background: "rgba(70,180,50,0.14)",
          marginBottom: "1.4rem",
        }} />

        {/* Feedback list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {feedbacks.length === 0 ? (
            <div style={{
              textAlign: "center", color: "rgba(85,175,62,0.35)",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: "clamp(11px,2vw,13px)", padding: "2rem",
            }}>
              The forest is waiting for its first voice.
            </div>
          ) : (
            feedbacks.map((f, i) => (
              <motion.div key={f._id || i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  padding: "clamp(10px,2vw,14px) clamp(12px,2.5vw,16px)",
                  borderRadius: 14,
                  border: "0.5px solid rgba(66,160,46,0.2)",
                  background: "rgba(5,22,5,0.58)",
                }}>
                {f.feeling && (
                  <div style={{
                    fontSize: "clamp(8px,1.4vw,9px)", letterSpacing: "0.2em",
                    color: "rgba(92,195,68,0.38)",
                    fontFamily: "Georgia, serif", marginBottom: 6,
                  }}>carrying {f.feeling}</div>
                )}
                <div style={{
                  fontSize: "clamp(12px,2.2vw,13px)",
                  color: "rgba(155,232,125,0.85)",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  lineHeight: 1.85, marginBottom: 8,
                }}>"{f.message}"</div>
               <div style={{
                  fontSize: "clamp(9px,1.6vw,10px)",
                  color: "rgba(85,175,62,0.35)",
                  fontFamily: "Georgia, serif",
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span>— {f.name || "Anonymous"}</span>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span>{new Date(f.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short"
                    })}</span>
                    <button
                      onClick={async () => {
                        await deleteFeedback(f._id);
                        setFeedbacks(prev => prev.filter(x => x._id !== f._id));
                      }}
                      style={{
                        background: "none", border: "none",
                        color: "rgba(255,80,80,0.25)",
                        cursor: "pointer", fontSize: 10,
                        fontFamily: "Georgia, serif",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={e => e.target.style.color = "rgba(255,80,80,0.6)"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,80,80,0.25)"}
                    >remove</button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
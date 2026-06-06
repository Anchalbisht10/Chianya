import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sendFutureLetter } from "../services/api";
import { useChianya } from "../context/ChianyaContext";

export default function FutureLetter() {
  const navigate = useNavigate();
  const { setCurrentMode } = useChianya();
  const [step, setStep] = useState("write");
  const [form, setForm] = useState({ email: "", letter: "", days: 30 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    if (!form.email || !form.letter)
      return setError("Please fill in both fields.");
    setLoading(true);
    setError("");
    try {
      const data = await sendFutureLetter(form);
      if (data.success) setStep("sent");
      else setError(data.error || "Something went wrong.");
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
   padding: "clamp(1rem,3vw,2rem)",
        paddingTop: "clamp(70px,12vh,90px)",
        paddingBottom: "clamp(80px,12vh,100px)",
        overflowY: "auto",
      }}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(3,14,5,0.92)",
          border: "0.5px solid rgba(70,180,50,0.18)",
          borderRadius: "clamp(16px,3vw,24px)",
          padding: "clamp(1.8rem,4vw,2.8rem)",
       maxWidth: 520, width: "100%",
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
            marginBottom: "1.8rem", backdropFilter: "blur(12px)",
            transition: "all 0.4s", display: "block",
          }}>← Return</motion.button>

        <AnimatePresence mode="wait">
          {step === "write" && (
            <motion.div key="write"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>

              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
               <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>✉️</div>
                <div style={{
                 fontSize: "clamp(16px,3vw,20px)", fontWeight: 300,
              letterSpacing: "0.14em", color: "rgba(172,242,142,0.96)",
              fontFamily: "Georgia, serif", marginBottom: 4,
                }}>A Letter to Your Future Self</div>
                <div style={{
                  fontSize: "clamp(11px,2vw,13px)",
                  color: "rgba(140,218,110,0.55)",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  lineHeight: 1.6,
                }}>
                  Write what you want to remember.<br/>
                  The forest will keep it and return it to you.
                </div>
              </div>

              <textarea
                value={form.letter}
                onChange={e => setForm(p => ({ ...p, letter: e.target.value }))}
                onFocus={() => document.querySelectorAll('canvas').forEach(c => c.style.opacity = '0')}
                onBlur={() => document.querySelectorAll('canvas').forEach(c => c.style.opacity = '')}
                placeholder="Dear future me... write freely. No one else will read this until it reaches you."
                maxLength={2000}
                rows={3}
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: 14,
                  border: "0.5px solid rgba(70,180,50,0.22)",
                  background: "rgba(5,26,5,0.68)",
                  color: "rgba(162,238,132,0.9)",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  fontSize: "clamp(12px,2.2vw,13px)",
                  resize: "none", outline: "none", lineHeight: 1.85,
                  marginBottom: "1rem",
                }}
              />

              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              onFocus={() => document.querySelectorAll('canvas').forEach(c => { if(c.style.zIndex !== '9999') c.style.opacity = '0'; })}
onBlur={() => document.querySelectorAll('canvas').forEach(c => { if(c.style.zIndex !== '9999') c.style.opacity = ''; })}                placeholder="Your email address"
                style={{
                  width: "100%", padding: "11px 16px", borderRadius: 12,
                  border: "0.5px solid rgba(70,180,50,0.22)",
                  background: "rgba(5,26,5,0.68)",
                  color: "rgba(162,238,132,0.9)",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  fontSize: "clamp(12px,2.2vw,13px)",
                  outline: "none", marginBottom: "1rem",
                }}
              />

              <div style={{
                display: "flex", gap: 8, marginBottom: "1.4rem",
                justifyContent: "center",
              }}>
                {[7, 14, 30].map(d => (
                  <motion.button key={d}
                    onClick={() => setForm(p => ({ ...p, days: d }))}
                    whileHover={{ scale: 1.06 }}
                    style={{
                      padding: "8px 20px", borderRadius: 40,
                      border: form.days === d
                        ? "0.5px solid rgba(118,232,78,0.7)"
                        : "0.5px solid rgba(68,162,48,0.28)",
                      background: form.days === d
                        ? "rgba(18,102,14,0.8)"
                        : "rgba(7,30,7,0.62)",
                      color: form.days === d
                        ? "rgba(188,252,152,0.98)"
                        : "rgba(125,212,95,0.62)",
                      fontSize: "clamp(11px,2vw,12px)",
                      cursor: "pointer",
                      fontFamily: "Georgia, serif", fontStyle: "italic",
                      transition: "all 0.3s",
                    }}>
                    {d} days
                  </motion.button>
                ))}
              </div>

              {error && (
                <div style={{
                  color: "rgba(255,120,120,0.85)", fontSize: 11,
                  fontFamily: "Georgia, serif", marginBottom: "1rem",
                  textAlign: "center",
                }}>{error}</div>
              )}

              <motion.button onClick={send} disabled={loading}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%", padding: "clamp(12px,2.6vw,15px)",
                  borderRadius: 40,
                  border: "0.5px solid rgba(102,222,70,0.5)",
                  background: loading ? "rgba(8,40,8,0.5)" : "rgba(11,62,10,0.72)",
                  color: "rgba(182,250,148,0.96)",
                  fontSize: "clamp(12px,2.4vw,14px)",
                  cursor: loading ? "default" : "pointer",
                  letterSpacing: "0.14em",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  transition: "all 0.4s",
                }}>
                {loading
                  ? "the forest is receiving your words..."
                  : `Send to myself in ${form.days} days ✦`}
              </motion.button>
            </motion.div>
          )}

          {step === "sent" && (
            <motion.div key="sent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ textAlign: "center" }}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
                🌿
              </motion.div>
              <div style={{
                fontSize: "clamp(18px,4vw,24px)", fontWeight: 300,
                color: "rgba(172,242,142,0.96)",
                fontFamily: "Georgia, serif", marginBottom: "1rem",
                letterSpacing: "0.12em",
              }}>
                The forest has received it.
              </div>
              <div style={{
                fontSize: "clamp(12px,2.2vw,14px)",
                color: "rgba(140,218,110,0.62)",
                fontFamily: "Georgia, serif", fontStyle: "italic",
                lineHeight: 2, marginBottom: "2rem",
              }}>
                In {form.days} days, your words will find their way back to you.<br/>
                Until then, the forest holds them.
              </div>
              <motion.button onClick={() => navigate("/modes")}
                whileHover={{ scale: 1.04 }}
                style={{
                  width: "100%", padding: "12px", borderRadius: 40,
                  border: "0.5px solid rgba(100,222,70,0.48)",
                  background: "rgba(11,62,10,0.72)",
                  color: "rgba(182,250,148,0.96)",
                  fontSize: "clamp(12px,2.4vw,14px)", cursor: "pointer",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  letterSpacing: "0.12em",
                }}>Return to the Forest</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
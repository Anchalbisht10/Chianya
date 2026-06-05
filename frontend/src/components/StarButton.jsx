import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { submitRating, getRatings, deleteRating } from "../services/api";

const EMOJIS = ["🌿", "🧘", "🌸", "🦋", "✨", "🌙", "🍃", "🌊", "🦚", "🌺", "🔮", "🌻", "🦉", "🌴", "💫", "🍀"];

export default function StarButton() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("rate");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [emoji, setEmoji] = useState("🌿");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (open) {
      getRatings().then(data => {
        if (data?.ratings) {
          setRatings(data.ratings);
          setAverage(data.average);
          setTotal(data.total);
        }
      }).catch(() => {});
    }
  }, [open]);

  if (location.pathname === "/" || location.pathname === "/auth") return null;

 const submit = async () => {
    if (!stars) return;
    setLoading(true);
    try {
      const data = await submitRating({ stars, message, emoji, name });
      if (data.success) {
        const myRatings = JSON.parse(localStorage.getItem("myRatings") || "[]");
        myRatings.push(data.rating._id);
        localStorage.setItem("myRatings", JSON.stringify(myRatings));
      }
      setSubmitted(true);
      setStep("view");
      getRatings().then(data => {
        if (data?.ratings) {
          setRatings(data.ratings);
          setAverage(data.average);
          setTotal(data.total);
        }
      });
    } catch {}
    setLoading(false);
  };

  return (
    <>
      {/* Star button */}
      <motion.div
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          ...(isMobile ? {
            bottom: 16,
            left: 16,
          } : {
            top: 16,
            right: 16,
          }),
          zIndex: 100,
          width: 52, height: 52,
          borderRadius: "50%",
          background: "rgba(3,14,5,0.92)",
          border: "1.5px solid rgba(255,210,60,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          cursor: "pointer",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 16px rgba(255,200,40,0.15)",
        }}>
        ⭐
      </motion.div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              ...(isMobile ? {
                bottom: 80,
                left: 16,
                right: 16,
              } : {
                top: 80,
                right: 16,
                width: 340,
              }),
              zIndex: 99,
              background: "rgba(3,14,5,0.97)",
              border: "0.5px solid rgba(98,222,68,0.3)",
              borderRadius: 20,
              backdropFilter: "blur(28px)",
              boxShadow: "0 0 40px rgba(20,140,20,0.15)",
              maxHeight: "80vh",
              overflowY: "auto",
            }}>

            {/* Header */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 18px 8px",
              borderBottom: "0.5px solid rgba(70,180,50,0.12)",
            }}>
              <div style={{
                fontSize: 13, color: "rgba(172,242,142,0.9)",
                fontFamily: "Georgia, serif", fontStyle: "italic",
              }}>
                {total > 0 ? `⭐ ${average} · ${total} voices` : "Rate Chianya"}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setStep("rate")} style={{
                  background: step === "rate" ? "rgba(14,78,12,0.8)" : "transparent",
                  border: "0.5px solid rgba(68,175,50,0.2)",
                  borderRadius: 20, padding: "4px 12px",
                  color: "rgba(162,238,132,0.8)", fontSize: 10,
                  cursor: "pointer", fontFamily: "Georgia, serif",
                }}>rate</button>
                <button onClick={() => setStep("view")} style={{
                  background: step === "view" ? "rgba(14,78,12,0.8)" : "transparent",
                  border: "0.5px solid rgba(68,175,50,0.2)",
                  borderRadius: 20, padding: "4px 12px",
                  color: "rgba(162,238,132,0.8)", fontSize: 10,
                  cursor: "pointer", fontFamily: "Georgia, serif",
                }}>all reviews</button>
                <button onClick={() => setOpen(false)} style={{
                  background: "none", border: "none",
                  color: "rgba(85,175,62,0.4)", fontSize: 16,
                  cursor: "pointer",
                }}>✕</button>
              </div>
            </div>

            {/* Rate tab */}
            {step === "rate" && (
              <div style={{ padding: "16px 18px" }}>
                {submitted ? (
                  <div style={{
                    textAlign: "center", padding: "1rem",
                    color: "rgba(162,238,132,0.8)",
                    fontFamily: "Georgia, serif", fontStyle: "italic",
                    fontSize: 13, lineHeight: 1.9,
                  }}>
                    🌿 Thank you. The forest remembers your voice.
                  </div>
                ) : (
                  <>
                    {/* Stars */}
                    <div style={{
                      display: "flex", justifyContent: "center",
                      gap: 8, marginBottom: 16,
                    }}>
                      {[1,2,3,4,5].map(s => (
                        <motion.div key={s}
                          whileHover={{ scale: 1.2 }}
                          onMouseEnter={() => setHover(s)}
                          onMouseLeave={() => setHover(0)}
                          onClick={() => setStars(s)}
                          style={{
                            fontSize: 28, cursor: "pointer",
                            filter: s <= (hover || stars)
                              ? "brightness(1.5)"
                              : "brightness(0.4)",
                            transition: "filter 0.2s",
                          }}>⭐</motion.div>
                      ))}
                    </div>

                    {/* Emoji picker */}
                    <div style={{
                      fontSize: 10, letterSpacing: "0.2em",
                      color: "rgba(92,195,68,0.35)",
                      fontFamily: "Georgia, serif",
                      marginBottom: 8,
                    }}>CHOOSE YOUR AVATAR</div>
                    <div style={{
                      display: "flex", flexWrap: "wrap",
                      gap: 8, marginBottom: 14,
                    }}>
                      {EMOJIS.map(e => (
                        <motion.div key={e}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => setEmoji(e)}
                          style={{
                            fontSize: 22, cursor: "pointer",
                            padding: 4, borderRadius: 8,
                            background: emoji === e
                              ? "rgba(14,78,12,0.8)"
                              : "transparent",
                            border: emoji === e
                              ? "0.5px solid rgba(98,222,68,0.4)"
                              : "0.5px solid transparent",
                          }}>{e}</motion.div>
                      ))}
                    </div>

                    {/* Name */}
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name (optional)"
                      style={{
                        width: "100%", padding: "8px 12px",
                        borderRadius: 10, marginBottom: 10,
                        border: "0.5px solid rgba(70,180,50,0.2)",
                        background: "rgba(5,26,5,0.68)",
                        color: "rgba(162,238,132,0.9)",
                        fontFamily: "Georgia, serif", fontStyle: "italic",
                        fontSize: 12, outline: "none",
                      }}
                    />

                    {/* Message */}
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Share what Chianya gave you... (optional)"
                      maxLength={300}
                      rows={3}
                      style={{
                        width: "100%", padding: "8px 12px",
                        borderRadius: 10, marginBottom: 12,
                        border: "0.5px solid rgba(70,180,50,0.2)",
                        background: "rgba(5,26,5,0.68)",
                        color: "rgba(162,238,132,0.9)",
                        fontFamily: "Georgia, serif", fontStyle: "italic",
                        fontSize: 12, outline: "none",
                        resize: "none",
                      }}
                    />

                    <motion.button
                      onClick={submit}
                      disabled={!stars || loading}
                      whileHover={{ scale: 1.03 }}
                      style={{
                        width: "100%", padding: "10px",
                        borderRadius: 40,
                        border: "0.5px solid rgba(102,222,70,0.5)",
                        background: !stars ? "rgba(8,40,8,0.5)" : "rgba(11,62,10,0.72)",
                        color: "rgba(182,250,148,0.96)",
                        fontSize: 12, cursor: !stars ? "default" : "pointer",
                        fontFamily: "Georgia, serif", fontStyle: "italic",
                        letterSpacing: "0.12em",
                      }}>
                      {loading ? "releasing..." : "Release into the Forest ✦"}
                    </motion.button>
                  </>
                )}
              </div>
            )}

            {/* View tab */}
            {step === "view" && (
              <div style={{ padding: "12px 18px" }}>
                {ratings.length === 0 ? (
                  <div style={{
                    textAlign: "center", padding: "1.5rem",
                    color: "rgba(85,175,62,0.35)",
                    fontFamily: "Georgia, serif", fontStyle: "italic",
                    fontSize: 12,
                  }}>The forest is waiting for its first voice.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {ratings.map((r, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: "0.5px solid rgba(66,160,46,0.18)",
                          background: "rgba(5,22,5,0.55)",
                        }}>
                        <div style={{
                          display: "flex", alignItems: "center",
                          gap: 8, marginBottom: 4,
                        }}>
                          <span style={{ fontSize: 18 }}>{r.emoji}</span>
                          <span style={{
                            fontSize: 11, color: "rgba(162,238,132,0.8)",
                            fontFamily: "Georgia, serif",
                          }}>{r.name || "Anonymous"}</span>
                          <span style={{ marginLeft: "auto", fontSize: 11 }}>
                            {"⭐".repeat(r.stars)}
                          </span>
                        </div>
                      {JSON.parse(localStorage.getItem("myRatings") || "[]").includes(r._id) && (
                          <button
                            onClick={async () => {
                              await deleteRating(r._id);
                              const myRatings = JSON.parse(localStorage.getItem("myRatings") || "[]");
                              localStorage.setItem("myRatings", JSON.stringify(myRatings.filter(id => id !== r._id)));
                              setRatings(prev => prev.filter(x => x._id !== r._id));
                            }}
                            style={{
                              background: "none", border: "none",
                              color: "rgba(255,80,80,0.25)",
                              cursor: "pointer", fontSize: 10,
                              fontFamily: "Georgia, serif",
                              float: "right",
                            }}
                            onMouseEnter={e => e.target.style.color = "rgba(255,80,80,0.6)"}
                            onMouseLeave={e => e.target.style.color = "rgba(255,80,80,0.25)"}
                          >remove</button>
                        )}
                        {r.message && (
                          <div style={{
                            fontSize: 11,
                            color: "rgba(125,205,95,0.65)",
                            fontFamily: "Georgia, serif", fontStyle: "italic",
                            lineHeight: 1.7,
                          }}>"{r.message}"</div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
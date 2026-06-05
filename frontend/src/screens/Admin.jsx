import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ADMIN_KEY = "chianya_admin_2026";
const BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function Admin() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("overview");

  const load = async (inputKey) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE}/api/admin/overview`, {
        headers: { "x-admin-key": inputKey || key },
        credentials: "include",
      });
      const json = await res.json();
      if (json.error) { setError(json.error); setLoading(false); return; }
      setData(json);
      setAuthed(true);
    } catch {
      setError("Could not connect to backend.");
    }
    setLoading(false);
  };

  const s = (val) => ({
    fontSize: "clamp(9px,1.5vw,10px)",
    letterSpacing: "0.22em",
    color: "rgba(92,195,68,0.38)",
    fontFamily: "Georgia, serif",
    marginBottom: 6,
    val,
  });

  if (!authed) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem",
      }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "rgba(3,14,5,0.95)",
          border: "0.5px solid rgba(70,180,50,0.2)",
          borderRadius: 20, padding: "2.5rem",
          maxWidth: 380, width: "100%",
          backdropFilter: "blur(28px)",
          textAlign: "center",
        }}>
        <div style={{
          fontSize: 28, fontWeight: 300,
          color: "rgba(172,242,142,0.96)",
          fontFamily: "Georgia, serif",
          letterSpacing: "0.18em",
          marginBottom: 8,
        }}>Admin</div>
        <div style={{
          fontSize: 11, color: "rgba(92,195,68,0.35)",
          fontFamily: "Georgia, serif", fontStyle: "italic",
          marginBottom: "2rem",
        }}>chianya forest — restricted access</div>

        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === "Enter" && load(key)}
          placeholder="Admin key"
          style={{
            width: "100%", padding: "10px 14px",
            borderRadius: 10, marginBottom: 12,
            border: "0.5px solid rgba(70,180,50,0.2)",
            background: "rgba(5,26,5,0.68)",
            color: "rgba(162,238,132,0.9)",
            fontFamily: "Georgia, serif",
            fontSize: 13, outline: "none",
          }}
        />

        {error && <div style={{
          color: "rgba(255,100,100,0.8)", fontSize: 11,
          fontFamily: "Georgia, serif", marginBottom: 10,
        }}>{error}</div>}

        <motion.button
          onClick={() => load(key)}
          disabled={loading}
          whileHover={{ scale: 1.04 }}
          style={{
            width: "100%", padding: "11px",
            borderRadius: 40,
            border: "0.5px solid rgba(102,222,70,0.5)",
            background: "rgba(11,62,10,0.72)",
            color: "rgba(182,250,148,0.96)",
            fontSize: 13, cursor: "pointer",
            fontFamily: "Georgia, serif", fontStyle: "italic",
          }}>
          {loading ? "entering..." : "Enter"}
        </motion.button>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        overflowY: "auto", padding: "clamp(1rem,3vw,2rem)",
      }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "1.5rem",
        }}>
          <div style={{
            fontSize: "clamp(18px,3vw,22px)", fontWeight: 300,
            color: "rgba(172,242,142,0.96)",
            fontFamily: "Georgia, serif", letterSpacing: "0.14em",
          }}>Chianya Admin</div>
          <motion.button onClick={() => navigate("/")}
            whileHover={{ scale: 1.06 }}
            style={{
              background: "rgba(7,36,7,0.65)",
              border: "0.5px solid rgba(70,180,48,0.28)",
              borderRadius: 24, color: "rgba(122,208,84,0.52)",
              fontSize: 11, cursor: "pointer",
              letterSpacing: "0.22em",
              fontFamily: "Georgia, serif", padding: "6px 18px",
            }}>← Exit</motion.button>
        </div>

        {/* Overview cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 10, marginBottom: "1.5rem",
        }}>
          {[
            { label: "Total Users", value: data.totalUsers },
            { label: "Total Sessions", value: data.totalSessions },
            { label: "Mood Entries", value: data.totalMoodEntries },
            { label: "Conversations", value: data.totalConversations },
            { label: "Star Ratings", value: data.totalRatings },
            { label: "Avg Rating", value: `⭐ ${data.avgRating}` },
            { label: "Letters Sent", value: data.letters.total },
            { label: "Delivered", value: data.letters.delivered },
          ].map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: "rgba(3,14,5,0.92)",
                border: "0.5px solid rgba(66,160,46,0.22)",
                borderRadius: 14, padding: "1rem",
                textAlign: "center",
                backdropFilter: "blur(16px)",
              }}>
              <div style={{
                fontSize: "clamp(22px,4vw,28px)", fontWeight: 300,
                color: "rgba(172,242,142,0.96)",
                fontFamily: "Georgia, serif",
              }}>{c.value}</div>
              <div style={{
                fontSize: 9, letterSpacing: "0.2em",
                color: "rgba(85,175,62,0.4)",
                fontFamily: "Georgia, serif",
              }}>{c.label.toUpperCase()}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 8, marginBottom: "1.2rem",
          flexWrap: "wrap",
        }}>
          {["users", "moods", "ratings"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "6px 18px", borderRadius: 40,
              border: tab === t
                ? "0.5px solid rgba(118,232,78,0.6)"
                : "0.5px solid rgba(68,162,48,0.28)",
              background: tab === t
                ? "rgba(18,102,14,0.8)"
                : "rgba(7,30,7,0.62)",
              color: tab === t
                ? "rgba(188,252,152,0.98)"
                : "rgba(125,212,95,0.62)",
              fontSize: 11, cursor: "pointer",
              fontFamily: "Georgia, serif", fontStyle: "italic",
            }}>{t}</button>
          ))}
        </div>

        {/* Users tab */}
        {tab === "users" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.users.map((u, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  background: "rgba(3,14,5,0.88)",
                  border: "0.5px solid rgba(66,160,46,0.18)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backdropFilter: "blur(12px)",
                }}>
                <div>
                  <div style={{
                    fontSize: 13,
                    color: "rgba(162,238,132,0.9)",
                    fontFamily: "Georgia, serif",
                    marginBottom: 3,
                  }}>{u.firstName}</div>
                  <div style={{
                    fontSize: 10,
                    color: "rgba(85,175,62,0.4)",
                    fontFamily: "Georgia, serif",
                  }}>{u.email}</div>
                </div>
                <div style={{
                  fontSize: 9,
                  color: "rgba(85,175,62,0.3)",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.1em",
                }}>
                  {new Date(u.joinedDate).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Moods tab */}
        {tab === "moods" && (
          <div>
            <div style={{
              display: "flex", flexWrap: "wrap",
              gap: 8, marginBottom: "1.2rem",
            }}>
              {Object.entries(data.moodCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([feeling, count], i) => (
                  <div key={i} style={{
                    padding: "5px 14px", borderRadius: 20,
                    background: "rgba(5,22,5,0.7)",
                    border: "0.5px solid rgba(70,180,50,0.25)",
                    fontSize: 11,
                    color: "rgba(142,218,108,0.8)",
                    fontFamily: "Georgia, serif", fontStyle: "italic",
                  }}>{feeling} · {count}</div>
                ))}
            </div>

            <div style={{
              fontSize: 9, letterSpacing: "0.22em",
              color: "rgba(92,195,68,0.35)",
              fontFamily: "Georgia, serif",
              marginBottom: 10,
            }}>RECENT ENTRIES</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {data.recentMoods.map((m, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "8px 12px", borderRadius: 10,
                  background: "rgba(3,14,5,0.8)",
                  border: "0.5px solid rgba(66,160,46,0.15)",
                }}>
                  <span style={{
                    fontSize: 11, fontStyle: "italic",
                    color: "rgba(142,218,108,0.75)",
                    fontFamily: "Georgia, serif",
                  }}>{m.feeling}</span>
                  <span style={{
                    fontSize: 9,
                    color: "rgba(85,175,62,0.3)",
                    fontFamily: "Georgia, serif",
                  }}>
                    {new Date(m.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ratings tab */}
        {tab === "ratings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.ratings.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  background: "rgba(3,14,5,0.88)",
                  border: "0.5px solid rgba(66,160,46,0.18)",
                  borderRadius: 12, padding: "12px 16px",
                  backdropFilter: "blur(12px)",
                }}>
                <div style={{
                  display: "flex", alignItems: "center",
                  gap: 8, marginBottom: 4,
                }}>
                  <span style={{ fontSize: 18 }}>{r.emoji}</span>
                  <span style={{
                    fontSize: 12,
                    color: "rgba(162,238,132,0.85)",
                    fontFamily: "Georgia, serif",
                  }}>{r.name || "Anonymous"}</span>
                  <span style={{
                    marginLeft: "auto", fontSize: 12,
                  }}>{"⭐".repeat(r.stars)}</span>
                </div>
                {r.message && (
                  <div style={{
                    fontSize: 11,
                    color: "rgba(125,205,95,0.6)",
                    fontFamily: "Georgia, serif", fontStyle: "italic",
                    lineHeight: 1.7,
                  }}>"{r.message}"</div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
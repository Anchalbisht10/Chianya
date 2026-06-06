import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getMyActivity, logout, getMoodTimeline } from "../services/api";
import { useChianya } from "../context/ChianyaContext";
import { getStreak } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const { } = useChianya();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    getStreak().then(data => {
      if (data?.streak !== undefined) setStreak(data);
    }).catch(() => {});
  }, []);

getMyActivity().then(data => {
      if (data?.activity) setActivity(data.activity);
      setLoading(false);
    }).catch(() => setLoading(false));

    getMoodTimeline().then(data => {
      if (data?.entries) setTimeline(data.entries);
    }).catch(() => {});

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const stats = activity ? [
    { label: "Times with Antar", value: activity.antarSessionCount, icon: "✦" },
    { label: "Breathing Sessions", value: activity.breathingSessionsCompleted, icon: "◌" },
    { label: "Releases", value: activity.releaseSessionCount, icon: "↑" },
    { label: "Grounding Sessions", value: activity.groundSessionCount, icon: "⊕" },
    { label: "Wisdom Received", value: activity.wisdomSessionCount, icon: "◈" },
    { label: "Times Just Sitting", value: activity.justSitSessionCount, icon: "○" },
  ] : [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
   style={{
  position: "absolute", inset: 0, zIndex: 10,
 display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "clamp(1rem,3vw,2rem)",
        paddingTop: "4rem",
        overflowY: "auto",
}}
      >
      <motion.div
     className="dashboard-card"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(3,14,5,0.92)",
          border: "0.5px solid rgba(70,180,50,0.18)",
          borderRadius: "clamp(16px,3vw,24px)",
        padding: "clamp(0.8rem,2vw,1.4rem)",
         maxWidth: 480, width: "100%",
         maxHeight: "78vh", overflowY: "auto",
          backdropFilter: "blur(28px)",
          boxShadow: "0 0 80px rgba(20,140,20,0.09)",
 maxHeight: "calc(100vh - 160px)",
          overflowY: "auto",
        }}>

        {/* Header */}
      <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "1rem",
          flexWrap: "nowrap", gap: 8,
        }}>
          <motion.button onClick={() => navigate("/entry")}
            whileHover={{ scale: 1.06 }}
            style={{
              background: "rgba(7,36,7,0.65)",
              border: "0.5px solid rgba(70,180,48,0.28)",
              borderRadius: 24, color: "rgba(122,208,84,0.52)",
              fontSize: 11, cursor: "pointer", letterSpacing: "0.22em",
              fontFamily: "Georgia, serif", padding: "6px 18px",
              backdropFilter: "blur(12px)",
              transition: "all 0.4s",
            }}>← Forest</motion.button>

          <motion.button onClick={handleLogout}
            whileHover={{ scale: 1.06 }}
            style={{
              background: "transparent",
              border: "0.5px solid rgba(70,180,48,0.18)",
              borderRadius: 24, color: "rgba(122,208,84,0.35)",
              fontSize: 11, cursor: "pointer", letterSpacing: "0.22em",
              fontFamily: "Georgia, serif", padding: "6px 18px",
              transition: "all 0.4s",
            }}>Leave Sanctuary</motion.button>
        </div>

     {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <div style={{
            fontSize: "clamp(22px,5vw,28px)", fontWeight: 300,
            letterSpacing: "0.18em", color: "rgba(172,242,142,0.96)",
            fontFamily: "Georgia, serif", marginBottom: 6,
          }}>
            {activity?.firstName ? `${activity.firstName}'s Sanctuary` : "Your Sanctuary"}
          </div>
          <div style={{
            fontSize: "clamp(11px,2vw,13px)",
            color: "rgba(145,222,115,0.6)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            marginBottom: 6, lineHeight: 1.8,
          }}>
            {activity?.totalVisits > 5
              ? `The forest remembers you. ${activity.totalVisits} visits and counting.`
              : activity?.totalVisits > 1
              ? `Welcome back. The forest held your space.`
              : `Your journey begins here.`}
          </div>
          <div style={{
            fontSize: "clamp(9px,1.8vw,11px)", letterSpacing: "0.38em",
            color: "rgba(98,200,75,0.28)", fontFamily: "Georgia, serif",
          }}>
            {activity?.totalVisits
              ? `${activity.totalVisits} visits to the forest`
              : "your journey through the forest"}
          </div>
        </div>

        {/* Stats grid */}
        {loading ? (
          <div style={{
            textAlign: "center", color: "rgba(95,185,70,0.4)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            padding: "2rem",
          }}>The forest is remembering...</div>
        ) : (
          <div style={{
           display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: 6, marginBottom: "1rem",
          }}>
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "rgba(5,26,5,0.68)",
                  border: "0.5px solid rgba(66,160,46,0.22)",
                  borderRadius: 14, padding: "1rem 0.5rem",
                  textAlign: "center",
                }}>
                <div style={{
                  fontSize: 20, color: "rgba(142,218,108,0.6)",
                  marginBottom: 6,
                }}>{s.icon}</div>
                <div style={{
                  fontSize: "clamp(20px,4vw,26px)", fontWeight: 300,
                  color: "rgba(172,242,142,0.96)",
                  fontFamily: "Georgia, serif", marginBottom: 4,
                }}>{s.value || 0}</div>
                <div style={{
                  fontSize: "clamp(8px,1.4vw,9px)",
                  color: "rgba(85,175,62,0.44)",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  lineHeight: 1.4,
                }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Streak section */}
        {streak && streak.streak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{
              marginBottom: "1.4rem",
              padding: "clamp(12px,2.5vw,18px)",
              borderRadius: 16,
              border: streak.streak >= 7
                ? "0.5px solid rgba(255,210,60,0.3)"
                : "0.5px solid rgba(68,175,50,0.2)",
              background: streak.streak >= 7
                ? "rgba(20,15,5,0.7)"
                : "rgba(4,18,5,0.55)",
              position: "relative",
              zIndex: 2,
            }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}>
              <div>
                <div style={{
                  fontSize: "clamp(8px,1.4vw,9px)",
                  letterSpacing: "0.28em",
                  color: "rgba(92,195,68,0.35)",
                  fontFamily: "Georgia, serif",
                  marginBottom: 4,
                }}>YOUR FOREST STREAK</div>
                <div style={{
                  fontSize: "clamp(22px,4vw,28px)",
                  color: streak.streak >= 7
                    ? "rgba(255,210,80,0.95)"
                    : "rgba(172,242,142,0.96)",
                  fontFamily: "Georgia, serif",
                  fontWeight: 300,
                }}>
                  {streak.streak} {streak.streak === 1 ? "day" : "days"}
                </div>
                <div style={{
                  fontSize: "clamp(9px,1.6vw,10px)",
                  color: "rgba(85,175,62,0.38)",
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                }}>longest: {streak.longest} days</div>
              </div>

              {/* Badge */}
              <div style={{ textAlign: "center" }}>
                {streak.badge === "forest_elder" && (
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}>
                    <div style={{ fontSize: "clamp(28px,5vw,36px)" }}>🌳</div>
                    <div style={{
                      fontSize: 8, letterSpacing: "0.2em",
                      color: "rgba(255,210,80,0.6)",
                      fontFamily: "Georgia, serif",
                    }}>FOREST ELDER</div>
                  </motion.div>
                )}
                {streak.badge === "forest_keeper" && (
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}>
                    <div style={{ fontSize: "clamp(28px,5vw,36px)" }}>🌲</div>
                    <div style={{
                      fontSize: 8, letterSpacing: "0.2em",
                      color: "rgba(172,242,142,0.6)",
                      fontFamily: "Georgia, serif",
                    }}>FOREST KEEPER</div>
                  </motion.div>
                )}
                {streak.badge === "forest_walker" && (
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}>
                    <div style={{ fontSize: "clamp(28px,5vw,36px)" }}>🌿</div>
                    <div style={{
                      fontSize: 8, letterSpacing: "0.2em",
                      color: "rgba(162,238,132,0.6)",
                      fontFamily: "Georgia, serif",
                    }}>FOREST WALKER</div>
                  </motion.div>
                )}
                {streak.badge === "forest_seedling" && (
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}>
                    <div style={{ fontSize: "clamp(28px,5vw,36px)" }}>🌱</div>
                    <div style={{
                      fontSize: 8, letterSpacing: "0.2em",
                      color: "rgba(145,222,115,0.55)",
                      fontFamily: "Georgia, serif",
                    }}>FOREST SEEDLING</div>
                  </motion.div>
                )}
                {!streak.badge && (
                  <div style={{ fontSize: "clamp(22px,4vw,28px)" }}>🪨</div>
                )}
              </div>
            </div>

            {/* Progress bar to next badge */}
            <div style={{
              fontSize: "clamp(8px,1.4vw,9px)",
              color: "rgba(85,175,62,0.35)",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              marginBottom: 6,
            }}>
              {streak.streak < 3 && `${3 - streak.streak} more days to Forest Seedling 🌱`}
              {streak.streak >= 3 && streak.streak < 7 && `${7 - streak.streak} more days to Forest Walker 🌿`}
              {streak.streak >= 7 && streak.streak < 14 && `${14 - streak.streak} more days to Forest Keeper 🌲`}
              {streak.streak >= 14 && streak.streak < 30 && `${30 - streak.streak} more days to Forest Elder 🌳`}
              {streak.streak >= 30 && "You have reached the highest level. The forest bows to you."}
            </div>

            {/* Progress bar */}
            <div style={{
              height: 3,
              borderRadius: 4,
              background: "rgba(70,180,50,0.12)",
              overflow: "hidden",
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (
                    streak.streak < 3 ? (streak.streak / 3) * 100 :
                    streak.streak < 7 ? ((streak.streak - 3) / 4) * 100 :
                    streak.streak < 14 ? ((streak.streak - 7) / 7) * 100 :
                    streak.streak < 30 ? ((streak.streak - 14) / 16) * 100 : 100
                  ))}%`
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                  height: "100%",
                  borderRadius: 4,
                  background: streak.streak >= 7
                    ? "rgba(255,210,60,0.6)"
                    : "rgba(98,222,68,0.5)",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Joined date */}
        {activity?.joinedDate && (
          <div style={{
            textAlign: "center",
            fontSize: "clamp(10px,1.8vw,11px)",
            color: "rgba(85,175,62,0.3)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            marginBottom: "1.4rem",
          }}>
            In the forest since {new Date(activity.joinedDate).toLocaleDateString("en-IN", {
              day: "numeric", month: "long", year: "numeric"
            })}
          </div>
        )}
{/* Mood Timeline */}
        {timeline.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ marginBottom: "1.6rem" }}>
            <div style={{
              fontSize: "clamp(8px,1.4vw,9px)",
              letterSpacing: "0.28em",
              color: "rgba(92,195,68,0.35)",
              fontFamily: "Georgia, serif",
              marginBottom: "1rem",
            }}>YOUR LAST 7 DAYS</div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}>
              {(() => {
                const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                const grouped = {};
                timeline.forEach(e => {
                  const d = new Date(e.createdAt);
                  const key = days[d.getDay()];
                  if (!grouped[key]) grouped[key] = [];
                  grouped[key].push(e.feeling);
                });

                const feelingColors = {
                  anxious: "rgba(255,180,60,0.7)",
                  heavy: "rgba(100,140,255,0.7)",
                  lonely: "rgba(180,120,255,0.7)",
                  overwhelmed: "rgba(255,100,100,0.7)",
                  restless: "rgba(255,200,60,0.7)",
                  tired: "rgba(140,180,200,0.7)",
                  lost: "rgba(120,160,255,0.7)",
                  scattered: "rgba(255,160,80,0.7)",
                  numb: "rgba(160,160,180,0.7)",
                  stuck: "rgba(180,140,100,0.7)",
                  hurt: "rgba(255,120,120,0.7)",
                  hollow: "rgba(140,140,160,0.7)",
                };

                return Object.entries(grouped).map(([day, feelings], i) => (
                  <motion.div key={day}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}>
                    <div style={{
                      fontSize: "clamp(9px,1.5vw,10px)",
                      color: "rgba(85,175,62,0.4)",
                      fontFamily: "Georgia, serif",
                      width: 28,
                      flexShrink: 0,
                    }}>{day}</div>
                    <div style={{
                      display: "flex", gap: 6, flexWrap: "wrap",
                    }}>
                      {[...new Set(feelings)].map((f, j) => (
                        <div key={j} style={{
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: "clamp(9px,1.5vw,10px)",
                          fontFamily: "Georgia, serif",
                          fontStyle: "italic",
                          background: "rgba(5,22,5,0.7)",
                          border: `0.5px solid ${feelingColors[f] || "rgba(70,180,50,0.3)"}`,
                          color: feelingColors[f] || "rgba(142,218,108,0.7)",
                        }}>{f}</div>
                      ))}
                    </div>
                  </motion.div>
                ));
              })()}
            </div>
          </motion.div>
        )}

        <motion.div
          style={{ height: "0.5px", background: "rgba(70,180,50,0.14)", marginBottom: "1.4rem" }}
        />

        {/* Enter forest button */}
        <motion.button
          onClick={() => navigate("/entry")}
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
          }}>Enter the Forest</motion.button>
      </motion.div>
    </motion.div>
  );
}
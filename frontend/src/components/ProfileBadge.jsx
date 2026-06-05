import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getMe } from "../services/api";

export default function ProfileBadge() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 useEffect(() => {
    getMe().then(data => {
      if (data?.user) setUser(data.user);
      else setUser(null);
    }).catch(() => { setUser(null); });
  }, [location.pathname]);
if (location.pathname === "/" || location.pathname === "/auth") return null;


  return (
    <div style={{
      position: "fixed",
      top: 16,
      left: 16,
      zIndex: 100,
    }}>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            background: "rgba(3,14,5,0.95)",
            border: "0.5px solid rgba(98,222,68,0.45)",
            borderRadius: 16,
            padding: "14px 18px",
            marginBottom: 8,
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            minWidth: 160,
          }}>
     <span style={{
            fontSize: 14,
            color: "rgba(162,238,132,0.9)",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}>{user ? user.firstName : "guest"}</span>
          {user && (
            <span style={{
              fontSize: 10,
              color: "rgba(98,202,68,0.4)",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.14em",
            }}>your sanctuary</span>
          )}
          {user ? (
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button onClick={() => { setExpanded(false); navigate("/dashboard"); }}
                style={{
                  padding: "5px 14px", borderRadius: 20,
                  border: "0.5px solid rgba(98,222,68,0.4)",
                  background: "rgba(10,55,10,0.7)",
                  color: "rgba(162,238,132,0.9)",
                  fontSize: 11, cursor: "pointer",
                  fontFamily: "Georgia, serif",
                }}>dashboard</button>
              <button onClick={async () => {
                const base = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
                await fetch(`${base}/api/auth/logout`, { method: "POST", credentials: "include" }).catch(()=>{});
                setUser(null);
                setExpanded(false);
                navigate("/auth");
              }}
                style={{
                  padding: "5px 14px", borderRadius: 20,
                  border: "0.5px solid rgba(255,80,80,0.3)",
                  background: "transparent",
                  color: "rgba(255,100,100,0.5)",
                  fontSize: 11, cursor: "pointer",
                  fontFamily: "Georgia, serif",
                }}>leave</button>
            </div>
          ) : (
            <button onClick={() => { setExpanded(false); navigate("/auth"); }}
              style={{
                padding: "5px 16px", borderRadius: 20,
                border: "0.5px solid rgba(98,222,68,0.3)",
                background: "rgba(10,55,10,0.7)",
                color: "rgba(162,238,132,0.8)",
                fontSize: 11, cursor: "pointer",
                fontFamily: "Georgia, serif",
              }}>sign in</button>
          )}
        </motion.div>
      )}

      <motion.div
        onClick={() => setExpanded(e => !e)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 52, height: 52,
          borderRadius: "50%",
          background: "rgba(3,14,5,0.92)",
          border: user
            ? "1.5px solid rgba(98,222,68,0.6)"
            : "1.5px solid rgba(70,140,50,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          cursor: "pointer",
          backdropFilter: "blur(16px)",
          boxShadow: user ? "0 0 16px rgba(58,202,38,0.2)" : "none",
          position: "relative",
        }}>
        {user ? "🧘" : "🌿"}
        {user && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: "absolute",
              bottom: 2, right: 2,
              width: 8, height: 8,
              borderRadius: "50%",
              background: "rgba(98,222,68,0.9)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
  }
 


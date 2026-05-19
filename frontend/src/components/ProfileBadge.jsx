import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getMe } from "../services/api";

export default function ProfileBadge() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe().then(data => {
      if (data?.user) setUser(data.user);
    }).catch(() => {});
  }, [location.pathname]);

  if (location.pathname === "/" || location.pathname === "/auth") return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      onClick={() => user ? navigate("/dashboard") : navigate("/auth")}
      style={{
        position: "fixed",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        background: "rgba(3,14,5,0.88)",
        border: user
          ? "0.5px solid rgba(98,222,68,0.45)"
          : "0.5px solid rgba(70,140,50,0.22)",
        borderRadius: "0 16px 16px 0",
        padding: "16px 12px",
        backdropFilter: "blur(16px)",
       boxShadow: user
          ? "4px 0 30px rgba(58,202,38,0.12)"
          : "4px 0 20px rgba(20,80,20,0.08)",
        transition: "all 0.4s",
        minWidth: 64,
      }}
    >
      {/* Floating monk emoji */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: 72, lineHeight: 2 }}
      >
        {user ? "🧘" : "🌿"}
      </motion.div>

      {/* Name */}
      <span style={{
        fontSize: 11,
        letterSpacing: "0.14em",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        color: user ? "rgba(162,238,132,0.9)" : "rgba(85,175,62,0.4)",
        textAlign: "center",
      }}>
        {user ? user.firstName : "guest"}
      </span>

      {/* Sanctuary label */}
      <span style={{
        fontSize: 8,
        letterSpacing: "0.12em",
        fontFamily: "Georgia, serif",
        color: user ? "rgba(98,202,68,0.5)" : "rgba(70,140,50,0.3)",
        textAlign: "center",
        lineHeight: 1.4,
      }}>
        {user ? "sanctuary" : "sign in"}
      </span>


      {/* Logout */}
      {user && (
        <motion.div
          onClick={async (e) => {
            e.stopPropagation();
            await fetch("http://localhost:5000/api/auth/logout", {
              method: "POST", credentials: "include"
            }).catch(()=>{});
            setUser(null);
            navigate("/auth");
          }}
          style={{
           fontSize: "clamp(10px,1.6vw,11px)",
            color: "rgba(85,175,62,0.35)",
            fontFamily: "Georgia, serif",
            cursor: "pointer",
            letterSpacing: "0.1em",
            padding: "2px 6px",
            borderRadius: 8,
            border: "0.5px solid rgba(70,140,50,0.2)",
            transition: "all 0.3s",
          }}
          whileHover={{ color: "rgba(255,100,100,0.6)" }}
        >
          leave
        </motion.div>
      )}

      {/* Online dot */}
      {user && (
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "rgba(98,222,68,0.9)",
            marginTop: 2,
          }}
        />
      )}
    </motion.div>
  );
}

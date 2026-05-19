import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { register, login } from "../services/api";
import { useChianya } from "../context/ChianyaContext";

export default function Auth() {
  const navigate = useNavigate();
  const { setAvatarLine } = useChianya();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ firstName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setError("");
    setLoading(true);
    try {
      const fn = mode === "login" ? login : register;
      const data = await fn(form);
      if (data.error) { setError(data.error); setLoading(false); return; }
      setAvatarLine("The forest welcomes you back. You are safe here.");
      navigate("/dashboard");
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
          maxWidth: 420, width: "100%",
          backdropFilter: "blur(28px)",
          boxShadow: "0 0 80px rgba(20,140,20,0.09)",
        }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            fontSize: "clamp(28px,6vw,38px)", fontWeight: 300,
            letterSpacing: "0.18em", color: "rgba(172,242,142,0.96)",
            fontFamily: "Georgia, serif",
            textShadow: "0 0 50px rgba(58,222,58,0.3)",
            marginBottom: 6,
          }}>Chianya</div>
          <div style={{
            fontSize: "clamp(9px,1.8vw,11px)", letterSpacing: "0.38em",
            color: "rgba(98,200,75,0.36)", fontFamily: "Georgia, serif",
          }}>forest of consciousness</div>
        </div>

        {/* Mode toggle */}
        <div style={{
          display: "flex", gap: 8, marginBottom: "1.8rem",
          background: "rgba(5,24,6,0.6)", borderRadius: 40, padding: 4,
        }}>
          {["login", "register"].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); }}
              style={{
                flex: 1, padding: "8px", borderRadius: 36,
                border: "none", cursor: "pointer",
                background: mode === m ? "rgba(14,78,12,0.8)" : "transparent",
                color: mode === m ? "rgba(182,250,148,0.96)" : "rgba(95,185,70,0.4)",
                fontFamily: "Georgia, serif", fontStyle: "italic",
                fontSize: "clamp(11px,2vw,13px)",
                transition: "all 0.3s",
              }}>{m === "login" ? "Return to Forest" : "Enter for First Time"}</button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1.4rem" }}>
          <AnimatePresence>
            {mode === "register" && (
              <motion.input
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                placeholder="Your first name"
                value={form.firstName}
                onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                style={{
                  padding: "12px 16px", borderRadius: 12,
                  border: "0.5px solid rgba(70,180,50,0.22)",
                  background: "rgba(5,26,5,0.68)",
                  color: "rgba(162,238,132,0.92)",
                  fontFamily: "Georgia, serif", fontStyle: "italic",
                  fontSize: "clamp(12px,2.2vw,13px)", outline: "none",
                }}
              />
            )}
          </AnimatePresence>

          <input
            placeholder="Email address"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            style={{
              padding: "12px 16px", borderRadius: 12,
              border: "0.5px solid rgba(70,180,50,0.22)",
              background: "rgba(5,26,5,0.68)",
              color: "rgba(162,238,132,0.92)",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: "clamp(12px,2.2vw,13px)", outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && handle()}
            style={{
              padding: "12px 16px", borderRadius: 12,
              border: "0.5px solid rgba(70,180,50,0.22)",
              background: "rgba(5,26,5,0.68)",
              color: "rgba(162,238,132,0.92)",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: "clamp(12px,2.2vw,13px)", outline: "none",
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            color: "rgba(255,120,120,0.85)", fontFamily: "Georgia, serif",
            fontStyle: "italic", fontSize: 12, marginBottom: "1rem",
            textAlign: "center",
          }}>{error}</div>
        )}

        {/* Submit */}
        <motion.button onClick={handle} disabled={loading}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          style={{
            width: "100%", padding: "clamp(12px,2.6vw,15px)",
            borderRadius: 40,
            border: "0.5px solid rgba(102,222,70,0.5)",
            background: loading ? "rgba(8,40,8,0.5)" : "rgba(11,62,10,0.72)",
            color: "rgba(182,250,148,0.96)",
            fontSize: "clamp(12px,2.4vw,14px)", cursor: loading ? "default" : "pointer",
            letterSpacing: "0.14em", fontFamily: "Georgia, serif", fontStyle: "italic",
            transition: "all 0.4s", marginBottom: "1rem",
          }}>
          {loading ? "The forest is listening..." : mode === "login" ? "Enter the Sanctuary" : "Begin Your Journey"}
        </motion.button>

        {/* Skip */}
{/* Skip */}
        <div style={{ textAlign: "center" }}>
          <button onClick={async () => {
            await fetch("http://localhost:5000/api/auth/logout", {
              method: "POST", credentials: "include"
            }).catch(()=>{});
            navigate("/entry");
          }}
            style={{
              background: "none", border: "none",
              color: "rgba(95,185,70,0.35)", fontFamily: "Georgia, serif",
              fontStyle: "italic", fontSize: 11, cursor: "pointer",
              letterSpacing: "0.12em",
            }}>
            continue without account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
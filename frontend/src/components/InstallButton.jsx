import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function InstallButton() {
  const [prompt, setPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      // Show banner automatically on desktop after 3 seconds
      if (window.innerWidth >= 768) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setPrompt(null);
      setShowBanner(false);
    });
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === "accepted") {
      setInstalled(true);
      setPrompt(null);
      setShowBanner(false);
    }
  };

  // Hide on welcome and auth
  if (location.pathname === "/" || location.pathname === "/auth") return null;
  if (installed || !prompt) return null;

  return (
    <>
      {/* Desktop banner popup */}
      <AnimatePresence>
        {showBanner && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: 80,
              right: 16,
              zIndex: 200,
              background: "rgba(3,14,5,0.97)",
              border: "0.5px solid rgba(98,222,68,0.4)",
              borderRadius: 18,
              padding: "16px 20px",
              backdropFilter: "blur(28px)",
              boxShadow: "0 0 40px rgba(20,140,20,0.2)",
              maxWidth: 260,
            }}>
            <button
              onClick={() => setShowBanner(false)}
              style={{
                position: "absolute", top: 8, right: 10,
                background: "none", border: "none",
                color: "rgba(85,175,62,0.4)",
                fontSize: 14, cursor: "pointer",
              }}>✕</button>

            <div style={{ fontSize: 28, marginBottom: 8 }}>🌿</div>
            <div style={{
              fontSize: 13, fontWeight: 300,
              color: "rgba(172,242,142,0.96)",
              fontFamily: "Georgia, serif",
              marginBottom: 6, letterSpacing: "0.08em",
            }}>Install Chianya</div>
            <div style={{
              fontSize: 11,
              color: "rgba(120,200,90,0.55)",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              lineHeight: 1.7,
              marginBottom: 14,
            }}>
              Bring the forest with you. Install for a fuller sanctuary experience.
            </div>
            <motion.button
              onClick={install}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%", padding: "9px",
                borderRadius: 40,
                border: "0.5px solid rgba(102,222,70,0.5)",
                background: "rgba(11,62,10,0.72)",
                color: "rgba(182,250,148,0.96)",
                fontSize: 12, cursor: "pointer",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                letterSpacing: "0.12em",
              }}>
              Install ✦
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install circle button */}
      <motion.div
        onClick={install}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Install Chianya"
        style={{
          position: "fixed",
          ...(isMobile ? {
          top: 16,
          right: 16,
          } : {
           bottom: 16,
          left: 16,
          }),
          zIndex: 100,
          width: 52, height: 52,
          borderRadius: "50%",
          background: "rgba(3,14,5,0.92)",
          border: "1.5px solid rgba(98,222,68,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          cursor: "pointer",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 16px rgba(58,202,38,0.15)",
        }}>
        ⬇️
      </motion.div>
    </>
  );
}
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SOUND_MAP = {
  "/":          "forest",
  "/entry":     "forest",
  "/modes":     "forest",
  "/onboarding":"forest",
  "/dashboard": "forest",
  "/about":     "forest",
  "/resources": "forest",
  "/feedback":  "forest",
  "/future-letter": "forest",
  "/creator":   "forest",
  "/auth":      "forest",
  "/breathe":   "breathe",
  "/companion": "antar",
  "/release":   "release",
  "/ground":    "ground",
  "/sit":       "justsit",
  "/wisdom":    "wisdom",
};

export default function AmbientSound() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [currentSound, setCurrentSound] = useState("forest");
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load audio on mount
  useEffect(() => {
    audioRef.current = new Audio("/sounds/forest.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Change sound when route changes
  useEffect(() => {
    const soundName = SOUND_MAP[location.pathname] || "forest";
    if (soundName === currentSound) return;
    setCurrentSound(soundName);

    if (!enabled || !audioRef.current) return;

    // Fade out current
    const fadeOut = setInterval(() => {
      if (!audioRef.current) { clearInterval(fadeOut); return; }
      if (audioRef.current.volume > 0.05) {
        audioRef.current.volume -= 0.05;
      } else {
        clearInterval(fadeOut);
        audioRef.current.pause();
        audioRef.current.src = `/sounds/${soundName}.mp3`;
        audioRef.current.volume = 0;
        audioRef.current.play().catch(() => {});
        // Fade in
        const fadeIn = setInterval(() => {
          if (!audioRef.current) { clearInterval(fadeIn); return; }
          if (audioRef.current.volume < 0.28) {
            audioRef.current.volume += 0.04;
          } else {
            audioRef.current.volume = 0.3;
            clearInterval(fadeIn);
          }
        }, 80);
      }
    }, 80);
  }, [location.pathname]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (enabled) {
      audioRef.current.pause();
      setEnabled(false);
      setPlaying(false);
    } else {
      const soundName = SOUND_MAP[location.pathname] || "forest";
      audioRef.current.src = `/sounds/${soundName}.mp3`;
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {});
      setEnabled(true);
      setPlaying(true);
      setCurrentSound(soundName);
    }
  };

  if (location.pathname === "/auth") return null;

 return (
    <motion.div
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
      ...(isMobile ? {
          bottom: 16,
          left: 80,
        } : {
          bottom: 80,
          left: 16,
        }),
        zIndex: 100,
        width: isMobile ? 36 : 48,
        height: isMobile ? 36 : 48,
        borderRadius: "50%",
        background: "rgba(3,14,5,0.92)",
        border: enabled
          ? "1.5px solid rgba(98,222,68,0.6)"
          : "1.5px solid rgba(70,140,50,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backdropFilter: "blur(16px)",
        boxShadow: enabled
          ? "0 0 16px rgba(58,202,38,0.2)"
          : "none",
        transition: "all 0.3s",
      }}>
      <svg width={isMobile ? 14 : 18} height={isMobile ? 14 : 18} viewBox="0 0 24 24"
        fill="none" stroke={enabled ? "rgba(162,238,132,0.9)" : "rgba(95,185,70,0.35)"}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {enabled ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </>
        )}
      </svg>
    </motion.div>
  );
}
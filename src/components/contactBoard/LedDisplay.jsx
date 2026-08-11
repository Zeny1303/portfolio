import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsBatteryFull } from "react-icons/bs";
import { MdSignalCellular4Bar } from "react-icons/md";

const TAB_PRESETS = {
  intro: {
    messages: ["HI, I'M SNEHA", "FULL-STACK DEV", "BACKEND ENGINEER"],
    subtitles: [
      "BOKARO STEEL CITY, JHARKHAND • READY TO RELOCATE",
      "REPLY WITHIN 24 HOURS",
      "LET'S BUILD SOMETHING AMAZING"
    ]
  },
  resume: {
    messages: ["SNEHA'S RESUME", "FULL STACK DEV", "SOFTWARE ENGINEER"],
    subtitles: [
      "BOKARO STEEL CITY, JHARKHAND • READY TO RELOCATE",
      "OPEN FOR BACKEND & FULL-STACK ROLES",
      "EXPERIENCED IN NODE.JS, DJANGO & REACT"
    ]
  },
  location: {
    messages: ["LOCATION", "JHARKHAND", "BOKARO STEEL CITY"],
    subtitles: [
      "BOKARO STEEL CITY, JHARKHAND • READY TO RELOCATE",
      "OPEN TO REMOTE & HYBRID ROLES WORLDWIDE",
      "AVAILABLE IMMEDIATELY FOR RELOCATION"
    ]
  }
};

/* Typewriter hook */
function useTypewriter(text, speed = 55) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    setDisplayed("");
    idx.current = 0;
    const iv = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(iv);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);

  return displayed;
}

export default function LedDisplay({ activeTab = "intro" }) {
  const currentPreset = TAB_PRESETS[activeTab] || TAB_PRESETS.intro;
  const messages = currentPreset.messages;
  const subtitles = currentPreset.subtitles;

  const [msgIdx, setMsgIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [flicker, setFlicker] = useState(true);

  /* Reset indices on tab change */
  useEffect(() => {
    setMsgIdx(0);
    setSubIdx(0);
  }, [activeTab]);

  /* Mount flicker */
  useEffect(() => {
    const t = setTimeout(() => setFlicker(false), 500);
    return () => clearTimeout(t);
  }, []);

  /* Cycle messages */
  useEffect(() => {
    const t = setInterval(() => {
      setMsgIdx(p => (p + 1) % messages.length);
      setSubIdx(p => (p + 1) % subtitles.length);
    }, 3800);
    return () => clearInterval(t);
  }, [messages.length, subtitles.length]);

  const title = useTypewriter(messages[msgIdx], 60);

  return (
    <div className={`led-display ${flicker ? "led-flicker" : ""}`}>
      {/* CRT scanlines overlay */}
      <div className="led-scanlines" aria-hidden="true" />
      {/* moving scan beam */}
      <div className="led-beam" aria-hidden="true" />

      {/* ── STATUS BAR ── */}
      <div className="led-statusbar">
        <div className="led-status-left">
          <span className="led-online-dot" aria-label="Online" />
          <span className="led-online-text">ONLINE</span>
        </div>
        <div className="led-status-right">
          <BsBatteryFull />
          <MdSignalCellular4Bar />
        </div>
      </div>

      {/* ── MAIN TITLE ── */}
      <div className="led-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`${activeTab}-${msgIdx}`}
            className="led-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {title}
            <span className="led-cursor">█</span>
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* ── DIVIDER ── */}
      <div className="led-divider" />

      {/* ── SUBTITLE ── */}
      <div className="led-bottom">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${activeTab}-${subIdx}`}
            className="led-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {subtitles[subIdx]}
          </motion.p>
        </AnimatePresence>
        <MdSignalCellular4Bar className="led-corner-icon" />
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsBatteryFull } from "react-icons/bs";
import { MdSignalCellular4Bar } from "react-icons/md";

const MESSAGES = [
  "LET'S CONNECT",
  "OPEN TO ROLES",
  "FRONTEND DEV",
  "FULL STACK DEV",
  "HIRE ME :)",
];

const SUBTITLES = [
  "LET'S BUILD SOMETHING AMAZING",
  "REPLY WITHIN 24 HOURS",
  "OPEN TO RELOCATION",
  "AVAILABLE FOR FREELANCE",
  "THANKS FOR VISITING",
];

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

export default function LedDisplay() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [flicker, setFlicker] = useState(true);

  /* Mount flicker */
  useEffect(() => {
    const t = setTimeout(() => setFlicker(false), 600);
    return () => clearTimeout(t);
  }, []);

  /* Cycle messages */
  useEffect(() => {
    const t = setInterval(() => {
      setMsgIdx(p => (p + 1) % MESSAGES.length);
      setSubIdx(p => (p + 1) % SUBTITLES.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const title = useTypewriter(MESSAGES[msgIdx], 60);

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
            key={msgIdx}
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
            key={subIdx}
            className="led-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {SUBTITLES[subIdx]}
          </motion.p>
        </AnimatePresence>
        <MdSignalCellular4Bar className="led-corner-icon" />
      </div>
    </div>
  );
}

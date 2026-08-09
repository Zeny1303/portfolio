import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import { IoSend } from "react-icons/io5";
import Equalizer from "./Equalizer";
import "./ContactForm.css";
import "./Equalizer.css";

export default function ContactForm() {
  const [focused, setFocused] = useState(null); // "name" | "email" | "msg"
  const [micActive, setMicActive] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <motion.div
      className="contact-form"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 24 }}
    >
      {/* ── Name + Email ── */}
      <div className="contact-inputs">

        {/* Name */}
        <motion.div
          className={`input-box ${focused === "name" ? "input-focused" : ""}`}
          whileHover={{ y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Your Name"
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            aria-label="Your name"
          />
        </motion.div>

        {/* Email */}
        <motion.div
          className={`input-box ${focused === "email" ? "input-focused" : ""}`}
          whileHover={{ y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <MdEmail className="input-icon" />
          <input
            type="email"
            placeholder="Your Email"
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            aria-label="Your email"
          />
        </motion.div>

      </div>

      {/* ── Message ── */}
      <motion.div
        className={`message-box ${focused === "msg" ? "input-focused" : ""}`}
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <textarea
          placeholder="Type your message..."
          onFocus={() => setFocused("msg")}
          onBlur={() => setFocused(null)}
          aria-label="Your message"
        />

        {/* Mic + Equalizer */}
        <div className="msg-actions">
          <motion.button
            className={`mic-btn ${micActive ? "mic-active" : ""}`}
            onMouseDown={() => setMicActive(true)}
            onMouseUp={() => setMicActive(false)}
            onMouseLeave={() => setMicActive(false)}
            whileTap={{ scale: 0.9 }}
            aria-label="Record voice message"
            title="Hold to record"
          >
            {micActive
              ? <Equalizer active />
              : <PiMicrophoneFill size={22} />
            }
          </motion.button>

          {/* Send */}
          <motion.button
            className="send-btn"
            onClick={handleSend}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Send message"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="send-confirm"
                >
                  ✓
                </motion.span>
              ) : (
                <motion.span
                  key="icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <IoSend size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

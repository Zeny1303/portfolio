import { useState } from "react";
import { motion } from "framer-motion";
import { FaPencilAlt, FaMapMarkerAlt, FaLinkedinIn, FaGithub, FaEnvelope, FaTwitter } from "react-icons/fa";
import { HiDocument } from "react-icons/hi";

import LedDisplay from "./LedDisplay";
import TactileCard from "./TactileCard";
import HardwareButton from "./HardwareButton";
import ContactForm from "./ContactForm";

import "./ContactBoard.css";
import "./LedDisplay.css";
import "./TactileCard.css";
import "./HardwareButton.css";

/* ── Side tab definitions ── */
const TABS = [
  { id: "intro",    label: "INTRO",    icon: FaPencilAlt },
  { id: "resume",   label: "RESUME",   icon: HiDocument },
  { id: "location", label: "BOKARO STEEL CITY, JHARKHAND", subLabel: "READY TO RELOCATE", icon: FaMapMarkerAlt },
];

/* ── Social button definitions ── */
const SOCIALS = [
  { id: "linkedin", label: "LINKEDIN", icon: FaLinkedinIn, variant: "linkedin", href: "https://www.linkedin.com/in/sneha1309/" },
  { id: "github",   label: "GITHUB",   icon: FaGithub,     variant: "github",   href: "https://github.com/Zeny1303"   },
  { id: "twitter",  label: "TWITTER",  icon: FaTwitter,    variant: "twitter",  href: "https://x.com/Snehakashyap09" },
  { id: "email",    label: "EMAIL",    icon: FaEnvelope,   variant: "email",    href: "mailto:snehakashyap1309@gmail.com" },
];

/* ── Board entrance variants ── */
const boardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 26, staggerChildren: 0.08 },
  },
};

export default function ContactBoard() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div>
      <motion.div
        className="contact-board"
        variants={boardVariants}
        initial="hidden"
        animate="visible"
      >
      {/* ── Grain texture overlay ── */}
      <div className="board-grain" aria-hidden="true" />

      {/* ── Frame rivets ── */}
      <span className="rivet rv-tl" /><span className="rivet rv-tr" />
      <span className="rivet rv-bl" /><span className="rivet rv-br" />

      {/* ============================================
          MAIN LAYOUT
      ============================================ */}
      <div className="board-layout">

        {/* ── LEFT — Tactile tabs ── */}
        <motion.div
          className="board-left"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {TABS.map((tab, i) => (
            <TactileCard
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              subLabel={tab.subLabel}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              index={i}
            />
          ))}
        </motion.div>

        {/* ── RIGHT — Display → Social → Form ── */}
        <div className="board-right">

          {/* LED Display */}
          <motion.div
            className="display-panel"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 24 }}
          >
            <LedDisplay activeTab={activeTab} />
          </motion.div>

          {/* Social buttons */}
          <motion.div
            className="social-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="social-container">
              {SOCIALS.map((s, i) => (
                <HardwareButton
                  key={s.id}
                  icon={s.icon}
                  label={s.label}
                  variant={s.variant}
                  href={s.href}
                  index={i}
                />
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <div className="contact-section">
            <ContactForm />
          </div>

        </div>
      </div>

      {/* ── Version stamp ── */}
      <p className="board-version">CONTACT BOARD — v2.0</p>
    </motion.div>
    </div>
  );
}

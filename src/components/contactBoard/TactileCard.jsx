import { motion } from "framer-motion";

/**
 * TactileCard — physical tab/switch with active glow state.
 * Props: icon, label, subLabel, active, onClick, index
 */
export default function TactileCard({ icon: Icon, label, subLabel, active, ariaLabel, onClick, index }) {
  return (
    <motion.button
      className={`tactile-card ${active ? "tactile-active" : ""}`}
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 300, damping: 24 }}
      whileHover={{ x: 3, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      whileTap={{ scale: 0.94, x: 0 }}
      aria-pressed={active}
      aria-label={ariaLabel || label}
    >
      {/* Corner screws */}
      <span className="tc-screw tc-tl" />
      <span className="tc-screw tc-tr" />
      <span className="tc-screw tc-bl" />
      <span className="tc-screw tc-br" />

      {/* Active LED pip */}
      <span className={`tc-led ${active ? "tc-led-on" : ""}`} />

      {/* Icon */}
      <span className="tc-icon-wrap">
        <Icon className="tc-icon" />
      </span>

      {/* Label & SubLabel */}
      <span className="tc-label">{label}</span>
      {subLabel && <span className="tc-sublabel">{subLabel}</span>}
    </motion.button>
  );
}

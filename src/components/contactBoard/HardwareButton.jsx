import { motion } from "framer-motion";

/**
 * HardwareButton — magnetic press-down CTA button.
 * Props: icon, label, color ("linkedin"|"github"|"email"), href, index
 */
export default function HardwareButton({ icon: Icon, label, variant, href, index }) {
  const handleClick = () => {
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      className={`hw-btn hw-${variant}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 260, damping: 22 }}
      whileHover="hover"
      whileTap="press"
      variants={{
        hover: { y: -3, transition: { type: "spring", stiffness: 500, damping: 20 } },
        press: { y: 3,  scale: 0.97, transition: { duration: 0.08 } },
      }}
      aria-label={label}
    >
      {/* Shine */}
      <span className="hw-shine" aria-hidden="true" />

      <Icon className="hw-icon" />
      <span className="hw-label">{label}</span>
    </motion.button>
  );
}

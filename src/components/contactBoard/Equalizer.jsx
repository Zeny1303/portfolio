import { motion } from "framer-motion";

const BARS = [0.4, 0.7, 1.0, 0.6, 0.85, 0.5, 0.9, 0.65, 0.75, 0.45];

export default function Equalizer({ active = true }) {
  return (
    <div
      className="eq-wrap"
      aria-label="Audio waveform equalizer"
      role="img"
    >
      {BARS.map((scale, i) => (
        <motion.span
          key={i}
          className="eq-bar"
          animate={
            active
              ? { scaleY: [scale, scale * 0.3, scale * 1.1, scale * 0.5, scale] }
              : { scaleY: 0.15 }
          }
          transition={
            active
              ? { duration: 0.8 + i * 0.07, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
          style={{ originY: 1 }}
        />
      ))}
    </div>
  );
}

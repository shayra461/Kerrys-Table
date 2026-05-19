import { motion } from "framer-motion";

const fruits = [
  { emoji: "🍊", x: "6%", y: "18%", size: 64, d: 9 },
  { emoji: "🥑", x: "88%", y: "14%", size: 72, d: 11 },
  { emoji: "🍓", x: "10%", y: "78%", size: 56, d: 8 },
  { emoji: "🥦", x: "84%", y: "76%", size: 70, d: 10 },
  { emoji: "🍋", x: "50%", y: "8%", size: 48, d: 12 },
  { emoji: "🫐", x: "92%", y: "46%", size: 44, d: 9.5 },
  { emoji: "🍎", x: "3%", y: "48%", size: 56, d: 10.5 },
  { emoji: "🥕", x: "70%", y: "92%", size: 52, d: 8.5 },
];

export function FloatingFruits() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      {fruits.map((f, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{ left: f.x, top: f.y, fontSize: f.size, filter: "drop-shadow(0 12px 24px rgba(55,119,55,0.18))" }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -4, 0] }}
          transition={{ duration: f.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {f.emoji}
        </motion.span>
      ))}
    </div>
  );
}

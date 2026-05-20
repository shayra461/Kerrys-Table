import { motion } from "framer-motion";
import { useMemo } from "react";

const FRUITS = ["🍊", "🥑", "🍓", "🥦", "🍋", "🫐", "🍎", "🥕", "🍇", "🍑", "🍍", "🥝"];

type Swimmer = {
  emoji: string;
  size: number;
  duration: number;
  delay: number;
  path: { x: number[]; y: number[]; rotate: number[] };
  startLeft: string;
  startTop: string;
};

function makeSwimmers(count: number): Swimmer[] {
  const swimmers: Swimmer[] = [];
  for (let i = 0; i < count; i++) {
    const emoji = FRUITS[i % FRUITS.length];
    const size = 40 + Math.random() * 40;
    const duration = 200 + Math.random() * 200;
    const delay = -Math.random() * duration;

    // Generate a meandering path across the whole viewport (in vw/vh deltas)
    const steps = 5;
    const x: number[] = [0];
    const y: number[] = [0];
    const rotate: number[] = [0];
    for (let s = 1; s <= steps; s++) {
      x.push((Math.random() - 0.5) * 160); // -80vw..80vw drift
      y.push((Math.random() - 0.5) * 140);
      rotate.push((Math.random() - 0.5) * 90);
    }
    x.push(0);
    y.push(0);
    rotate.push(0);

    swimmers.push({
      emoji,
      size,
      duration,
      delay,
      path: { x, y, rotate },
      startLeft: `${Math.random() * 90 + 5}%`,
      startTop: `${Math.random() * 85 + 5}%`,
    });
  }
  return swimmers;
}

export function FloatingFruits() {
  const swimmers = useMemo(() => makeSwimmers(14), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {swimmers.map((s, i) => (
        <motion.span
          key={i}
          className="absolute select-none will-change-transform opacity-25"
          style={{
            left: s.startLeft,
            top: s.startTop,
            fontSize: s.size,
            filter: "blur(0.4px) drop-shadow(0 8px 16px rgba(55,119,55,0.12))",
          }}
          animate={{
            x: s.path.x.map((v) => `${v}vw`),
            y: s.path.y.map((v) => `${v}vh`),
            rotate: s.path.rotate,
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: undefined,
          }}
        >
          {s.emoji}
        </motion.span>
      ))}
    </div>
  );
}

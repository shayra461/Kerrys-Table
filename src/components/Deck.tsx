import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "@/data/slides";
import { SlideRenderer } from "./SlideRenderer";

import logo from "@/assets/logo.svg";

export function Deck() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const total = slides.length;

  const go = useCallback((next: number) => {
    setIndex((cur) => {
      const n = Math.max(0, Math.min(total - 1, next));
      setDir(n > cur ? 1 : -1);
      return n;
    });
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); go(index + 1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(index - 1); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(total - 1);
      else if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, total]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: -d * 80, scale: 0.98 }),
  };

  const slide = slides[index];
  const progress = ((index + 1) / total) * 100;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="deck-bg deck-grain" />
      <FloatingFruits />

      {/* Top bar: logo + counter */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full glass px-3 py-2">
          <img src={logo} alt="Kerry's Table" className="size-8" />
          <div className="pr-2 text-sm font-semibold text-green">Kerry's Table</div>
        </div>
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="rounded-full glass px-4 py-2 text-sm font-mono tabular-nums text-foreground/80">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Slide stage */}
      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <SlideRenderer slide={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav controls */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-6 pb-6 md:px-10 md:pb-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="grid size-14 place-items-center rounded-full glass text-green transition hover:scale-105 hover:text-orange disabled:opacity-30 disabled:hover:scale-100"
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="flex-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/60 backdrop-blur">
              <motion.div
                className="h-full bg-gradient-to-r from-orange to-green"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </div>
            <div className="mt-2 flex justify-center gap-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-orange" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            className="grid size-14 place-items-center rounded-full glass text-green transition hover:scale-105 hover:text-orange disabled:opacity-30 disabled:hover:scale-100"
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
        <div className="mt-3 text-center text-xs text-foreground/40 tracking-widest uppercase">
          ← → to navigate · F for fullscreen
        </div>
      </div>
    </div>
  );
}

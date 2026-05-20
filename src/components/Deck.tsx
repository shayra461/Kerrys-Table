import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "@/data/slides";
import { SlideRenderer } from "./SlideRenderer";
import { FloatingFruits } from "./FloatingFruits";
import { imageFor } from "@/data/slideImages";
import logo from "@/assets/logo.png";

export function Deck() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [gridOpen, setGridOpen] = useState(false);
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
      if (gridOpen) {
        if (e.key === "Escape") { e.preventDefault(); setGridOpen(false); return; }
        return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); go(index + 1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(index - 1); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(total - 1);
      else if (e.key.toLowerCase() === "g") { e.preventDefault(); setGridOpen(true); }
      else if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, total, gridOpen]);

  const variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d * 220,
      scale: 0.92,
      rotateY: d * 12,
      filter: "blur(14px)",
      clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      clipPath: "inset(0 0 0 0)",
    },
    exit: (d: number) => ({
      opacity: 0,
      x: -d * 220,
      scale: 0.94,
      rotateY: -d * 10,
      filter: "blur(14px)",
      clipPath: d > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
    }),
  };

  const slide = slides[index];
  const progress = ((index + 1) / total) * 100;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="deck-bg deck-grain" />
      <FloatingFruits />

      {/* Top bar: logo + counter + grid toggle */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="pointer-events-auto flex items-center rounded-full glass p-1.5">
          <img src={logo} alt="Kerry's Nutrition" className="size-14 object-contain" />
        </div>
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => setGridOpen(true)}
            className="grid place-items-center rounded-full glass px-4 py-2 text-sm font-mono text-foreground/80 transition hover:bg-white/30"
            aria-label="Open slide grid"
            title="Slide grid (G)"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <div className="rounded-full glass px-4 py-2 text-sm font-mono tabular-nums text-foreground/80">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Slide stage */}
      <div className="relative z-10 h-full w-full" style={{ perspective: 1600 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <SlideRenderer slide={slide} index={index} />
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
          ← → to navigate · G for grid · F for fullscreen
        </div>
      </div>

      {/* Slide Grid Overlay */}
      <AnimatePresence>
        {gridOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-md"
          >
            {/* Grid header */}
            <div className="flex items-center justify-between px-6 py-5 md:px-10">
              <div className="flex items-center gap-3 rounded-full glass px-3 py-2 text-sm font-semibold text-foreground/90">
                <img src={logo} alt="Kerry's Nutrition" className="size-10 object-contain" />
                Jump to Slide
              </div>
              <button
                onClick={() => setGridOpen(false)}
                className="grid size-10 place-items-center rounded-full glass text-foreground/70 transition hover:text-foreground"
                aria-label="Close grid"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 md:px-10 scrollbar-hide">
              <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {slides.map((s, i) => {
                  const img = imageFor(i);
                  const label =
                    s.kind === "cover"
                      ? "Cover"
                      : s.kind === "toc"
                        ? "Contents"
                        : s.kind === "coach-profile"
                          ? "Coach"
                          : s.kind === "conclusion"
                            ? "Thank You"
                            : "title" in s && typeof s.title === "string"
                              ? s.title
                              : `Slide ${i + 1}`;
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.015, duration: 0.35 }}
                      onClick={() => { go(i); setGridOpen(false); }}
                      className={`group relative overflow-hidden rounded-2xl border-2 transition-all ${
                        i === index
                          ? "border-orange bg-white/15 shadow-xl shadow-orange/20"
                          : "border-transparent bg-white/5 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img src={img} alt={label} className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                            i === index ? "bg-orange text-white" : "bg-white/20 text-white/90"
                          }`}>
                            {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-2.5 text-left">
                        <div className={`text-sm font-semibold leading-tight line-clamp-2 ${
                          i === index ? "text-orange" : "text-foreground/90"
                        }`}>
                          {label}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

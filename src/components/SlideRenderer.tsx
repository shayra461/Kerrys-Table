import type { Slide } from "@/data/slides";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import coachPortrait from "@/assets/kerry-ann-walker.jpeg";
import { imageFor } from "@/data/slideImages";

// Floating decorative image badge — anchored bottom-right so it never overlaps headings.
function SlideImageBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -8, y: 30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="pointer-events-none absolute bottom-28 right-4 z-0 hidden md:block lg:bottom-32 lg:right-8"
      aria-hidden
    >
      <div className="relative">
        <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-orange/35 via-cream to-green/30 blur-2xl" />
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative size-28 overflow-hidden rounded-full ring-4 ring-white/70 shadow-2xl md:size-32 lg:size-40 xl:size-48"
        >
          <img src={src} alt={alt} className="size-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full border border-dashed border-orange/40"
        />
      </div>
    </motion.div>
  );
}


const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE },
} as const;

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay: 0.08 + i * 0.05 },
  } as const;
}

function ToneDot({ tone }: { tone: "low" | "mid" | "high" }) {
  const color =
    tone === "low" ? "bg-emerald-500" : tone === "mid" ? "bg-amber-500" : "bg-orange-500";
  return <span className={`inline-block size-2.5 rounded-full ${color}`} />;
}

function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h1 {...fadeUp} className={`headline text-5xl md:text-6xl lg:text-7xl ${className}`}>
      {children}
    </motion.h1>
  );
}

function Eyebrow({ children, variant = "orange" }: { children: React.ReactNode; variant?: "orange" | "green" }) {
  return (
    <motion.span {...fadeUp} className={`chip ${variant === "green" ? "chip-green" : ""}`}>
      <span className="size-1.5 rounded-full bg-current" /> {children}
    </motion.span>
  );
}

export function SlideRenderer({ slide, index }: { slide: Slide; index: number }) {
  const heroImage = imageFor(index);
  const heroAlt = "Nutrition imagery";
  // Slides that already feature a large hero image — skip the floating badge.
  const noBadge = slide.kind === "cover" || slide.kind === "coach-profile" || slide.kind === "conclusion";

  const content: React.ReactNode = (() => {
    switch (slide.kind) {
      case "cover":
      return (
        <div className="grid h-full w-full place-items-center overflow-y-auto scrollbar-hide px-8 pt-28 pb-32 md:px-16 md:pt-32 lg:pt-36">
          <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Eyebrow>Nutrition Coaching</Eyebrow>
              <motion.h1 {...stagger(1)} className="headline mt-6 text-6xl md:text-8xl lg:text-9xl">
                {slide.title}
              </motion.h1>
              <motion.p {...stagger(2)} className="mt-4 text-2xl md:text-3xl text-foreground/70">
                {slide.subtitle}
              </motion.p>
              <motion.div {...stagger(3)} className="mt-8 inline-flex items-center gap-3 rounded-full glass px-5 py-3">
                <span className="size-2 rounded-full bg-orange" />
                <span className="text-sm tracking-widest uppercase text-foreground/70">
                  "{slide.tagline}"
                </span>
              </motion.div>
              <motion.div {...stagger(4)} className="mt-10 grid gap-2 text-sm md:text-base text-foreground/75">
                <div>📞 {slide.contact.phone}</div>
                <div>✉️ {slide.contact.email}</div>
                <div>🌐 {slide.contact.site}</div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-orange/40 via-cream to-green/30 blur-2xl opacity-80" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full overflow-hidden rounded-[2.5rem] glass"
              >
                <img src={heroImage} alt="Healthy plate" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-green/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 grid size-20 place-items-center rounded-full bg-white/85 backdrop-blur">
                  <img src={logo} alt="Kerry's Table" className="size-14 object-contain" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      );

    case "intro":
      return (
        <SlideShell eyebrow={slide.eyebrow}>
          <Title>{slide.title}</Title>
          <motion.p {...stagger(2)} className="mt-8 text-2xl md:text-3xl text-foreground/80 max-w-4xl">
            {slide.lead}
          </motion.p>
          <motion.blockquote
            {...stagger(3)}
            className="mt-8 border-l-4 border-orange pl-6 text-2xl italic text-foreground/70"
          >
            "{slide.quote}"
          </motion.blockquote>
          <motion.p {...stagger(4)} className="mt-8 max-w-3xl text-lg text-foreground/70 leading-relaxed">
            {slide.body}
          </motion.p>
        </SlideShell>
      );

    case "toc":
      return (
        <SlideShell eyebrow="Roadmap">
          <Title>{slide.title}</Title>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {slide.items.map((it, i) => (
              <motion.div
                key={i}
                {...stagger(i)}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass rounded-2xl p-6 transition-shadow hover:shadow-2xl"
              >
                <div className="text-orange text-sm font-semibold tracking-widest">{it.n}</div>
                <div className="mt-2 text-xl font-semibold text-foreground">{it.label}</div>
              </motion.div>
            ))}
          </div>
        </SlideShell>
      );

    case "coach-profile":
      return (
        <SlideShell eyebrow="Meet Your Coach">
          <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <motion.div {...stagger(1)} className="relative mx-auto aspect-[3/4] w-full max-w-sm">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-green/40 to-orange/30 blur-2xl" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full overflow-hidden rounded-[2rem] glass"
              >
                <img src={coachPortrait} alt={slide.name} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-green/70 via-green/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/85 backdrop-blur p-4">
                  <div className="text-xl font-bold text-green">{slide.name}</div>
                  <div className="text-sm text-foreground/70">{slide.role}</div>
                </div>
              </motion.div>
            </motion.div>
            <div>
              <Title>{slide.title}</Title>
              {slide.body.map((p, i) => (
                <motion.p key={i} {...stagger(i + 2)} className="mt-6 text-xl text-foreground/75 leading-relaxed">
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </SlideShell>
      );

    case "definition":
      return (
        <SlideShell eyebrow={slide.eyebrow}>
          <Title>{slide.title}</Title>
          <div className="mt-10 grid gap-6">
            {slide.body.map((p, i) => (
              <motion.p key={i} {...stagger(i + 1)} className="max-w-4xl text-xl md:text-2xl text-foreground/80 leading-relaxed">
                {p}
              </motion.p>
            ))}
            {slide.quote && (
              <motion.div
                {...stagger(slide.body.length + 1)}
                className="mt-4 inline-block rounded-2xl glass px-8 py-6 text-2xl italic text-green"
              >
                "{slide.quote}"
              </motion.div>
            )}
          </div>
        </SlideShell>
      );

    case "bullets":
      return (
        <SlideShell eyebrow={slide.eyebrow}>
          <Title>{slide.title}</Title>
          {slide.lead && (
            <motion.p {...stagger(1)} className="mt-6 text-xl text-foreground/70">
              {slide.lead}
            </motion.p>
          )}
          <div className="mt-10 grid gap-4 md:grid-cols-2 max-w-5xl">
            {slide.bullets.map((b, i) => (
              <motion.div
                key={i}
                {...stagger(i + 2)}
                whileHover={{ x: 6 }}
                className="glass flex items-center gap-4 rounded-2xl px-6 py-5"
              >
                <div className="grid size-10 place-items-center rounded-full bg-orange/15 text-orange font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-lg text-foreground/85">{b}</div>
              </motion.div>
            ))}
          </div>
          {slide.quote && (
            <motion.div {...stagger(slide.bullets.length + 3)} className="mt-10 text-2xl italic text-green">
              "{slide.quote}"
            </motion.div>
          )}
        </SlideShell>
      );

    case "nutrients":
      return (
        <SlideShell eyebrow="Building Blocks">
          <Title>{slide.title}</Title>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {slide.items.map((it, i) => (
              <motion.div
                key={i}
                {...stagger(i)}
                whileHover={{ y: -8 }}
                className={`glass rounded-3xl p-6 transition ${
                  it.color === "orange" ? "ring-1 ring-orange/30" : "ring-1 ring-green/30"
                }`}
              >
                <div className="text-5xl">{it.icon}</div>
                <div className={`mt-4 text-lg font-bold ${it.color === "orange" ? "text-orange" : "text-green"}`}>
                  {it.name}
                </div>
                <div className="mt-2 text-sm text-foreground/70 leading-snug">{it.desc}</div>
              </motion.div>
            ))}
          </div>
        </SlideShell>
      );

    case "balanced":
      return (
        <SlideShell eyebrow="Balance">
          <Title>{slide.title}</Title>
          <motion.p {...stagger(1)} className="mt-6 text-xl text-foreground/75">{slide.lead}</motion.p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-4xl">
            {slide.items.map((it, i) => (
              <motion.div
                key={i}
                {...stagger(i + 2)}
                whileHover={{ scale: 1.04 }}
                className="glass aspect-square rounded-3xl grid place-items-center text-center p-4 text-lg font-semibold text-green"
              >
                {it}
              </motion.div>
            ))}
          </div>
          <motion.div {...stagger(8)} className="mt-10 inline-block rounded-full glass px-6 py-3 text-orange font-semibold">
            ✦ {slide.tag}
          </motion.div>
        </SlideShell>
      );

    case "dangers":
      return (
        <SlideShell eyebrow="Warning">
          <Title>{slide.title}</Title>
          <motion.p {...stagger(1)} className="mt-6 text-xl text-foreground/75">{slide.lead}</motion.p>
          <div className="mt-10 grid gap-3 md:grid-cols-5 max-w-5xl">
            {slide.items.map((it, i) => (
              <motion.div
                key={i}
                {...stagger(i + 2)}
                className="glass rounded-2xl p-5 text-center"
              >
                <div className="text-3xl mb-2">⚠️</div>
                <div className="text-sm font-semibold text-foreground/85">{it}</div>
              </motion.div>
            ))}
          </div>
          <motion.div {...stagger(8)} className="mt-10 max-w-3xl text-2xl italic text-green border-l-4 border-orange pl-6">
            "{slide.quote}"
          </motion.div>
        </SlideShell>
      );

    case "label":
      return (
        <SlideShell eyebrow="Decoding Labels">
          <Title>{slide.title}</Title>
          <motion.p {...stagger(1)} className="mt-6 text-xl text-foreground/75 max-w-3xl">{slide.lead}</motion.p>
          <div className="mt-10 grid gap-4 md:grid-cols-5 max-w-5xl">
            {slide.items.map((it, i) => (
              <motion.div key={i} {...stagger(i + 2)} className="glass rounded-2xl p-5">
                <div className="text-orange text-xs tracking-widest uppercase font-semibold">Check #{i + 1}</div>
                <div className="mt-2 font-semibold">{it}</div>
              </motion.div>
            ))}
          </div>
          <motion.div {...stagger(8)} className="mt-8 text-xl text-green italic">{slide.note}</motion.div>
        </SlideShell>
      );

    case "dv-table":
      return (
        <SlideShell eyebrow="Reference Values">
          <Title>{slide.title}</Title>
          <motion.p {...stagger(1)} className="mt-6 text-lg text-foreground/75 max-w-4xl">{slide.intro}</motion.p>
          <motion.div {...stagger(2)} className="mt-6 inline-block rounded-2xl bg-green text-white px-6 py-4 font-mono text-lg">
            {slide.formula}
          </motion.div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4 max-w-5xl">
            {slide.rows.map((r, i) => (
              <motion.div key={i} {...stagger(i + 3)} className="glass rounded-2xl p-5 flex items-center justify-between">
                <span className="font-medium text-foreground/80">{r.name}</span>
                <span className="text-orange font-bold text-lg">{r.value}</span>
              </motion.div>
            ))}
          </div>
          <motion.div {...stagger(12)} className="mt-6 text-sm text-foreground/60">{slide.foot}</motion.div>
        </SlideShell>
      );

    case "calc-card":
      return (
        <SlideShell eyebrow="Worked Example">
          <Title>{slide.title}</Title>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr] max-w-6xl">
            <motion.div {...stagger(1)} className="glass rounded-3xl p-6">
              <div className="text-orange uppercase tracking-widest text-xs font-bold mb-4">Food Item A</div>
              <div className="grid grid-cols-2 gap-3">
                {slide.food.map((f, i) => (
                  <div key={i} className="rounded-xl bg-white/60 p-3">
                    <div className="text-xs text-foreground/60">{f.label}</div>
                    <div className="font-bold text-foreground">{f.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...stagger(2)} className="glass rounded-3xl p-6">
              <div className="text-green uppercase tracking-widest text-xs font-bold">Formula</div>
              <div className="mt-2 font-mono text-lg">{slide.formula}</div>
              <div className="mt-6 space-y-2">
                {slide.steps.map((s, i) => (
                  <motion.div key={i} {...stagger(i + 3)} className="rounded-xl bg-cream px-4 py-2 font-mono">
                    {s}
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-orange to-orange/80 px-5 py-4 text-white font-bold text-xl">
                {slide.total}
              </div>
              {slide.rounded && <div className="mt-3 text-green font-semibold">{slide.rounded}</div>}
            </motion.div>
          </div>
        </SlideShell>
      );

    case "calc-pair":
      return (
        <SlideShell eyebrow="%DV Calculations">
          <Title>{slide.title}</Title>
          <div className="mt-10 grid gap-5 md:grid-cols-2 max-w-5xl">
            {slide.pairs.map((p, i) => (
              <motion.div key={i} {...stagger(i + 1)} className="glass rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green">{p.name}</div>
                  <div className="text-xs text-foreground/60 uppercase tracking-widest">DV: {p.dv}</div>
                </div>
                <div className="mt-4 font-mono text-lg text-foreground/80">{p.calc}</div>
                <div className="mt-4 inline-block rounded-full bg-orange text-white px-5 py-2 font-bold">
                  {p.result}
                </div>
              </motion.div>
            ))}
          </div>
        </SlideShell>
      );

    case "macro-break":
      return (
        <SlideShell eyebrow="Full Breakdown">
          <Title>{slide.title}</Title>
          <div className="mt-8 grid gap-5 lg:grid-cols-3 max-w-7xl">
            <motion.div {...stagger(1)} className="glass rounded-3xl p-6">
              <div className="text-orange text-xs uppercase tracking-widest font-bold">Macros</div>
              <div className="mt-3 space-y-2">
                {slide.macros.map((m, i) => (
                  <div key={i} className="flex justify-between rounded-xl bg-white/60 px-4 py-2">
                    <span>{m.name}</span><span className="font-bold">{m.g}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...stagger(2)} className="glass rounded-3xl p-6">
              <div className="text-green text-xs uppercase tracking-widest font-bold">% Daily Values</div>
              <div className="mt-3 space-y-2">
                {slide.dv.map((m, i) => (
                  <div key={i} className="flex justify-between rounded-xl bg-white/60 px-4 py-2">
                    <span>{m.name}</span><span className="font-bold text-orange">{m.pct}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...stagger(3)} className="glass rounded-3xl p-6">
              <div className="text-orange text-xs uppercase tracking-widest font-bold">Calculation</div>
              <div className="mt-3 space-y-2 font-mono text-sm">
                {slide.example.map((m, i) => (
                  <div key={i} className="rounded-xl bg-cream px-4 py-2">
                    <span className="text-foreground/60">{m.name}: </span>{m.calc}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div {...stagger(8)} className="mt-6 text-foreground/70">{slide.foot}</motion.div>
        </SlideShell>
      );

    case "compare-foods":
      return (
        <SlideShell eyebrow="Smart Comparisons">
          <Title>{slide.title}</Title>
          <motion.p {...stagger(1)} className="mt-6 text-xl text-foreground/75">{slide.lead}</motion.p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
            {slide.items.map((it, i) => (
              <motion.div
                key={it.n}
                {...stagger(i + 2)}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-orange/30">{it.n}</span>
                  <span className="text-xl font-bold text-green">{it.name}</span>
                </div>
                <div className="mt-2 inline-block rounded-full bg-green/10 text-green px-3 py-1 text-xs font-semibold">
                  {it.rule}
                </div>
                <div className="mt-3 text-foreground/70">{it.desc}</div>
              </motion.div>
            ))}
          </div>
        </SlideShell>
      );

    case "thresholds":
      return (
        <SlideShell eyebrow="Quick Evaluation">
          <Title>{slide.title}</Title>
          <div className="mt-10 grid gap-6 lg:grid-cols-2 max-w-6xl">
            <motion.div {...stagger(1)} className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔺</div>
                <div className="font-bold text-orange">High %DV (20% or more)</div>
              </div>
              <div className="mt-4 space-y-2">
                {slide.high.map((h, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-2">
                    <span>{h.label}</span>
                    <span className={`text-sm font-bold ${h.verdict === "good" ? "text-green" : "text-orange"}`}>
                      {h.verdict === "good" ? "✓ Good" : "⚠ Limit"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...stagger(2)} className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔻</div>
                <div className="font-bold text-green">Low %DV (5% or less)</div>
              </div>
              <div className="mt-4 space-y-2">
                {slide.low.map((h, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-2">
                    <span>{h.label}</span>
                    <span className={`text-sm font-bold ${h.verdict === "good" ? "text-green" : "text-orange"}`}>
                      {h.verdict === "good" ? "✓ Good" : "⚠ Watch"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </SlideShell>
      );

    case "look-for":
      return (
        <SlideShell eyebrow="Label Reading">
          <Title>{slide.title}</Title>
          <div className="mt-10 grid gap-6 lg:grid-cols-2 max-w-6xl">
            <motion.div {...stagger(1)} className="glass rounded-3xl p-6">
              <div className="font-bold text-green text-lg">✓ What to look for</div>
              <ul className="mt-4 space-y-2">
                {slide.good.map((g, i) => (
                  <li key={i} className="rounded-xl bg-green/5 px-4 py-3 text-foreground/85">{g}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...stagger(2)} className="glass rounded-3xl p-6">
              <div className="font-bold text-orange text-lg">⚠ Red flags</div>
              <ul className="mt-4 space-y-2">
                {slide.red.map((g, i) => (
                  <li key={i} className="rounded-xl bg-orange/5 px-4 py-3 text-foreground/85">{g}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </SlideShell>
      );

    case "formula":
      return (
        <SlideShell eyebrow="Simple Math">
          <Title>{slide.title}</Title>
          <motion.p {...stagger(1)} className="mt-6 text-xl text-foreground/75">{slide.lead}</motion.p>
          <motion.div {...stagger(2)} className="mt-8 inline-block rounded-3xl bg-gradient-to-r from-green to-green/80 text-white px-8 py-6 text-2xl font-mono">
            {slide.formula}
          </motion.div>
          <motion.div {...stagger(3)} className="mt-8 glass rounded-3xl p-8 max-w-3xl">
            <div className="text-orange uppercase tracking-widest text-xs font-bold">Example — {slide.example.food}</div>
            <div className="mt-4 space-y-2 text-lg">
              <div>{slide.example.per100}</div>
              <div>{slide.example.eat}</div>
              <div className="font-mono mt-4">{slide.example.calc}</div>
              <div className="mt-4 inline-block rounded-full bg-orange text-white px-5 py-2 font-bold text-xl">
                = {slide.example.result}
              </div>
            </div>
          </motion.div>
        </SlideShell>
      );

    case "choices": {
      const isBetter = slide.tone === "better";
      return (
        <SlideShell eyebrow={slide.eyebrow} eyebrowVariant={isBetter ? "green" : "orange"}>
          <div className="flex items-baseline gap-4">
            <Title>{slide.title}</Title>
            <span className="text-3xl">{isBetter ? "✓" : "⚠"}</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 max-w-6xl">
            {slide.items.map((it, i) => (
              <motion.span
                key={i}
                {...stagger(i)}
                whileHover={{ y: -3, scale: 1.04 }}
                className={`glass rounded-full px-5 py-3 text-base font-medium ${
                  isBetter ? "text-green ring-1 ring-green/30" : "text-orange ring-1 ring-orange/30"
                }`}
              >
                {it}
              </motion.span>
            ))}
          </div>
        </SlideShell>
      );
    }

    case "veg-groups":
      return (
        <SlideShell eyebrow="Vegetables" eyebrowVariant="green">
          <Title>{slide.title}</Title>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] max-w-6xl">
            <motion.div {...stagger(1)} className="glass rounded-3xl p-6">
              <div className="font-bold text-green">Non-starchy</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {slide.nonStarchy.map((v, i) => (
                  <motion.span key={i} {...stagger(i + 2)} className="rounded-full bg-green/10 text-green px-4 py-2 text-sm font-medium">
                    {v}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <motion.div {...stagger(2)} className="glass rounded-3xl p-6">
              <div className="font-bold text-orange">Starchy (still healthy)</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {slide.starchy.map((v, i) => (
                  <motion.span key={i} {...stagger(i + 3)} className="rounded-full bg-orange/10 text-orange px-4 py-2 text-sm font-medium">
                    {v}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </SlideShell>
      );

    case "small-changes":
      return (
        <SlideShell eyebrow="Habits">
          <Title>{slide.title}</Title>
          <motion.p {...stagger(1)} className="mt-6 text-xl text-foreground/75 max-w-3xl">{slide.lead}</motion.p>
          <div className="mt-10 grid gap-4 md:grid-cols-3 max-w-4xl">
            {slide.items.map((it, i) => (
              <motion.div key={i} {...stagger(i + 2)} whileHover={{ y: -6 }} className="glass rounded-3xl p-6 text-center">
                <div className="text-4xl mb-3">{["🥤", "🥬", "🌿"][i] ?? "✦"}</div>
                <div className="font-semibold text-foreground/85">{it}</div>
              </motion.div>
            ))}
          </div>
          <motion.div {...stagger(8)} className="mt-10 text-2xl italic text-green">
            "{slide.quote}"
          </motion.div>
        </SlideShell>
      );

    case "responsibility":
      return (
        <SlideShell eyebrow="Closing Thought">
          <div className="max-w-4xl">
            <Title>{slide.title}</Title>
            <motion.p {...stagger(2)} className="mt-8 text-2xl leading-relaxed text-foreground/80">
              {slide.body}
            </motion.p>
            <motion.div {...stagger(3)} className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange to-green text-white px-8 py-4 font-bold text-lg shadow-xl">
              🌱 Your future, in your hands
            </motion.div>
          </div>
        </SlideShell>
      );

    case "cal-list":
      return (
        <SlideShell eyebrow={slide.eyebrow ?? "Reference"}>
          <Title>{slide.title}</Title>
          <div className={`mt-8 grid gap-5 ${slide.groups.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"} max-w-7xl`}>
            {slide.groups.map((g, gi) => (
              <motion.div key={gi} {...stagger(gi + 1)} className="glass rounded-3xl p-5">
                <div className="flex items-center gap-2">
                  <ToneDot tone={g.tone} />
                  <div className="font-bold text-foreground">{g.name}</div>
                </div>
                <div className="mt-3 space-y-1.5">
                  {g.items.map((it, i) => (
                    <div key={i} className="flex justify-between rounded-lg bg-white/60 px-3 py-1.5 text-sm">
                      <span className="text-foreground/80">{it.f}</span>
                      <span className="font-semibold text-orange">{it.c}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </SlideShell>
      );

    case "micros-intro":
      return (
        <SlideShell eyebrow="Micronutrients" eyebrowVariant="green">
          <Title>{slide.title}</Title>
          <motion.p {...stagger(1)} className="mt-8 max-w-4xl text-xl text-foreground/80 leading-relaxed">
            {slide.body}
          </motion.p>
          <div className="mt-10">
            <div className="text-green font-bold text-lg mb-4">They support:</div>
            <div className="grid gap-3 md:grid-cols-3 max-w-5xl">
              {slide.supports.map((s, i) => (
                <motion.div key={i} {...stagger(i + 2)} className="glass rounded-2xl px-5 py-4 flex items-center gap-3">
                  <span className="size-2 rounded-full bg-orange" />
                  <span className="font-medium">{s}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </SlideShell>
      );

    case "vitamins-split":
      return (
        <SlideShell eyebrow="Essentials">
          <Title>{slide.title}</Title>
          <div className="mt-10 grid gap-6 lg:grid-cols-2 max-w-6xl">
            {[slide.water, slide.fat].map((g, gi) => (
              <motion.div key={gi} {...stagger(gi + 1)} className="glass rounded-3xl p-6">
                <div className={`text-xl font-bold ${gi === 0 ? "text-green" : "text-orange"}`}>{g.name}</div>
                <div className="mt-2 text-sm text-foreground/70">{g.note}</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it, i) => (
                    <motion.span
                      key={i}
                      {...stagger(i + 2)}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        gi === 0 ? "bg-green/10 text-green" : "bg-orange/10 text-orange"
                      }`}
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </SlideShell>
      );

    case "vitamin-cards":
      return (
        <SlideShell eyebrow="Vitamins">
          <Title>{slide.title}</Title>
          {slide.lead && <motion.p {...stagger(1)} className="mt-6 text-lg text-foreground/75">{slide.lead}</motion.p>}
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
            {slide.items.map((v, i) => (
              <motion.div key={i} {...stagger(i + 2)} whileHover={{ y: -6 }} className="glass rounded-2xl p-5">
                <div className="text-lg font-bold text-green">{v.name}</div>
                <div className="mt-2 text-sm text-foreground/75">{v.desc}</div>
                <div className="mt-3 text-xs text-orange font-medium">{v.sources}</div>
              </motion.div>
            ))}
          </div>
          {slide.pattern && (
            <motion.div {...stagger(10)} className="mt-8 glass rounded-3xl p-5 max-w-5xl">
              <div className="text-green font-bold mb-2">Daily pattern to cover most vitamins naturally:</div>
              <div className="flex flex-wrap gap-2">
                {slide.pattern.map((p, i) => (
                  <span key={i} className="rounded-full bg-cream px-3 py-1.5 text-sm">✦ {p}</span>
                ))}
              </div>
            </motion.div>
          )}
        </SlideShell>
      );

    case "macros-overview":
      return (
        <SlideShell eyebrow="Macronutrients">
          <Title>{slide.title}</Title>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {slide.items.map((m, i) => (
              <motion.div
                key={i}
                {...stagger(i + 1)}
                whileHover={{ y: -8 }}
                className="glass relative overflow-hidden rounded-3xl p-7"
              >
                <div className={`absolute -right-6 -top-6 size-28 rounded-full opacity-20 ${m.color === "green" ? "bg-green" : "bg-orange"}`} />
                <div className={`text-sm font-mono tracking-widest ${m.color === "green" ? "text-green" : "text-orange"}`}>{m.n}</div>
                <div className="mt-2 text-3xl font-bold text-foreground">{m.name}</div>
                <p className="mt-3 text-base text-foreground/75 leading-relaxed">{m.desc}</p>
                <div className="mt-5 border-t border-foreground/10 pt-4 text-sm text-foreground/65 italic">
                  {m.examples}
                </div>
              </motion.div>
            ))}
          </div>
        </SlideShell>
      );

    case "balanced-plate": {
      const colorMap = {
        green: "from-green/60 to-green/30",
        orange: "from-orange/60 to-orange/30",
        amber: "from-amber-400/70 to-amber-300/30",
        cream: "from-cream to-amber-100/40",
      } as const;
      return (
        <SlideShell eyebrow="The Plate">
          <Title>{slide.title}</Title>
          <motion.p {...stagger(1)} className="mt-6 text-xl text-foreground/75 max-w-3xl">{slide.lead}</motion.p>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="grid gap-4">
              {slide.portions.map((p, i) => (
                <motion.div key={i} {...stagger(i + 2)} className="glass flex items-center gap-5 rounded-2xl p-5">
                  <div className={`grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${colorMap[p.color]} text-3xl font-bold text-green`}>
                    {p.pct}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{p.label}</div>
                    <div className="text-sm text-foreground/70">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div {...stagger(6)} className="glass rounded-3xl p-7">
              <div className="text-green font-bold tracking-widest text-sm">PORTION GUIDE — YOUR HAND</div>
              <div className="mt-5 grid gap-3">
                {slide.hands.map((h, i) => (
                  <div key={i} className="flex items-baseline justify-between border-b border-foreground/10 pb-2">
                    <span className="text-lg font-semibold text-foreground">{h.label}</span>
                    <span className="text-orange font-mono">{h.portion}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </SlideShell>
      );
    }

    case "conclusion":
      return (
        <div className="relative grid h-full w-full place-items-center overflow-y-auto px-6 pt-24 pb-32 md:px-16 scrollbar-hide">
          {/* Decorative background orbs for balance */}
          <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 size-72 rounded-full bg-orange/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-10 size-80 rounded-full bg-green/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute top-1/3 right-1/4 size-40 rounded-full bg-cream blur-2xl opacity-60" />

          <div className="relative mx-auto w-full max-w-5xl text-center">
            {/* Eyebrow centered on top */}
            <motion.div {...stagger(0)} className="flex justify-center">
              <Eyebrow>The End — Thank You</Eyebrow>
            </motion.div>

            {/* Portrait with decorative ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative mx-auto mt-8 w-fit"
            >
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-orange/40 via-cream to-green/40 blur-xl" />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative size-36 md:size-40 overflow-hidden rounded-full ring-4 ring-white shadow-2xl"
              >
                <img src={coachPortrait} alt="Kerry-Ann Walker" className="size-full object-cover" />
              </motion.div>
            </motion.div>

            {/* Title with flanking decorative lines */}
            <motion.div {...stagger(1)} className="mt-10 flex items-center justify-center gap-6">
              <div className="hidden md:block h-px w-24 bg-gradient-to-r from-transparent to-green/40" />
              <h1 className="headline text-6xl md:text-7xl lg:text-8xl leading-none">
                {slide.title}
              </h1>
              <div className="hidden md:block h-px w-24 bg-gradient-to-l from-transparent to-green/40" />
            </motion.div>

            {/* Leaf divider */}
            <motion.div {...stagger(2)} className="mt-6 flex justify-center text-2xl" aria-hidden>
              <span>🌿</span>
            </motion.div>

            {/* Body */}
            <motion.p {...stagger(3)} className="mx-auto mt-6 max-w-2xl text-xl md:text-2xl text-foreground/80 leading-relaxed">
              {slide.body}
            </motion.p>

            {/* Quote card */}
            <motion.div {...stagger(4)} className="mx-auto mt-10 max-w-2xl">
              <div className="relative rounded-3xl glass px-8 py-6 shadow-xl">
                <span className="absolute -top-4 left-6 text-5xl text-orange/70 font-serif leading-none">“</span>
                <blockquote className="text-2xl md:text-3xl italic text-orange font-light">
                  {slide.quote}
                </blockquote>
                <span className="absolute -bottom-8 right-6 text-5xl text-orange/70 font-serif leading-none">”</span>
              </div>
            </motion.div>

            {/* Contact row with icons */}
            <motion.div {...stagger(5)} className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm md:text-base text-foreground/85 shadow-md">
                <span aria-hidden>📞</span>{slide.contact.phone}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm md:text-base text-foreground/85 shadow-md">
                <span aria-hidden>✉️</span>{slide.contact.email}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm md:text-base text-foreground/85 shadow-md">
                <span aria-hidden>🌐</span>{slide.contact.site}
              </span>
            </motion.div>
          </div>
        </div>
      );
    }
  })();

  return (
    <div className="relative h-full w-full">
      {!noBadge && <SlideImageBadge src={heroImage} alt={heroAlt} />}
      {content}
    </div>
  );
}

// Update SlideShell to leave breathing room for the floating image and bottom nav.

function SlideShell({
  children,
  eyebrow,
  eyebrowVariant = "orange",
}: {
  children: React.ReactNode;
  eyebrow?: string;
  eyebrowVariant?: "orange" | "green";
}) {
  return (
    <div className="relative z-10 h-full w-full overflow-y-auto px-5 pt-24 pb-36 sm:px-8 md:px-12 md:pt-28 md:pb-40 lg:px-16 lg:pt-32 lg:pb-44 scrollbar-hide">
      <div className="mx-auto w-full max-w-6xl">
        {eyebrow && <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

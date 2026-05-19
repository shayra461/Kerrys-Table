import type { Slide } from "@/data/slides";
import { motion } from "framer-motion";
import logo from "@/assets/logo.svg";

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

export function SlideRenderer({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "cover":
      return (
        <div className="grid h-full w-full place-items-center px-8 md:px-16">
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
              <motion.div {...stagger(4)} className="mt-10 grid gap-1.5 text-sm md:text-base text-foreground/65 font-light tracking-wide">
                <div>{slide.contact.phone}</div>
                <div>{slide.contact.email}</div>
                <div>{slide.contact.site}</div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-orange/40 via-cream to-green/30 blur-2xl opacity-70" />
              <div className="relative grid h-full w-full place-items-center rounded-[2.5rem] glass">
                <img src={logo} alt="Kerry's Table" className="size-2/3 object-contain" />
              </div>
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
              <div className="relative grid h-full w-full place-items-end rounded-sm glass overflow-hidden bg-gradient-to-br from-green-soft via-cream to-orange-soft">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.6),transparent_60%)]" />
                <div className="relative w-full p-6">
                  <div className="rule mb-4" />
                  <div className="font-display text-3xl text-green">{slide.name}</div>
                  <div className="text-sm text-foreground/60 tracking-wider uppercase mt-1">{slide.role}</div>
                </div>
              </div>
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
                <div className="text-orange text-xs tracking-[0.2em] uppercase mb-2 font-medium">No. {String(i + 1).padStart(2, "0")}</div>
                <div className="text-sm font-medium text-foreground/85">{it}</div>
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
  }
}

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
    <div className="h-full w-full overflow-y-auto px-8 py-12 md:px-16 md:py-16 scrollbar-hide">
      <div className="mx-auto max-w-7xl">
        {eyebrow && <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

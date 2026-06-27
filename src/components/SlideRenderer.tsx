import type { Slide } from "@/data/slides";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import coachPortrait from "@/assets/kerry-ann-walker.jpeg";
import { imageFor } from "@/data/slideImages";

// Premium framed image component with clean shadow.
function SlideImageFrame({ src, alt, objectPosition = "center" }: { src: string; alt: string; objectPosition?: string }) {
  const isDiagram = src.includes("balanced-diet") || src.includes("balanced-plate");

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[380px] xl:h-[420px] max-h-[48vh] max-w-sm lg:max-w-md mx-auto z-10 shrink-0"
    >
      {/* Main Image Card — clean consistent shadow, no colored glow */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[2rem] border border-black/8"
        style={{ boxShadow: "0 8px 40px 0 rgba(0,0,0,0.13), 0 1.5px 6px 0 rgba(0,0,0,0.07)" }}
      >
        <img 
          src={src} 
          alt={alt} 
          className={`size-full ${isDiagram ? "object-contain bg-white/75 p-4" : "object-cover"} transition-transform duration-700 hover:scale-110`}
          style={!isDiagram ? { objectPosition } : undefined}
          loading="lazy"
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
  let content = children;
  if (typeof children === "string") {
    content = children
      .split(" ")
      .map(word => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
      .join(" ");
  }
  return (
    <motion.h1 {...fadeUp} className={`headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold ${className}`}>
      {content}
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
  const heroImage = imageFor(slide.imageIndex);
  const heroAlt = "Nutrition imagery";
  // Slides that already feature a large hero image — skip the floating badge.
  const noBadge = slide.kind === "cover" || slide.kind === "coach-profile" || slide.kind === "conclusion";

  const content: React.ReactNode = (() => {
    switch (slide.kind) {      case "cover":
        return (
          <div className="grid h-full w-full place-items-center overflow-y-auto scrollbar-hide px-6 pt-24 pb-20 md:px-12 md:pt-28 lg:pt-32">
            <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
              <div className="flex flex-col justify-center">
                <div className="flex">
                  <Eyebrow>Nutrition Coaching</Eyebrow>
                </div>
                <motion.h1 {...stagger(1)} className="headline mt-6 text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
                  Kerry's <span className="script-accent text-orange text-6xl md:text-8xl lg:text-9xl block md:inline ml-1 font-normal">Table</span>
                </motion.h1>
                <motion.p {...stagger(2)} className="mt-4 text-2xl md:text-3xl text-green font-serif font-medium tracking-wide italic">
                  {slide.subtitle}
                </motion.p>
                
                <motion.div 
                  {...stagger(3)} 
                  className="mt-8 inline-flex items-center gap-3.5 rounded-full border border-gold/30 bg-cream/70 backdrop-blur px-6 py-3 shadow-md max-w-fit"
                >
                  <span className="text-orange text-lg animate-[pulse_2s_infinite]">✦</span>
                  <span className="text-base font-serif font-bold text-green tracking-wide">
                    Real Food <span className="text-orange">·</span> Real Results <span className="text-orange">·</span> <span className="script-accent text-orange text-2xl font-normal">Real You</span>
                  </span>
                </motion.div>
 
                <motion.div {...stagger(4)} className="mt-10 flex flex-wrap items-center gap-4 text-base text-foreground">
                  <span className="inline-flex items-center gap-2 rounded-full glass border border-white/60 px-4 py-2 text-sm shadow-sm">
                    📞 {slide.contact.phone}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full glass border border-white/60 px-4 py-2 text-sm shadow-sm">
                    ✉️ {slide.contact.email}
                  </span>
                  <a href="https://www.kerrystable.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full glass border border-white/60 px-4 py-2 text-sm shadow-sm hover:border-orange/20 transition-all duration-300">
                    🌐 {slide.contact.site}
                  </a>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md max-h-[45vh]"
              >
                <motion.div
                  className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-black/8"
                  style={{ boxShadow: "0 8px 40px 0 rgba(0,0,0,0.13), 0 1.5px 6px 0 rgba(0,0,0,0.07)" }}
                >
                  <img src={heroImage} alt="Healthy plate" className="absolute inset-0 size-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute bottom-6 right-6 grid size-24 place-items-center rounded-full bg-white/90 border border-gold/15 backdrop-blur shadow-lg transition-transform duration-300 hover:scale-105">
                    <img src={logo} alt="Kerry's Table" className="size-18 object-contain" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        );

      case "intro":
        return (
          <SlideShell eyebrow={slide.eyebrow}>
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-6 max-w-xl" />
                <motion.p {...stagger(2)} className="mt-8 text-2xl md:text-3xl text-green/90 max-w-2xl font-serif leading-snug">
                  {slide.lead}
                </motion.p>
                
                <motion.div
                  {...stagger(3)}
                  className="relative mt-6 rounded-2xl glass px-6 py-4.5 border-l-4 border-orange shadow-md max-w-2xl"
                >
                  <span className="absolute -top-4 left-4 text-4xl text-gold/25 font-serif leading-none">“</span>
                  <blockquote className="text-lg md:text-xl italic text-green font-semibold font-serif leading-relaxed">
                    {slide.quote}
                  </blockquote>
                </motion.div>

                <motion.p {...stagger(4)} className="mt-6 max-w-2xl text-base md:text-lg text-foreground leading-relaxed font-sans font-medium">
                  {slide.body}
                </motion.p>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "toc":
        return (
          <SlideShell eyebrow="Roadmap">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-6 max-w-xl" />
                <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 max-w-2xl">
                  {slide.items.map((it, i) => (
                    <motion.div
                      key={i}
                      {...stagger(i)}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group flex items-center gap-4 rounded-xl p-3.5 glass hover:bg-brand-green-soft border border-border hover:border-green/20 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-soft text-orange font-serif font-bold text-base group-hover:bg-green group-hover:text-cream transition-all duration-300">
                        {it.n}
                      </div>
                      <div className="text-base font-medium text-foreground group-hover:text-green transition-all duration-300 font-sans">
                        {it.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "coach-profile":
        return (
          <SlideShell eyebrow="Introduction">
            <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr] lg:gap-16 pt-2">
              <motion.div {...stagger(1)} className="relative mx-auto aspect-[3/4] w-full max-w-xs lg:max-w-sm max-h-[40vh]">
                <motion.div
                  className="relative h-full w-full overflow-hidden rounded-[2rem] border border-black/8"
                  style={{ boxShadow: "0 8px 40px 0 rgba(0,0,0,0.13), 0 1.5px 6px 0 rgba(0,0,0,0.07)" }}
                >
                  <img src={coachPortrait} alt={slide.name} className="absolute inset-0 size-full object-cover object-top transition-transform duration-500 hover:scale-105" />
                </motion.div>
              </motion.div>
              <div className="flex flex-col justify-center">
                <Title>{slide.title}</Title>
                
                {/* Premium, clean name and role typography block */}
                <div className="mt-3 mb-2">
                  <div className="text-3xl md:text-4xl font-serif font-extrabold text-green tracking-tight">
                    {slide.name}
                  </div>
                  <div className="text-sm font-semibold tracking-wider uppercase text-orange mt-1">
                    {slide.role}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-soft border border-green/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-green">Certified Nutrition Coach</span>
                  <span className="rounded-full bg-orange-soft border border-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange">Real Food Advocate</span>
                  <span className="rounded-full bg-cream border border-gold/30 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">Sustainable Habits Mentor</span>
                </div>
                <div className="luxury-divider my-6" />
                {slide.body.map((p, i) => (
                  <motion.p key={i} {...stagger(i + 2)} className="mt-4 text-lg md:text-xl text-foreground leading-relaxed font-sans font-medium">
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
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-6 max-w-xl" />
                <div className="mt-8 grid gap-5 max-w-2xl">
                  {slide.body.map((p, i) => (
                    <motion.p key={i} {...stagger(i + 1)} className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed font-sans font-medium">
                      {p}
                    </motion.p>
                  ))}
                  {slide.quote && (
                    <motion.div
                      {...stagger(slide.body.length + 1)}
                      className="relative mt-4 rounded-2xl glass px-6 py-4.5 border-l-4 border-orange shadow-md"
                    >
                      <span className="absolute -top-4 left-4 text-4xl text-gold/25 font-serif leading-none">“</span>
                      <blockquote className="text-base md:text-lg italic text-green font-semibold font-serif leading-relaxed">
                        {slide.quote}
                      </blockquote>
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "bullets":
        return (
          <SlideShell eyebrow={slide.eyebrow}>
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                {slide.lead && (
                  <motion.p {...stagger(1)} className="mt-4 text-xl text-foreground font-sans">
                    {slide.lead}
                  </motion.p>
                )}
                <div className="luxury-divider my-6 max-w-xl" />
                <div className="mt-8 grid gap-4 max-w-2xl">
                  {slide.bullets.map((b, i) => (
                    <motion.div
                      key={i}
                      {...stagger(i + 2)}
                      whileHover={{ x: 8, scale: 1.01 }}
                      className="glass group flex items-start gap-4 rounded-2xl p-4.5 hover:bg-brand-green-soft border border-border transition-all duration-300"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green text-cream font-serif font-bold text-sm group-hover:bg-orange transition-all duration-300">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="text-base md:text-lg text-foreground leading-relaxed mt-0.5 group-hover:text-green transition-all duration-300 font-sans">
                        {b}
                      </div>
                    </motion.div>
                  ))}
                </div>
                {slide.quote && (
                  <motion.div {...stagger(slide.bullets.length + 3)} className="mt-8 border-t border-gold/20 pt-5 max-w-2xl">
                    <span className="text-xl text-orange font-semibold block mb-1">Coach Kerry says:</span>
                    <p className="text-lg md:text-xl italic text-green font-serif font-semibold">"{slide.quote}"</p>
                  </motion.div>
                )}
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "nutrients":
        return (
          <SlideShell eyebrow="Building Blocks">
            <div className="max-w-7xl w-full mx-auto pt-2">
              <Title>{slide.title}</Title>
              <div className="luxury-divider my-6 max-w-xl" />
              <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {slide.items.map((it, i) => {
                  const isGreen = it.color === "green";
                  const imageUrl = it.icon.startsWith("photo-")
                    ? `https://images.unsplash.com/${it.icon}?w=400&q=85&auto=format&fit=crop`
                    : it.icon;
                  return (
                    <motion.div
                      key={i}
                      {...stagger(i)}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="glass flex flex-col overflow-hidden rounded-[2rem] border border-border/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gold/25"
                    >
                      {/* Gorgeous, full-scale nutrient photo at the top */}
                      <div className="relative h-44 w-full overflow-hidden bg-cream">
                        <img 
                          src={imageUrl} 
                          alt={it.name} 
                          className="absolute inset-0 size-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </div>
                      
                      {/* Text content below the photo */}
                      <div className="p-5 flex flex-col justify-between flex-grow bg-white/40 backdrop-blur-sm border-t border-border/20">
                        <div>
                          <div className={`text-lg font-serif font-bold ${isGreen ? "text-green" : "text-orange"}`}>
                            {it.name}
                          </div>
                          <p className="mt-2 text-xs text-foreground leading-relaxed font-sans font-medium">
                            {it.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </SlideShell>
        );

      case "balanced":
        return (
          <SlideShell eyebrow="Balance">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <motion.p {...stagger(1)} className="mt-4 text-xl text-foreground max-w-3xl">
                  {slide.lead}
                </motion.p>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid grid-cols-2 gap-4 max-w-4xl">
                  {slide.items.map((it, i) => (
                    <motion.div
                      key={i}
                      {...stagger(i + 2)}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="glass rounded-2xl flex flex-col items-center justify-center text-center p-4 border border-border hover:border-gold/30 hover:bg-cream transition-all duration-300 min-h-[90px] md:min-h-[105px]"
                    >
                      <span className="text-gold text-lg mb-1">✦</span>
                      <div className="text-lg font-serif font-bold text-green tracking-tight leading-snug">
                        {it}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  {...stagger(8)} 
                  className="mt-6 inline-flex items-center gap-3 rounded-full border border-orange/20 bg-brand-orange-soft px-5 py-2.5 text-orange shadow-sm font-sans"
                >
                  <span className="animate-spin-slow">✦</span>
                  <span className="text-sm font-semibold tracking-wide uppercase">{slide.tag}</span>
                </motion.div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "dangers":
        return (
          <SlideShell eyebrow={slide.eyebrow ?? "Warning"}>
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <motion.p {...stagger(1)} className="mt-3 text-lg text-foreground max-w-3xl">
                  {slide.lead}
                </motion.p>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3">
                  {slide.items.map((it, i) => (
                    <motion.div
                      key={i}
                      {...stagger(i + 2)}
                      whileHover={{ y: -4 }}
                      className="glass rounded-xl p-4 text-center border border-orange/10 hover:border-orange/30 hover:bg-brand-orange-soft/40 transition-all duration-300"
                    >
                      <div className="text-2xl mb-2">⚠️</div>
                      <div className="text-base md:text-lg font-serif font-bold text-green tracking-tight leading-snug">
                        {it}
                      </div>
                    </motion.div>
                  ))}
                </div>
                {slide.quote && (
                  <motion.div 
                    {...stagger(8)} 
                    className="relative mt-6 rounded-xl glass px-6 py-4 border-l-4 border-orange shadow-md"
                  >
                    <span className="absolute -top-3 left-4 text-3xl text-gold/30 font-serif leading-none">“</span>
                    <blockquote className="text-base md:text-lg italic text-green font-semibold font-serif leading-relaxed">
                      {slide.quote}
                    </blockquote>
                  </motion.div>
                )}
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "label":
        return (
          <SlideShell eyebrow="Decoding Labels">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <motion.p {...stagger(1)} className="mt-3 text-lg text-foreground max-w-3xl">
                  {slide.lead}
                </motion.p>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3">
                  {slide.items.map((it, i) => (
                    <motion.div 
                      key={i} 
                      {...stagger(i + 2)} 
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="glass rounded-xl p-4 hover:border-gold/30 hover:bg-cream transition-all duration-300"
                    >
                      <div className="text-orange text-[10px] tracking-widest uppercase font-bold">Check {String(i + 1).padStart(2, "0")}</div>
                      <div className="mt-2 text-base md:text-lg font-serif font-bold text-green tracking-tight leading-snug">{it}</div>
                    </motion.div>
                  ))}
                </div>
                {slide.note && (
                  <motion.div {...stagger(8)} className="mt-6 script-accent text-2xl text-green/90 font-normal">
                    ✦ {slide.note}
                  </motion.div>
                )}
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "dv-table":
        return (
          <SlideShell eyebrow="Reference Values">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <motion.p {...stagger(1)} className="mt-3 text-lg text-foreground max-w-3xl">{slide.intro}</motion.p>
                <div className="luxury-divider my-4 max-w-xl" />
                
                <motion.div 
                  {...stagger(2)} 
                  className="mt-4 inline-flex flex-col rounded-xl glass border border-gold/30 px-5 py-3 shadow-md max-w-xl"
                >
                  <div className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">Mathematical Reference Formula</div>
                  <div className="font-mono text-base text-green font-bold leading-normal">
                    {slide.formula}
                  </div>
                </motion.div>

                <div className="mt-6 grid gap-3 grid-cols-2">
                  {slide.rows.map((r, i) => (
                    <motion.div 
                      key={i} 
                      {...stagger(i + 3)} 
                      whileHover={{ y: -3, scale: 1.01 }}
                      className="glass rounded-xl p-4 flex items-center justify-between border border-border hover:border-gold/20"
                    >
                      <span className="font-serif font-bold text-green text-sm">{r.name}</span>
                      <span className="text-orange font-bold text-base font-mono">{r.value}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div {...stagger(12)} className="mt-4 text-sm text-foreground font-serif italic">{slide.foot}</motion.div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "calc-card":
        return (
          <SlideShell eyebrow="Worked Example">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div className="flex flex-col gap-6">
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-2 max-w-xl" />
                <div className="grid gap-6 sm:grid-cols-2">
                  <motion.div {...stagger(1)} className="glass rounded-2xl p-5 border border-border">
                    <div className="text-orange uppercase tracking-widest text-[10px] font-bold mb-4 border-b border-orange/10 pb-2">Food Item Nutrient Facts</div>
                    <div className="grid grid-cols-2 gap-3">
                      {slide.food.map((f, i) => (
                        <div key={i} className="rounded-xl bg-white/70 p-3 border border-border hover:border-gold/10 transition-all duration-300">
                          <div className="text-[10px] text-foreground/85 uppercase tracking-wider font-semibold">{f.label}</div>
                          <div className="font-mono font-bold text-lg text-green mt-1">{f.value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div {...stagger(2)} className="glass rounded-2xl p-5 border border-gold/20 shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="text-green uppercase tracking-widest text-[10px] font-bold border-b border-green/10 pb-2">Caloric Formula</div>
                      <div className="mt-2 font-mono text-sm text-green font-bold">{slide.formula}</div>
                      <div className="mt-4 space-y-2">
                        {slide.steps.map((s, i) => (
                          <motion.div key={i} {...stagger(i + 3)} className="rounded-lg bg-cream border border-gold/10 px-3 py-2 font-mono text-foreground/90 flex items-center gap-2 text-xs">
                            <span className="text-orange font-bold">↳</span> {s}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="rounded-xl bg-gradient-to-r from-orange to-brand-orange/80 px-4 py-2.5 text-cream font-mono font-bold text-lg shadow-md">
                        {slide.total}
                      </div>
                      {slide.rounded && (
                        <div className="mt-2 text-green font-serif font-bold italic text-base flex items-center gap-1.5">
                          <span>✦</span> {slide.rounded}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "calc-pair":
        return (
          <SlideShell eyebrow="%DV Calculations">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {slide.pairs.map((p, i) => (
                    <motion.div 
                      key={i} 
                      {...stagger(i + 1)} 
                      whileHover={{ y: -4 }}
                      className="glass rounded-2xl p-6 border border-border hover:border-gold/20 shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-border pb-2">
                          <div className="text-lg font-serif font-bold text-green">{p.name}</div>
                          <div className="text-[10px] bg-green-soft text-green border border-green/10 rounded-full px-2 py-0.5 font-semibold uppercase tracking-wider">
                            DV: {p.dv}
                          </div>
                        </div>
                        <div className="mt-4 font-mono text-sm text-foreground bg-cream border border-gold/10 rounded-xl px-3 py-2">
                          {p.calc}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="inline-block rounded-full bg-orange text-cream px-4 py-1.5 font-mono font-bold text-base shadow-sm">
                          {p.result}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame
                  src={heroImage}
                  alt={slide.title}
                  objectPosition={slide.imageIndex === 15 ? "top" : "center"}
                />
              </div>
            </div>
          </SlideShell>
        );

      case "macro-break":
        return (
          <SlideShell eyebrow="Full Breakdown">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <motion.div {...stagger(1)} className="glass rounded-2xl p-4.5 border border-border">
                    <div className="text-orange text-[10px] uppercase tracking-widest font-bold border-b border-orange/10 pb-2 mb-3">Macronutrients</div>
                    <div className="space-y-2">
                      {slide.macros.map((m, i) => (
                        <div key={i} className="flex justify-between items-center rounded-lg bg-white/70 px-3 py-2 border border-border/40 font-sans text-xs">
                          <span className="font-medium text-foreground">{m.name}</span>
                          <span className="font-mono font-bold text-green">{m.g}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div {...stagger(2)} className="glass rounded-2xl p-4.5 border border-border">
                    <div className="text-green text-[10px] uppercase tracking-widest font-bold border-b border-green/10 pb-2 mb-3">% Daily Values</div>
                    <div className="space-y-2">
                      {slide.dv.map((m, i) => (
                        <div key={i} className="flex justify-between items-center rounded-lg bg-white/70 px-3 py-2 border border-border/40 font-sans text-xs">
                          <span className="font-medium text-foreground">{m.name}</span>
                          <span className="font-mono font-bold text-orange">{m.pct}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div {...stagger(3)} className="glass rounded-2xl p-4.5 border border-gold/20 shadow-sm">
                    <div className="text-gold text-[10px] uppercase tracking-widest font-bold border-b border-gold/20 pb-2 mb-3">Calculations</div>
                    <div className="space-y-2 font-mono text-xs">
                      {slide.example.map((m, i) => (
                        <div key={i} className="rounded-lg bg-cream border border-gold/10 px-3 py-2">
                          <span className="text-foreground/85 font-sans font-medium">{m.name}: </span>
                          <span className="text-green font-bold">{m.calc}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                <motion.div {...stagger(8)} className="mt-5 text-sm text-green font-serif font-medium italic">{slide.foot}</motion.div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "compare-foods":
        return (
          <SlideShell eyebrow="Smart Comparisons">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <motion.p {...stagger(1)} className="mt-3 text-lg text-foreground max-w-3xl">{slide.lead}</motion.p>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {slide.items.map((it, i) => (
                    <motion.div
                      key={it.n}
                      {...stagger(i + 2)}
                      whileHover={{ y: -4 }}
                      className="glass group rounded-2xl p-5 border border-border hover:border-gold/30 hover:bg-cream transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-serif font-extrabold text-gold group-hover:text-orange transition-all duration-300">
                            {String(it.n).padStart(2, "0")}
                          </span>
                          <span className="text-lg font-serif font-bold text-green tracking-tight leading-snug">{it.name}</span>
                        </div>
                        <div className="mt-2 inline-block rounded-full bg-green-soft border border-green/15 text-green px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider group-hover:bg-green group-hover:text-cream transition-all duration-300">
                          {it.rule}
                        </div>
                        <p className="mt-3 text-xs text-foreground leading-relaxed font-sans">{it.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "thresholds":
        return (
          <SlideShell eyebrow="Quick Evaluation">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div className="flex flex-col gap-6">
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-2 max-w-xl" />
                <div className="grid gap-6 sm:grid-cols-2">
                  <motion.div {...stagger(1)} className="glass rounded-2xl p-6 border border-orange/10 hover:border-orange/20 shadow-sm">
                    <div className="flex items-center gap-2.5 border-b border-orange/10 pb-3 mb-4">
                      <div className="flex size-9 items-center justify-center rounded-xl bg-orange-soft text-orange text-sm shadow-inner font-bold">▲</div>
                      <div>
                        <h3 className="font-serif font-bold text-green text-base">High %DV</h3>
                        <p className="text-[10px] uppercase tracking-wider text-orange font-semibold">20% or more</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {slide.high.map((h, i) => {
                        const isGood = h.verdict === "good";
                        return (
                          <div key={i} className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 border border-border/40 font-sans text-xs">
                            <span className="font-medium text-foreground">{h.label}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                              isGood 
                                ? "bg-green-soft border-green/10 text-green" 
                                : "bg-orange-soft border-orange/10 text-orange"
                            }`}>
                              {isGood ? "✓ Benefit" : "⚠ Limit"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                  <motion.div {...stagger(2)} className="glass rounded-2xl p-6 border border-green/10 hover:border-green/20 shadow-sm">
                    <div className="flex items-center gap-2.5 border-b border-green/10 pb-3 mb-4">
                      <div className="flex size-9 items-center justify-center rounded-xl bg-green-soft text-green text-sm shadow-inner font-bold">▼</div>
                      <div>
                        <h3 className="font-serif font-bold text-green text-base">Low %DV</h3>
                        <p className="text-[10px] uppercase tracking-wider text-green font-semibold">5% or less</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {slide.low.map((h, i) => {
                        const isGood = h.verdict === "good";
                        return (
                          <div key={i} className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 border border-border/40 font-sans text-xs">
                            <span className="font-medium text-foreground">{h.label}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                              isGood 
                                ? "bg-green-soft border-green/10 text-green" 
                                : "bg-orange-soft border-orange/10 text-orange"
                            }`}>
                              {isGood ? "✓ Benefit" : "⚠ Watch"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "look-for":
        return (
          <SlideShell eyebrow="Label Reading">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div className="flex flex-col gap-6">
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-2 max-w-xl" />
                <div className="grid gap-6 sm:grid-cols-2">
                  <motion.div {...stagger(1)} className="glass rounded-2xl p-6 border border-green/10 shadow-sm">
                    <div className="text-green font-serif font-bold text-xl border-b border-green/10 pb-2.5 mb-4 flex items-center gap-2">
                      <span>✓</span> Smart Indicators
                    </div>
                    <ul className="space-y-2.5">
                      {slide.good.map((g, i) => (
                        <motion.li 
                          key={i} 
                          whileHover={{ x: 4 }}
                          className="rounded-xl bg-green-soft border border-green/5 px-4 py-3 text-foreground font-sans text-xs leading-relaxed flex items-start gap-2.5 transition-all duration-300"
                        >
                          <span className="text-green text-base font-bold">✦</span>
                          <span>{g}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div {...stagger(2)} className="glass rounded-2xl p-6 border border-orange/10 shadow-sm">
                    <div className="text-orange font-serif font-bold text-xl border-b border-orange/10 pb-2.5 mb-4 flex items-center gap-2">
                      <span>⚠</span> Red Flags
                    </div>
                    <ul className="space-y-2.5">
                      {slide.red.map((g, i) => (
                        <motion.li 
                          key={i} 
                          whileHover={{ x: 4 }}
                          className="rounded-xl bg-orange-soft border border-orange/5 px-4 py-3 text-foreground font-sans text-xs leading-relaxed flex items-start gap-2.5 transition-all duration-300"
                        >
                          <span className="text-orange text-base font-bold">✦</span>
                          <span>{g}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "formula":
        return (
          <SlideShell eyebrow="Simple Math">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <motion.p {...stagger(1)} className="mt-3 text-lg text-foreground max-w-3xl">{slide.lead}</motion.p>
                <div className="luxury-divider my-4 max-w-xl" />
                
                <div className="grid gap-5 sm:grid-cols-2">
                  <motion.div 
                    {...stagger(2)} 
                    className="flex flex-col justify-center rounded-2xl glass border border-green/20 p-5 shadow-md"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-green font-bold mb-2">Standard Formula</div>
                    <div className="font-mono text-lg text-green font-bold leading-normal">
                      {slide.formula}
                    </div>
                  </motion.div>

                  <motion.div {...stagger(3)} className="glass rounded-2xl p-5 border border-gold/20 shadow-md">
                    <div className="text-orange uppercase tracking-widest text-[10px] font-bold border-b border-orange/10 pb-1.5 mb-3">
                      Example — {slide.example.food}
                    </div>
                    <div className="space-y-2 text-sm font-sans">
                      <div className="flex justify-between items-center bg-white/50 px-3 py-1.5 rounded-lg border border-border">
                        <span className="text-foreground/95 font-medium text-xs">Nutrients per 100g:</span>
                        <span className="font-mono font-bold text-green text-xs">{slide.example.per100}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/50 px-3 py-1.5 rounded-lg border border-border">
                        <span className="text-foreground/95 font-medium text-xs">Portion eaten:</span>
                        <span className="font-mono font-bold text-green text-xs">{slide.example.eat}</span>
                      </div>
                      <div className="font-mono text-xs bg-cream border border-gold/15 rounded-lg px-3 py-2 text-foreground/90">
                        Calc: <span className="text-orange font-bold">{slide.example.calc}</span>
                      </div>
                      <div className="pt-1">
                        <div className="inline-block rounded-full bg-orange text-cream px-4 py-1.5 font-mono font-bold text-sm shadow-sm">
                          = {slide.example.result}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "choices": {
        const isBetter = slide.tone === "better";
        return (
          <SlideShell eyebrow={slide.eyebrow} eyebrowVariant={isBetter ? "green" : "orange"}>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-5 max-w-xl" />
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {slide.items.map((it, i) => (
                    <motion.span
                      key={i}
                      {...stagger(i)}
                      whileHover={{ y: -3, scale: 1.03 }}
                      className={`glass rounded-full px-4.5 py-2.5 text-base font-sans font-medium flex items-center gap-1.5 cursor-default border transition-all duration-300 ${
                        isBetter 
                          ? "text-green hover:border-green/45 hover:bg-brand-green-soft border-green/10" 
                          : "text-orange hover:border-orange/45 hover:bg-brand-orange-soft border-orange/10"
                      }`}
                    >
                      <span className="text-sm">{isBetter ? "✓" : "•"}</span>
                      <span>{it}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );
      }

      case "veg-groups":
        return (
          <SlideShell eyebrow="Vegetables" eyebrowVariant="green">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <motion.div {...stagger(1)} className="glass rounded-2xl p-6 border border-green/15 shadow-sm">
                    <div className="text-lg font-serif font-bold text-green border-b border-green/10 pb-2 mb-4">Non-Starchy Vegetables</div>
                    <div className="flex flex-wrap gap-2">
                      {slide.nonStarchy.map((v, i) => (
                        <motion.span 
                          key={i} 
                          {...stagger(i + 2)} 
                          whileHover={{ scale: 1.04 }}
                          className="rounded-full bg-green-soft border border-green/10 text-green px-3 py-1.5 text-xs font-sans font-medium transition-all duration-300"
                        >
                          {v}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div {...stagger(2)} className="glass rounded-2xl p-6 border border-orange/15 shadow-sm">
                    <div className="text-lg font-serif font-bold text-orange border-b border-orange/10 pb-2 mb-4">Starchy (Still Healthy)</div>
                    <div className="flex flex-wrap gap-2">
                      {slide.starchy.map((v, i) => (
                        <motion.span 
                          key={i} 
                          {...stagger(i + 3)} 
                          whileHover={{ scale: 1.04 }}
                          className="rounded-full bg-orange-soft border border-orange/10 text-orange px-3 py-1.5 text-xs font-sans font-medium transition-all duration-300"
                        >
                          {v}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "small-changes":
        return (
          <SlideShell eyebrow="Habits">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <motion.p {...stagger(1)} className="mt-3 text-lg text-foreground max-w-3xl">{slide.lead}</motion.p>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {(slide.items as { icon: string; name: string }[]).map((it, i) => (
                    <motion.div
                      key={i}
                      {...stagger(i + 2)}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="glass rounded-2xl overflow-hidden border border-border transition-all duration-300 shadow-md"
                    >
                      <div className="w-full h-36 overflow-hidden">
                        <img
                          src={it.icon.startsWith("photo-")
                            ? `https://images.unsplash.com/${it.icon}?w=400&h=280&fit=crop&auto=format&q=80`
                            : it.icon}
                          alt={it.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-4 py-3 text-center">
                        <div className="text-base font-serif font-bold text-green tracking-tight leading-snug">{it.name}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {slide.quote && (
                  <motion.div {...stagger(8)} className="mt-6 border-t border-gold/20 pt-4">
                    <span className="text-xl text-orange font-semibold block mb-1">Coach Kerry says:</span>
                    <p className="text-lg md:text-xl italic text-green font-semibold font-serif">"{slide.quote}"</p>
                  </motion.div>
                )}
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "responsibility":
        return (
          <SlideShell eyebrow="Closing Thought">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-4 max-w-xl" />
                <motion.div 
                  {...stagger(2)}
                  className="relative rounded-2xl glass p-6 border border-gold/20 shadow-md mt-6"
                >
                  <div className="absolute -top-5 -right-5 text-4xl text-gold/20 select-none pointer-events-none">🌱</div>
                  <p className="text-xl leading-relaxed text-green font-serif font-medium">
                    {slide.body}
                  </p>
                </motion.div>
                <motion.div 
                  {...stagger(3)} 
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-green px-6 py-3.5 text-cream font-sans font-bold text-base shadow-lg hover:bg-orange transition-colors duration-300"
                >
                  <span>🌱</span>
                  <span>YOUR FUTURE, IN YOUR HANDS</span>
                </motion.div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} objectPosition="left" />
              </div>
            </div>
          </SlideShell>
        );

      case "cal-list": {
        const gridCols = slide.groups.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
        return (
          <SlideShell eyebrow={slide.eyebrow ?? "Reference"}>
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className={`mt-6 grid gap-4 ${gridCols}`}>
                  {slide.groups.map((g, gi) => (
                    <motion.div 
                      key={gi} 
                      {...stagger(gi + 1)} 
                      whileHover={{ y: -4 }}
                      className="glass rounded-2xl p-4.5 border border-border shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 border-b border-border pb-2 mb-3">
                          <ToneDot tone={g.tone} />
                          <div className="font-serif font-bold text-green text-base tracking-tight leading-tight">{g.name}</div>
                        </div>
                        <div className="space-y-1.5">
                          {g.items.map((it, i) => (
                            <div 
                              key={i} 
                              className="flex justify-between items-center rounded-lg bg-white/70 hover:bg-cream border border-border/30 hover:border-gold/15 px-3 py-1.5 text-xs transition-all duration-200"
                            >
                              <span className="text-foreground font-sans leading-tight">{it.f}</span>
                              <span className="font-mono font-bold text-orange">{it.c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );
      }

      case "micros-intro":
        return (
          <SlideShell eyebrow="Micronutrients" eyebrowVariant="green">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-4 max-w-xl" />
                <motion.p {...stagger(1)} className="mt-4 text-lg text-foreground leading-relaxed font-serif font-medium">
                  {slide.body}
                </motion.p>
                <div className="mt-6">
                  <div className="text-green font-serif font-bold text-base mb-3 flex items-center gap-2">
                    <span>✦</span> Essential Roles:
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {slide.supports.map((s, i) => (
                      <motion.div 
                        key={i} 
                        {...stagger(i + 2)} 
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="glass group rounded-xl px-4 py-3 flex items-center gap-2 border border-border hover:border-gold/25"
                      >
                        <span className="flex size-2 shrink-0 rounded-full bg-orange group-hover:bg-green transition-colors duration-300" />
                        <span className="font-sans font-medium text-foreground text-sm group-hover:text-green transition-colors duration-300">{s}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "vitamins-split":
        return (
          <SlideShell eyebrow="Essentials">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {[slide.water, slide.fat].map((g, gi) => {
                    const isGreen = gi === 0;
                    return (
                      <motion.div 
                        key={gi} 
                        {...stagger(gi + 1)} 
                        className={`glass rounded-2xl p-6 border shadow-sm ${
                          isGreen ? "border-green/10 hover:border-green/20" : "border-orange/10 hover:border-orange/20"
                        }`}
                      >
                        <div className={`text-xl font-serif font-bold ${isGreen ? "text-green" : "text-orange"}`}>{g.name}</div>
                        <div className="mt-1 text-xs text-foreground font-serif italic">{g.note}</div>
                        <div className="luxury-divider my-3 opacity-30" />
                        <div className="mt-4 flex flex-wrap gap-2">
                          {g.items.map((it, i) => (
                            <motion.span
                              key={i}
                              {...stagger(i + 2)}
                              whileHover={{ scale: 1.04, y: -2 }}
                              className={`rounded-full px-3 py-1.5 text-xs font-sans font-medium border transition-all duration-300 ${
                                isGreen 
                                  ? "bg-green-soft border-green/10 text-green hover:bg-green hover:text-cream" 
                                  : "bg-orange-soft border-orange/10 text-orange hover:bg-orange hover:text-cream"
                              }`}
                            >
                              {it}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "vitamin-cards":
        return (
          <SlideShell eyebrow="Vitamins">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                {slide.lead && <motion.p {...stagger(1)} className="mt-3 text-lg text-foreground max-w-3xl">{slide.lead}</motion.p>}
                <div className="luxury-divider my-4 max-w-xl" />
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {slide.items.map((v, i) => (
                    <motion.div 
                      key={i} 
                      {...stagger(i + 2)} 
                      whileHover={{ y: -4, scale: 1.01 }} 
                      className="glass group rounded-xl p-4.5 border border-border hover:border-gold/20 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-lg font-serif font-bold text-green border-b border-border pb-1.5 group-hover:text-orange transition-colors duration-300">
                          {v.name}
                        </div>
                        <p className="mt-2 text-xs text-foreground leading-relaxed font-sans">{v.desc}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-border/40">
                        <div className="text-[10px] text-foreground/80 uppercase tracking-widest font-semibold mb-0.5">Sources</div>
                        <div className="text-xs text-orange font-medium font-serif">{v.sources}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {slide.pattern && (
                  <motion.div {...stagger(10)} className="mt-6 glass rounded-2xl p-5 border border-gold/30 shadow-md">
                    <div className="text-green font-serif font-bold text-base mb-2 flex items-center gap-2">
                      <span>✦</span> Ideal Daily Blueprint:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {slide.pattern.map((p, i) => (
                        <span key={i} className="rounded-full bg-cream border border-gold/15 px-3 py-1.5 text-xs font-sans font-medium text-foreground">
                          ✦ {p}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "macros-overview":
        return (
          <SlideShell eyebrow="Macronutrients">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {slide.items.map((m, i) => {
                    const isGreen = m.color === "green";
                    return (
                      <motion.div
                        key={i}
                        {...stagger(i + 1)}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="glass group relative overflow-hidden rounded-2xl p-6 border border-border hover:border-gold/25 shadow-sm flex flex-col justify-between min-h-[280px]"
                      >
                        <div className={`absolute -right-6 -top-6 size-20 rounded-full opacity-10 group-hover:scale-110 transition-transform duration-500 ${isGreen ? "bg-green" : "bg-orange"}`} />
                        <div>
                          <div className={`text-[10px] font-mono tracking-widest font-bold ${isGreen ? "text-green" : "text-orange"}`}>{m.n}</div>
                          <div className="mt-2 text-xl font-serif font-bold text-green tracking-tight">{m.name}</div>
                          <p className="mt-2 text-xs text-foreground leading-relaxed font-sans">{m.desc}</p>
                        </div>
                        <div className="mt-4 border-t border-border pt-3">
                          <div className="text-[10px] uppercase tracking-widest text-gold font-bold mb-0.5">Examples</div>
                          <p className="text-xs text-foreground/95 leading-relaxed font-serif italic">
                            {m.examples}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );

      case "balanced-plate": {
        const colorMap = {
          green: "from-green/20 to-green/5 border-green/20 text-green",
          orange: "from-orange/20 to-orange/5 border-orange/20 text-orange",
          amber: "from-amber-500/20 to-amber-500/5 border-amber-500/25 text-amber-600",
          cream: "from-cream to-amber-100/10 border-gold/30 text-gold",
        } as const;
        return (
          <SlideShell eyebrow="The Plate">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center max-w-7xl">
              <div>
                <Title>{slide.title}</Title>
                <motion.p {...stagger(1)} className="mt-3 text-lg text-foreground max-w-3xl">{slide.lead}</motion.p>
                <div className="luxury-divider my-4 max-w-xl" />
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="grid gap-3">
                    {slide.portions.map((p, i) => (
                      <motion.div 
                        key={i} 
                        {...stagger(i + 2)} 
                        whileHover={{ x: 4, scale: 1.01 }}
                        className="glass flex items-center gap-3.5 rounded-2xl p-4 border border-border shadow-sm hover:border-gold/20"
                      >
                        <div className={`grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br border font-mono text-lg font-black ${colorMap[p.color]}`}>
                          {p.pct}
                        </div>
                        <div>
                          <div className="text-base font-serif font-bold text-green tracking-tight leading-snug">{p.label}</div>
                          <div className="text-xs text-foreground font-sans mt-0.5 leading-relaxed">{p.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    {...stagger(6)} 
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-6 border border-gold/20 shadow-md flex flex-col justify-between bg-white/70"
                  >
                    <div>
                      <div className="text-green font-serif font-bold tracking-tight text-xl border-b border-green/10 pb-2.5 mb-4">
                        Portion Guide — Your Hand
                      </div>
                      <div className="space-y-3">
                        {slide.hands.map((h, i) => (
                          <div key={i} className="flex items-center justify-between border-b border-border/60 pb-2 font-sans text-sm">
                            <span className="font-medium text-foreground">{h.label}</span>
                            <span className="text-orange font-serif font-bold">{h.portion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 text-[10px] text-foreground/80 font-serif italic text-center">
                      ✦ Easy portion estimation without scales.
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <SlideImageFrame src={heroImage} alt={slide.title} />
              </div>
            </div>
          </SlideShell>
        );
      }

      case "conclusion":
        return (
          <div className="relative grid h-full w-full place-items-center overflow-hidden px-6 pt-24 pb-20 md:px-16">
            {/* Decorative background orbs for balance */}
            <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 size-72 rounded-full bg-orange/20 blur-3xl opacity-60 animate-[pulse_8s_infinite]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-10 size-80 rounded-full bg-green/20 blur-3xl opacity-60 animate-[pulse_10s_infinite]" />
            <div aria-hidden className="pointer-events-none absolute top-1/3 right-1/4 size-40 rounded-full bg-cream blur-2xl opacity-60" />

            <div className="relative mx-auto w-full max-w-5xl text-center max-h-full overflow-y-auto scrollbar-hide">
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
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-orange/35 via-cream to-green/35 blur-xl" />
                <motion.div
                  className="relative size-36 md:size-44 overflow-hidden rounded-full ring-4 ring-white shadow-2xl border border-gold/25"
                >
                  <img src={coachPortrait} alt="Kerry-Ann Walker" className="size-full object-cover" />
                </motion.div>
              </motion.div>

              {/* Title with flanking decorative lines */}
              <motion.div {...stagger(1)} className="mt-8 flex items-center justify-center gap-6">
                <div className="hidden md:block h-px w-24 bg-gradient-to-r from-transparent to-green/40" />
                <h1 className="headline text-6xl md:text-8xl leading-none">
                  {slide.title}
                </h1>
                <div className="hidden md:block h-px w-24 bg-gradient-to-l from-transparent to-green/40" />
              </motion.div>

              {/* Leaf divider */}
              <motion.div {...stagger(2)} className="mt-4 flex justify-center text-2xl" aria-hidden>
                <span className="animate-[pulse_2s_infinite]">🌿</span>
              </motion.div>

              {/* Body */}
              <motion.p {...stagger(3)} className="mx-auto mt-6 max-w-2xl text-xl md:text-2xl text-foreground leading-relaxed font-serif font-medium">
                {slide.body}
              </motion.p>

              {/* Quote card */}
              <motion.div {...stagger(4)} className="mx-auto mt-8 max-w-2xl">
                <div className="relative rounded-3xl glass px-8 py-6 border border-gold/20 shadow-xl">
                  <span className="absolute -top-4 left-6 text-5xl text-orange/30 font-serif leading-none">“</span>
                  <blockquote className="text-2xl md:text-3xl italic text-orange font-serif font-semibold leading-relaxed">
                    {slide.quote}
                  </blockquote>
                  <span className="absolute -bottom-8 right-6 text-5xl text-orange/30 font-serif leading-none">”</span>
                </div>
              </motion.div>

              {/* Contact row with premium vibrant branded tabs */}
              <motion.div {...stagger(5)} className="mt-12 flex flex-wrap items-center justify-center gap-5">
                <a
                  href={`tel:${slide.contact.phone}`}
                  className="inline-flex items-center gap-3 rounded-2xl bg-green/10 border border-green/30 px-6 py-4 text-base font-bold text-green shadow-md hover:bg-green hover:text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  <span className="text-xl" aria-hidden>📞</span> {slide.contact.phone}
                </a>
                <a
                  href={`mailto:${slide.contact.email}`}
                  className="inline-flex items-center gap-3 rounded-2xl bg-orange/10 border border-orange/30 px-6 py-4 text-base font-bold text-orange shadow-md hover:bg-orange hover:text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  <span className="text-xl" aria-hidden>✉️</span> {slide.contact.email}
                </a>
                <a
                  href="https://www.kerrystable.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl bg-gold/10 border border-gold/30 px-6 py-4 text-base font-bold text-[#b59841] shadow-md hover:bg-gold hover:text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                >
                  <span className="text-xl" aria-hidden>🌐</span> {slide.contact.site}
                </a>
              </motion.div>
            </div>
          </div>
        );
    }
  })();

  return (
    <div className="relative h-full w-full">
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
    <div className="relative z-10 h-full w-full flex flex-col px-5 pt-20 pb-20 sm:px-8 md:px-12 md:pt-24 md:pb-24 lg:px-16 lg:pt-28 lg:pb-28 overflow-hidden">
      <div className="mx-auto my-auto w-full max-w-6xl max-h-full overflow-y-auto scrollbar-hide">
        {eyebrow && (
          <div className="mb-4 flex">
            <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>
          </div>
        )}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

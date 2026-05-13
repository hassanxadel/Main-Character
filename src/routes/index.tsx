import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles, Check, Car, Crown, AlertTriangle, MapPin,
  Shirt, Zap, Music, Pizza, Laugh, MessageCircle, HeartPulse,
  Eye, Target, Gift, Gauge, Wallet, Heart, ArrowUp,
  Phone,
  Smartphone,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Thursday's Main Character Invitation" },
      { name: "description", content: "An unreasonably premium invitation for one (1) main character." },
    ],
  }),
});

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease },
  }),
};

/* ---------- Section progressive reveal wrapper ---------- */
// No React state needed — revealSection() handles everything via direct DOM
function SectionReveal({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) {
  return (
    <div id={sectionId} className="relative">
      {/* click-blocker overlay — hidden by revealSection() */}
      <div
        data-overlay="true"
        className="absolute inset-0 z-20"
        style={{ pointerEvents: "all", cursor: "default" }}
      />
      {/* blur layer — CSS transition fires when revealSection() updates inline styles */}
      <div
        className="section-blur-layer"
        style={{
          filter: "blur(14px)",
          opacity: 0.5,
          pointerEvents: "none",
          transition: "filter 1s cubic-bezier(0.22,1,0.36,1), opacity 1s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- Floating particles ---------- */
function Particles() {
  const dots = Array.from({ length: 22 });
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const size = 6 + ((i * 13) % 14);
        const delay = (i % 10) * 1.2;
        const duration = 14 + ((i * 7) % 14);
        const drift = ((i % 5) - 2) * 30;
        return (
          <span
            key={i}
            style={{
              left: `${left}%`,
              bottom: `-${size}px`,
              width: size, height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              ["--drift" as string]: `${drift}px`,
            }}
            className="absolute rounded-full bg-[var(--pink)]/40 blur-[1px] shadow-[0_0_20px_rgba(255,79,139,0.6)]"
          >
            <span style={{ animation: `float-up ${duration}s linear infinite`, animationDelay: `${delay}s` }}
              className="block h-full w-full rounded-full bg-[var(--pink)]/60" />
          </span>
        );
      })}
    </div>
  );
}

function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[var(--pink-soft)]/60 blur-3xl" />
      <div className="animate-blob absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-[var(--pink)]/25 blur-3xl [animation-delay:-6s]" />
      <div className="animate-blob absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-[var(--burgundy)]/15 blur-3xl [animation-delay:-12s]" />
    </div>
  );
}

/* ---------- Cursor glow ---------- */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[300px] w-[300px] rounded-full bg-[var(--pink)]/15 blur-3xl transition-transform duration-300 ease-out md:block" />
  );
}

/* ---------- Hero ---------- */
const subtitles = [
  "This Could've Been a Text… But Where's the Fun in That?",
  "Thursday Looks Better With You In It",
  "You're Literally the Reason This Exists",
  "Proof That I'm a Software Engineer",
];

function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % subtitles.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <Blobs />
      <div className="relative z-10 mx-auto max-w-5xl text-center">

        {/* Badge — plain HTML, always visible */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--pink)]/30 bg-white/60 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[var(--burgundy)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--pink)]" />
          A Highly Personal Invitation
        </div>

        {/* Title — plain HTML, always visible */}
        <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-[5.5rem]">
          Thursday's <span className="text-gradient-pink italic">Main Character</span> Invitation
        </h1>

        {/* Rotating subtitle — only this part uses Framer Motion (client-only swap) */}
        <div className="relative mx-auto mt-10 h-16 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease }}
              className="absolute inset-0 text-lg text-muted-foreground sm:text-xl"
            >
              {subtitles[idx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA button — id wired via native listener in Index useEffect */}
        <div className="mt-12">
          <button
            id="hero-cta-btn"
            className="btn-pink group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
          >
            <span className="relative z-10">Review Your Invitation</span>
            <Sparkles className="relative z-10 h-4 w-4 transition-transform group-hover:rotate-12" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Confetti helper ---------- */
function fireConfetti(colors = ["#FF4F8B", "#FFC1D6", "#7A1E48", "#FFFFFF"]) {
  const end = Date.now() + 700;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 75, origin: { x: 0 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 75, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ---------- Floating hearts burst ---------- */
function FloatingHearts() {
  const emojis = ["💗", "✨", "🌸", "💕", "⭐", "💗", "🌸", "✨", "💕", "💗"];
  return (
    <>
      {emojis.map((emoji, i) => {
        const xOffset = (i - 5) * 32 + (Math.random() * 20 - 10);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, y: 0, x: xOffset, scale: 1.2 }}
            animate={{ opacity: 0, y: -180, x: xOffset + (i % 2 === 0 ? 20 : -20), scale: 0.5 }}
            transition={{ duration: 1.6, delay: i * 0.07, ease: "easeOut" }}
            className="pointer-events-none fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 select-none text-2xl"
          >
            {emoji}
          </motion.div>
        );
      })}
    </>
  );
}

/* ---------- RSVP ---------- */
const convinceCards = [
  "Because I spent engineering-level effort on this website 🤪",
  "Because you still haven't experienced my elite food recommendations.",
  "Because I need someone to judge people passing by with me.",
  "Because deep down… you were already gonna press the other button 😌",
];

function RSVP() {
  const [confirmed, setConfirmed] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [convinceOpen, setConvinceOpen] = useState(false);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const convinceSectionRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    if (confirmed) return;
    setConfirmed(true);
    setShowHearts(true);
    fireConfetti();
    setTimeout(() => setShowHearts(false), 1900);
    // reveal transportation is handled by native listener in Index
  };

  const handleConvince = () => {
    setConvinceOpen(true);
    setTimeout(() => {
      convinceSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const scrollToPrimary = () => {
    primaryBtnRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="relative px-6 py-32">
      <AnimatePresence>
        {showHearts && <FloatingHearts />}
      </AnimatePresence>

      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--burgundy)]"></p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Will The <span className="text-gradient-pink italic">Main Character</span> Attend?
          </h2>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.button
            id="rsvp-confirm-btn"
            ref={primaryBtnRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleConfirm}
            disabled={confirmed}
            className="btn-pink inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold disabled:opacity-80"
          >
            <Check className="h-4 w-4" /> Obviously I'm Coming 😌
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleConvince}
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold text-[var(--burgundy)] hover:border-[var(--pink)]/60"
          >
            <Eye className="h-4 w-4" /> Hmm… Convince Me 👀
          </motion.button>
        </div>

        {/* Confirmation glassmorphism popup */}
        <AnimatePresence>
          {confirmed && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.55, ease }}
              className="glass-pink mx-auto mt-10 max-w-md rounded-2xl p-6 shadow-soft"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--pink)]"></p>
              <p className="mt-2 text-lg font-medium">Excellent decision-making skills detected.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Convince Me subsection */}
        <AnimatePresence>
          {convinceOpen && (
            <motion.div
              ref={convinceSectionRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease }}
              className="mt-24"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--burgundy)]">// Because You Asked</p>
              <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Why Missing This Would Be{" "}
                <span className="text-gradient-pink italic">Unfortunate</span>
              </h3>

              {/* Subtle floating particles inside subsection */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                    className="absolute h-2 w-2 rounded-full bg-[var(--pink)]/50 blur-[1px]"
                    style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
                  />
                ))}
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {convinceCards.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease }}
                    whileHover={{
                      y: -7,
                      rotateZ: i % 2 === 0 ? -1.5 : 1.5,
                      transition: { duration: 0.25 },
                    }}
                    className="glass group relative overflow-hidden rounded-2xl p-6 text-left shadow-soft hover:border-[var(--pink)]/55"
                  >
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--pink)]/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <p className="relative text-base font-medium leading-snug">{text}</p>
                  </motion.div>
                ))}
              </div>

              {/* "The pink button is waiting." */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16 flex flex-col items-center gap-3"
              >
                <motion.p
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(255,79,139,0.25)",
                      "0 0 36px rgba(255,79,139,0.85)",
                      "0 0 8px rgba(255,79,139,0.25)",
                    ],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-xl font-semibold text-[var(--pink)]"
                >
                  The pink button is waiting.
                </motion.p>

                <motion.button
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  onClick={scrollToPrimary}
                  aria-label="Scroll back to confirm button"
                  className="mt-1 flex flex-col items-center gap-1 text-[var(--pink)] opacity-70 transition-opacity hover:opacity-100"
                >
                  <ArrowUp className="h-6 w-6" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Transportation ---------- */
const MEETUP_MAPS_URL = "https://maps.app.goo.gl/8M8eWwJV9wYCoQX98?g_st=iw";

function Transportation() {
  const [shake, setShake] = useState(false);
  const [warned, setWarned] = useState(false);
  const [picked, setPicked] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dodge = () => {
    const x = (Math.random() - 0.5) * 120;
    const y = (Math.random() - 0.5) * 60;
    setOffset({ x, y });
  };

  const wrong = () => {
    setShake(true); setWarned(true);
    setTimeout(() => setShake(false), 600);
  };

  const right = () => {
    if (picked) return;
    setPicked(true);
    fireConfetti(["#FF4F8B", "#FFC1D6", "#FFFFFF"]);
    // reveal mission is handled by native listener in Index
  };

  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--burgundy)]"></p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Transportation Strongly <span className="text-gradient-pink italic">Affects The Vibe</span></h2>
        </motion.div>

        <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <motion.button
            onMouseEnter={dodge}
            onClick={wrong}
            animate={{ x: offset.x, y: offset.y }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className={`glass inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold text-[var(--burgundy)] ${shake ? "animate-shake" : ""}`}
          >
            <Car className="h-4 w-4" /> I'll Come With My Car
          </motion.button>

          <motion.button
            id="transport-confirm-btn"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            onClick={right}
            disabled={picked}
            className="btn-pink inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold disabled:opacity-80"
          >
            <Crown className="h-4 w-4" /> Noted. I'll Park, You Drive 😌
          </motion.button>
        </div>

        <AnimatePresence>
          {warned && !picked && (
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-8 max-w-md rounded-2xl border border-[var(--pink)]/40 bg-white/80 p-5 backdrop-blur-md shadow-soft"
            >
              <div className="flex items-center justify-center gap-2 font-semibold text-[var(--burgundy)]">
                <AlertTriangle className="h-4 w-4 text-[var(--pink)]" />
                Incorrect Answer Detected 🚨
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                You're about to miss premium passenger princess treatment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meeting Plan Card */}
        <AnimatePresence>
          {picked && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease }}
              className="glass-pink mx-auto mt-10 max-w-lg rounded-3xl p-7 shadow-soft text-left"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--pink)]/20">
                  <MapPin className="h-5 w-5 text-[var(--pink)]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--pink)]">The Plan</p>
                  <p className="text-base font-semibold text-[var(--burgundy)]">Here's How This Works 😌</p>
                </div>
              </div>

              {/* Steps */}
              <ol className="mt-6 space-y-4">
                {[
                  { n: "01", text: "We meet at the spot below — grab a coffee, say hi properly." },
                  { n: "02", text: "You park your car there. No driving separately, that's not the vibe." },
                  { n: "03", text: "We take one car from there. Driver TBD, but odds are it's me." },
                ].map(({ n, text }) => (
                  <li key={n} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--pink)]/15 font-mono text-xs font-semibold text-[var(--pink)]">
                      {n}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-[var(--burgundy)]">{text}</p>
                  </li>
                ))}
              </ol>

              {/* Divider */}
              <div className="my-6 h-px bg-[var(--pink)]/20" />

              {/* Location CTA */}
              <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-[var(--burgundy)]/70">
                Meeting Point
              </p>
              <motion.a
                href={MEETUP_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 30px -8px rgba(255,79,139,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--pink)]/40 bg-white/70 px-5 py-4 backdrop-blur-md transition-colors hover:border-[var(--pink)] hover:bg-white/90"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--pink)]/15">
                    <MapPin className="h-4 w-4 text-[var(--pink)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--burgundy)]">Coffee Spot — The Meetup</p>
                    <p className="text-xs text-[var(--burgundy)]/60">Tap to open in Google Maps</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="shrink-0 text-[var(--pink)]">
                  <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                </svg>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Mission Cards ---------- */
const cards = [
  { icon: Shirt, label: "Dress Code", value: "Looking good as usual." },
  { icon: Zap, label: "Energy Level", value: "Hopefully higher than our texting consistency " },
  { icon: Music, label: "Playlist Rights", value: "Still under negotiation." },
  { icon: Pizza, label: "Food Priority", value: "Very serious matter." },
  { icon: Laugh, label: "Estimated Laugh Count", value: "Minimum: 17" },
  { icon: MessageCircle, label: "Conversation Quality", value: "Expected to exceed WhatsApp standards." },
  { icon: HeartPulse, label: "Side Effects", value: "Possible addiction to hanging out with me." },
  { icon: Eye, label: "Attention Span", value: "Depends if you steal my fries." },
  { icon: Target, label: "Main Objective", value: "Creating lore for future inside jokes." },
  { icon: Gift, label: "Surprise Probability", value: "Concerningly high." },
  { icon: Gauge, label: "Expected Difficulty", value: "Medium — you're hard to impress." },
  { icon: Smartphone, label: "PHONE CHECK FREQUENCY", value: "Should ideally decrease during the date." },
];

function Mission() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--burgundy)]"></p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">The <span className="text-gradient-pink italic">Fine Print</span></h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.06, ease }}
              whileHover={{ y: -8, rotate: -1.5, transition: { duration: 0.25 } }}
              className="glass group relative overflow-hidden rounded-2xl p-6 shadow-soft hover:border-[var(--pink)]/50"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--pink)]/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <c.icon className="h-6 w-6 text-[var(--pink)]" strokeWidth={1.6} />
              <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-[var(--burgundy)]">{c.label}</p>
              <p className="mt-2 text-lg font-medium leading-snug">{c.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <motion.button
            id="mission-continue-btn"
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px -5px rgba(255,79,139,0.7)" }}
            whileTap={{ scale: 0.97 }}
            className="btn-pink inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold"
          >
            Mission Accepted <Sparkles className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Countdown ---------- */
function getNextThursday() {
  const now = new Date();
  const d = new Date(now);
  const day = d.getDay();
  const diff = (4 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  d.setHours(19, 0, 0, 0);
  return d;
}

function Countdown() {
  const [target] = useState(getNextThursday);
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const ms = Math.max(0, target.getTime() - Date.now());
      setT({
        d: Math.floor(ms / 86400000),
        h: Math.floor((ms / 3600000) % 24),
        m: Math.floor((ms / 60000) % 60),
        s: Math.floor((ms / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: Array<[string, number]> = [["Days", t.d], ["Hours", t.h], ["Minutes", t.m], ["Seconds", t.s]];

  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--burgundy)]"></p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Preparation Time <span className="text-gradient-pink italic">Remaining</span></h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-4 gap-3 sm:gap-5">
          {units.map(([label, value], i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-pink rounded-2xl p-5 sm:p-7 shadow-soft"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={value}
                  initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-display text-4xl font-semibold tabular-nums text-[var(--pink)] sm:text-6xl"
                  style={{ textShadow: "0 0 24px rgba(255,79,139,0.45)" }}
                >
                  {String(value).padStart(2, "0")}
                </motion.div>
              </AnimatePresence>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--burgundy)] sm:text-xs">
                {label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Meet-up time badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-col items-center gap-1"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--burgundy)]/60">Meet-up Time</p>
          <p
            className="text-gradient-pink font-display text-3xl font-semibold sm:text-4xl"
            style={{ textShadow: "0 0 28px rgba(255,79,139,0.35)" }}
          >
            7:00 PM
          </p>
          <p className="font-mono text-xs text-[var(--burgundy)]/50">Thursday · Don't be late 😌</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <motion.button
            id="countdown-continue-btn"
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px -5px rgba(255,79,139,0.7)" }}
            whileTap={{ scale: 0.97 }}
            className="btn-pink inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold"
          >
            I'm Ready 
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Final ---------- */
function Final() {
  const [done, setDone] = useState(false);

  const click = () => {
    setDone(true);
    fireConfetti();
    setTimeout(() => fireConfetti(["#FF4F8B", "#FFC1D6"]), 350);
  };

  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--burgundy)]"></p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">One Last <span className="text-gradient-pink italic">Decision</span></h2>
        </motion.div>

        <motion.div className="mt-12" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <motion.button
            onClick={click}
            initial={{ boxShadow: "0 10px 30px -10px rgba(255,79,139,0.6)" }}
            whileHover={{ boxShadow: "0 0 80px -5px rgba(255,79,139,0.9)" }}
            transition={{ duration: 0.4 }}
            className="btn-pink relative inline-flex items-center gap-3 rounded-full px-12 py-6 text-lg font-semibold sm:text-xl"
          >
            Fine… I'll Show Up

          </motion.button>
        </motion.div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease }}
              className="glass-pink mx-auto mt-12 max-w-xl rounded-3xl p-10 shadow-soft"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--pink)]"></p>
              <p className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                It's Confirmed —<br />
                <span className="text-gradient-pink italic">The Main Character Is Attending</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-6 pb-12 pt-20 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--burgundy)]/70">
        Powered by Hassan ADEL
      </p>
    </footer>
  );
}

/* ---------- Pure DOM reveal (bypasses React hydration entirely) ---------- */
function revealSection(sectionId: string) {
  const wrapper = document.getElementById(sectionId);
  if (!wrapper) return;
  // remove click-blocker overlay
  (wrapper.querySelectorAll("[data-overlay]") as NodeListOf<HTMLElement>).forEach(
    (el) => (el.style.display = "none"),
  );
  // unblur the content layer
  const layer = wrapper.querySelector(".section-blur-layer") as HTMLElement | null;
  if (layer) {
    layer.style.filter = "blur(0px)";
    layer.style.opacity = "1";
    layer.style.pointerEvents = "auto";
  }
  // smooth-scroll into view
  setTimeout(() => wrapper.scrollIntoView({ behavior: "smooth", block: "start" }), 160);
}

function Index() {
  useEffect(() => {
    // Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fraunces:ital,wght@0,500;0,600;0,700;1,500;1,600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);

    // Map of button id → section to reveal (and optional delay in ms)
    const revealMap: Record<string, { target: string; delay?: number }> = {
      "hero-cta-btn":        { target: "rsvp" },
      "rsvp-confirm-btn":    { target: "transportation", delay: 1600 },
      "transport-confirm-btn": { target: "mission", delay: 1600 },
      "mission-continue-btn":  { target: "countdown" },
      "countdown-continue-btn":{ target: "final" },
    };

    // Event-delegation on document — fires regardless of when elements mount.
    // Walk up from the click target to find a button with a known reveal id.
    const btnIds = Object.keys(revealMap).map((id) => `#${id}`).join(",");
    const handleClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest(btnIds) as HTMLElement | null;
      if (!btn) return;
      const mapping = revealMap[btn.id];
      if (!mapping) return;
      if (mapping.delay) {
        setTimeout(() => revealSection(mapping.target), mapping.delay);
      } else {
        revealSection(mapping.target);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <CursorGlow />
      <Particles />
      <div className="relative z-10">
        <Hero />

        <SectionReveal sectionId="rsvp">
          <RSVP />
        </SectionReveal>

        <SectionReveal sectionId="transportation">
          <Transportation />
        </SectionReveal>

        <SectionReveal sectionId="mission">
          <Mission />
        </SectionReveal>

        <SectionReveal sectionId="countdown">
          <Countdown />
        </SectionReveal>

        <SectionReveal sectionId="final">
          <Final />
        </SectionReveal>

        <Footer />
      </div>
    </main>
  );
}

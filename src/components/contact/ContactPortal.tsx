"use client";

import { useRef, useState, useEffect, FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ─── EmailJS config ───────────────────────────────────────────────
// Replace these with your real EmailJS IDs
const EMAILJS_SERVICE_ID  = "service_l8sv3gs";
const EMAILJS_TEMPLATE_ID = "template_zpvz5lt";
const EMAILJS_PUBLIC_KEY  = "0-BO2wZ5z6OzbxUGf";
// ─────────────────────────────────────────────────────────────────

const COMMANDS = [
  "send --message 'Hello Medin'",
  "connect --network linkedin",
  "open --project collaboration",
  "request --consultation",
];

export default function ContactPortal() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const [input,   setInput]   = useState("");
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [log, setLog] = useState<string[]>([
    "MEDIN.DEV COMMUNICATION PORTAL v2.0",
    "Secure channel established.",
    "Awaiting transmission...",
  ]);
  const [cmdIdx, setCmdIdx] = useState(0);

  // ── Cookie consent ──────────────────────────────────────────────
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShowCookieBanner(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowCookieBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowCookieBanner(false);
  };
  // ───────────────────────────────────────────────────────────────

  const addLog = (line: string) => setLog((prev) => [...prev, line]);

  // ── EmailJS send ────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addLog("ERROR: All fields required.");
      return;
    }

    setSending(true);
    addLog(`> Transmitting from: ${name} <${email}>`);
    addLog(`> Message payload: ${message.slice(0, 50)}${message.length > 50 ? "..." : ""}`);
    addLog("Establishing secure channel...");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    name,
          from_email:   email,
          message:      message,
          to_name:      "Medin",
          reply_to:     email,
        },
        EMAILJS_PUBLIC_KEY
      );

      addLog("✓ TRANSMISSION SUCCESSFUL");
      addLog("✓ Medin will respond within 24h");
      setSent(true);
    } catch {
      addLog("ERROR: Transmission failed. Please try again.");
    } finally {
      setSending(false);
    }
  };
  // ───────────────────────────────────────────────────────────────

  const handleCommandKey = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setInput(COMMANDS[cmdIdx % COMMANDS.length]);
      setCmdIdx((i) => i + 1);
    }
    if (e.key === "Enter" && input) {
      addLog(`> ${input}`);
      addLog(`Processing command...`);
      setInput("");
    }
  };

  return (
    <>
      {/* ── Cookie consent banner ─────────────────────────────── */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl"
          >
            <div
              className="glass rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center gap-4 border border-white/10"
              style={{ backdropFilter: "blur(20px)" }}
            >
              <p className="font-mono text-xs text-slate-400 flex-1 text-center sm:text-left">
                We use cookies to ensure you get the best experience on this website.
                By continuing, you agree to our use of cookies.
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={acceptCookies}
                  className="font-mono text-xs px-4 py-2 rounded-lg border border-white/20 text-slate-300 hover:text-white hover:border-white/40 transition-all"
                >
                  Accept
                </button>
                <button
                  onClick={declineCookies}
                  className="font-mono text-xs px-4 py-2 rounded-lg text-slate-600 hover:text-slate-400 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main section ──────────────────────────────────────── */}
      <section
        id="contact"
        ref={ref}
        className="snap-section min-h-screen relative overflow-hidden bg-dark-800 py-20"
      >
        {/* Background grid only — no green radial gradient */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10"
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="font-mono text-xs tracking-[0.4em] text-slate-400/60 uppercase mb-4">
              CHAPTER_06 / CONTACT PORTAL
            </p>
            <h2 className="text-4xl md:text-6xl font-black">
              <span className="text-white">Open </span>
              <span className="gradient-text">Channel</span>
            </h2>
            <p className="text-slate-500 mt-3 font-mono text-sm">
              Secure transmission interface · Response within 24h
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Terminal log */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl overflow-hidden border border-white/[0.06]"
            >
              {/* Terminal bar */}
              <div className="bg-dark-950 px-4 py-3 flex items-center gap-3 border-b border-white/5">
<div className="flex gap-2">
  <div className="w-3 h-3 rounded-full bg-slate-400/60" />
  <div className="w-3 h-3 rounded-full bg-slate-400/60" />
  <div className="w-3 h-3 rounded-full bg-slate-400/60" />
</div>

                <span className="font-mono text-xs text-slate-500">medin@portal:~</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                  <span className="font-mono text-xs text-slate-400">CONNECTED</span>
                </div>
              </div>

              {/* Log output */}
              <div className="p-5 h-64 overflow-y-auto space-y-1.5 font-mono text-xs">
                {log.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i < 3 ? i * 0.2 : 0 }}
                    className={
                      line.startsWith("✓")
                        ? "text-slate-400"
                        : line.startsWith("ERROR")
                        ? "text-red-400"
                        : line.startsWith(">")
                        ? "text-slate-300"
                        : "text-slate-500"
                    }
                  >
                    {line}
                  </motion.div>
                ))}
              </div>

              {/* Command input */}
              <div className="border-t border-white/5 p-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-400">{">"}</span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommandKey}
                    placeholder="Type a command or press Tab..."
                    className="flex-1 bg-transparent font-mono text-xs text-slate-300 outline-none placeholder:text-slate-700"
                  />
                  <span className="font-mono text-xs text-slate-600">Tab: autocomplete</span>
                </div>
              </div>

              {/* Quick links */}
              <div className="border-t border-white/5 p-4 grid grid-cols-2 gap-3">
                {[
                  { label: "LinkedIn", icon: "🔗", href: "https://linkedin.com/in/medin-turkes-94182936" },
                  { label: "GitHub",   icon: "💻", href: "https://github.com/metur100" },
                  { label: "Email",    icon: "📡", href: "mailto:medinturkes@gmail.com" },
                  { label: "Resume",   icon: "📄", href: "/CV.pdf" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 glass rounded-lg px-3 py-2 hover:border-white/20 transition-all group"
                  >
                    <span>{link.icon}</span>
                    <span className="font-mono text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-8 border border-white/[0.06]"
            >
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-2">
                        {">"} SENDER_NAME
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name..."
                        className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-slate-300 placeholder:text-slate-700 outline-none focus:border-white/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-2">
                        {">"} SENDER_EMAIL
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-slate-300 placeholder:text-slate-700 outline-none focus:border-white/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-2">
                        {">"} MESSAGE_PAYLOAD
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your request..."
                        rows={5}
                        className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-slate-300 placeholder:text-slate-700 outline-none focus:border-white/20 transition-colors resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: sending ? 1 : 1.02 }}
                      whileTap={{ scale: sending ? 1 : 0.98 }}
                      className="w-full py-4 rounded-xl font-mono text-sm uppercase tracking-widest font-bold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.04] to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative accent-text">
                        {sending ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                      </span>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-6"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      ✓
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">Transmission Received</h3>
                      <p className="text-slate-400 font-mono text-sm">
                        Signal confirmed. Medin will respond within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
                      className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Footer — stripped down */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-16 text-center space-y-3"
          >
            <p className="font-mono text-xs text-slate-700 uppercase tracking-widest">
              MEDIN TURKES · FULL-STACK ENGINEER · 2026
            </p>
            <div className="flex justify-center gap-2 items-center">
              <div className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
              <span className="font-mono text-xs text-slate-700">SYSTEM ONLINE</span>
              <div className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useRef, useState, useEffect, FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useLang } from "@/components/context/LanguageContext";

// ─── EmailJS config ───────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_l8sv3gs";
const EMAILJS_TEMPLATE_ID = "template_zpvz5lt";
const EMAILJS_PUBLIC_KEY = "0-BO2wZ5z6OzbxUGf";
// ─────────────────────────────────────────────────────────────────

// ─── EN / DE dictionary ───────────────────────────────────────────
const UI = {
  en: {
    chapter: "CHAPTER_06 / CONTACT PORTAL",
    heading1: "Open ",
    heading2: "Channel",
    subheading: "Secure transmission interface · Response within 24h",
    // Terminal
    terminalUser: "medin@portal:~",
    connected: "CONNECTED",
    logInit: [
      "MEDIN.DEV COMMUNICATION PORTAL v2.0",
      "Secure channel established.",
      "Awaiting transmission...",
    ],
    tabHint: "Tab: autocomplete",
    cmdPlaceholder: "Type a command or press Tab...",
    // Quick links
    links: [
      { label: "LinkedIn", icon: "🔗", href: "https://linkedin.com/in/medin-turkes-94182936" },
      { label: "GitHub",   icon: "💻", href: "https://github.com/metur100" },
      { label: "Email",    icon: "📡", href: "mailto:medinturkes@gmail.com" },
      { label: "Resume",   icon: "📄", href: "/CV.pdf" },
    ],
    // Form labels & placeholders
    labelName: "> SENDER_NAME",
    placeholderName: "Your name...",
    labelEmail: "> SENDER_EMAIL",
    placeholderEmail: "your@email.com",
    labelMessage: "> MESSAGE_PAYLOAD",
    placeholderMessage: "Enter your request...",
    btnSend: "TRANSMIT MESSAGE",
    btnSending: "TRANSMITTING...",
    // Log messages
    logError: "ERROR: All fields required.",
    logFrom: (name: string, email: string) => `> Transmitting from: ${name} <${email}>`,
    logPayload: (msg: string) => `> Message payload: ${msg}`,
    logChannel: "Establishing secure channel...",
    logSuccess1: "✓ TRANSMISSION SUCCESSFUL",
    logSuccess2: "✓ Medin will respond within 24h",
    logFail: "ERROR: Transmission failed. Please try again.",
    logCmd: "Processing command...",
    // Success screen
    successTitle: "Transmission Received",
    successBody: "Signal confirmed. Medin will respond within 24 hours.",
    successReset: "Send another message",
    // Cookie
    cookieText: "We use cookies to ensure you get the best experience on this website. By continuing, you agree to our use of cookies.",
    cookieAccept: "Accept",
    cookieDecline: "Decline",
    // Footer
    footerName: "MEDIN TURKES · FULL-STACK ENGINEER · 2026",
    footerStatus: "SYSTEM ONLINE",
  },
  de: {
    chapter: "KAPITEL_06 / KONTAKTPORTAL",
    heading1: "Kanal ",
    heading2: "öffnen",
    subheading: "Sichere Übertragungsschnittstelle · Antwort innerhalb von 24h",
    // Terminal
    terminalUser: "medin@portal:~",
    connected: "VERBUNDEN",
    logInit: [
      "MEDIN.DEV KOMMUNIKATIONSPORTAL v2.0",
      "Sicherer Kanal hergestellt.",
      "Warte auf Übertragung...",
    ],
    tabHint: "Tab: Autovervollständigung",
    cmdPlaceholder: "Befehl eingeben oder Tab drücken...",
    // Quick links
    links: [
      { label: "LinkedIn", icon: "🔗", href: "https://linkedin.com/in/medin-turkes-94182936" },
      { label: "GitHub",   icon: "💻", href: "https://github.com/metur100" },
      { label: "E-Mail",   icon: "📡", href: "mailto:medinturkes@gmail.com" },
      { label: "Lebenslauf", icon: "📄", href: "/CV.pdf" },
    ],
    // Form labels & placeholders
    labelName: "> ABSENDER_NAME",
    placeholderName: "Ihr Name...",
    labelEmail: "> ABSENDER_EMAIL",
    placeholderEmail: "ihre@email.de",
    labelMessage: "> NACHRICHT",
    placeholderMessage: "Ihre Anfrage eingeben...",
    btnSend: "NACHRICHT SENDEN",
    btnSending: "WIRD GESENDET...",
    // Log messages
    logError: "FEHLER: Alle Felder sind erforderlich.",
    logFrom: (name: string, email: string) => `> Übertragung von: ${name} <${email}>`,
    logPayload: (msg: string) => `> Nachrichteninhalt: ${msg}`,
    logChannel: "Sicherer Kanal wird aufgebaut...",
    logSuccess1: "✓ ÜBERTRAGUNG ERFOLGREICH",
    logSuccess2: "✓ Medin antwortet innerhalb von 24h",
    logFail: "FEHLER: Übertragung fehlgeschlagen. Bitte erneut versuchen.",
    logCmd: "Befehl wird verarbeitet...",
    // Success screen
    successTitle: "Übertragung empfangen",
    successBody: "Signal bestätigt. Medin antwortet innerhalb von 24 Stunden.",
    successReset: "Weitere Nachricht senden",
    // Cookie
    cookieText: "Wir verwenden Cookies, um Ihnen die beste Erfahrung auf dieser Website zu bieten. Durch die weitere Nutzung stimmen Sie der Verwendung von Cookies zu.",
    cookieAccept: "Akzeptieren",
    cookieDecline: "Ablehnen",
    // Footer
    footerName: "MEDIN TURKES · FULL-STACK ENTWICKLER · 2026",
    footerStatus: "SYSTEM ONLINE",
  },
};
// ─────────────────────────────────────────────────────────────────

const COMMANDS = [
  "send --message 'Hello Medin'",
  "connect --network linkedin",
  "open --project collaboration",
  "request --consultation",
];

export default function ContactPortal() {
  const { lang } = useLang();
  const t = UI[lang];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [log, setLog] = useState<string[]>(t.logInit);
  const [cmdIdx, setCmdIdx] = useState(0);

  // ── Cookie consent ──────────────────────────────────────────────
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShowCookieBanner(true);
  }, []);

  // Re-sync log init lines when language switches
  useEffect(() => {
    setLog((prev) => {
      // Only replace the first 3 init lines; keep any appended log entries
      const tail = prev.slice(3);
      return [...t.logInit, ...tail];
    });
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

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
      addLog(t.logError);
      return;
    }

    setSending(true);
    addLog(t.logFrom(name, email));
    addLog(t.logPayload(`${message.slice(0, 50)}${message.length > 50 ? "..." : ""}`));
    addLog(t.logChannel);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: message,
          to_name: "Medin",
          reply_to: email,
        },
        EMAILJS_PUBLIC_KEY
      );

      addLog(t.logSuccess1);
      addLog(t.logSuccess2);
      setSent(true);
    } catch {
      addLog(t.logFail);
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
      addLog(t.logCmd);
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
                {t.cookieText}
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={acceptCookies}
                  className="font-mono text-xs px-4 py-2 rounded-lg border border-white/20 text-slate-300 hover:text-white hover:border-white/40 transition-all"
                >
                  {t.cookieAccept}
                </button>
                <button
                  onClick={declineCookies}
                  className="font-mono text-xs px-4 py-2 rounded-lg text-slate-600 hover:text-slate-400 transition-colors"
                >
                  {t.cookieDecline}
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
              {t.chapter}
            </p>
            <h2 className="text-4xl md:text-6xl font-black">
              <span className="text-white">{t.heading1}</span>
              <span className="gradient-text">{t.heading2}</span>
            </h2>
            <p className="text-slate-500 mt-3 font-mono text-sm">
              {t.subheading}
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
                <span className="font-mono text-xs text-slate-500">{t.terminalUser}</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                  <span className="font-mono text-xs text-slate-400">{t.connected}</span>
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
                        : line.startsWith("ERROR") || line.startsWith("FEHLER")
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
                    placeholder={t.cmdPlaceholder}
                    className="flex-1 bg-transparent font-mono text-xs text-slate-300 outline-none placeholder:text-slate-700"
                  />
                  <span className="font-mono text-xs text-slate-600">{t.tabHint}</span>
                </div>
              </div>

              {/* Quick links */}
              <div className="border-t border-white/5 p-4 grid grid-cols-2 gap-3">
                {t.links.map((link) => (
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
                        {t.labelName}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.placeholderName}
                        className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-slate-300 placeholder:text-slate-700 outline-none focus:border-white/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-2">
                        {t.labelEmail}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.placeholderEmail}
                        className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-slate-300 placeholder:text-slate-700 outline-none focus:border-white/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-2">
                        {t.labelMessage}
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t.placeholderMessage}
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
                        {sending ? t.btnSending : t.btnSend}
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
                      <h3 className="text-2xl font-black text-white mb-2">
                        {t.successTitle}
                      </h3>
                      <p className="text-slate-400 font-mono text-sm">
                        {t.successBody}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSent(false);
                        setName("");
                        setEmail("");
                        setMessage("");
                      }}
                      className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors underline"
                    >
                      {t.successReset}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-16 text-center space-y-3"
          >
            <p className="font-mono text-xs text-slate-700 uppercase tracking-widest">
              {t.footerName}
            </p>
            <div className="flex justify-center gap-2 items-center">
              <div className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
              <span className="font-mono text-xs text-slate-700">{t.footerStatus}</span>
              <div className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

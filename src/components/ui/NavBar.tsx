"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/context/LanguageContext";

const links = {
  en: [
    { id: "identity", label: "Identity" },
    { id: "projects", label: "Universe" },
    { id: "timeline", label: "Log" },
    { id: "skills",   label: "DNA" },
    { id: "workflow", label: "Process" },
    { id: "contact",  label: "Portal" },
  ],
  de: [
    { id: "identity", label: "Identität" },
    { id: "projects", label: "Universum" },
    { id: "timeline", label: "Verlauf" },
    { id: "skills",   label: "DNA" },
    { id: "workflow", label: "Prozess" },
    { id: "contact",  label: "Kontakt" },
  ],
};

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");
  const { lang, setLang }       = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-sm accent-text font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
        >
          MT<span className="text-slate-500">://</span>
        </button>

        {/* ── Nav links ── */}
        <div className="hidden md:flex items-center gap-1">
          {links[lang].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-md transition-all duration-300 ${
                active === link.id
                  ? "text-slate-300 bg-slate-400/10 border border-slate-400/30"
                  : "text-slate-400 hover:text-slate-300 hover:bg-slate-400/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ── Right side: language toggle + status ── */}
        <div className="flex items-center gap-4">

          {/* Language toggle */}
          <div className="flex items-center gap-1 font-mono text-xs tracking-widest">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 rounded transition-all duration-200 ${
                lang === "en"
                  ? "text-slate-200 bg-slate-400/15 border border-slate-400/30"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              EN
            </button>
            <span className="text-slate-700 select-none">|</span>
            <button
              onClick={() => setLang("de")}
              className={`px-2 py-1 rounded transition-all duration-200 ${
                lang === "de"
                  ? "text-slate-200 bg-slate-400/15 border border-slate-400/30"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              DE
            </button>
          </div>

          {/* Online status */}
          <div className="flex flex-col items-center justify-center gap-1">
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
              animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono text-[10px] sm:text-xs text-emerald-400 tracking-widest">
              ONLINE
            </span>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: "identity", label: "Identity" },
  { id: "projects", label: "Universe" },
  { id: "timeline", label: "Log" },
  { id: "skills", label: "DNA" },
  { id: "workflow", label: "Process" },
  { id: "contact", label: "Portal" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

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
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-sm accent-text font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
        >
          MT<span className="text-slate-500">://</span>
        </button>
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
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
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
          <span className="font-mono text-xs text-slate-500">ONLINE</span>
        </div>
      </div>
    </motion.nav>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onInitialize: () => void;
  initialized: boolean;
}

const BOOT_LINES = [
  "INITIALIZING SYSTEM v3.7.2...",
  "LOADING NEURAL INTERFACE...",
  "CONNECTING TO MEDIN.DEV...",
  "CALIBRATING EXPERIENCE ENGINE...",
  "SYSTEM READY.",
];

export default function EntryGate({ onInitialize, initialized }: Props) {
  const [bootLine, setBootLine] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (initialized) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setBootLine(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(interval);
        setTimeout(() => setBootDone(true), 400);
      }
    }, 420);
    return () => clearInterval(interval);
  }, [initialized]);

  const handleInit = () => {
    setExiting(true);
    setTimeout(onInitialize, 800);
  };

  if (initialized) return null;

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.section
          key="entry"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-dark-950"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Subtle static grid — no color, just very faint lines */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          {/* Very subtle radial center glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(148,163,184,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-3xl">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl glass border border-white/10 flex items-center justify-center relative overflow-hidden">
                <span className="font-mono text-2xl font-black text-white z-10">MT</span>
              </div>
              <div className="absolute -inset-2 rounded-3xl border border-white/[0.06] animate-pulse-slow" />
            </motion.div>

            {/* Boot terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-4 w-full max-w-md text-left font-mono text-xs"
            >
              {BOOT_LINES.slice(0, bootLine).map((line, i) => (
                <div key={i} className="flex items-center gap-2 mb-1">
                  <span className="text-slate-600">{">"}</span>
                  <span className={i === bootLine - 1 ? "text-slate-300" : "text-slate-500"}>{line}</span>
                  {i === bootLine - 1 && !bootDone && (
                    <span className="inline-block w-2 h-3 bg-slate-400 blink ml-1" />
                  )}
                  {i < bootLine - 1 && <span className="text-slate-600 ml-auto">OK</span>}
                </div>
              ))}
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: bootDone ? 1 : 0, y: bootDone ? 0 : 30 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <p className="font-mono text-slate-500 text-sm tracking-[0.3em] uppercase">
                You are entering my system
              </p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                <span className="text-white">MEDIN</span>
                <br />
                <span className="gradient-text">TURKES</span>
              </h1>
              <p className="text-slate-400 text-lg font-light max-w-md">
                Full-Stack Engineer · API Architect
              </p>
            </motion.div>

            {/* CTA — no icon */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: bootDone ? 1 : 0, scale: bootDone ? 1 : 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInit}
              className="relative group px-10 py-4 rounded-xl font-mono text-sm uppercase tracking-widest font-bold overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/[0.04] group-hover:bg-white/[0.07] transition-colors" />
              <div className="absolute inset-0 rounded-xl border border-white/15 group-hover:border-white/30 transition-colors" />
              <span className="relative text-slate-200 group-hover:text-white transition-colors">
                Initialize Experience
              </span>
            </motion.button>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 font-mono text-xs text-slate-700 space-y-1">
            <div>SYS:ONLINE</div>
            <div>VER:3.7.2</div>
          </div>
          <div className="absolute top-6 right-6 font-mono text-xs text-slate-700 text-right space-y-1">
            <div>MODE:ACTIVE</div>
            <div>UPTIME:∞</div>
          </div>
          <div className="absolute bottom-6 left-6 font-mono text-xs text-slate-700">
            © 2026 MEDIN TURKES
          </div>
          <div className="absolute bottom-6 right-6 font-mono text-xs text-slate-700">
            LAT:51.23 LON:6.78
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    id: "discover",
    num: "01",
    label: "Discover",
    color: "#e2e8f0",
    short: "Understand the problem deeply",
    detail:
      "I start by listening. User interviews, stakeholder sessions, technical audits - I map the full landscape before writing a single line of code.",
    artifacts: [
      "Problem statement",
      "User research",
      "Technical audit",
      "Constraints map",
    ],
  },
  {
    id: "architect",
    num: "02",
    label: "Architect",
    color: "#94a3b8",
    short: "Design the system, not just the UI",
    detail:
      "System design first. Data models, API contracts, component hierarchy - everything is planned before the first commit.",
    artifacts: [
      "System diagram",
      "API contracts",
      "Data models",
      "Tech stack decision",
    ],
  },
  {
    id: "build",
    num: "03",
    label: "Build",
    color: "#64748b",
    short: "Ship fast, ship clean",
    detail:
      "TDD where it counts, iterative delivery, CI/CD from day one. I write code that the next developer will thank me for.",
    artifacts: [
      "Working software",
      "Test coverage",
      "Documentation",
      "CI/CD pipeline",
    ],
  },
  {
    id: "optimize",
    num: "04",
    label: "Optimize",
    color: "#cbd5e1",
    short: "Performance is a feature",
    detail:
      "Lighthouse audits, bundle analysis, database query optimization, monitoring setup. The work is not done until it is fast and maintainable.",
    artifacts: [
      "Perf metrics",
      "Bundle report",
      "Monitoring setup",
      "Runbooks",
    ],
  },
];

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export default function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const isMobile = useIsMobile(1024);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section
      id="workflow"
      ref={ref}
      className="snap-section min-h-screen relative overflow-hidden bg-dark-950 py-12 md:py-20"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.32em] sm:tracking-[0.4em] text-slate-600 uppercase mb-4">
            CHAPTER_05 / HOW I THINK
          </p>

          <h2 className="text-3xl md:text-6xl font-black">
            <span className="text-white">My </span>
            <span className="gradient-text">Process</span>
          </h2>

          <p className="text-slate-600 mt-3 text-sm font-mono">
            {isMobile ? "tap each step to explore" : "hover each step to explore"}
          </p>
        </motion.div>

        {/* Workflow steps */}
        <div className="relative">
          {/* Connection line desktop only */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-white/10"
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6 relative z-10">
            {STEPS.map((step, i) => {
              const isActive = activeStep === step.id;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  onHoverStart={() => {
                    if (!isMobile) setActiveStep(step.id);
                  }}
                  onHoverEnd={() => {
                    if (!isMobile) setActiveStep(null);
                  }}
                  className="group"
                >
                  <motion.div
                    className="glass rounded-2xl p-5 md:p-6 h-full cursor-pointer transition-all duration-300"
                    whileHover={!isMobile ? { y: -8, scale: 1.02 } : undefined}
                    onClick={() =>
                      isMobile
                        ? setActiveStep(isActive ? null : step.id)
                        : undefined
                    }
                    style={{
                      borderColor: isActive
                        ? `${step.color}40`
                        : "rgba(255,255,255,0.06)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      boxShadow: isActive
                        ? `0 20px 40px ${step.color}15`
                        : "none",
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStep(isActive ? null : step.id);
                      }
                    }}
                  >
                    {/* Number */}
                    <div className="mb-5 md:mb-6 flex items-center justify-between">
                      <span className="font-mono text-5xl md:text-6xl font-black text-slate-500">
                        {step.num}
                      </span>


                      {isMobile && (
                        <motion.span
                          className="font-mono text-xs text-slate-500"
                          animate={{ rotate: isActive ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ▶
                        </motion.span>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-white mb-2">
                      {step.label}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                      {step.short}
                    </p>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-300 text-sm leading-relaxed mb-4 border-t border-white/10 pt-4">
                            {step.detail}
                          </p>

                          <div className="space-y-1.5">
                            {step.artifacts.map((a) => (
                              <div key={a} className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-slate-400" />
                                <span className="font-mono text-xs text-slate-500">
                                  {a}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Philosophy callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-12 md:mt-16 glass rounded-2xl p-6 md:p-8 text-center border border-white/[0.06]"
        >
          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-4">
            ENGINEERING PHILOSOPHY
          </p>

          <blockquote className="text-xl md:text-3xl font-black text-white leading-relaxed">
            {'"Build systems that '}
            <span className="gradient-text">outlast the sprint</span>
            {" and "}
            <span className="text-slate-300">earn the user's trust</span>
            {'."'}
          </blockquote>

          <p className="text-slate-600 font-mono text-sm mt-4">
            - Medin Turkes
          </p>
        </motion.div>
      </div>
    </section>
  );
}

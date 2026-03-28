"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SKILL_GROUPS = [
  {
    id: "fullstack",
    label: "Full-Stack Dev",
    color: "#e2e8f0",
    icon: "FS",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "C# / ASP.NET Core", level: 89 },
      { name: "TailwindCSS", level: 88 },
      { name: "HTML / CSS", level: 95 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Azure",
    color: "#94a3b8",
    icon: "AZ",
    skills: [
      { name: "Azure Functions", level: 88 },
      { name: "Azure API Mgmt", level: 85 },
      { name: "Azure Service Bus", level: 80 },
      { name: "Azure DevOps", level: 85 },
      { name: "Terraform / IaC", level: 78 },
    ],
  },
  {
    id: "backend",
    label: "Backend & DB",
    color: "#64748b",
    icon: "BE",
    skills: [
      { name: "SQL / MS SQL", level: 85 },
      { name: "Node.js / Express", level: 82 },
      { name: "REST API Design", level: 92 },
      { name: "Entity Framework", level: 84 },
      { name: "Docker", level: 75 },
    ],
  },
  {
    id: "devops",
    label: "CI/CD & DevOps",
    color: "#cbd5e1",
    icon: "DO",
    skills: [
      { name: "Git & Version Control", level: 90 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "GitLab / Azure DevOps", level: 85 },
      { name: "GitHub Actions", level: 80 },
      { name: "Docker Containers", level: 75 },
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

function SkillsDetailPanel({
  group,
}: {
  group: (typeof SKILL_GROUPS)[number];
}) {
  return (
    <motion.div
      key={group.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="glass rounded-2xl p-5 sm:p-6 md:p-8"
      style={{ borderColor: `${group.color}15` }}
    >
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: `${group.color}15`,
            border: `1px solid ${group.color}30`,
          }}
        >
          <span className="font-black text-sm" style={{ color: group.color }}>
            {group.icon}
          </span>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-black text-white">
            {group.label}
          </h3>
          <p className="font-mono text-[10px] sm:text-xs text-slate-500">
            SEQUENCE ANALYSIS
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {group.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex items-center justify-between mb-2 gap-3">
              <span className="font-mono text-xs sm:text-sm text-slate-300">
                {skill.name}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-slate-500 shrink-0">
                {skill.level}%
              </span>
            </div>

            <div className="relative h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${group.color}60, ${group.color})`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{
                  delay: 0.2 + i * 0.08,
                  duration: 0.7,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-7 flex items-end gap-2 h-20">
        {group.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="flex-1 rounded-t-sm"
            style={{
              background: `${group.color}15`,
              border: `1px solid ${group.color}25`,
            }}
            initial={{ height: 0 }}
            animate={{ height: `${skill.level}%` }}
            transition={{
              delay: 0.25 + i * 0.08,
              duration: 0.55,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsDNA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const isMobile = useIsMobile(1024);

  const group = SKILL_GROUPS.find((g) => g.id === activeGroup) ?? null;

  return (
    <section
      id="skills"
      ref={ref}
      className="snap-section relative overflow-hidden bg-dark-800 py-12 md:py-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.32em] sm:tracking-[0.4em] text-slate-600 uppercase mb-4">
            CHAPTER_04 / SKILLS DNA
          </p>
          <h2 className="text-3xl md:text-6xl font-black">
            <span className="text-white">Tech </span>
            <span className="gradient-text">DNA</span>
          </h2>
          <p className="text-slate-600 mt-4 text-sm font-mono">
            {isMobile ? "tap a group to view details" : "select a skill group"}
          </p>
        </motion.div>

        {/* MOBILE */}
        {isMobile ? (
          <div className="space-y-4">
            {SKILL_GROUPS.map((g, i) => {
              const isActive = activeGroup === g.id;

              return (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="space-y-3"
                >
                  <button
                    type="button"
                    onClick={() => setActiveGroup(isActive ? null : g.id)}
                    className="w-full text-left p-4 rounded-xl transition-all duration-300 border"
                    style={{
                      background: isActive
                        ? `${g.color}10`
                        : "rgba(16,19,26,0.4)",
                      borderColor: isActive
                        ? `${g.color}40`
                        : "rgba(255,255,255,0.06)",
                      boxShadow: isActive ? `0 0 20px ${g.color}10` : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${g.color}15`,
                          border: `1px solid ${g.color}30`,
                        }}
                      >
                        <span
                          className="font-black text-xs"
                          style={{ color: g.color }}
                        >
                          {g.icon}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm">{g.label}</p>
                        <p className="font-mono text-xs text-slate-500">
                          {g.skills.length} technologies
                        </p>
                      </div>

                      <motion.span
                        className="ml-auto font-mono text-xs text-slate-500"
                        animate={{ rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▶
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && <SkillsDetailPanel group={g} />}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* DESKTOP */
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="space-y-3">
              {SKILL_GROUPS.map((g, i) => (
                <motion.button
                  key={g.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() =>
                    setActiveGroup((prev) => (prev === g.id ? null : g.id))
                  }
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                    activeGroup === g.id ? "scale-[1.02]" : "hover:scale-[1.01]"
                  }`}
                  style={{
                    background:
                      activeGroup === g.id
                        ? `${g.color}10`
                        : "rgba(16,19,26,0.4)",
                    borderColor:
                      activeGroup === g.id
                        ? `${g.color}40`
                        : "rgba(255,255,255,0.06)",
                    boxShadow:
                      activeGroup === g.id
                        ? `0 0 20px ${g.color}10`
                        : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${g.color}15`,
                        border: `1px solid ${g.color}30`,
                      }}
                    >
                      <span
                        className="font-black text-xs"
                        style={{ color: g.color }}
                      >
                        {g.icon}
                      </span>
                    </div>

                    <div>
                      <p className="font-bold text-white text-sm">{g.label}</p>
                      <p className="font-mono text-xs text-slate-500">
                        {g.skills.length} technologies
                      </p>
                    </div>

                    {activeGroup === g.id && (
                      <motion.div
                        layoutId="active-indicator"
                        className="ml-auto w-2 h-2 rounded-full"
                        style={{ background: g.color }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {group ? (
                  <SkillsDetailPanel key={group.id} group={group} />
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="glass rounded-2xl p-8 border border-white/[0.06]"
                  >
                    <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-3">
                      SEQUENCE ANALYSIS
                    </p>
                    <h3 className="text-xl font-black text-white mb-2">
                      Select a skill group
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Choose one of the skill categories on the left to inspect technologies, strength levels, and capability distribution.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
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

export default function SkillsDNA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [activeGroup, setActiveGroup] = useState("fullstack");

  const group = SKILL_GROUPS.find((g) => g.id === activeGroup)!;

  return (
    <section id="skills" ref={ref} className="snap-section min-h-screen relative overflow-hidden bg-dark-800 py-20">
      {/* Subtle background lines — no Chinese characters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={i}>
              <motion.line
                x1={`${5 + Math.sin(i * 0.8) * 8}%`}
                y1={`${i * 5.5}%`}
                x2={`${95 - Math.sin(i * 0.8) * 8}%`}
                y2={`${i * 5.5 + 2.5}%`}
                stroke="#94a3b8"
                strokeWidth="0.3"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 0.5, 0] } : {}}
                transition={{ delay: i * 0.1, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              />
            </g>
          ))}
        </svg>
        {/* Floating code keywords instead of characters */}
        {["React", ".NET", "Azure", "SQL", "CI/CD", "Docker", "TypeScript", "API", "Git", "Terraform", "Node.js", "C#", "Vite", "APIM"].map((word, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-white/[0.04] select-none"
            style={{ left: `${(i * 7.3) % 95}%`, top: -20 }}
            animate={{ y: ["0vh", "110vh"] }}
            transition={{ duration: 12 + (i % 5) * 2, delay: (i % 6) * 1.5, repeat: Infinity, ease: "linear" }}
          >
            {word}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs tracking-[0.4em] text-slate-600 uppercase mb-4">
            CHAPTER_04 / SKILLS DNA
          </p>
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-white">Tech </span>
            <span className="gradient-text">DNA</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Group selector */}
          <div className="space-y-3">
            {SKILL_GROUPS.map((g, i) => (
              <motion.button
                key={g.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => setActiveGroup(g.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                  activeGroup === g.id ? "scale-[1.02]" : "hover:scale-[1.01]"
                }`}
                style={{
                  background: activeGroup === g.id ? `${g.color}10` : "rgba(16,19,26,0.4)",
                  borderColor: activeGroup === g.id ? `${g.color}40` : "rgba(255,255,255,0.06)",
                  boxShadow: activeGroup === g.id ? `0 0 20px ${g.color}10` : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${g.color}15`, border: `1px solid ${g.color}30` }}
                  >
                    <span className="font-black text-xs" style={{ color: g.color }}>{g.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{g.label}</p>
                    <p className="font-mono text-xs text-slate-500">{g.skills.length} technologies</p>
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

          {/* Skills panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-8"
                style={{ borderColor: `${group.color}15` }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${group.color}15`, border: `1px solid ${group.color}30` }}
                  >
                    <span className="font-black text-sm" style={{ color: group.color }}>{group.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{group.label}</h3>
                    <p className="font-mono text-xs text-slate-500">SEQUENCE ANALYSIS</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {group.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm text-slate-300">{skill.name}</span>
                        <span className="font-mono text-xs text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{ background: `linear-gradient(90deg, ${group.color}60, ${group.color})` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="mt-8 flex items-end gap-2 h-20">
                  {group.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      className="flex-1 rounded-t-sm"
                      style={{ background: `${group.color}15`, border: `1px solid ${group.color}25` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${skill.level}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

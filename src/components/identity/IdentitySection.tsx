"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLang } from "@/components/context/LanguageContext";

const STORIES = {
  en: {
    mobile: {
      title: "Mobile App Developer",
      desc: "Building cross-platform iOS & Android applications using React Native. Delivering native-quality mobile experiences backed by Azure cloud services and .NET APIs.",
      tags: ["React Native", "iOS", "Android", "Expo", "Azure", ".NET API"],
    },
    solver: {
      title: "Problem Solver",
      desc: "I dissect complex business problems, architect scalable solutions, and deliver systems that work reliably in production environments.",
      tags: ["System Design", "Architecture", "Debugging", "Optimization"],
    },
    devops: {
      title: "DevOps Engineer",
      desc: "Terraform-driven infrastructure, CI/CD pipelines on Azure DevOps, VNET-injected APIM with WAF, Key Vault secrets management, and KQL-based observability dashboards.",
      tags: ["Terraform", "Azure DevOps", "CI/CD", "Azure APIM", "Key Vault", "KQL", "Docker"],
    },
    fullstack: {
      title: "Full-Stack Developer",
      desc: "End-to-end web applications — React, Next.js, TypeScript on the front, ASP.NET Core and Node.js on the back, with MS Graph API and REST integrations throughout.",
      tags: ["React", "Next.js", "TypeScript", "C#", "Node.js", "MS Graph API", "REST APIs"],
    },
  },
  de: {
    mobile: {
      title: "Mobile-App-Entwickler",
      desc: "Entwicklung plattformübergreifender iOS- & Android-Apps mit React Native. Native Qualität, unterstützt durch Azure-Cloud-Dienste und .NET-APIs.",
      tags: ["React Native", "iOS", "Android", "Expo", "Azure", ".NET API"],
    },
    solver: {
      title: "Problemlöser",
      desc: "Ich analysiere komplexe Geschäftsprobleme, entwerfe skalierbare Lösungen und liefere Systeme, die in Produktionsumgebungen zuverlässig funktionieren.",
      tags: ["Systemdesign", "Architektur", "Debugging", "Optimierung"],
    },
    devops: {
      title: "DevOps-Ingenieur",
      desc: "Terraform-gesteuerte Infrastruktur, CI/CD-Pipelines auf Azure DevOps, VNET-injiziertes APIM mit WAF, Key-Vault-Secrets-Management und KQL-basierte Observability-Dashboards.",
      tags: ["Terraform", "Azure DevOps", "CI/CD", "Azure APIM", "Key Vault", "KQL", "Docker"],
    },
    fullstack: {
      title: "Full-Stack-Entwickler",
      desc: "End-to-End-Webanwendungen — React, Next.js, TypeScript im Frontend, ASP.NET Core und Node.js im Backend, mit MS Graph API und REST-Integrationen.",
      tags: ["React", "Next.js", "TypeScript", "C#", "Node.js", "MS Graph API", "REST APIs"],
    },
  },
};

const STATS = {
  en: [
    { value: "18+", label: "Projects Shipped" },
    { value: "30+", label: "Technologies" },
    { value: "6+", label: "Years Experience" },
    { value: "2",   label: "Azure Certifications" },
  ],
  de: [
    { value: "18+", label: "Projekte geliefert" },
    { value: "30+", label: "Technologien" },
    { value: "6+",  label: "Jahre Erfahrung" },
    { value: "2",   label: "Azure-Zertifikate" },
  ],
};

const NODES = {
  en: [
    { id: "mobile",    label: ["Mobile App", "Developer"], color: "#e2e8f0", area: "top" },
    { id: "fullstack", label: ["Full-Stack", "Dev"],       color: "#cbd5e1", area: "left" },
    { id: "solver",    label: ["Problem", "Solver"],       color: "#94a3b8", area: "right" },
    { id: "devops",    label: ["DevOps", "Engineer"],      color: "#64748b", area: "bottom" },
  ],
  de: [
    { id: "mobile",    label: ["Mobile-App", "Entwickler"],  color: "#e2e8f0", area: "top" },
    { id: "fullstack", label: ["Full-Stack", "Entwickler"],  color: "#cbd5e1", area: "left" },
    { id: "solver",    label: ["Problem", "Löser"],          color: "#94a3b8", area: "right" },
    { id: "devops",    label: ["DevOps", "Ingenieur"],       color: "#64748b", area: "bottom" },
  ],
};

const UI = {
  en: {
    chapter:  "CHAPTER_01 / IDENTITY",
    heading1: "Who ",
    heading2: "Am I?",
    hint:     { compact: "tap the nodes to explore", full: "hover the nodes to explore" },
    profile:  "IDENTITY.PROFILE",
    tagline:  "I build things that ",
    taglineAccent: "actually work.",
    bio: "Not just pretty interfaces — real systems solving real problems. From Azure cloud integrations to scalable full-stack applications, I bridge the gap between engineering and experience.",
    core: "CORE",
  },
  de: {
    chapter:  "KAPITEL_01 / IDENTITÄT",
    heading1: "Wer ",
    heading2: "bin ich?",
    hint:     { compact: "Knoten antippen", full: "Knoten hovern zum Erkunden" },
    profile:  "IDENTITÄT.PROFIL",
    tagline:  "Ich baue Dinge, die ",
    taglineAccent: "wirklich funktionieren.",
    bio: "Nicht nur hübsche Oberflächen — echte Systeme für echte Probleme. Von Azure-Cloud-Integrationen bis zu skalierbaren Full-Stack-Anwendungen brücke ich die Lücke zwischen Engineering und Nutzererlebnis.",
    core: "KERN",
  },
};

function useIsCompact(breakpoint = 992) {
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const onResize = () => setIsCompact(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isCompact;
}

function NodeCard({
  node, active, inView, index, setActive, isCompact,
}: {
  node: { id: string; label: string[]; color: string; area: string };
  active: string | null;
  inView: boolean;
  index: number;
  setActive: (id: string | null) => void;
  isCompact: boolean;
}) {
  const isActive = active === node.id;
  const sizeClass = isCompact ? "w-28 h-28 sm:w-32 sm:h-32" : "w-36 h-36 md:w-40 md:h-40";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.15 + index * 0.08, type: "spring", stiffness: 180 }}
      whileHover={!isCompact ? { scale: 1.06 } : undefined}
      onHoverStart={() => { if (!isCompact) setActive(node.id); }}
      onHoverEnd={() => { if (!isCompact) setActive(null); }}
      onClick={() => { if (isCompact) setActive(isActive ? null : node.id); }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(isActive ? null : node.id); }
      }}
      className="relative z-20 select-none"
    >
      <div
        className={`relative ${sizeClass} rounded-[28px] glass flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300`}
        style={{
          borderColor: isActive ? node.color : "rgba(255,255,255,0.07)",
          borderWidth: "1px", borderStyle: "solid",
          boxShadow: isActive ? `0 0 28px ${node.color}20` : "none",
        }}
      >
        {node.label.map((line) => (
          <span key={line} className="font-mono text-sm md:text-base text-slate-400 text-center leading-tight block pointer-events-none">
            {line}
          </span>
        ))}
      </div>
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-[28px] pointer-events-none"
          initial={{ scale: 1, opacity: 0.35 }}
          animate={{ scale: 1.12, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ border: `1px solid ${node.color}` }}
        />
      )}
    </motion.div>
  );
}

function CoreButton({ reset, compact, label }: { reset: () => void; compact: boolean; label: string }) {
  return (
    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
      <button
        type="button"
        onClick={reset}
        className={`rounded-full glass border border-white/10 flex items-center justify-center cursor-pointer ${
          compact ? "w-16 h-16 sm:w-20 sm:h-20" : "w-24 h-24 md:w-28 md:h-28"
        }`}
      >
        <span className={`font-mono font-bold text-white ${compact ? "text-sm sm:text-base" : "text-lg"}`}>
          {label}
        </span>
      </button>
    </motion.div>
  );
}

export default function IdentitySection() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const isCompact = useIsCompact(992);
  const { lang } = useLang();

  const t = UI[lang];
  const nodes = NODES[lang];
  const stories = STORIES[lang];
  const stats = STATS[lang];

  const activeNode = active ? nodes.find((n) => n.id === active) : null;
  const activeStory = active ? stories[active as keyof typeof stories] : null;

  return (
    <section
      id="identity"
      ref={ref}
      className="snap-section min-h-screen flex items-center relative overflow-hidden bg-dark-950 py-10 md:py-20"
    >
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-16 text-center"
        >
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.32em] sm:tracking-[0.4em] text-slate-600 uppercase mb-4">
            {t.chapter}
          </p>
          <h2 className="text-3xl md:text-6xl font-black">
            <span className="text-white">{t.heading1}</span>
            <span className="gradient-text">{t.heading2}</span>
          </h2>
          <p className="text-slate-600 mt-4 text-sm font-mono">
            {isCompact ? t.hint.compact : t.hint.full}
          </p>
        </motion.div>

        <div className={`grid ${isCompact ? "grid-cols-1 gap-6" : "lg:grid-cols-2 gap-16"} items-center`}>
          {/* LEFT — node diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[720px]" style={{ height: isCompact ? "auto" : "560px" }}>
              <svg
                className={`absolute inset-0 w-full ${isCompact ? "h-40" : "h-full"} pointer-events-none z-0`}
                viewBox={isCompact ? "0 0 100 60" : "0 0 100 100"}
                preserveAspectRatio="none"
              >
                {isCompact ? (
                  <>
                    {[["50","10","50","30"],["25","35","50","30"],["75","35","50","30"],["50","45","50","35"]].map(([x1,y1,x2,y2], idx) => (
                      <motion.line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.05)" strokeWidth="0.4"
                        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 + idx * 0.05 }} />
                    ))}
                  </>
                ) : (
                  <>
                    {[["50","20","80","50"],["80","50","50","80"],["50","80","20","50"],["20","50","50","20"],
                      ["50","20","50","50"],["80","50","50","50"],["50","80","50","50"],["20","50","50","50"]].map(([x1,y1,x2,y2], idx) => (
                      <motion.line key={idx} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={idx < 4 ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)"}
                        strokeWidth={idx < 4 ? "0.4" : "0.3"}
                        initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: idx < 4 ? 0.8 : 0.7, delay: 0.2 + idx * 0.05 }} />
                    ))}
                  </>
                )}
              </svg>

              {!isCompact ? (
                <div className="relative z-10 h-full w-full grid place-items-center"
                  style={{ gridTemplateColumns: "1fr auto 1fr", gridTemplateRows: "1fr auto 1fr",
                    gridTemplateAreas: `". top ." "left core right" ". bottom ."` }}>
                  <div style={{ gridArea: "top" }} className="self-start">
                    <NodeCard node={nodes[0]} active={active} inView={inView} index={0} setActive={setActive} isCompact={isCompact} />
                  </div>
                  <div style={{ gridArea: "left" }} className="justify-self-start">
                    <NodeCard node={nodes[1]} active={active} inView={inView} index={1} setActive={setActive} isCompact={isCompact} />
                  </div>
                  <div style={{ gridArea: "core" }} className="relative z-20">
                    <CoreButton reset={() => setActive(null)} compact={false} label={t.core} />
                  </div>
                  <div style={{ gridArea: "right" }} className="justify-self-end">
                    <NodeCard node={nodes[2]} active={active} inView={inView} index={2} setActive={setActive} isCompact={isCompact} />
                  </div>
                  <div style={{ gridArea: "bottom" }} className="self-end">
                    <NodeCard node={nodes[3]} active={active} inView={inView} index={3} setActive={setActive} isCompact={isCompact} />
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center gap-4 py-4">
                  <NodeCard node={nodes[0]} active={active} inView={inView} index={0} setActive={setActive} isCompact={isCompact} />
                  <div className="w-full flex items-center justify-center gap-4 sm:gap-6">
                    <NodeCard node={nodes[1]} active={active} inView={inView} index={1} setActive={setActive} isCompact={isCompact} />
                    <CoreButton reset={() => setActive(null)} compact label={t.core} />
                    <NodeCard node={nodes[2]} active={active} inView={inView} index={2} setActive={setActive} isCompact={isCompact} />
                  </div>
                  <NodeCard node={nodes[3]} active={active} inView={inView} index={3} setActive={setActive} isCompact={isCompact} />
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT — story panel */}
          <div className={`relative ${isCompact ? "w-full mt-2" : "min-h-[300px] flex items-center"}`}>
            <AnimatePresence mode="wait">
              {activeNode && activeStory ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                  transition={{ duration: 0.35 }}
                  className="glass rounded-2xl p-6 md:p-8 w-full"
                  style={{ borderColor: `${activeNode.color}20` }}
                >
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3">{activeStory.title}</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">{activeStory.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeStory.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full font-mono text-xs"
                        style={{ background: `${activeNode.color}10`, color: activeNode.color, border: `1px solid ${activeNode.color}25` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-4">
                  <div className="glass rounded-2xl p-6 md:p-8">
                    <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-2">{t.profile}</p>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                      {t.tagline}<span className="gradient-text">{t.taglineAccent}</span>
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">{t.bio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((s) => (
                      <div key={s.label} className="glass rounded-xl p-3 md:p-4 text-center">
                        <p className="text-xl md:text-2xl font-black text-white">{s.value}</p>
                        <p className="font-mono text-xs text-slate-500 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/context/LanguageContext";

const LOG_ENTRIES = {
  en: [
    {
      year: "2016", type: "INIT", color: "#94a3b8", title: "University Start",
      entries: [
        "Started Computer Science at Heinrich-Heine-Universitat Dusseldorf",
        "Focused on software engineering, algorithms, and system architecture",
        "Hands-on projects in programming languages, databases, and networks",
      ],
    },
    {
      year: "2018", type: "DEPLOY", color: "#94a3b8", title: "IT Support Specialist",
      entries: [
        "Joined ControlExpert GmbH as IT Support Specialist",
        "Technical support and troubleshooting for internal systems",
        "Streamlined IT workflows and assisted in software deployments",
      ],
    },
    {
      year: "2020", type: "UPGRADE", color: "#64748b", title: "Junior Software Developer",
      entries: [
        "Promoted to Junior Software Developer at ControlExpert GmbH",
        "Completed apprenticeship at Berufskolleg Hilden (2020-2023)",
        "Developed and maintained enterprise-level applications",
        "Collaborated with cross-functional teams on high-quality features",
      ],
    },
    {
      year: "2023", type: "SCALE", color: "#cbd5e1", title: ".NET & Azure Developer",
      entries: [
        "Joined RealCore Services GmbH as .NET, Azure & O365 Developer",
        "Developed and deployed cloud-based applications using .NET and Azure",
        "Integrated Microsoft 365 services for enterprise productivity",
        "Built RealOrders, OrgManagement Handler, Org Tool, and Azure APIM platform",
      ],
    },
    {
      year: "2024", type: "FREELANCE", color: "#e2e8f0", title: "Freelance Full-Stack Developer",
      entries: [
        "Started freelancing alongside full-time role",
        "Built Teretnjaci.ba (Web + Android + iOS), Gentle Group, Gentle Track",
        "Delivered NRW Real Estate, Creative HairStyling, and more",
        "Earned AZ-204 and AZ-400 Azure certifications",
      ],
    },
  ],
  de: [
    {
      year: "2016", type: "INIT", color: "#94a3b8", title: "Studiumsbeginn",
      entries: [
        "Beginn des Informatikstudiums an der Heinrich-Heine-Universität Düsseldorf",
        "Schwerpunkte: Softwareentwicklung, Algorithmen und Systemarchitektur",
        "Praktische Projekte in Programmiersprachen, Datenbanken und Netzwerken",
      ],
    },
    {
      year: "2018", type: "DEPLOY", color: "#94a3b8", title: "IT-Support-Spezialist",
      entries: [
        "Einstieg bei ControlExpert GmbH als IT-Support-Spezialist",
        "Technischer Support und Fehlerbehebung für interne Systeme",
        "Optimierung von IT-Workflows und Unterstützung bei Software-Deployments",
      ],
    },
    {
      year: "2020", type: "UPGRADE", color: "#64748b", title: "Junior-Softwareentwickler",
      entries: [
        "Beförderung zum Junior-Softwareentwickler bei ControlExpert GmbH",
        "Abschluss der Ausbildung am Berufskolleg Hilden (2020–2023)",
        "Entwicklung und Wartung von Unternehmensanwendungen",
        "Zusammenarbeit mit cross-funktionalen Teams an hochwertigen Features",
      ],
    },
    {
      year: "2023", type: "SCALE", color: "#cbd5e1", title: ".NET & Azure Entwickler",
      entries: [
        "Wechsel zu RealCore Services GmbH als .NET-, Azure- & O365-Entwickler",
        "Entwicklung und Deployment cloudbasierter Anwendungen mit .NET und Azure",
        "Integration von Microsoft 365 für Unternehmensproduktivität",
        "Aufbau von RealOrders, OrgManagement Handler, Org Tool und Azure APIM",
      ],
    },
    {
      year: "2024", type: "FREELANCE", color: "#e2e8f0", title: "Freelance Full-Stack-Entwickler",
      entries: [
        "Beginn der Freelance-Tätigkeit neben der Festanstellung",
        "Entwicklung von Teretnjaci.ba (Web + Android + iOS), Gentle Group, Gentle Track",
        "Lieferung von NRW Real Estate, Creative HairStyling und weiteren Projekten",
        "Erwerb der Azure-Zertifikate AZ-204 und AZ-400",
      ],
    },
  ],
};

const UI = {
  en: {
    chapter: "CHAPTER_03 / SYSTEM LOG",
    heading1: "Career ",
    heading2: "Timeline",
    hint: { compact: "tap entries to expand", full: "hover entries to expand" },
    prompt: "next chapter loading",
    terminal: "medin@system:~$",
  },
  de: {
    chapter: "KAPITEL_03 / SYSTEMPROTOKOLL",
    heading1: "Karriere-",
    heading2: "Zeitlinie",
    hint: { compact: "Einträge antippen", full: "Einträge hovern zum Öffnen" },
    prompt: "nächstes Kapitel lädt",
    terminal: "medin@system:~$",
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

function TypingText({ text, delay = 0, active }: { text: string; delay?: number; active: boolean }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length && intervalId) clearInterval(intervalId);
      }, 18);
    }, delay);
    return () => { clearTimeout(timeoutId); if (intervalId) clearInterval(intervalId); };
  }, [active, text, delay]);

  return (
    <span className="font-mono text-xs sm:text-sm text-slate-400 break-words">
      {displayed}
      {displayed.length < text.length && active && (
        <span className="inline-block w-1.5 h-3 bg-slate-400 blink ml-0.5 align-middle" />
      )}
    </span>
  );
}

type LogEntry = { year: string; type: string; color: string; title: string; entries: string[] };

function TimelineRow({
  entry, i, inView, activeYear, setActiveYear, isCompact,
}: {
  entry: LogEntry; i: number; inView: boolean;
  activeYear: string | null; setActiveYear: (y: string | null) => void; isCompact: boolean;
}) {
  const isActive = activeYear === entry.year;
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
      onHoverStart={() => { if (!isCompact) setActiveYear(entry.year); }}
      onHoverEnd={() => { if (!isCompact) setActiveYear(null); }}
      onClick={() => { if (isCompact) setActiveYear(isActive ? null : entry.year); }}
      className="group"
    >
      <div
        className="glass rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
        style={{
          borderColor: isActive ? `${entry.color}50` : "rgba(255,255,255,0.06)",
          borderWidth: "1px", borderStyle: "solid",
          boxShadow: isActive ? `0 0 20px ${entry.color}10` : "none",
        }}
        role="button" tabIndex={0} aria-expanded={isActive}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveYear(isActive ? null : entry.year); } }}
      >
        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
          <span className="font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded shrink-0"
            style={{ background: `${entry.color}15`, color: entry.color, border: `1px solid ${entry.color}25` }}>
            {entry.type}
          </span>
          <span className="font-mono text-xs sm:text-sm font-bold shrink-0 w-10 sm:w-12" style={{ color: entry.color }}>
            {entry.year}
          </span>
          <span className="font-mono text-[11px] sm:text-xs text-slate-300 flex-1 min-w-0 truncate sm:whitespace-nowrap whitespace-normal">
            {entry.title}
          </span>
          <motion.span className="font-mono text-xs text-slate-600 group-hover:text-slate-400 transition-colors shrink-0"
            animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.2 }}>
            ▶
          </motion.span>
        </div>
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-3 sm:px-4 pb-4 sm:pb-5 pt-3 space-y-2.5 border-t border-white/5">
                {entry.entries.map((line, j) => (
                  <div key={j} className="flex items-start gap-2 sm:gap-3">
                    <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: entry.color }}>{">"}</span>
                    <TypingText text={line} delay={j * 120} active={isActive} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function SystemLog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const isCompact = useIsCompact(992);
  const { lang } = useLang();

  const t = UI[lang];
  const entries = LOG_ENTRIES[lang];

  return (
    <section id="timeline" ref={ref} className="snap-section min-h-screen flex items-center relative overflow-hidden bg-dark-950 py-12 md:py-20">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-10 md:mb-16 text-center">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.32em] sm:tracking-[0.4em] text-slate-600 uppercase mb-4">{t.chapter}</p>
          <h2 className="text-3xl md:text-6xl font-black">
            <span className="text-white">{t.heading1}</span>
            <span className="gradient-text">{t.heading2}</span>
          </h2>
          <p className="text-slate-600 mt-4 text-sm font-mono">{isCompact ? t.hint.compact : t.hint.full}</p>
        </motion.div>

        <div className="space-y-3">
          {entries.map((entry, i) => (
            <TimelineRow key={entry.year} entry={entry} i={i} inView={inView}
              activeYear={activeYear} setActiveYear={setActiveYear} isCompact={isCompact} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}
          className="mt-5 sm:mt-6 glass rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="font-mono text-xs text-slate-600">{t.terminal}</span>
          <span className="font-mono text-xs text-slate-600">{t.prompt}</span>
          <span className="inline-block w-2 h-4 bg-slate-600 blink" />
        </motion.div>
      </div>
    </section>
  );
}

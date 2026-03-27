"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const LOG_ENTRIES = [
  {
    year: "2016",
    type: "INIT",
    color: "#94a3b8",
    title: "University Start",
    entries: [
      "Started Computer Science at Heinrich-Heine-Universität Düsseldorf",
      "Focused on software engineering, algorithms, and system architecture",
      "Hands-on projects in programming languages, databases, and networks",
    ],
  },
  {
    year: "2018",
    type: "DEPLOY",
    color: "#94a3b8",
    title: "IT Support Specialist",
    entries: [
      "Joined ControlExpert GmbH as IT Support Specialist",
      "Technical support and troubleshooting for internal systems",
      "Streamlined IT workflows and assisted in software deployments",
    ],
  },
  {
    year: "2020",
    type: "UPGRADE",
    color: "#64748b",
    title: "Junior Software Developer",
    entries: [
      "Promoted to Junior Software Developer at ControlExpert GmbH",
      "Completed apprenticeship at Berufskolleg Hilden (2020–2023)",
      "Developed and maintained enterprise-level applications",
      "Collaborated with cross-functional teams on high-quality features",
    ],
  },
  {
    year: "2023",
    type: "SCALE",
    color: "#cbd5e1",
    title: ".NET & Azure Developer",
    entries: [
      "Joined RealCore Services GmbH as .NET, Azure & O365 Developer",
      "Developed and deployed cloud-based applications using .NET and Azure",
      "Integrated Microsoft 365 services for enterprise productivity",
      "Built RealOrders, OrgManagement Handler, Org Tool, and Azure APIM platform",
    ],
  },
  {
    year: "2024",
    type: "FREELANCE",
    color: "#e2e8f0",
    title: "Freelance Full-Stack Developer",
    entries: [
      "Started freelancing alongside full-time role",
      "Built Teretnjaci.ba (Web + Android + iOS), Gentle Group, Gentle Track",
      "Delivered NRW Real Estate, Creative HairStyling, and more",
      "Earned AZ-204 and AZ-400 Azure certifications",
    ],
  },
];

function TypingText({
  text,
  delay = 0,
  active,
}: {
  text: string;
  delay?: number;
  active: boolean;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) return;

    setDisplayed("");

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length && intervalId) {
          clearInterval(intervalId);
        }
      }, 25);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [active, text, delay]);

  return (
    <span className="font-mono text-xs text-slate-400">
      {displayed}
      {displayed.length < text.length && active && (
        <span className="inline-block w-1.5 h-3 bg-slate-400 blink ml-0.5" />
      )}
    </span>
  );
}

export default function SystemLog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [activeYear, setActiveYear] = useState<string | null>(null);

  return (
    <section
      id="timeline"
      ref={ref}
      className="snap-section min-h-screen flex items-center relative overflow-hidden bg-dark-950 py-20"
    >
      <div className="absolute inset-0 bg-grid opacity-25" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">

        {/* Header — matches other sections */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs tracking-[0.4em] text-slate-600 uppercase mb-4">
            CHAPTER_03 / SYSTEM LOG
          </p>
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-white">Career </span>
            <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-slate-600 mt-4 text-sm font-mono">
            hover entries to expand
          </p>
        </motion.div>

        {/* Log entries */}
        <div className="space-y-3">
          {LOG_ENTRIES.map((entry, i) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              onHoverStart={() => setActiveYear(entry.year)}
              onHoverEnd={() => setActiveYear(null)}
              className="group"
            >
              <div
                className="glass rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  borderColor:
                    activeYear === entry.year
                      ? `${entry.color}50`
                      : "rgba(255,255,255,0.06)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  boxShadow:
                    activeYear === entry.year
                      ? `0 0 20px ${entry.color}10`
                      : "none",
                }}
              >
                {/* Row */}
                <div className="flex items-center gap-4 p-4">
                  {/* Type badge */}
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded shrink-0"
                    style={{
                      background: `${entry.color}15`,
                      color: entry.color,
                      border: `1px solid ${entry.color}25`,
                    }}
                  >
                    {entry.type}
                  </span>

                  {/* Year */}
                  <span
                    className="font-mono text-sm font-bold shrink-0 w-12"
                    style={{ color: entry.color }}
                  >
                    {entry.year}
                  </span>

                  {/* Title */}
                  <span className="font-mono text-xs text-slate-300 flex-1 truncate">
                    {entry.title}
                  </span>

                  {/* Chevron */}
                  <motion.span
                    className="font-mono text-xs text-slate-600 group-hover:text-slate-400 transition-colors shrink-0"
                    animate={{ rotate: activeYear === entry.year ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▶
                  </motion.span>
                </div>

                {/* Expandable content */}
                <motion.div
                  initial={false}
                  animate={{ height: activeYear === entry.year ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-5 pt-3 space-y-2.5 border-t border-white/5">
                    {entry.entries.map((line, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <span
                          className="font-mono text-xs mt-0.5 shrink-0"
                          style={{ color: entry.color }}
                        >
                          {">"}
                        </span>
                        <TypingText
                          text={line}
                          delay={j * 150}
                          active={activeYear === entry.year}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-6 glass rounded-xl p-4 flex items-center gap-3"
        >
          <span className="font-mono text-xs text-slate-600">
            medin@system:~$
          </span>
          <span className="font-mono text-xs text-slate-600">
            next chapter loading
          </span>
          <span className="inline-block w-2 h-4 bg-slate-600 blink" />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const STORIES: Record<string, { title: string; desc: string; tags: string[] }> = {
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
};

const STATS = [
  { value: "18+", label: "Projects Shipped" },
  { value: "30+", label: "Technologies" },
  { value: "6+", label: "Years Experience" },
  { value: "2", label: "Azure Certifications" },
];

const NODES = [
  {
    id: "mobile",
    label: ["Mobile App", "Developer"],
    color: "#e2e8f0",
    area: "top",
  },
  {
    id: "fullstack",
    label: ["Full-Stack", "Dev"],
    color: "#cbd5e1",
    area: "left",
  },
  {
    id: "solver",
    label: ["Problem", "Solver"],
    color: "#94a3b8",
    area: "right",
  },
  {
    id: "devops",
    label: ["DevOps", "Engineer"],
    color: "#64748b",
    area: "bottom",
  },
];

function NodeCard({
  node,
  active,
  inView,
  index,
  setActive,
}: {
  node: (typeof NODES)[number];
  active: string | null;
  inView: boolean;
  index: number;
  setActive: (id: string | null) => void;
}) {
  const isActive = active === node.id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        delay: 0.2 + index * 0.1,
        type: "spring",
        stiffness: 180,
      }}
      whileHover={{ scale: 1.06 }}
      onHoverStart={() => setActive(node.id)}
      onHoverEnd={() => setActive(null)}
      className="relative z-20"
    >
      <div
        className="relative w-36 h-36 md:w-40 md:h-40 rounded-[28px] glass flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300"
        style={{
          borderColor: isActive ? node.color : "rgba(255,255,255,0.07)",
          borderWidth: "1px",
          borderStyle: "solid",
          boxShadow: isActive ? `0 0 28px ${node.color}20` : "none",
        }}
      >
        {node.label.map((line) => (
          <span
            key={line}
            className="font-mono text-sm md:text-base text-slate-400 text-center leading-tight block"
          >
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

export default function IdentitySection() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const activeNode = active ? NODES.find((n) => n.id === active) : null;
  const activeStory = active ? STORIES[active] : null;

  return (
    <section
      id="identity"
      ref={ref}
      className="snap-section min-h-screen flex items-center relative overflow-hidden bg-dark-950 py-20"
    >
      <div className="absolute inset-0 bg-grid opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs tracking-[0.4em] text-slate-600 uppercase mb-4">
            CHAPTER_01 / IDENTITY
          </p>
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-white">Who </span>
            <span className="gradient-text">Am I?</span>
          </h2>
          <p className="text-slate-600 mt-4 text-sm font-mono">
            hover the nodes to explore
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[620px] h-[560px]">
              {/* Connector lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {/* outer box-to-box diagonal lines */}
                <motion.line
                  x1="50"
                  y1="20"
                  x2="80"
                  y2="50"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.line
                  x1="80"
                  y1="50"
                  x2="50"
                  y2="80"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.line
                  x1="50"
                  y1="80"
                  x2="20"
                  y2="50"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
                <motion.line
                  x1="20"
                  y1="50"
                  x2="50"
                  y2="20"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />

                {/* optional soft lines to core */}
                <motion.line
                  x1="50"
                  y1="20"
                  x2="50"
                  y2="50"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.55 }}
                />
                <motion.line
                  x1="80"
                  y1="50"
                  x2="50"
                  y2="50"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.6 }}
                />
                <motion.line
                  x1="50"
                  y1="80"
                  x2="50"
                  y2="50"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.65 }}
                />
                <motion.line
                  x1="20"
                  y1="50"
                  x2="50"
                  y2="50"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.7 }}
                />
              </svg>

              {/* Grid */}
              <div
                className="relative z-10 h-full w-full grid place-items-center"
                style={{
                  gridTemplateColumns: "1fr auto 1fr",
                  gridTemplateRows: "1fr auto 1fr",
                  gridTemplateAreas: `
                    ". top ."
                    "left core right"
                    ". bottom ."
                  `,
                }}
              >
                <div style={{ gridArea: "top" }} className="self-start">
                  <NodeCard
                    node={NODES[0]}
                    active={active}
                    inView={inView}
                    index={0}
                    setActive={setActive}
                  />
                </div>

                <div style={{ gridArea: "left" }} className="justify-self-start">
                  <NodeCard
                    node={NODES[1]}
                    active={active}
                    inView={inView}
                    index={1}
                    setActive={setActive}
                  />
                </div>

                <div style={{ gridArea: "core" }} className="relative z-20">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full glass border border-white/10 flex items-center justify-center">
                      <span className="font-mono text-lg font-bold text-white">
                        CORE
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div style={{ gridArea: "right" }} className="justify-self-end">
                  <NodeCard
                    node={NODES[2]}
                    active={active}
                    inView={inView}
                    index={2}
                    setActive={setActive}
                  />
                </div>

                <div style={{ gridArea: "bottom" }} className="self-end">
                  <NodeCard
                    node={NODES[3]}
                    active={active}
                    inView={inView}
                    index={3}
                    setActive={setActive}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              {activeNode && activeStory ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-2xl p-8 w-full"
                  style={{ borderColor: `${activeNode.color}20` }}
                >
                  <h3 className="text-2xl font-black text-white mb-4">
                    {activeStory.title}
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6">
                    {activeStory.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeStory.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full font-mono text-xs"
                        style={{
                          background: `${activeNode.color}10`,
                          color: activeNode.color,
                          border: `1px solid ${activeNode.color}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full space-y-4"
                >
                  <div className="glass rounded-2xl p-8">
                    <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-3">
                      IDENTITY.PROFILE
                    </p>
                    <h3 className="text-2xl font-black text-white mb-3">
                      I build things that{" "}
                      <span className="gradient-text">actually work.</span>
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Not just pretty interfaces — real systems solving real
                      problems. From Azure cloud integrations to scalable
                      full-stack applications, I bridge the gap between
                      engineering and experience.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {STATS.map((s) => (
                      <div
                        key={s.label}
                        className="glass rounded-xl p-4 text-center"
                      >
                        <p className="text-2xl font-black text-white">
                          {s.value}
                        </p>
                        <p className="font-mono text-xs text-slate-500 mt-1">
                          {s.label}
                        </p>
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

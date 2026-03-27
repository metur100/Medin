"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const PALETTE = [
  "#e2e8f0",
  "#94a3b8",
  "#64748b",
  "#cbd5e1",
  "#f1f5f9",
  "#b0bec5",
  "#90a4ae",
  "#78909c",
  "#607d8b",
  "#546e7a",
  "#8fa8b8",
  "#a8bcc8",
  "#c5d5df",
  "#b8cdd8",
  "#9fb8c5",
  "#d4e0e8",
  "#c0d0da",
  "#aabec8",
];

const PROJECTS = [
  {
    id: "emma-solution",
    name: "EMMA SOLUTION",
    initials: "ES",
    tagline: "Freight & Vehicle Management",
    color: PALETTE[0],
    size: 88,
    orbitRadius: 150,
    orbitSpeed: 20,
    orbitOffset: 0,
    category: "Web App & Android App",
    description:
      "Next-generation freight and vehicle management platform for the logistics industry. Real-time tracking, secure vehicle assignment, and seamless shipment coordination.",
    stack: [
      "React (Vite)",
      "TypeScript",
      "ASP.NET Core 8",
      "Azure SQL",
      "Azure Web App",
      "Vercel",
      "OAuth 2.0 / JWT",
    ],
    impact:
      "End-to-end logistics management with multilingual support and real-time dashboards.",
  },
  {
    id: "teretnjaci",
    name: "Teretnjaci.ba",
    initials: "TB",
    tagline: "Trucking Information Platform",
    color: PALETTE[1],
    size: 74,
    orbitRadius: 230,
    orbitSpeed: 26,
    orbitOffset: 40,
    category: "Web App / Android / iOS",
    description:
      "Specialized information platform for the trucking industry — news, maintenance guides, road assistance, and industry updates. Available on web, Android, and iOS.",
    stack: [
      "React",
      "Vite.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MySQL",
      "React Native",
    ],
    impact:
      "Cross-platform reach with PWA, Google Play, and App Store presence.",
  },
  {
    id: "api-management",
    name: "Azure APIM",
    initials: "AM",
    tagline: "Infrastructure & DevOps",
    color: PALETTE[2],
    size: 68,
    orbitRadius: 305,
    orbitSpeed: 32,
    orbitOffset: 80,
    category: "Infrastructure APIM",
    description:
      "Production-grade Azure API Management platform with fully automated infrastructure. Terraform IaC, CI/CD pipelines, policy governance, VNET networking, and end-to-end observability.",
    stack: [
      "Terraform",
      "Azure DevOps",
      "Azure APIM",
      "Key Vault",
      "Log Analytics",
      "KQL",
      "WAF",
    ],
    impact:
      "Faster delivery, better security, and reduced MTTR through proactive monitoring.",
  },
  {
    id: "real-orders",
    name: "RealOrders",
    initials: "RO",
    tagline: "Internal Ordering System",
    color: PALETTE[3],
    size: 62,
    orbitRadius: 375,
    orbitSpeed: 38,
    orbitOffset: 120,
    category: "Web App",
    description:
      "Internal ordering platform for RealCore Group — streamlines procurement of equipment and technology. Integrated with Microsoft 365, Azure Logic Apps, and Adaptive Cards.",
    stack: [
      "React",
      "TypeScript",
      "C# Azure Functions",
      "Microsoft Entra ID",
      "Azure Logic Apps",
      "MS Graph API",
    ],
    impact:
      "Automated approval workflows and real-time order tracking for enterprise procurement.",
  },
  {
    id: "org-handler",
    name: "Org Handler",
    initials: "OH",
    tagline: "Event-Driven Org Management",
    color: PALETTE[4],
    size: 56,
    orbitRadius: 440,
    orbitSpeed: 44,
    orbitOffset: 160,
    category: "Web API & MS Graph",
    description:
      "Event-driven system managing and distributing organizational data across multiple systems at RealCore Group. Pub-sub model via MassTransit and Azure Service Bus.",
    stack: [
      ".NET Core (C#)",
      "MassTransit",
      "Azure Service Bus",
      "MS Graph API",
      "Docker",
    ],
    impact:
      "Seamless inter-system communication without direct API exposure.",
  },
  {
    id: "awalon",
    name: "Awalon CRM",
    initials: "AW",
    tagline: "CRM with SharePoint Integration",
    color: PALETTE[5],
    size: 52,
    orbitRadius: 500,
    orbitSpeed: 50,
    orbitOffset: 200,
    category: "Web App",
    description:
      "Sophisticated CRM system for managing customer relationships, offers, and business processes. Integrates with SharePoint for seamless data management and workflow automation.",
    stack: ["Next.js", "React", "C# .NET", "SharePoint", "TypeScript"],
    impact:
      "Centralized customer, offer, and portfolio management with advanced search.",
  },
  {
    id: "org-tool",
    name: "Org Tool",
    initials: "OT",
    tagline: "Company Hierarchy Visualization",
    color: PALETTE[6],
    size: 48,
    orbitRadius: 555,
    orbitSpeed: 56,
    orbitOffset: 240,
    category: "Web App",
    description:
      "Advanced organizational management system with interactive tree structures. Visualize and manage company hierarchies, reporting lines, and employee relationships.",
    stack: [
      "Angular",
      "TypeScript",
      "ASP.NET Core",
      "MS Graph API",
      "Azure Entra ID",
      "Azure App Services",
    ],
    impact:
      "Real-time org chart management with role-based access control.",
  },
  {
    id: "gentle-track",
    name: "Gentle Track",
    initials: "GT",
    tagline: "Project Management System",
    color: PALETTE[7],
    size: 44,
    orbitRadius: 605,
    orbitSpeed: 62,
    orbitOffset: 280,
    category: "Web App",
    description:
      "Modern web-based project management system for tracking projects, customers, and team collaboration. Real-time dashboards, phase management, and auto-generated tracking numbers.",
    stack: ["React", "Vite", "ASP.NET Core", "MS SQL Server", "TypeScript"],
    impact:
      "Full project lifecycle management with dual admin/customer views.",
  },
  {
    id: "gentle-access",
    name: "Gentle Access",
    initials: "GA",
    tagline: "Web Accessibility Tool",
    color: PALETTE[8],
    size: 40,
    orbitRadius: 650,
    orbitSpeed: 68,
    orbitOffset: 320,
    category: "Tool App",
    description:
      "Innovative web accessibility widget making websites barrier-free. Vision profiles, font size control, contrast mode, night mode, and blue light filter — embeddable in any site.",
    stack: ["React", "Vite", "CSS", "Local Storage API"],
    impact:
      "WCAG compliance helper with privacy-focused local settings persistence.",
  },
  {
    id: "gentle-group",
    name: "Gentle Group",
    initials: "GG",
    tagline: "Modern Landing Page",
    color: PALETTE[9],
    size: 38,
    orbitRadius: 690,
    orbitSpeed: 74,
    orbitOffset: 0,
    category: "Landing Page Website",
    description:
      "High-performance Next.js landing page for Gentle Group. SSR, static generation, Framer Motion animations, Tailwind CSS, and Vercel deployment with HSTS security.",
    stack: ["Next.js 14", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    impact: "Optimized Core Web Vitals with global CDN delivery.",
  },
  {
    id: "emma-landing",
    name: "EMMA Landing",
    initials: "EL",
    tagline: "Freight Exchange Landing Page",
    color: PALETTE[10],
    size: 36,
    orbitRadius: 725,
    orbitSpeed: 80,
    orbitOffset: 36,
    category: "Web Design",
    description:
      "Responsive landing page for the EMMA SOLUTION freight exchange platform. Highlights features, connects clients with transport services, and drives conversions.",
    stack: ["HTML5", "CSS3", "Bootstrap 4", "jQuery", "EmailJS", "Vercel"],
    impact:
      "Smooth UX with WOW.js animations and integrated contact forms.",
  },
  {
    id: "nrw-real-estate",
    name: "NRW Real Estate",
    initials: "NR",
    tagline: "Property Listings Platform",
    color: PALETTE[11],
    size: 34,
    orbitRadius: 758,
    orbitSpeed: 86,
    orbitOffset: 72,
    category: "Website",
    description:
      "Responsive real estate platform for property listings in North Rhine-Westphalia. Advanced filtering by location, price, and size with Next.js performance.",
    stack: ["Next.js", "React", "CSS3", "Vercel"],
    impact:
      "Connects buyers with agents across NRW with intuitive property search.",
  },
  {
    id: "creative-hair",
    name: "Creative Hair",
    initials: "CH",
    tagline: "Hair Salon Website",
    color: PALETTE[12],
    size: 32,
    orbitRadius: 788,
    orbitSpeed: 92,
    orbitOffset: 108,
    category: "Website",
    description:
      "Elegant responsive website for a modern hair salon. Service showcase, appointment booking integration, and smooth React/Vite animations.",
    stack: ["React", "Vite", "CSS3", "Vercel"],
    impact:
      "Premium salon experience online with integrated booking system.",
  },
  {
    id: "ipad-management",
    name: "iPad Mgmt",
    initials: "IM",
    tagline: "Device Management for Schools",
    color: PALETTE[13],
    size: 30,
    orbitRadius: 815,
    orbitSpeed: 98,
    orbitOffset: 144,
    category: "Windows App",
    description:
      "Windows application for Berufskolleg Hilden to manage iPad distribution to students. Loan/return tracking, damage reporting, signature capture, and MS Access database.",
    stack: ["C#", "Windows Forms", "MS Access"],
    impact:
      "Streamlined device management reducing administrative workload for teachers.",
  },
  {
    id: "frankenstein",
    name: "Frankenstein",
    initials: "FK",
    tagline: "Interactive Android Novel",
    color: PALETTE[14],
    size: 28,
    orbitRadius: 840,
    orbitSpeed: 104,
    orbitOffset: 180,
    category: "Android App",
    description:
      "Immersive Android app bringing Mary Shelley's Frankenstein to life. Interactive storytelling, historical context, shareable quotes, and offline reading support.",
    stack: ["Android Studio", "Java", "XML", "Adobe Illustrator"],
    impact:
      "Published on Google Play with offline reading and social sharing.",
  },
  {
    id: "monthee",
    name: "Monthee Adventure",
    initials: "MA",
    tagline: "2D Platformer RPG",
    color: PALETTE[15],
    size: 26,
    orbitRadius: 862,
    orbitSpeed: 110,
    orbitOffset: 216,
    category: "Unity Engine",
    description:
      "2D platformer with RPG elements for PC and Android. Features quests, NPC interactions, leveling system, puzzle platforming, and cross-platform play.",
    stack: ["Unity", "C#", "Adobe After Effects", "Audacity"],
    impact:
      "5-month solo project with full cross-platform PC and Android support.",
  },
  {
    id: "sweets",
    name: "Sweets aus aller Welt",
    initials: "SW",
    tagline: "International Sweets Website",
    color: PALETTE[16],
    size: 24,
    orbitRadius: 882,
    orbitSpeed: 116,
    orbitOffset: 252,
    category: "Website",
    description:
      "Website showcasing international sweets and confectionery from around the world.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    impact: "Engaging product showcase with international content.",
  },
  {
    id: "employee-appraisal",
    name: "Employee Appraisal",
    initials: "EA",
    tagline: "Performance Review System",
    color: PALETTE[17],
    size: 22,
    orbitRadius: 900,
    orbitSpeed: 122,
    orbitOffset: 288,
    category: "Web App",
    description:
      "Web application for managing employee performance appraisals and reviews.",
    stack: ["React", "TypeScript", "ASP.NET Core", "SQL"],
    impact:
      "Structured performance review process for enterprise teams.",
  },
];

type Project = (typeof PROJECTS)[0];

const ORBIT_COUNT = 6;

function OrbitingPlanet({
  project,
  index,
  inView,
  onSelect,
}: {
  project: Project;
  index: number;
  inView: boolean;
  onSelect: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const r = project.orbitRadius;
  const duration = project.orbitSpeed;
  const startDeg = project.orbitOffset;

  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        width: r * 2,
        height: r * 2,
        top: "50%",
        left: "50%",
        marginTop: -r,
        marginLeft: -r,
        borderRadius: "50%",
        opacity: inView ? 1 : 0,
        transition: "opacity 0.5s",
        transitionDelay: `${0.5 + index * 0.1}s`,
        animation: inView
          ? `orbit-planet-${project.id} ${duration}s linear infinite`
          : "none",
      }}
    >
      <style>{`
        @keyframes orbit-planet-${project.id} {
          from { transform: rotate(${startDeg}deg); }
          to { transform: rotate(${startDeg + 360}deg); }
        }
      `}</style>

      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: project.size,
          height: project.size,
          marginLeft: -project.size / 2,
          marginTop: -project.size / 2,
          animation: inView
            ? `counter-orbit-${project.id} ${duration}s linear infinite`
            : "none",
        }}
      >
        <style>{`
          @keyframes counter-orbit-${project.id} {
            from { transform: rotate(${-startDeg}deg); }
            to { transform: rotate(${-(startDeg + 360)}deg); }
          }
        `}</style>

        <button
          type="button"
          onClick={() => onSelect(project)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative group pointer-events-auto cursor-pointer"
          style={{ width: project.size, height: project.size }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `radial-gradient(circle, ${project.color}25 0%, ${project.color}08 60%, transparent 100%)`,
              border: `1px solid ${project.color}35`,
              boxShadow: hovered
                ? `0 0 20px ${project.color}30`
                : `0 0 8px ${project.color}15`,
              transform: hovered ? "scale(1.3)" : "scale(1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <span
              className="font-black select-none"
              style={{
                color: project.color,
                fontSize: project.size * 0.28,
                letterSpacing: "-0.02em",
              }}
            >
              {project.initials}
            </span>
          </div>

          {hovered && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap z-50">
              <div className="glass rounded-lg px-3 py-1.5 text-center">
                <p className="font-mono text-xs font-bold text-white">
                  {project.name}
                </p>
                <p className="text-slate-400 text-[10px]">{project.tagline}</p>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ProjectUniverse() {
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const orbitProjects = PROJECTS.slice(0, ORBIT_COUNT);

  return (
    <section
      id="projects"
      ref={ref}
      className="snap-section min-h-screen relative overflow-hidden bg-dark-900 py-20"
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,0,0,0)_0%,rgba(11,13,17,0.85)_100%)]" />
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 37.3) % 100}%`,
              top: `${(i * 53.7) % 100}%`,
              width: `${(i % 3) * 0.6 + 0.4}px`,
              height: `${(i % 3) * 0.6 + 0.4}px`,
              opacity: 0.08 + (i % 5) * 0.06,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <p className="font-mono text-xs tracking-[0.4em] text-slate-600 uppercase mb-4">
            CHAPTER_02 / PROJECT UNIVERSE
          </p>
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-white">The </span>
            <span className="gradient-text">Universe</span>
          </h2>
          <p className="text-slate-600 mt-3 text-sm font-mono">
            click any planet or card to explore
          </p>
        </motion.div>

        {/* Orbital system */}
        <div
          className="relative flex items-center justify-center z-10"
          style={{ height: "560px" }}
        >
          {/* Orbit rings */}
          {orbitProjects.map((p) => (
            <div
              key={`ring-${p.id}`}
              className="absolute rounded-full border border-white/[0.04] pointer-events-none z-10"
              style={{ width: p.orbitRadius * 2, height: p.orbitRadius * 2 }}
            />
          ))}

          {/* Sun */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute z-10 pointer-events-none"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle, rgba(226,232,240,0.85) 0%, rgba(148,163,184,0.4) 60%, transparent 100%)",
                boxShadow:
                  "0 0 40px rgba(226,232,240,0.15), 0 0 80px rgba(148,163,184,0.08)",
              }}
            >
              <span className="font-black text-dark-950 text-lg select-none">
                MT
              </span>
            </div>
            <div className="absolute -inset-4 rounded-full border border-white/[0.06] animate-pulse-slow" />
          </motion.div>

          {/* Orbiting planets */}
          {orbitProjects.map((project, i) => (
            <OrbitingPlanet
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* All projects grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 relative z-30"
        >
          <p className="font-mono text-xs text-slate-600 text-center mb-4 tracking-widest uppercase">
            All Projects — click to explore
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] hover:border-white/20 transition-all duration-200 text-left group hover:bg-white/[0.03] cursor-pointer"
              >
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: `${p.color}15`,
                    border: `1px solid ${p.color}35`,
                  }}
                >
                  <span
                    className="font-black text-[8px]"
                    style={{ color: p.color }}
                  >
                    {p.initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-slate-300 group-hover:text-white transition-colors truncate">
                    {p.name}
                  </p>
                  <p className="text-[9px] text-slate-600 truncate">
                    {p.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{ borderColor: `${selected.color}20` }}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"
              >
                ✕
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0 flex flex-col items-center justify-center"
                  style={{
                    background: `${selected.color}10`,
                    border: `1px solid ${selected.color}25`,
                  }}
                >
                  <span
                    className="font-black text-lg"
                    style={{ color: selected.color }}
                  >
                    {selected.initials}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-slate-500">
                    {selected.category}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {selected.name}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {selected.tagline}
                  </p>
                </div>
              </div>

              <div
                className="w-full h-40 rounded-xl mb-6 flex flex-col items-center justify-center border border-dashed"
                style={{
                  borderColor: `${selected.color}20`,
                  background: `${selected.color}04`,
                }}
              >
                <span
                  className="font-black text-3xl"
                  style={{ color: `${selected.color}30` }}
                >
                  {selected.initials}
                </span>
                <p className="font-mono text-xs text-slate-700 mt-2">
                  [ project screenshot — drop image here ]
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selected.description}
              </p>

              <div className="mb-6">
                <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded-md border"
                      style={{
                        color: selected.color,
                        borderColor: `${selected.color}25`,
                        background: `${selected.color}08`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="rounded-xl p-4"
                style={{
                  background: `${selected.color}06`,
                  border: `1px solid ${selected.color}18`,
                }}
              >
                <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-1">
                  Impact
                </p>
                <p className="text-sm text-slate-200">{selected.impact}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

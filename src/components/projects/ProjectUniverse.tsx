"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/components/context/LanguageContext";

const PALETTE = [
  "#e2e8f0", "#94a3b8", "#64748b", "#cbd5e1", "#f1f5f9", "#b0bec5",
  "#90a4ae", "#78909c", "#607d8b", "#546e7a", "#8fa8b8", "#a8bcc8",
  "#c5d5df", "#b8cdd8", "#9fb8c5", "#d4e0e8", "#c0d0da", "#aabec8",
];

const PROJECTS = [
  {
    id: "emma-solution", initials: "ES", color: PALETTE[0], size: 88,
    orbitRadius: 150, orbitSpeed: 20, orbitOffset: 0,
    name: { en: "EMMA SOLUTION", de: "EMMA SOLUTION" },
    tagline: { en: "Freight & Vehicle Management", de: "Fracht- & Fahrzeugmanagement" },
    category: { en: "Web App · Android App · Landing Page", de: "Web-App · Android-App · Landingpage" },
    description: {
      en: "Next-generation freight and vehicle management platform for the logistics industry. Real-time tracking, secure vehicle assignment, and seamless shipment coordination — available on web, Android, and showcased via a dedicated landing page.",
      de: "Nächste Generation der Fracht- und Fahrzeugverwaltung für die Logistikbranche. Echtzeit-Tracking, sichere Fahrzeugzuweisung und nahtlose Sendungskoordination — verfügbar im Web, auf Android und mit dedizierter Landingpage.",
    },
    stack: ["React (Vite)", "TypeScript", "ASP.NET Core 8", "Azure SQL", "Azure Web App", "Vercel", "OAuth 2.0 / JWT", "HTML5", "Bootstrap 4", "jQuery", "EmailJS"],
    impact: {
      en: "End-to-end logistics management with multilingual support, real-time dashboards, and a conversion-optimised landing page.",
      de: "Durchgängiges Logistikmanagement mit mehrsprachiger Unterstützung, Echtzeit-Dashboards und konversionsoptimierter Landingpage.",
    },
    image: "/emma.jpg", link: "https://emmasolution.com/",
  },
  {
    id: "teretnjaci", initials: "TB", color: PALETTE[1], size: 74,
    orbitRadius: 230, orbitSpeed: 26, orbitOffset: 40,
    name: { en: "Teretnjaci.ba", de: "Teretnjaci.ba" },
    tagline: { en: "Trucking Information Platform", de: "LKW-Informationsplattform" },
    category: { en: "Web App / Android / iOS", de: "Web-App / Android / iOS" },
    description: {
      en: "Specialized information platform for the trucking industry — news, maintenance guides, road assistance, and industry updates. Available on web, Android, and iOS.",
      de: "Spezialisierte Informationsplattform für die LKW-Branche — Nachrichten, Wartungsanleitungen, Pannenhilfe und Branchenupdates. Verfügbar im Web, auf Android und iOS.",
    },
    stack: ["React", "Vite.js", "TypeScript", "Node.js", "Express.js", "MySQL", "React Native"],
    impact: {
      en: "Cross-platform reach with PWA, Google Play, and App Store presence.",
      de: "Plattformübergreifende Reichweite mit PWA, Google Play und App Store.",
    },
    image: "/teretnjaci.png", link: "https://teretnjaci.ba",
  },
  {
    id: "gentle-suite", initials: "GS", color: PALETTE[2], size: 68,
    orbitRadius: 305, orbitSpeed: 32, orbitOffset: 80,
    name: { en: "Gentle Suite", de: "Gentle Suite" },
    tagline: { en: "Full CRM & Business Management", de: "Vollständiges CRM & Unternehmensmanagement" },
    category: { en: "Web App · CRM · ERP", de: "Web-App · CRM · ERP" },
    description: {
      en: "Comprehensive business management suite — create customers and offers, generate invoices, manage employees, onboarding, internal ticket system, project management, expenses, time tracking, and product/service pricelists.",
      de: "Umfassende Unternehmensmanagement-Suite — Kunden und Angebote erstellen, Rechnungen generieren, Mitarbeiter verwalten, Onboarding, internes Ticketsystem, Projektmanagement, Ausgaben, Zeiterfassung und Preislisten.",
    },
    stack: ["Next.js", "React", "TypeScript", "C# ASP.NET Core", "MS SQL", "Vercel", "Monster ASP Hosting"],
    impact: {
      en: "All-in-one business platform replacing multiple tools with a single integrated suite.",
      de: "All-in-one-Unternehmensplattform, die mehrere Tools durch eine integrierte Suite ersetzt.",
    },
    image: "/gentlesuite.png", link: "https://gentlesuite.vercel.app/",
  },
  {
    id: "api-management", initials: "AM", color: PALETTE[3], size: 62,
    orbitRadius: 375, orbitSpeed: 38, orbitOffset: 120,
    name: { en: "Azure APIM", de: "Azure APIM" },
    tagline: { en: "Infrastructure & DevOps", de: "Infrastruktur & DevOps" },
    category: { en: "Infrastructure APIM", de: "Infrastruktur APIM" },
    description: {
      en: "Production-grade Azure API Management platform with fully automated infrastructure. Terraform IaC, CI/CD pipelines, policy governance, VNET networking, and end-to-end observability.",
      de: "Produktionsreife Azure API Management Plattform mit vollautomatisierter Infrastruktur. Terraform IaC, CI/CD-Pipelines, Policy-Governance, VNET-Netzwerk und durchgängige Observability.",
    },
    stack: ["Terraform", "Azure DevOps", "Azure APIM", "Key Vault", "Log Analytics", "KQL", "WAF"],
    impact: {
      en: "Faster delivery, better security, and reduced MTTR through proactive monitoring.",
      de: "Schnellere Lieferung, bessere Sicherheit und reduzierte MTTR durch proaktives Monitoring.",
    },
    image: "/apim.png", link: null,
  },
  {
    id: "logistic-management", initials: "LT", color: PALETTE[4], size: 56,
    orbitRadius: 440, orbitSpeed: 44, orbitOffset: 160,
    name: { en: "LogiTrack", de: "LogiTrack" },
    tagline: { en: "Logistics Management System", de: "Logistikmanagementsystem" },
    category: { en: "Web App · Logistics", de: "Web-App · Logistik" },
    description: {
      en: "Full logistics management system for drivers and dispatchers. Real-time fleet oversight, route management, and operational coordination — hosted on Cloudflare Pages with a robust ASP.NET Core backend.",
      de: "Vollständiges Logistikmanagementsystem für Fahrer und Disponenten. Echtzeit-Flottenübersicht, Routenmanagement und operative Koordination — gehostet auf Cloudflare Pages mit robustem ASP.NET Core Backend.",
    },
    stack: ["React", "Vite", "TypeScript", "C# ASP.NET Core", "MS SQL", "Monster ASP Hosting", "Cloudflare Pages"],
    impact: {
      en: "Streamlined driver and dispatcher workflows with real-time logistics visibility.",
      de: "Optimierte Fahrer- und Disponenten-Workflows mit Echtzeit-Logistiksichtbarkeit.",
    },
    image: "/logitrack.png", link: "https://logistic-management-ui.pages.dev/",
  },
  {
    id: "real-orders", initials: "RO", color: PALETTE[5], size: 52,
    orbitRadius: 500, orbitSpeed: 50, orbitOffset: 200,
    name: { en: "RealOrders", de: "RealOrders" },
    tagline: { en: "Internal Ordering System", de: "Internes Bestellsystem" },
    category: { en: "Web App", de: "Web-App" },
    description: {
      en: "Internal ordering platform for RealCore Group — streamlines procurement of equipment and technology. Integrated with Microsoft 365, Azure Logic Apps, and Adaptive Cards.",
      de: "Internes Bestellsystem für die RealCore Group — optimiert die Beschaffung von Geräten und Technologie. Integriert mit Microsoft 365, Azure Logic Apps und Adaptive Cards.",
    },
    stack: ["React", "TypeScript", "C# Azure Functions", "Microsoft Entra ID", "Azure Logic Apps", "MS Graph API"],
    impact: {
      en: "Automated approval workflows and real-time order tracking for enterprise procurement.",
      de: "Automatisierte Genehmigungsworkflows und Echtzeit-Auftragsverfolgung für die Unternehmensbeschaffung.",
    },
    image: "/realorders.jpg", link: "https://wa-real-shopping-app.azurewebsites.net/",
  },
  {
    id: "skinbloom", initials: "SB", color: PALETTE[6], size: 48,
    orbitRadius: 555, orbitSpeed: 56, orbitOffset: 240,
    name: { en: "Skinbloom", de: "Skinbloom" },
    tagline: { en: "Skincare Booking & Price Calculator", de: "Hautpflege-Buchung & Preisrechner" },
    category: { en: "Web App · Booking System", de: "Web-App · Buchungssystem" },
    description: {
      en: "Booking system for a skincare studio with a dedicated price calculator. Full appointment management, service pricing engine powered by Neon DB and Node.js backend.",
      de: "Buchungssystem für ein Hautpflegestudio mit dediziertem Preisrechner. Vollständiges Terminmanagement, Service-Preismotor mit Neon DB und Node.js Backend.",
    },
    stack: ["Next.js", "React", "TypeScript", "C# ASP.NET Core", "MS SQL", "Node.js", "Neon DB (MySQL)", "Monster ASP Hosting", "Vercel"],
    impact: {
      en: "Automated skincare appointment booking with dynamic pricing for clients.",
      de: "Automatisierte Hautpflege-Terminbuchung mit dynamischer Preisgestaltung für Kunden.",
    },
    image: "/skinbloom.png", link: "https://skinbloombooking.gentlegroup.de/",
  },
  {
    id: "vip-shuttle", initials: "VS", color: PALETTE[7], size: 44,
    orbitRadius: 605, orbitSpeed: 62, orbitOffset: 280,
    name: { en: "VIP Shuttle 24", de: "VIP Shuttle 24" },
    tagline: { en: "Premium Transfer Landing Page", de: "Premium Transfer Landingpage" },
    category: { en: "Landing Page Website", de: "Landingpage Website" },
    description: {
      en: "High-performance landing page for a premium shuttle and transfer service. Built with Next.js for fast SSR, clean Tailwind CSS design, and optimised for conversions and local SEO.",
      de: "Hochleistungs-Landingpage für einen Premium-Shuttle- und Transferservice. Mit Next.js für schnelles SSR, sauberem Tailwind CSS Design und optimiert für Conversions und lokales SEO.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    impact: {
      en: "Professional online presence driving bookings for a premium transfer service.",
      de: "Professionelle Online-Präsenz, die Buchungen für einen Premium-Transferservice generiert.",
    },
    image: "/vip.png", link: "https://vipshuttle-24.de/",
  },
  {
    id: "org-handler", initials: "OH", color: PALETTE[8], size: 40,
    orbitRadius: 650, orbitSpeed: 68, orbitOffset: 320,
    name: { en: "Org Handler", de: "Org Handler" },
    tagline: { en: "Event-Driven Org Management", de: "Ereignisgesteuertes Org-Management" },
    category: { en: "Web API & MS Graph", de: "Web API & MS Graph" },
    description: {
      en: "Event-driven system managing and distributing organizational data across multiple systems at RealCore Group. Pub-sub model via MassTransit and Azure Service Bus.",
      de: "Ereignisgesteuertes System zur Verwaltung und Verteilung von Organisationsdaten über mehrere Systeme der RealCore Group. Pub-Sub-Modell über MassTransit und Azure Service Bus.",
    },
    stack: [".NET Core (C#)", "MassTransit", "Azure Service Bus", "MS Graph API", "Docker"],
    impact: {
      en: "Seamless inter-system communication without direct API exposure.",
      de: "Nahtlose systemübergreifende Kommunikation ohne direkte API-Exposition.",
    },
    image: "/org.jpg", link: null,
  },
  {
    id: "zoey", initials: "ZP", color: PALETTE[9], size: 38,
    orbitRadius: 690, orbitSpeed: 74, orbitOffset: 0,
    name: { en: "Zoey Preisrechner", de: "Zoey Preisrechner" },
    tagline: { en: "Service Price Calculator", de: "Service-Preisrechner" },
    category: { en: "Web App · Calculator", de: "Web-App · Rechner" },
    description: {
      en: "Interactive service price calculator with all pricing data managed as frontend JSON configurations. Fast, lightweight, and easy to maintain — no backend required.",
      de: "Interaktiver Service-Preisrechner mit allen Preisdaten als Frontend-JSON-Konfigurationen. Schnell, leichtgewichtig und einfach zu warten — kein Backend erforderlich.",
    },
    stack: ["Next.js", "React", "TypeScript", "JSON"],
    impact: {
      en: "Instant price transparency for clients with zero backend overhead.",
      de: "Sofortige Preistransparenz für Kunden ohne Backend-Overhead.",
    },
    image: "/zoey.png", link: "https://zoey-preisrechner.vercel.app/",
  },
  {
    id: "awalon", initials: "AW", color: PALETTE[10], size: 36,
    orbitRadius: 725, orbitSpeed: 80, orbitOffset: 36,
    name: { en: "Awalon CRM", de: "Awalon CRM" },
    tagline: { en: "CRM with SharePoint Integration", de: "CRM mit SharePoint-Integration" },
    category: { en: "Web App", de: "Web-App" },
    description: {
      en: "Sophisticated CRM system for managing customer relationships, offers, and business processes. Integrates with SharePoint for seamless data management and workflow automation.",
      de: "Ausgefeiltes CRM-System zur Verwaltung von Kundenbeziehungen, Angeboten und Geschäftsprozessen. Integriert mit SharePoint für nahtloses Datenmanagement und Workflow-Automatisierung.",
    },
    stack: ["Next.js", "React", "C# .NET", "SharePoint", "TypeScript"],
    impact: {
      en: "Centralized customer, offer, and portfolio management with advanced search.",
      de: "Zentralisiertes Kunden-, Angebots- und Portfoliomanagement mit erweiterter Suche.",
    },
    image: "/awalon.png", link: null,
  },
  {
    id: "org-tool", initials: "OT", color: PALETTE[11], size: 34,
    orbitRadius: 758, orbitSpeed: 86, orbitOffset: 72,
    name: { en: "Org Tool", de: "Org Tool" },
    tagline: { en: "Company Hierarchy Visualization", de: "Unternehmenshierarchie-Visualisierung" },
    category: { en: "Web App", de: "Web-App" },
    description: {
      en: "Advanced organizational management system with interactive tree structures. Visualize and manage company hierarchies, reporting lines, and employee relationships.",
      de: "Erweitertes Organisationsmanagementsystem mit interaktiven Baumstrukturen. Unternehmenshierarchien, Berichtslinien und Mitarbeiterbeziehungen visualisieren und verwalten.",
    },
    stack: ["Angular", "TypeScript", "ASP.NET Core", "MS Graph API", "Azure Entra ID", "Azure App Services"],
    impact: {
      en: "Real-time org chart management with role-based access control.",
      de: "Echtzeit-Organigramm-Management mit rollenbasierter Zugriffskontrolle.",
    },
    image: "/orgtool.png", link: null,
  },
  {
    id: "gentle-track", initials: "GT", color: PALETTE[12], size: 32,
    orbitRadius: 788, orbitSpeed: 92, orbitOffset: 108,
    name: { en: "Gentle Track", de: "Gentle Track" },
    tagline: { en: "Project Management System", de: "Projektmanagementsystem" },
    category: { en: "Web App", de: "Web-App" },
    description: {
      en: "Modern web-based project management system for tracking projects, customers, and team collaboration. Real-time dashboards, phase management, and auto-generated tracking numbers.",
      de: "Modernes webbasiertes Projektmanagementsystem zur Verfolgung von Projekten, Kunden und Teamzusammenarbeit. Echtzeit-Dashboards, Phasenmanagement und automatisch generierte Tracking-Nummern.",
    },
    stack: ["React", "Vite", "ASP.NET Core", "MS SQL Server", "TypeScript"],
    impact: {
      en: "Full project lifecycle management with dual admin/customer views.",
      de: "Vollständiges Projektlebenszyklusmanagement mit dualen Admin/Kunden-Ansichten.",
    },
    image: "/gentletrack.png", link: "https://f7e2b27f.gentle-track-ui.pages.dev/",
  },
  {
    id: "gentle-group", initials: "GG", color: PALETTE[13], size: 30,
    orbitRadius: 815, orbitSpeed: 98, orbitOffset: 144,
    name: { en: "Gentle Group", de: "Gentle Group" },
    tagline: { en: "Modern Landing Page", de: "Moderne Landingpage" },
    category: { en: "Landing Page Website", de: "Landingpage Website" },
    description: {
      en: "High-performance Next.js landing page for Gentle Group. SSR, static generation, Framer Motion animations, Tailwind CSS, and Vercel deployment with HSTS security.",
      de: "Hochleistungs-Next.js-Landingpage für Gentle Group. SSR, statische Generierung, Framer Motion Animationen, Tailwind CSS und Vercel-Deployment mit HSTS-Sicherheit.",
    },
    stack: ["Next.js 14", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
    impact: {
      en: "Optimized Core Web Vitals with global CDN delivery.",
      de: "Optimierte Core Web Vitals mit globalem CDN-Delivery.",
    },
    image: "/gentlegroup.png", link: "https://www.gentlegroup.de/",
  },
  {
    id: "nrw-real-estate", initials: "NR", color: PALETTE[14], size: 28,
    orbitRadius: 840, orbitSpeed: 104, orbitOffset: 180,
    name: { en: "NRW Real Estate", de: "NRW Real Estate" },
    tagline: { en: "Property Listings Platform", de: "Immobilien-Listings-Plattform" },
    category: { en: "Website", de: "Website" },
    description: {
      en: "Responsive real estate platform for property listings in North Rhine-Westphalia. Advanced filtering by location, price, and size with Next.js performance.",
      de: "Responsive Immobilienplattform für Immobilienangebote in Nordrhein-Westfalen. Erweiterte Filterung nach Standort, Preis und Größe mit Next.js Performance.",
    },
    stack: ["Next.js", "React", "CSS3", "Vercel"],
    impact: {
      en: "Connects buyers with agents across NRW with intuitive property search.",
      de: "Verbindet Käufer mit Maklern in NRW mit intuitiver Immobiliensuche.",
    },
    image: "/nrw.jpg", link: "https://www.nrwrealestate.de/",
  },
  {
    id: "creative-hair", initials: "CH", color: PALETTE[15], size: 26,
    orbitRadius: 862, orbitSpeed: 110, orbitOffset: 216,
    name: { en: "Creative Hair", de: "Creative Hair" },
    tagline: { en: "Hair Salon Website", de: "Friseursalon-Website" },
    category: { en: "Website", de: "Website" },
    description: {
      en: "Elegant responsive website for a modern hair salon. Service showcase, appointment booking integration, and smooth React/Vite animations.",
      de: "Elegante responsive Website für einen modernen Friseursalon. Servicepräsentation, Terminbuchungsintegration und flüssige React/Vite-Animationen.",
    },
    stack: ["React", "Vite", "CSS3", "Vercel"],
    impact: {
      en: "Premium salon experience online with integrated booking system.",
      de: "Premium-Salon-Erlebnis online mit integriertem Buchungssystem.",
    },
    image: "/hairsalon.jpg", link: "https://creative-hairstyling-3u6e.vercel.app/",
  },
  {
    id: "gentle-access", initials: "GA", color: PALETTE[16], size: 24,
    orbitRadius: 882, orbitSpeed: 116, orbitOffset: 252,
    name: { en: "Gentle Access", de: "Gentle Access" },
    tagline: { en: "Web Accessibility Tool", de: "Web-Barrierefreiheits-Tool" },
    category: { en: "Tool App", de: "Tool-App" },
    description: {
      en: "Innovative web accessibility widget making websites barrier-free. Vision profiles, font size control, contrast mode, night mode, and blue light filter — embeddable in any site.",
      de: "Innovatives Web-Barrierefreiheits-Widget, das Websites barrierefrei macht. Sehprofile, Schriftgrößensteuerung, Kontrastmodus, Nachtmodus und Blaulichtfilter — in jede Website einbettbar.",
    },
    stack: ["React", "Vite", "CSS", "Local Storage API"],
    impact: {
      en: "WCAG compliance helper with privacy-focused local settings persistence.",
      de: "WCAG-Compliance-Helfer mit datenschutzorientierter lokaler Einstellungsspeicherung.",
    },
    image: "/gentlegroup.png", link: null,
  },
  {
    id: "ipad-management", initials: "IM", color: PALETTE[17], size: 22,
    orbitRadius: 900, orbitSpeed: 122, orbitOffset: 288,
    name: { en: "iPad Mgmt", de: "iPad Verwaltung" },
    tagline: { en: "Device Management for Schools", de: "Geräteverwaltung für Schulen" },
    category: { en: "Windows App", de: "Windows-App" },
    description: {
      en: "Windows application for Berufskolleg Hilden to manage iPad distribution to students. Loan/return tracking, damage reporting, signature capture, and MS Access database.",
      de: "Windows-Anwendung für das Berufskolleg Hilden zur Verwaltung der iPad-Verteilung an Schüler. Leih-/Rückgabeverfolgung, Schadensberichte, Unterschriftenerfassung und MS Access Datenbank.",
    },
    stack: ["C#", "Windows Forms", "MS Access"],
    impact: {
      en: "Streamlined device management reducing administrative workload for teachers.",
      de: "Optimierte Geräteverwaltung, die den Verwaltungsaufwand für Lehrer reduziert.",
    },
    image: "/ipad.jpg", link: null,
  },
  {
    id: "frankenstein", initials: "FK", color: PALETTE[0], size: 20,
    orbitRadius: 920, orbitSpeed: 128, orbitOffset: 324,
    name: { en: "Frankenstein", de: "Frankenstein" },
    tagline: { en: "Interactive Android Novel", de: "Interaktiver Android-Roman" },
    category: { en: "Android App", de: "Android-App" },
    description: {
      en: "Immersive Android app bringing Mary Shelley's Frankenstein to life. Interactive storytelling, historical context, shareable quotes, and offline reading support.",
      de: "Immersive Android-App, die Mary Shelleys Frankenstein zum Leben erweckt. Interaktives Storytelling, historischer Kontext, teilbare Zitate und Offline-Lesen.",
    },
    stack: ["Android Studio", "Java", "XML", "Adobe Illustrator"],
    impact: {
      en: "Published on Google Play with offline reading and social sharing.",
      de: "Im Google Play Store veröffentlicht mit Offline-Lesen und Social Sharing.",
    },
    image: "/frankenstein.jpg", link: "https://play.google.com/store/apps/details?id=com.certidevelopment.frankenstein",
  },
  {
    id: "monthee", initials: "MA", color: PALETTE[1], size: 20,
    orbitRadius: 938, orbitSpeed: 134, orbitOffset: 360,
    name: { en: "Monthee Adventure", de: "Monthee Adventure" },
    tagline: { en: "2D Platformer RPG", de: "2D-Plattformer-RPG" },
    category: { en: "Unity Engine", de: "Unity Engine" },
    description: {
      en: "2D platformer with RPG elements for PC and Android. Features quests, NPC interactions, leveling system, puzzle platforming, and cross-platform play.",
      de: "2D-Plattformer mit RPG-Elementen für PC und Android. Mit Quests, NPC-Interaktionen, Levelsystem, Puzzle-Platforming und plattformübergreifendem Spiel.",
    },
    stack: ["Unity", "C#", "Adobe After Effects", "Audacity"],
    impact: {
      en: "5-month solo project with full cross-platform PC and Android support.",
      de: "5-monatiges Solo-Projekt mit vollständiger plattformübergreifender PC- und Android-Unterstützung.",
    },
    image: "/monthee.jpg", link: "https://play.google.com/store/apps/details?id=com.CertiDevelopment.MontheeAdventure",
  },
  {
    id: "sweets", initials: "SW", color: PALETTE[2], size: 20,
    orbitRadius: 955, orbitSpeed: 140, orbitOffset: 36,
    name: { en: "Sweets aus aller Welt", de: "Sweets aus aller Welt" },
    tagline: { en: "International Sweets Website", de: "Internationale Süßigkeiten-Website" },
    category: { en: "Website", de: "Website" },
    description: {
      en: "Website showcasing international sweets and confectionery from around the world.",
      de: "Website, die internationale Süßigkeiten und Konfekt aus aller Welt präsentiert.",
    },
    stack: ["HTML5", "CSS3", "JavaScript"],
    impact: {
      en: "Engaging product showcase with international content.",
      de: "Ansprechende Produktpräsentation mit internationalem Inhalt.",
    },
    image: "/sweets.png", link: null,
  },
  {
    id: "employee-appraisal", initials: "EA", color: PALETTE[3], size: 20,
    orbitRadius: 970, orbitSpeed: 146, orbitOffset: 72,
    name: { en: "Employee Appraisal", de: "Mitarbeiterbeurteilung" },
    tagline: { en: "Performance Review System", de: "Leistungsbeurteilungssystem" },
    category: { en: "Web App", de: "Web-App" },
    description: {
      en: "Web application for managing employee performance appraisals and reviews.",
      de: "Webanwendung zur Verwaltung von Mitarbeiterleistungsbeurteilungen und -bewertungen.",
    },
    stack: ["React", "TypeScript", "ASP.NET Core", "SQL"],
    impact: {
      en: "Structured performance review process for enterprise teams.",
      de: "Strukturierter Leistungsbeurteilungsprozess für Unternehmensteams.",
    },
    image: "/appraisal.jpg", link: null,
  },
];

type Project = (typeof PROJECTS)[0];
const ORBIT_COUNT = 8;

const UI = {
  en: {
    chapter:   "CHAPTER_02 / PROJECT UNIVERSE",
    heading1:  "The ",
    heading2:  "Universe",
    hint:      "click any planet or card to explore",
    allLabel:  "All Projects — click to explore",
    impact:    "Impact",
    stack:     "Stack",
    visit:     "Visit Project →",
    close:     "✕",
  },
  de: {
    chapter:   "KAPITEL_02 / PROJEKTUNIVERSUM",
    heading1:  "Das ",
    heading2:  "Universum",
    hint:      "Planet oder Karte anklicken",
    allLabel:  "Alle Projekte — zum Erkunden anklicken",
    impact:    "Wirkung",
    stack:     "Stack",
    visit:     "Projekt besuchen →",
    close:     "✕",
  },
};

function OrbitingPlanet({ project, index, inView, onSelect }: {
  project: Project; index: number; inView: boolean; onSelect: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const { lang } = useLang();
  const r = project.orbitRadius;
  const duration = project.orbitSpeed;
  const startDeg = project.orbitOffset;

  return (
    <div className="absolute pointer-events-none z-20"
      style={{
        width: r * 2, height: r * 2, top: "50%", left: "50%",
        marginTop: -r, marginLeft: -r, borderRadius: "50%",
        opacity: inView ? 1 : 0, transition: "opacity 0.5s",
        transitionDelay: `${0.5 + index * 0.1}s`,
        animation: inView ? `orbit-planet-${project.id} ${duration}s linear infinite` : "none",
      }}>
      <style>{`
        @keyframes orbit-planet-${project.id} {
          from { transform: rotate(${startDeg}deg); }
          to   { transform: rotate(${startDeg + 360}deg); }
        }
      `}</style>
      <div className="pointer-events-none" style={{
        position: "absolute", top: 0, left: "50%",
        width: project.size, height: project.size,
        marginLeft: -project.size / 2, marginTop: -project.size / 2,
        animation: inView ? `counter-orbit-${project.id} ${duration}s linear infinite` : "none",
      }}>
        <style>{`
          @keyframes counter-orbit-${project.id} {
            from { transform: rotate(${-startDeg}deg); }
            to   { transform: rotate(${-(startDeg + 360)}deg); }
          }
        `}</style>
        <button type="button" onClick={() => onSelect(project)}
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          className="relative group pointer-events-auto cursor-pointer"
          style={{ width: project.size, height: project.size }}>
          <div className="w-full h-full rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: `radial-gradient(circle, ${project.color}25 0%, ${project.color}08 60%, transparent 100%)`,
              border: `1px solid ${project.color}35`,
              boxShadow: hovered ? `0 0 20px ${project.color}30` : `0 0 8px ${project.color}15`,
              transform: hovered ? "scale(1.3)" : "scale(1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}>
            <span className="font-black select-none"
              style={{ color: project.color, fontSize: project.size * 0.28, letterSpacing: "-0.02em" }}>
              {project.initials}
            </span>
          </div>
          {hovered && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap z-50">
              <div className="glass rounded-lg px-3 py-1.5 text-center">
                <p className="font-mono text-xs font-bold text-white">{project.name[lang]}</p>
                <p className="text-slate-400 text-[10px]">{project.tagline[lang]}</p>
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
  const { lang } = useLang();
  const t = UI[lang];
  const orbitProjects = PROJECTS.slice(0, ORBIT_COUNT);

  return (
    <section id="projects" ref={ref} className="snap-section min-h-screen relative overflow-hidden bg-dark-900 py-20">
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,0,0,0)_0%,rgba(11,13,17,0.85)_100%)]" />
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 37.3) % 100}%`, top: `${(i * 53.7) % 100}%`,
              width: `${(i % 3) * 0.6 + 0.4}px`, height: `${(i % 3) * 0.6 + 0.4}px`,
              opacity: 0.08 + (i % 5) * 0.06,
            }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-4">
          <p className="font-mono text-xs tracking-[0.4em] text-slate-600 uppercase mb-4">{t.chapter}</p>
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-white">{t.heading1}</span>
            <span className="gradient-text">{t.heading2}</span>
          </h2>
          <p className="text-slate-600 mt-3 text-sm font-mono">{t.hint}</p>
        </motion.div>

        {/* Orbital system */}
        <div className="relative flex items-center justify-center z-10" style={{ height: "560px" }}>
          {orbitProjects.map((p) => (
            <div key={`ring-${p.id}`} className="absolute rounded-full border border-white/[0.04] pointer-events-none z-10"
              style={{ width: p.orbitRadius * 2, height: p.orbitRadius * 2 }} />
          ))}
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }} className="absolute z-10 pointer-events-none">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(226,232,240,0.85) 0%, rgba(148,163,184,0.4) 60%, transparent 100%)",
                boxShadow: "0 0 40px rgba(226,232,240,0.15), 0 0 80px rgba(148,163,184,0.08)",
              }}>
              <span className="font-black text-dark-950 text-lg select-none">MT</span>
            </div>
            <div className="absolute -inset-4 rounded-full border border-white/[0.06] animate-pulse-slow" />
          </motion.div>
          {orbitProjects.map((project, i) => (
            <OrbitingPlanet key={project.id} project={project} index={i} inView={inView} onSelect={setSelected} />
          ))}
        </div>

        {/* All projects grid */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }} className="mt-6 relative z-30">
          <p className="font-mono text-xs text-slate-600 text-center mb-4 tracking-widest uppercase">{t.allLabel}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {PROJECTS.map((p) => (
              <button key={p.id} type="button" onClick={() => setSelected(p)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] hover:border-white/20 transition-all duration-200 text-left group hover:bg-white/[0.03] cursor-pointer">
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}35` }}>
                  <span className="font-black text-[8px]" style={{ color: p.color }}>{p.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-slate-300 group-hover:text-white transition-colors truncate">{p.name[lang]}</p>
                  <p className="text-[9px] text-slate-600 truncate">{p.category[lang]}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }} transition={{ duration: 0.3 }}
              className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              style={{ borderColor: `${selected.color}20` }}
              onClick={(e) => e.stopPropagation()}>
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl bg-dark-900">
                <Image src={selected.image} alt={selected.name[lang]} fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
                <button type="button" onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {t.close}
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ background: `${selected.color}15`, color: selected.color, border: `1px solid ${selected.color}25` }}>
                    {selected.category[lang]}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{selected.name[lang]}</h3>
                <p className="text-slate-400 text-sm mb-4" style={{ color: selected.color }}>{selected.tagline[lang]}</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{selected.description[lang]}</p>
                <div className="mb-6">
                  <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-3">{t.stack}</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.stack.map((s) => (
                      <span key={s} className="font-mono text-xs px-2 py-1 rounded"
                        style={{ background: `${selected.color}10`, color: selected.color, border: `1px solid ${selected.color}20` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-xl p-4 mb-6" style={{ borderColor: `${selected.color}15` }}>
                  <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-2">{t.impact}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{selected.impact[lang]}</p>
                </div>
                {selected.link && (
                  <a href={selected.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm transition-colors"
                    style={{ color: selected.color }}>
                    {t.visit}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

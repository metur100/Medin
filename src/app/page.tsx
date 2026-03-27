"use client";

import { useEffect, useState } from "react";
import CustomCursor from "@/components/ui/CustomCursor";
import NavBar from "@/components/ui/NavBar";
import EntryGate from "@/components/entry/EntryGate";
import IdentitySection from "@/components/identity/IdentitySection";
import ProjectUniverse from "@/components/projects/ProjectUniverse";
import SystemLog from "@/components/timeline/SystemLog";
import SkillsDNA from "@/components/skills/SkillsDNA";
import WorkflowSection from "@/components/workflow/WorkflowSection";
import ContactPortal from "@/components/contact/ContactPortal";

export default function Home() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("mt-initialized");
    if (stored) setInitialized(true);
  }, []);

  const handleInitialize = () => {
    setInitialized(true);
    sessionStorage.setItem("mt-initialized", "true");
    setTimeout(() => {
      document.getElementById("identity")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <main className="relative bg-dark-950 min-h-screen">
      <CustomCursor />
      {initialized && <NavBar />}
      <EntryGate onInitialize={handleInitialize} initialized={initialized} />
      {initialized && (
        <>
          <IdentitySection />
          <ProjectUniverse />
          <SystemLog />
          <SkillsDNA />
          <WorkflowSection />
          <ContactPortal />
        </>
      )}
    </main>
  );
}

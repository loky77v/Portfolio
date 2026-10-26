import React, { useState } from "react";
import { motion } from "motion/react";
import { Code, ShieldCheck, Wrench, Sparkles, CheckCircle2, Monitor, Users, Cpu } from "lucide-react";
import { ThemeConfig } from "../types";
import CircuitOverlay from "./CircuitOverlay";

interface SkillsProps {
  currentTheme: ThemeConfig;
}

export default function Skills({ currentTheme }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<"qa" | "dev" | "it" | "tools" | "soft">("qa");

  const skillCategories = [
    { id: "qa" as const, label: "Testing & QA", icon: ShieldCheck },
    { id: "dev" as const, label: "Programming & Web", icon: Code },
    { id: "it" as const, label: "IT Support & Systems", icon: Monitor },
    { id: "tools" as const, label: "Tools & Productivity", icon: Wrench },
    { id: "soft" as const, label: "Professional Skills", icon: Users },
  ];

  const qaSkills = [
    { name: "Manual Testing", level: 95, tagline: "Black-box, functional & exploratory system test execution" },
    { name: "Defect Identification", level: 95, tagline: "Isolating UI bugs, broken logic, and responsiveness flaws" },
    { name: "Bug Reporting", level: 95, tagline: "Written audit reports, steps to reproduce, severity classification" },
    { name: "Functional Testing", level: 92, tagline: "Verifying user flows, form validation, and core feature logic" },
    { name: "UI & Layout Validation", level: 94, tagline: "Cross-device responsiveness, typography, and element hierarchy" },
    { name: "Cross-Browser Testing", level: 90, tagline: "Compatibility checks across Chrome, Safari, and Edge" },
  ];

  const developmentSkills = [
    { name: "HTML5", level: 95, tagline: "Semantic markup, accessibility, and modern responsive structures" },
    { name: "CSS3", level: 92, tagline: "Flexbox, CSS Grid, media queries, animations, and Tailwind styling" },
    { name: "JavaScript (Basic)", level: 75, tagline: "DOM manipulation, event handling, async fetch, and interactive UI" },
    { name: "Java (Basic)", level: 70, tagline: "Core OOP fundamentals, class hierarchies, and logic syntax" },
  ];

  const itSkills = [
    { name: "IT Support Fundamentals", level: 90, tagline: "End-user support, service requests, and hardware/software basics" },
    { name: "Service Desk Fundamentals", level: 88, tagline: "Ticket triaging, user assistance, and structured troubleshooting" },
    { name: "Basic Technical Troubleshooting", level: 90, tagline: "Diagnosing connectivity, application crashes, and peripheral errors" },
    { name: "Windows 10 / 11", level: 92, tagline: "OS configuration, management console, drivers, and system utilities" },
    { name: "Hardware & Software Troubleshooting", level: 85, tagline: "Basic diagnostic workflows, patch updates, and component isolation" },
  ];

  const toolsSkills = [
    { name: "Git & GitHub", level: 90, tagline: "Version control, branching, repository management, and collaboration" },
    { name: "VS Code", level: 92, tagline: "IDE extensions, debugging, linting, and workspace configuration" },
    { name: "Microsoft Excel (Advanced)", level: 92, tagline: "Certified in advanced formulas, pivot tables, data parsing, and macros" },
    { name: "Microsoft 365 & Word", level: 90, tagline: "Documentation formatting, cloud collaboration, and office suites" },
    { name: "Prompt Engineering", level: 88, tagline: "Structured LLM prompting, research synthesis, and workflow augmentation" },
    { name: "Adobe InDesign & Canva", level: 82, tagline: "E-book layout formatting, digital marketing banners, and visual assets" },
  ];

  const professionalSkills = [
    { name: "Technical Communication", level: 95, tagline: "Communicating complex technical defects clearly to team leads" },
    { name: "Documentation", level: 95, tagline: "Detailed written test reports, bug logs, and resolution tracking" },
    { name: "Attention to Detail", level: 96, tagline: "Pixel-level precision in spotting layout shifts and UI inconsistencies" },
    { name: "Problem-Solving", level: 92, tagline: "Methodical root cause analysis from discovery to verified fix" },
    { name: "Team Collaboration", level: 94, tagline: "Thriving in 3 to 5 member project teams and cross-functional groups" },
  ];

  const getSkillsByTab = () => {
    switch (activeTab) {
      case "qa":
        return qaSkills;
      case "dev":
        return developmentSkills;
      case "it":
        return itSkills;
      case "tools":
        return toolsSkills;
      case "soft":
        return professionalSkills;
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3">
            Technical & Professional Skills
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-stone-800 dark:text-slate-300 text-xs uppercase tracking-wider font-mono mt-3">
            Verified Competencies & Applied Toolsets
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = activeTab === category.id;
            return (
              <button
                key={category.id}
                id={`tab-${category.id}`}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-stone-900 text-white dark:bg-white dark:text-stone-950 shadow-md"
                    : "bg-stone-100/90 dark:bg-slate-900/60 hover:bg-stone-200/50 dark:hover:bg-white/5 text-stone-800 dark:text-slate-300 border border-stone-300/60 dark:border-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getSkillsByTab().map((skill, index) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.02 }}
              id={`skill-card-${index}`}
              className={`p-5 rounded-2xl ${currentTheme.cardClass} relative overflow-hidden group flex flex-col justify-between`}
            >
              <CircuitOverlay />
              {/* Card top banner effect */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-sans font-bold text-sm tracking-tight text-stone-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </div>
                <p className="text-[11px] text-stone-900 dark:text-slate-200 leading-tight font-medium mb-4">
                  {skill.tagline}
                </p>
              </div>

              {/* Progress Slider Display */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-stone-800 dark:text-slate-300">Proficiency</span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 dark:bg-slate-800/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Resume Certified Competency</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

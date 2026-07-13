import React, { useState } from "react";
import { motion } from "motion/react";
import { Code, ShieldCheck, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import { ThemeConfig } from "../types";
import CircuitOverlay from "./CircuitOverlay";

interface SkillsProps {
  currentTheme: ThemeConfig;
}

export default function Skills({ currentTheme }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<"dev" | "qa" | "tools">("dev");

  const skillCategories = [
    { id: "dev" as const, label: "Development & Languages", icon: Code },
    { id: "qa" as const, label: "QA & Testing", icon: ShieldCheck },
    { id: "tools" as const, label: "Tools & Analytics", icon: Wrench },
  ];

  const developmentSkills = [
    
    { name: "JavaScript", level: 90, tagline: "Async control, DOM manipulation" },
    { name: "HTML & CSS", level: 95, tagline: "Semantic markup & Tailwind style" },
    { name: "Python", level: 75, tagline: "Scripting, algorithm implementations" },
    { name: "MySQL", level: 80, tagline: "Relational database queries" },
    { name: "PHP", level: 70, tagline: "Server-side templates" },
    { name: "Java & C", level: 75, tagline: "Core OOP fundamentals" },
  ];

  const qaSkills = [
    { name: "Manual Testing", level: 95, tagline: "Black box, exploratory testing" },
    { name: "Bug Reporting", level: 95, tagline: "Detailed bug lifecycles & logging" },
    { name: "UI/UX Testing", level: 90, tagline: "Visual audits & alignment checks" },
    { name: "Test Cases Creation", level: 90, tagline: "Structured test scripts & scenarios" },
    { name: "Functional Testing", level: 92, tagline: "Validation of system requirements" },
    { name: "Cross-browser Testing", level: 95, tagline: "Chrome, Safari, Edge alignment" },
  ];

  const toolsSkills = [
    { name: "Git & GitHub", level: 90, tagline: "Version control & repository forks" },
    { name: "Advanced Excel", level: 85, tagline: "Pivot tables, macros, data parsing" },
    { name: "SEO & Backlinks", level: 80, tagline: "Optimizing reach & page speed metrics" },
    { name: "Tableau & Power BI", level: 85, tagline: "Interactive dashboard visualizations" },
    { name: "Canva & Adobe InDesign", level: 80, tagline: "Creative banner & document designs" },
  ];

  const getSkillsByTab = () => {
    switch (activeTab) {
      case "dev":
        return developmentSkills;
      case "qa":
        return qaSkills;
      case "tools":
        return toolsSkills;
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3">
            Skills & Expertise
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-stone-800 dark:text-slate-300 text-xs uppercase tracking-wider font-mono mt-3">
            Specialized Capabilities
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <p className="text-[11px] text-stone-900 dark:text-slate-200 leading-tight font-bold mb-4">
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
                  <span>Verified Competency</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "motion/react";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { ThemeConfig, Project } from "../types";
import CircuitOverlay from "./CircuitOverlay";
// @ts-ignore
import norvexImg from "../assets/images/p1.jpg";
// @ts-ignore
import solarImg from "../assets/images/p2.jpg";

interface ProjectsProps {
  currentTheme: ThemeConfig;
}

export default function Projects({ currentTheme }: ProjectsProps) {
  // Real projects based on resume + portfolio features
  const projectsList: Project[] = [
    {
      title: "NORVEX - Intelligent Architectural System",
      description:
        "An AI-integrated architectural visualization and interior design recommendation platform. Contributed to frontend HTML/CSS layouts and supported an AI engine that generated customized design templates based on budget, dimensions, style, and regional climate. Extensively tested for UI/UX defects across viewports.",
      tags: ["HTML", "CSS", "JavaScript", "Firebase", "AI APIs"],
      imagePlaceholder: "norvex",
      imageUrl: norvexImg,
      liveUrl: "https://norvex-intelligent-architectural-sy.vercel.app/",
      githubUrl: "https://github.com/loky77v/NORVEX---Intelligent-Architectural-System-.git",
    },
    {
      title: "Vidhuth Vaahan India",
      description:
        "Independently conceptualized, designed, and launched 5 fully responsive web pages representing a modern clean-energy Hub. Engineered pixel-perfect solar assets grids, navigation transitions, and smartphone alignments using standard modular CSS structure.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Web Design"],
      imagePlaceholder: "solar",
      imageUrl: solarImg,
      liveUrl: "https://vidhyth-vaahan-india.vercel.app/",
      githubUrl: "https://github.com/loky77v/VidhythVaahanIndia.git",
    },
  ];

  const getCardBg = (type: string) => {
    switch (type) {
      case "norvex":
        return "bg-gradient-to-tr from-cyan-950/20 to-slate-900/10";
      case "solar":
        return "bg-gradient-to-tr from-amber-950/10 to-orange-900/10";
      default:
        return "bg-gradient-to-tr from-slate-900 to-slate-950";
    }
  };


  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-stone-800 dark:text-slate-300 text-xs uppercase tracking-wider font-mono mt-3">
            Web Development & QA Showcases
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projectsList.map((project, index) => (
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.01 }}
              id={`project-card-${index}`}
              className={`flex flex-col justify-between rounded-3xl overflow-hidden ${currentTheme.cardClass} relative h-full group`}
            >
              <CircuitOverlay />
              <div>
                {/* Visual Project Cover Header */}
                <div className="h-48 relative overflow-hidden border-b border-stone-200/40 dark:border-slate-800/20 group">
                  {/* Subtle dark overlay for readability and contrast */}
                  <div className="absolute inset-0 bg-slate-950/25 z-10 transition-colors duration-300 group-hover:bg-slate-950/40" />
                  
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`absolute inset-0 flex items-center justify-center ${getCardBg(project.imagePlaceholder)}`}>
                      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                    </div>
                  )}

                  {/* Tech stack accent badge overlay */}
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="text-[9px] font-mono font-extrabold tracking-widest uppercase bg-slate-950/80 backdrop-blur-md text-[#00C2A8] px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
                      {project.tags[0]} Integrated
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-mono font-bold tracking-wide uppercase text-stone-800 dark:text-slate-300">
                      Feature Project
                    </span>
                  </div>

                  <h3 className="text-lg font-sans font-bold text-stone-900 dark:text-white mb-2 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs text-stone-900 dark:text-slate-200 font-medium leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tags and CTA Actions */}
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-slate-800 text-stone-900 dark:text-slate-200 border border-stone-300 dark:border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target={project.liveUrl.startsWith("#") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold hover:bg-stone-800 dark:hover:bg-slate-100 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-800 text-stone-700 dark:text-slate-200 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

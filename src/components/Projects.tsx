import React from "react";
import { motion } from "motion/react";
import { ExternalLink, Github, Sparkles, Users, CheckCircle2 } from "lucide-react";
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
  // Real projects strictly aligned with the resume
  const projectsList: Project[] = [
    {
      title: "NORVEX – Intelligent Architectural System",
      team: "Team of 3",
      description:
        "An AI-integrated architectural visualization and interior design platform. Actively performed manual QA validation and contributed frontend styling enhancements.",
      bullets: [
        "Manually tested the application for bugs, UI issues, responsiveness, and cross-browser compatibility.",
        "Tracked identified defects and verified fixes through to verified resolution.",
        "Made frontend styling updates (HTML/CSS) to polish the platform interface.",
      ],
      tags: ["Manual QA", "Bug Tracking", "HTML/CSS", "Cross-Browser", "Team Project"],
      imagePlaceholder: "norvex",
      imageUrl: norvexImg,
      liveUrl: "https://norvex-nine.vercel.app",
      githubUrl: "https://github.com/loky77v/NORVEX---Intelligent-Architectural-System-.git",
    },
    {
      title: "Vidhyuth Vaahan India – EV and Solar Services Website",
      description:
        "A responsive multi-page web platform designed and deployed for a clean-energy solar services client.",
      bullets: [
        "Built and deployed a responsive multi-page website for a solar services client using HTML and CSS.",
        "Developed clean layouts, navigation transitions, and smartphone responsive alignments.",
        "Delivered as part of a 5-member team during DIGIWORQ internship.",
      ],
      tags: ["HTML5", "CSS3", "Responsive Web Design", "Multi-page Website", "Client Project"],
      imagePlaceholder: "solar",
      imageUrl: solarImg,
      liveUrl: "https://vidhyth-vaahan-india.vercel.app",
      githubUrl: "https://github.com/loky77v/VidhythVaahanIndia.git",
    },
  ];

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
            Web Development & QA Testing Showcases
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projectsList.map((project, index) => (
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.01 }}
              id={`project-card-${index}`}
              className={`flex flex-col justify-between rounded-3xl overflow-hidden ${currentTheme.cardClass} relative h-full group border border-white/10`}
            >
              <CircuitOverlay />
              <div>
                {/* Visual Project Cover Header */}
                <div className="h-52 relative overflow-hidden border-b border-stone-200/40 dark:border-slate-800/20 group">
                  <div className="absolute inset-0 bg-slate-950/25 z-10 transition-colors duration-300 group-hover:bg-slate-950/40" />
                  
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Team badge overlay if present */}
                  {project.team && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider uppercase bg-slate-950/80 backdrop-blur-md text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 shadow-sm">
                        <Users className="w-3 h-3" />
                        {project.team}
                      </span>
                    </div>
                  )}

                  {/* Primary Tech Badge */}
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="text-[10px] font-mono font-extrabold tracking-widest uppercase bg-slate-950/80 backdrop-blur-md text-[#00C2A8] px-3 py-1 rounded-lg border border-slate-800 shadow-sm">
                      {project.tags[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-mono font-bold tracking-wide uppercase text-stone-800 dark:text-slate-300">
                      Verified Portfolio Project
                    </span>
                  </div>

                  <h3 className="text-lg font-sans font-bold text-stone-900 dark:text-white mb-2 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs text-stone-900 dark:text-slate-200 font-medium leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Bullet points from resume */}
                  {project.bullets && (
                    <div className="space-y-2 mb-6 bg-slate-950/30 p-3.5 rounded-xl border border-white/5">
                      {project.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-[11px] text-stone-800 dark:text-slate-300 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tags and CTA Actions */}
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-1.5 mb-5">
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
                      target="_blank"
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

import React from "react";
import { motion } from "motion/react";
import { FileText, Download, Award, Languages, ShieldAlert, GraduationCap } from "lucide-react";
import { ThemeConfig } from "../types";
import CircuitOverlay from "./CircuitOverlay";

interface AboutProps {
  currentTheme: ThemeConfig;
}

export default function About({ currentTheme }: AboutProps) {
  // Resume Link requested
  const cvLink = "https://drive.google.com/file/d/1vsqqHX0RpZRyz932b63V8ggeLz2Jfgz0/view?usp=sharing";

  const metrics = [
    { label: "BCA CGPA", value: "8.15 / 10", icon: GraduationCap },
    { label: "Client Sites Tested", value: "3 - 4", icon: Award },
    { label: "Bugs Identified", value: "30+", icon: ShieldAlert },
  ];

  const languages = [
    { name: "English", prof: "Speak, Read, Write", level: 5 },
    { name: "Tamil", prof: "Speak, Read, Write", level: 5 },
    { name: "Kannada", prof: "Speak, Read, Write", level: 5 },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-stone-800 dark:text-slate-300 text-xs uppercase tracking-wider font-mono mt-3">
            Profile & Summary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual card / profile illustration */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-3xl ${currentTheme.cardClass} relative max-w-sm w-full group overflow-hidden`}
            >
              <CircuitOverlay />
              <div className="aspect-square w-full rounded-2xl overflow-hidden relative group border border-cyan-500/20 shadow-xl">

  {/* Background Image */}
  <img
    src="src/pic2.png"
    alt="V Lokeshwara"
    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

  {/* Glow */}
  <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-400/20 group-hover:ring-cyan-400/60 transition-all duration-500" />

  {/* Content */}
  <div className="absolute bottom-0 left-0 right-0 z-10 p-6">

    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-[10px] font-semibold tracking-widest">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      AVAILABLE
    </span>

    <h3 className="mt-4 text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
      V Lokeshwara
    </h3>

    <p className="mt-1 text-cyan-300 font-mono text-sm tracking-wide">
      Web Developer & QA Professional
    </p>

    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-cyan-400/20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>

      <span className="text-sm text-white">
        Coxtown, Bangalore, India
      </span>
    </div>

  </div>

</div>

              {/* Languages section inside Card */}
              <div className="mt-6 space-y-3.5 border-t border-stone-200/50 dark:border-slate-800/50 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-slate-300 flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5" /> Languages Spoken
                </h4>
                <div className="space-y-2">
                  {languages.map((lang) => (
                     <div key={lang.name} className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-800 dark:text-slate-200">{lang.name}</span>
                      <span className="text-[10px] font-mono text-stone-800 dark:text-slate-300 font-medium">{lang.prof}</span>
                     </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed summary and CV download */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl md:text-2xl font-sans font-bold text-stone-900 dark:text-white">
              Symmetric Expertise in Web Development & Identifying Bugs
            </h3>

            <p className="text-sm text-stone-900 dark:text-slate-200 font-medium leading-relaxed">
              I am a Bachelor of Computer Applications (BCA) undergraduate with a strong academic foundation (8.15 CGPA) and hands-on professional expertise in frontend web development and manual QA testing.
            </p>

            <p className="text-sm text-stone-900 dark:text-slate-200 font-medium leading-relaxed">
              During my internships and projects, I have designed and built responsive web pages using HTML and CSS, ensuring complete cross-device compatibility. On the testing side, I've successfully audited multiple client applications, diagnosing over 30 UI/UX flaws and functional errors, documenting them in detailed reports, and optimizing search engine visibility.
            </p>

            {/* Quick Metrics display */}
            <div className="grid grid-cols-3 gap-4 py-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className={`p-3.5 rounded-2xl ${currentTheme.cardClass} text-center flex flex-col items-center justify-center group relative overflow-hidden hover:scale-105 transition-transform duration-300`}
                  >
                    <CircuitOverlay />
                    <Icon className="w-5 h-5 text-emerald-500 mb-2 z-10" />
                    <span className="text-lg md:text-xl font-bold text-stone-900 dark:text-white z-10">{metric.value}</span>
                    <span className="text-[10px] text-stone-950 dark:text-slate-200 mt-1 uppercase font-mono font-extrabold tracking-wider z-10">
                      {metric.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA: Download CV */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={cvLink}
                target="_blank"
                rel="noopener noreferrer"
                id="download-resume-btn"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                View & Download Resume
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

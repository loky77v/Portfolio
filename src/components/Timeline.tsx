import React, { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2, BookOpen } from "lucide-react";
import { ThemeConfig, Experience, Education, Certification } from "../types";
import CircuitOverlay from "./CircuitOverlay";

interface TimelineProps {
  currentTheme: ThemeConfig;
}

export default function Timeline({ currentTheme }: TimelineProps) {
  const [filter, setFilter] = useState<"all" | "exp" | "edu">("all");

  const experiences: Experience[] = [
    {
      role: "Web Development & Digital Marketing Intern",
      company: "DIGIWORQ Digital Marketing & Technology Solutions",
      location: "Bengaluru, India",
      duration: "01/2026 - 02/2026",
      highlights: [
        "Designed and built 5 responsive web pages for Vidhuth Vaahan solar services using HTML & CSS.",
        "Tested 3-4 client websites, reporting 30+ visual and functional defects via detailed audit sheets.",
        "Boosted search visibility using on-page SEO keywords, structure tagging, and backlink submissions.",
        "Resolved formatting gaps across 12 product e-books with Adobe InDesign and created banners using Canva.",
      ],
      type: "experience",
    },
  ];

  const educations: Education[] = [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "RBANM's First Grade College",
      cgpa: "8.15 / 10.00",
      duration: "Completed 07/2026",
      type: "education",
    },
    {
      degree: "PCMB (Pre-University College)",
      school: "RBANM's Pre-University College",
      duration: "Completed 03/2023",
      type: "education",
    },
    {
      degree: "SSLC (Secondary School Leaving Certificate)",
      school: "M.E.G High School, Bangalore",
      duration: "Completed 07/2021",
      type: "education",
    },
  ];

  const certifications: Certification[] = [
    { name: "AI Fluency: Framework & Foundations", issuer: "Anthropic" },
    { name: "Claude 101", issuer: "Anthropic" },
    { name: "Advanced Excel Masterclass", issuer: "Caddnest" },
    { name: "Tableau Data Visualization", issuer: "Caddnest" },
    { name: "Power BI Data Analysis", issuer: "Caddnest" },
  ];

  const getFilteredItems = () => {
    const combined = [
      ...experiences.map((e) => ({ ...e, sortDate: 2026.1 })),
      ...educations.map((ed, idx) => ({ ...ed, sortDate: 2026 - idx * 2 })),
    ];

    if (filter === "exp") return combined.filter((i) => "highlights" in i);
    if (filter === "edu") return combined.filter((i) => !("highlights" in i));
    return combined;
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3">
            Experience & Education
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-stone-800 dark:text-slate-300 text-xs uppercase tracking-wider font-mono mt-3">
            My Professional Path
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {(["all", "exp", "edu"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filter === t
                  ? "bg-stone-800 text-white dark:bg-slate-200 dark:text-stone-900 shadow"
                  : "bg-stone-100 dark:bg-slate-800/60 text-stone-600 dark:text-slate-300 hover:bg-stone-200/50"
              }`}
            >
              {t === "all" ? "Show All" : t === "exp" ? "Experience" : "Education"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Timeline - Left Column */}
          <div className="lg:col-span-8 relative">
            {/* Visual Axis Line */}
            <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-stone-200 dark:bg-slate-800/80" />

            <div className="space-y-10">
              {getFilteredItems().map((item, idx) => {
                const isExp = "highlights" in item;
                const Icon = isExp ? Briefcase : GraduationCap;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative pl-14 flex flex-col group"
                  >
                    {/* Node Icon on Axis */}
                    <div className="absolute left-3.5 top-1.5 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 flex items-center justify-center z-10 shadow-sm transition-transform group-hover:scale-110">
                      <Icon className="w-3 h-3 text-emerald-500" />
                    </div>

                    {/* Content Box */}
                    <div
                      className={`p-6 rounded-3xl ${currentTheme.cardClass} relative w-full group overflow-hidden`}
                    >
                      <CircuitOverlay />
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/15">
                          {isExp ? "Professional Internship" : "Academic Education"}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-800 dark:text-slate-300 font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-sans font-extrabold text-stone-900 dark:text-white tracking-tight">
                        {isExp ? (item as Experience).role : (item as Education).degree}
                      </h3>

                      <h4 className="text-xs font-bold text-stone-900 dark:text-slate-200 mt-1 flex items-center gap-1">
                        {isExp ? (item as Experience).company : (item as Education).school}
                      </h4>

                      {/* Optional location/cgpa info */}
                      {"location" in item && (
                        <div className="flex items-center gap-1 text-[10px] text-stone-900 dark:text-slate-300 mt-2 font-mono font-bold">
                          <MapPin className="w-3 h-3" />
                          <span>{(item as Experience).location}</span>
                        </div>
                      )}

                      {"cgpa" in item && (item as Education).cgpa && (
                        <div className="mt-3.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-800 dark:text-emerald-400 font-sans inline-flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="font-extrabold">CGPA: {(item as Education).cgpa}</span>
                        </div>
                      )}

                      {/* Internship highlights if experience */}
                      {isExp && (item as Experience).highlights && (
                        <ul className="mt-4 space-y-2.5 border-t border-stone-200/50 dark:border-slate-800/40 pt-4">
                          {(item as Experience).highlights.map((hl, hlIdx) => (
                            <li
                              key={hlIdx}
                              className="text-xs text-stone-900 dark:text-slate-200 font-medium leading-relaxed flex items-start gap-2.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Certifications & Publications - Right Column */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 lg:h-fit">
            {/* Certifications Card */}
            <div
              className={`p-6 rounded-3xl ${currentTheme.cardClass} group relative overflow-hidden`}
            >
              <CircuitOverlay />
              <div className="flex items-center gap-2.5 border-b border-stone-200/50 dark:border-slate-800/50 pb-4 mb-5">
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-stone-800 dark:text-slate-200">
                  Certifications
                </h3>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.name}
                    className="p-3.5 rounded-2xl bg-stone-100/90 dark:bg-slate-900/70 border border-stone-200 dark:border-slate-800/40 flex flex-col gap-1 hover:border-amber-500/30 transition-colors"
                  >
                    <span className="text-xs font-bold text-stone-900 dark:text-white leading-tight">
                      {cert.name}
                    </span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-900 dark:text-slate-200 font-bold mt-1">
                      <span>{cert.issuer}</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-sans font-medium uppercase tracking-wide">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications Card  */}
            <div
              className={`p-6 rounded-3xl ${currentTheme.cardClass} group relative overflow-hidden`}
            >
              <CircuitOverlay />
              <div className="flex items-center gap-2.5 border-b border-stone-200/50 dark:border-slate-800/50 pb-4 mb-5">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-stone-800 dark:text-slate-200">
                  Publications
                </h3>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-100/90 dark:bg-slate-900/70 border border-stone-200 dark:border-slate-800/40 flex flex-col gap-1.5">
                <span className="text-xs font-bold text-stone-900 dark:text-white leading-snug">
                  "Artificial Intelligence in Communication Systems"
                </span>
                <p className="text-[11px] text-stone-950 dark:text-slate-100 leading-relaxed font-bold">
                  Co-authored research paper presented at the International Conference on Intelligent Communication Technologies (IICT). Analyzed routing and communication optimizations.
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-900 dark:text-slate-200 font-bold mt-1">
                  <span>Presented at IICT</span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[9px] font-sans font-medium uppercase tracking-wide">
                    Co-authored
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

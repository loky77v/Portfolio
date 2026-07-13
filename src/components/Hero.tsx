import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Code, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { ThemeConfig } from "../types";

interface HeroProps {
  currentTheme: ThemeConfig;
}

export default function Hero({ currentTheme }: HeroProps) {
  // Define colors based on selected theme
  const getAccentGlow = () => {
    return "from-slate-800/40 to-slate-900/20";
  };

  const getSubtext = () => {
    return "text-slate-400";
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background abstract ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr ${getAccentGlow()} blur-[100px] animate-pulse`}
          style={{ animationDuration: "12s" }}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br ${getAccentGlow()} blur-[120px] animate-pulse`}
          style={{ animationDuration: "16s" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
        {/* Top Mini-Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-400/30 shadow-sm mb-6 animate-pulse-subtle"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
            Open to Web Developer, QA Tester and Other IT Roles
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] bg-gradient-to-r from-stone-950 via-stone-800 to-black dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-4"
        >
          V Lokeshwara
        </motion.h1>

        {/* Animated Subtitle / Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          <span className={`text-lg md:text-2xl font-semibold tracking-wide ${getSubtext()}`}>
            Web Developer
          </span>
          <span className="hidden sm:inline text-stone-300 dark:text-slate-700 font-light text-xl">|</span>
          <span className="text-lg md:text-2xl font-semibold tracking-wide text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 inline" /> QA Tester
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-stone-900 dark:text-slate-200 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed mb-10"
        >
          Crafting pristine, secure, and fully responsive user interfaces on the frontend while enforcing solid, bulletproof QA protocols. Focused on bridging creative pixel perfection with robust technical execution.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Projects
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-stone-300 dark:border-slate-800 hover:bg-black/5 dark:hover:bg-white/5 text-stone-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all duration-300"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact Me
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 dark:text-slate-400">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-stone-400 dark:text-slate-400" />
        </motion.div>
      </div>
    </section>
  );
}

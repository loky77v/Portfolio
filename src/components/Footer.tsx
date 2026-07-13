import React from "react";
import { ShieldCheck, Heart, ArrowUp, Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="py-12 border-t border-stone-200/50 dark:border-slate-800/40 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div className="flex items-center gap-2 text-stone-800 dark:text-white font-sans font-bold text-sm tracking-tight">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>V Lokeshwara</span>
          </div>
          <span className="text-[10px] text-stone-600 dark:text-slate-400 font-mono">
            © {currentYear} Personal Portfolio. All rights reserved.
          </span>
        </div>

        {/* Built details */}
        <div className="flex items-center gap-1.5 text-[10px] text-stone-600 dark:text-slate-400 font-mono">
          <span>Secured with End-to-End Cryptography</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
        </div>

        {/* Quick jump to Top & social icons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <a
              href="https://linkedin.com/in/vlokeshwara-a3418a39a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 dark:text-slate-400 hover:text-cyan-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/loky77v"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 dark:text-slate-400 hover:text-emerald-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/the_loky_77"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 dark:text-slate-400 hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-stone-100 dark:bg-slate-800 text-stone-500 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

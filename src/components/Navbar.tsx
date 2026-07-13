import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield, Code, User, Terminal, FolderOpen, Mail, GraduationCap } from "lucide-react";
import { ThemeConfig } from "../types";

interface NavbarProps {
  currentTheme: ThemeConfig;
}

export default function Navbar({ currentTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Spy logic
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 120; // offset for the navbar

      // bottom of page check
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection("contact");
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once to initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home", icon: Terminal, id: "home" },
    { label: "About", href: "#about", icon: User, id: "about" },
    { label: "Skills", href: "#skills", icon: Code, id: "skills" },
    { label: "Projects", href: "#projects", icon: FolderOpen, id: "projects" },
    { label: "Experience", href: "#experience", icon: GraduationCap, id: "experience" },
    { label: "Contact", href: "#contact", icon: Mail, id: "contact" },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/75 dark:bg-[#0b0c10]/75 backdrop-blur-md shadow-md border-b border-white/10 dark:border-slate-800/20"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-sm shadow-cyan-500/20">
            <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-sans font-extrabold text-lg tracking-tight text-[#00C2A8]">
            Lokeshwara
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-[#00C2A8] border border-emerald-500/20 uppercase tracking-widest hidden sm:inline-block">
            QA & Dev
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                style={isActive ? { color: currentTheme.primaryColor } : {}}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all duration-300 border ${
                  isActive
                    ? "bg-black/[0.03] dark:bg-white/10 shadow-sm border-stone-200/50 dark:border-slate-800/50"
                    : "text-stone-900 dark:text-slate-200 border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "opacity-100 animate-pulse" : "opacity-70"}`} style={isActive ? { color: currentTheme.primaryColor } : {}} />
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-black/5 dark:bg-white/5 md:hidden hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-[#0c0d12]/98 border-b border-stone-200/50 dark:border-slate-800/50 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={isActive ? { color: currentTheme.primaryColor } : {}}
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm font-extrabold transition-colors border ${
                      isActive
                        ? "bg-black/[0.03] dark:bg-white/10 border-stone-200/50 dark:border-slate-800/50 shadow-inner"
                        : "text-stone-900 dark:text-slate-200 border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" style={isActive ? { color: currentTheme.primaryColor } : {}} />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

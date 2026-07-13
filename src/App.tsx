/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { THEMES, ThemeConfig } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HexagonBackground from "./components/HexagonBackground";

export default function App() {
  const [currentTheme] = useState<ThemeConfig>(THEMES[0]);

  return (
    <div
      id="portfolio-root-wrapper"
      className={`min-h-screen font-sans antialiased transition-colors duration-500 relative select-text ${
        currentTheme.bgClass
      } ${currentTheme.textClass} ${currentTheme.isDark ? "dark" : ""}`}
    >
      {/* Dynamic Hexagon Honeycomb Net Background */}
      <HexagonBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Decorative Grid Overlay for premium feel */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.02] pointer-events-none" />

        {/* Header / Navbar */}
        <Navbar currentTheme={currentTheme} />

        {/* Hero Landing */}
        <Hero currentTheme={currentTheme} />

        {/* Main Sections */}
        <main id="main-content" className="relative">
          <About currentTheme={currentTheme} />
          <Skills currentTheme={currentTheme} />
          <Projects currentTheme={currentTheme} />
          <Timeline currentTheme={currentTheme} />
          <Contact currentTheme={currentTheme} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

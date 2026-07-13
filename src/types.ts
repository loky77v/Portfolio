/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imagePlaceholder: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  highlights: string[];
  type: "experience";
}

export interface Education {
  degree: string;
  school: string;
  cgpa?: string;
  duration: string;
  type: "education";
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export type ThemeId = "charcoal";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  isDark: boolean;
  className: string;
  primaryColor: string; // Theme indicator accent color
  bgClass: string;
  textClass: string;
  cardClass: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: "charcoal",
    name: "Sophisticated Dark",
    isDark: true,
    className: "theme-dark",
    primaryColor: "#00C2A8", // Aqua Green Accent
    bgClass: "bg-gradient-to-br from-[#0B0F19] via-[#121B2E] to-[#1E1B38] text-[#F1F5F9] animate-gradient-bg",
    textClass: "text-[#F1F5F9]",
    cardClass: "bg-slate-950/30 backdrop-blur-xl border border-white/[0.08] hover:border-[#00C2A8]/40 shadow-2xl shadow-black/30 transition-all duration-300",
  }
];

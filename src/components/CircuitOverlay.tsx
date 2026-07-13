import React from "react";

interface CircuitOverlayProps {
  className?: string;
  active?: boolean;
}

export default function CircuitOverlay({ className = "", active = false }: CircuitOverlayProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] ${className}`}>
      {/* Subtle border that glows on group hover */}
      <div className="absolute inset-0 border border-emerald-500/10 dark:border-emerald-400/5 group-hover:border-emerald-500/30 transition-all duration-500 rounded-[inherit]" />

      {/* Cyberpunk corner brackets */}
      {/* Top Left Corner */}
      <svg
        className="absolute top-0 left-0 w-12 h-12 text-emerald-500/20 dark:text-emerald-400/10 group-hover:text-emerald-400 transition-colors duration-500"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M2 12V2h10l8 8h12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="32"
          cy="10"
          r="2"
          className="fill-current"
        />
        <path
          d="M2 24v-6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Top Right Corner */}
      <svg
        className="absolute top-0 right-0 w-12 h-12 text-emerald-500/20 dark:text-emerald-400/10 group-hover:text-emerald-400 transition-colors duration-500"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M46 12V2H36l-8 8H16"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="16"
          cy="10"
          r="2"
          className="fill-current"
        />
        <path
          d="M46 24v-6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom Left Corner */}
      <svg
        className="absolute bottom-0 left-0 w-12 h-12 text-emerald-500/20 dark:text-emerald-400/10 group-hover:text-emerald-400 transition-colors duration-500"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M2 36v10h10l8-8h16"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="34"
          cy="38"
          r="2"
          className="fill-current"
        />
        <path
          d="M2 24v6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom Right Corner */}
      <svg
        className="absolute bottom-0 right-0 w-12 h-12 text-emerald-500/20 dark:text-emerald-400/10 group-hover:text-emerald-400 transition-colors duration-500"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M46 36v10H36l-8-8H12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="38"
          r="2"
          className="fill-current"
        />
        <path
          d="M46 24v6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Dynamic tech-grid background light effect */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/0 via-transparent to-transparent group-hover:from-emerald-500/[0.02] transition-all duration-700 pointer-events-none rounded-[inherit]" />
    </div>
  );
}

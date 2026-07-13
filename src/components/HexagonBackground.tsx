import React, { useEffect, useRef } from "react";

interface Hexagon {
  col: number;
  row: number;
  cx: number;
  cy: number;
  baseAlpha: number;
  pulseOffset: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
}

interface HexPhoton {
  col: number;
  row: number;
  fromVertex: number;
  toVertex: number;
  progress: number;
  speed: number;
  color: string;
}

export default function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Emerald/Teal themed color specifications
    const emeraldColor = "16, 185, 129"; // #10B981 (Emerald Green)
    const primaryAccent = "0, 194, 168"; // #00C2A8 (Aqua Emerald)
    const secondaryAccent = "52, 211, 153"; // #34D399 (Light Emerald)

    // Grid sizing
    const r = 45; // Hexagon radius
    const hexW = r * Math.sqrt(3);
    const hexH = r * 2;
    const colSpacing = hexW;
    const rowSpacing = r * 1.5;

    // Mouse interactive coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    // Arrays for dynamic elements
    let hexagons: Hexagon[] = [];
    let ripples: Ripple[] = [];
    let photons: HexPhoton[] = [];

    // Helper to calculate center coordinates for a hexagon column/row
    const getHexCenter = (col: number, row: number) => {
      const cx = col * colSpacing + (row % 2 === 0 ? 0 : colSpacing / 2);
      const cy = row * rowSpacing;
      return { cx, cy };
    };

    // Generate hexagon list to cover the full viewport
    const initializeGrid = () => {
      hexagons = [];
      const cols = Math.ceil(width / colSpacing) + 2;
      const rows = Math.ceil(height / rowSpacing) + 2;

      for (let rIdx = -1; rIdx < rows; rIdx++) {
        for (let cIdx = -1; cIdx < cols; cIdx++) {
          const { cx, cy } = getHexCenter(cIdx, rIdx);
          hexagons.push({
            col: cIdx,
            row: rIdx,
            cx,
            cy,
            baseAlpha: 0.03 + Math.random() * 0.05, // Subtle base visibility
            pulseOffset: Math.random() * Math.PI * 2,
          });
        }
      }

      // Generate a few glowing photons crawling along edges
      photons = [];
      for (let i = 0; i < 15; i++) {
        const randHex = hexagons[Math.floor(Math.random() * hexagons.length)];
        const startVertex = Math.floor(Math.random() * 6);
        photons.push({
          col: randHex.col,
          row: randHex.row,
          fromVertex: startVertex,
          toVertex: (startVertex + 1) % 6,
          progress: Math.random(),
          speed: 0.01 + Math.random() * 0.015,
          color: Math.random() > 0.4 ? primaryAccent : secondaryAccent,
        });
      }
    };

    initializeGrid();

    // Spawn a wave ripple
    const spawnRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.6,
        speed: 3.5 + Math.random() * 2,
        alpha: 0.6,
      });
      // Cap max ripples to keep drawing efficient
      if (ripples.length > 5) {
        ripples.shift();
      }
    };

    // Periodically spawn random background ambient scan waves
    let lastRippleTime = 0;
    const ambientRippleInterval = 5000; // every 5 seconds

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleMouseClick = (e: MouseEvent) => {
      spawnRipple(e.clientX, e.clientY);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initializeGrid();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("resize", handleResize);

    // Get coordinates for a specific vertex index of a hexagon
    const getVertexCoord = (cx: number, cy: number, index: number) => {
      const angle = (Math.PI / 3) * index - Math.PI / 6; // Flat-topped hexagon
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
      };
    };

    let time = 0;

    // Animation Loop
    const render = () => {
      time += 0.015;
      
      // Clean background with very high transparency for nice motion blur trailing
      ctx.fillStyle = "rgba(11, 15, 25, 0.12)";
      ctx.fillRect(0, 0, width, height);

      // Periodic ambient ripple
      const now = Date.now();
      if (now - lastRippleTime > ambientRippleInterval) {
        spawnRipple(Math.random() * width, Math.random() * height);
        lastRippleTime = now;
      }

      // 1. Update and cleanup ripples
      ripples.forEach((rip, idx) => {
        rip.radius += rip.speed;
        rip.alpha = 1 - rip.radius / rip.maxRadius;
        if (rip.radius >= rip.maxRadius) {
          ripples.splice(idx, 1);
        }
      });

      // 2. Draw static & dynamic hexagon connections
      hexagons.forEach((hex) => {
        const { cx, cy, baseAlpha, pulseOffset } = hex;

        // Wave factor based on active ripples
        let rippleGlow = 0;
        ripples.forEach((rip) => {
          const dx = cx - rip.x;
          const dy = cy - rip.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const distFromWavefront = Math.abs(dist - rip.radius);
          
          if (distFromWavefront < 120) {
            const factor = 1 - distFromWavefront / 120;
            rippleGlow += factor * rip.alpha * 0.45;
          }
        });

        // Proximity highlight from mouse pointer
        let mouseIntensity = 0;
        if (mouse.x > -500) {
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            mouseIntensity = (1 - dist / mouse.radius) * 0.35;
          }
        }

        // Ambient breathing pulse
        const pulse = Math.sin(time + pulseOffset) * 0.02;

        // Calculate final line opacity
        const alpha = Math.max(0.01, baseAlpha + pulse + rippleGlow + mouseIntensity);

        // Draw hexagon edges
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const pt = getVertexCoord(cx, cy, i);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();

        // High-tech glow styled outline
        if (rippleGlow > 0.15 || mouseIntensity > 0.15) {
          ctx.strokeStyle = `rgba(${primaryAccent}, ${alpha * 1.5})`;
          ctx.lineWidth = rippleGlow > 0.2 ? 1.5 : 1.0;
        } else {
          ctx.strokeStyle = `rgba(${emeraldColor}, ${alpha})`;
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();

        // Draw vertices nodes that are highly active
        if (rippleGlow > 0.25 || mouseIntensity > 0.25) {
          ctx.fillStyle = `rgba(${secondaryAccent}, ${Math.min(1, (rippleGlow + mouseIntensity) * 1.5)})`;
          for (let i = 0; i < 6; i++) {
            const pt = getVertexCoord(cx, cy, i);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 3. Update & Draw the glowing crawling Photons
      photons.forEach((photon) => {
        // Increment progress along current edge
        photon.progress += photon.speed;
        
        if (photon.progress >= 1.0) {
          photon.progress = 0;
          photon.fromVertex = photon.toVertex;
          
          // Randomly decide whether to continue along this same hexagon,
          // or branch out to a neighboring hexagon vertex path!
          if (Math.random() > 0.6) {
            // Traverse in the same hex circular direction or inverse
            photon.toVertex = Math.random() > 0.5 
              ? (photon.fromVertex + 1) % 6 
              : (photon.fromVertex - 1 + 6) % 6;
          } else {
            // Jump to a randomized nearby vertex direction
            photon.toVertex = (photon.fromVertex + (Math.random() > 0.5 ? 1 : 5)) % 6;
          }
        }

        const { cx, cy } = getHexCenter(photon.col, photon.row);
        const p1 = getVertexCoord(cx, cy, photon.fromVertex);
        const p2 = getVertexCoord(cx, cy, photon.toVertex);

        // Interpolated position
        const currentX = p1.x + (p2.x - p1.x) * photon.progress;
        const currentY = p1.y + (p2.y - p1.y) * photon.progress;

        // Draw crawling photon light
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${photon.color}, 0.85)`;
        ctx.shadowColor = `rgba(${photon.color}, 0.9)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset canvas shadows for general performance
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup listeners
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="dynamic-hexagon-net-background"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#0B0F19]"
    />
  );
}

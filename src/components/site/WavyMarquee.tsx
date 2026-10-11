import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WavyMarqueeProps {
  speed?: number; // pixels per second
  className?: string;
  reverse?: boolean;
}

const MARQUEE_SEGMENTS = [
  { text: "TECH FUSION CLUB", highlight: false },
  { text: "SRMU", highlight: true },
  { text: "320+ MEMBERS", highlight: false },
  { text: "500+ EVENTS", highlight: false },
  { text: "800+ WORKSHOPS", highlight: false },
];

/**
 * WavyRibbonMarquee — Sleek, compact curved ribbon marquee.
 * Scaled cleanly for low-profile vertical footprint with crisp typography.
 */
export function WavyMarquee({ speed = 46, className, reverse = false }: WavyMarqueeProps) {
  const textPathRef = useRef<SVGTextPathElement>(null);
  const singleUnitRef = useRef<SVGTSpanElement>(null);
  const offsetRef = useRef(0);
  const [unitWidth, setUnitWidth] = useState(0);
  const [viewBoxWidth, setViewBoxWidth] = useState(1000);

  // Responsive viewBox width to ensure marquee is prominent on mobile devices
  useEffect(() => {
    const handleResize = () => {
      setViewBoxWidth(window.innerWidth < 640 ? 460 : 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // SVG coordinate dimensions
  // Wave parameters: baseline y = 50, amplitude = 14, period = 480px
  // Extends from x = -480 to x = 2400 (covers all screen resolutions)
  const y0 = 50;
  const a = 14;
  const ribbonHalfHeight = 22;

  // Center wave path for text
  let centerPath = `M -480 ${y0} Q -360 ${y0 - a}, -240 ${y0}`;
  for (let x = 0; x <= 2400; x += 240) {
    centerPath += ` T ${x} ${y0}`;
  }

  // Top border path
  const yTop = y0 - ribbonHalfHeight;
  let topPath = `M -480 ${yTop} Q -360 ${yTop - a}, -240 ${yTop}`;
  for (let x = 0; x <= 2400; x += 240) {
    topPath += ` T ${x} ${yTop}`;
  }

  // Bottom border path
  const yBottom = y0 + ribbonHalfHeight;
  let bottomPath = `M -480 ${yBottom} Q -360 ${yBottom - a}, -240 ${yBottom}`;
  for (let x = 0; x <= 2400; x += 240) {
    bottomPath += ` T ${x} ${yBottom}`;
  }

  // Measure single unit width after mount
  useEffect(() => {
    if (singleUnitRef.current) {
      try {
        const measured = singleUnitRef.current.getComputedTextLength();
        if (measured > 0) {
          setUnitWidth(measured);
        }
      } catch {
        setUnitWidth(620);
      }
    }
  }, []);

  // Animation loop with requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (unitWidth > 0 && textPathRef.current) {
        const direction = reverse ? 1 : -1;
        const currentSpeed = speed;
        offsetRef.current += direction * currentSpeed * deltaTime;

        // Seamless wrap-around modulo arithmetic
        if (offsetRef.current <= -unitWidth) {
          offsetRef.current += unitWidth;
        } else if (offsetRef.current >= 0 && reverse) {
          offsetRef.current -= unitWidth;
        }

        textPathRef.current.setAttribute("startOffset", `${offsetRef.current}px`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, reverse, unitWidth]);

  // Repeat sequence 6 times to ensure no gap across any screen width
  const repeatCount = 6;
  const pathId = "wavy-ribbon-text-path";

  return (
    <div className={cn("relative w-full overflow-hidden select-none py-1 sm:py-2", className)}>
      {/* Edge gradient fade masks for smooth transition */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent" />

      <svg
        viewBox={`0 0 ${viewBoxWidth} 100`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-22 sm:h-24 md:h-28 overflow-visible drop-shadow-sm"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Tech Fusion Club statistics and highlights marquee ribbon"
      >
        <defs>
          {/* Wave path definitions */}
          <path id={pathId} d={centerPath} fill="none" />

          {/* Ribbon Fill Gradient - slightly lighter and softer */}
          <linearGradient
            id="ribbonFillGradient"
            x1="0"
            y1="0"
            x2={viewBoxWidth}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--primary, #ea580c)" stopOpacity="0.07" />
            <stop offset="25%" stopColor="var(--primary, #ea580c)" stopOpacity="0.14" />
            <stop offset="50%" stopColor="var(--primary, #ea580c)" stopOpacity="0.09" />
            <stop offset="75%" stopColor="var(--primary, #ea580c)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--primary, #ea580c)" stopOpacity="0.07" />
          </linearGradient>

          {/* Ribbon Border Glow Gradient - softer and subtle */}
          <linearGradient
            id="ribbonBorderGradient"
            x1="0"
            y1="0"
            x2={viewBoxWidth}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--primary, #ea580c)" stopOpacity="0.16" />
            <stop offset="30%" stopColor="var(--primary, #ea580c)" stopOpacity="0.40" />
            <stop offset="70%" stopColor="var(--primary, #ea580c)" stopOpacity="0.40" />
            <stop offset="100%" stopColor="var(--primary, #ea580c)" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        {/* 1. Ribbon Background Body (wide smooth stroke) */}
        <path
          d={centerPath}
          fill="none"
          stroke="url(#ribbonFillGradient)"
          strokeWidth="44"
          strokeLinecap="round"
          className="transition-colors duration-300"
        />

        {/* 2. Top Border Line */}
        <path
          d={topPath}
          fill="none"
          stroke="url(#ribbonBorderGradient)"
          strokeWidth="1"
          className="opacity-60 dark:opacity-75"
        />

        {/* 3. Bottom Border Line */}
        <path
          d={bottomPath}
          fill="none"
          stroke="url(#ribbonBorderGradient)"
          strokeWidth="1"
          className="opacity-60 dark:opacity-75"
        />

        {/* 4. Text Path Marquee */}
        <text
          dominantBaseline="central"
          style={{
            fontSize: "15px",
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <textPath
            ref={textPathRef}
            href={`#${pathId}`}
            startOffset="0px"
            method="align"
            spacing="auto"
          >
            {/* Measured first unit */}
            <tspan ref={singleUnitRef}>
              {MARQUEE_SEGMENTS.map((seg, idx) => (
                <tspan key={`u0-${idx}`}>
                  <tspan
                    className={cn(
                      "transition-colors",
                      seg.highlight
                        ? "fill-primary font-black drop-shadow-[0_0_8px_rgba(234,88,12,0.5)]"
                        : "fill-foreground font-black",
                    )}
                  >
                    {seg.text}
                  </tspan>
                  <tspan className="fill-primary font-black" style={{ fontSize: "13px" }}>
                    {"   ✦   "}
                  </tspan>
                </tspan>
              ))}
            </tspan>

            {/* Repeated units for continuous infinite loop */}
            {Array.from({ length: repeatCount - 1 }).map((_, rIdx) => (
              <tspan key={`r-${rIdx}`}>
                {MARQUEE_SEGMENTS.map((seg, idx) => (
                  <tspan key={`u${rIdx + 1}-${idx}`}>
                    <tspan
                      className={cn(
                        "transition-colors",
                        seg.highlight
                          ? "fill-primary font-black drop-shadow-[0_0_8px_rgba(234,88,12,0.5)]"
                          : "fill-foreground font-black",
                      )}
                    >
                      {seg.text}
                    </tspan>
                    <tspan className="fill-primary font-black" style={{ fontSize: "13px" }}>
                      {"   ✦   "}
                    </tspan>
                  </tspan>
                ))}
              </tspan>
            ))}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

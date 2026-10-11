import { cn } from "@/lib/utils";

interface StayAheadSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * StayAheadSection — Compact, modern community highlight card.
 * Minimalist, elegant layout matching user requirements:
 * - Bubble pill removed
 * - CTA button removed
 * - Slimmer, compact card height
 * - Supports both WebP and PNG uploaded image
 */
export function StayAheadSection({
  title = "Stay Ahead with Tech Fusion",
  subtitle = "Discover the latest tools, connect with a global community, and shape the future of technology with us.",
  className,
}: StayAheadSectionProps) {
  return (
    <section className={cn("w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-6", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.4rem] border border-border/70 bg-card/85 dark:bg-card/40 p-6 sm:p-8 lg:p-10 shadow-md backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
          {/* Subtle ambient glow behind card */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
            {/* Left Content Column (Mobile: Centered, Desktop: Left-aligned) */}
            <div className="text-center lg:col-span-7 lg:text-left">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-[1.2] text-balance">
                {title}
              </h2>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty max-w-xl mx-auto lg:mx-0">
                {subtitle}
              </p>
            </div>

            {/* Right Image Column (Mobile: Stacked bottom, Desktop: Right-aligned) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none overflow-hidden rounded-2xl sm:rounded-3xl border border-border/60 bg-surface/40 shadow-sm">
                <picture>
                  <source srcSet="/images/branding/stay-ahead.webp" type="image/webp" />
                  <img
                    src="/images/branding/stay-ahead.png"
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="size-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

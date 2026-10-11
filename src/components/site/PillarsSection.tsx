import { GlowCard } from "@/components/site/GlowCard";
import { FileText, Code2, Users, Palette } from "lucide-react";

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "Documentation",
    subtitle: "Records, Proposals & Governance",
    description:
      "Handles all official paperwork, event proposals, administrative approvals, event reports, and structured communications to keep the club accountable and organized.",
    tags: ["Event Reports", "Proposals", "Official Records", "Formal Letters"],
    icon: <FileText className="size-6 text-primary-glow" />,
  },
  {
    number: "02",
    title: "Technical",
    subtitle: "Engineering, Development & Build",
    description:
      "The core engineering wing powering full-stack web platforms, hackathon prep, open-source projects, and hands-on developer workshops across engineering domains.",
    tags: ["Web & App Dev", "Hackathons", "Hands-on Labs", "Open Source"],
    icon: <Code2 className="size-6 text-cyan-400" />,
  },
  {
    number: "03",
    title: "Management",
    subtitle: "Operations, Logistics & Event Execution",
    description:
      "Drives the entire operational engine: stage coordination, venue logistics, scheduling, crowd management, and multi-team synchronization during flagship fests.",
    tags: ["Event Ops", "Logistics", "Stage Direction", "Coordination"],
    icon: <Users className="size-6 text-emerald-400" />,
  },
  {
    number: "04",
    title: "Creativity",
    subtitle: "UI/UX, Media & Visual Brand Identity",
    description:
      "Crafts compelling promotional posters, social media banners, event teasers, stage backdrops, motion graphics, and futuristic UI/UX designs that give TFC its identity.",
    tags: ["UI/UX Design", "Graphic Design", "Motion Media", "Brand Identity"],
    icon: <Palette className="size-6 text-accent" />,
  },
];

export function PillarsSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {pillars.map((p) => (
        <GlowCard className="glass lift group rounded-2xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="rounded-xl border border-border bg-surface-strong p-3">{p.icon}</div>
            </div>

            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary-glow transition-colors">
              {p.title}
            </h3>

            <p className="font-mono text-xs text-primary-glow mt-1 font-semibold">{p.subtitle}</p>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-border/40 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/70 bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </GlowCard>
      ))}
    </div>
  );
}

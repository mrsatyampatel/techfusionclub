import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAlumni } from "@/lib/db";
import type { Alumnus } from "@/data/alumni";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { CTABanner } from "@/components/site/CTABanner";
import { Github, Linkedin } from "lucide-react";
import { GlowCard } from "@/components/site/GlowCard";
import { SEO_CONFIG, generateBreadcrumbSchema } from "@/data/seo";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Network | Tech Fusion Club (TFC) Shri Ramswaroop Memorial University (SRMU)" },
      {
        name: "description",
        content:
          "Explore the alumni network of Tech Fusion Club (TFC) at Shri Ramswaroop Memorial University (SRMU), Lucknow. Past leaders and engineers working across global technology companies.",
      },
      {
        name: "keywords",
        content:
          "Tech fusion club alumni, TFC SRMU alumni, SRMU engineering alumni, Shri Ramswaroop Memorial University graduates, past tech fusion leads, software engineers Lucknow",
      },
      { property: "og:title", content: "Alumni Network | Tech Fusion Club (TFC) SRMU" },
      {
        property: "og:description",
        content:
          "Explore the distinguished alumni network of Tech Fusion Club at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
      },
      { property: "og:url", content: `${SEO_CONFIG.siteUrl}/alumni` },
      { name: "twitter:title", content: "Alumni Network | Tech Fusion Club (TFC) SRMU" },
      {
        name: "twitter:description",
        content:
          "Distinguished alumni of Tech Fusion Club (TFC) at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
      },
    ],
    links: [{ rel: "canonical", href: `${SEO_CONFIG.siteUrl}/alumni` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          generateBreadcrumbSchema([{ name: "Alumni Network", path: "/alumni" }])
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Tech Fusion Club (TFC) SRMU Alumni Network",
          description:
            "Distinguished graduates and past leads of Tech Fusion Club at Shri Ramswaroop Memorial University.",
          url: `${SEO_CONFIG.siteUrl}/alumni`,
        }),
      },
    ],
  }),
  component: Alumni,
});

function AlumniCard({ alumnus, index }: { alumnus: Alumnus; index: number }) {
  return (
    <GlowCard className="glass lift group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-square overflow-hidden bg-surface">
        {alumnus.photo ? (
          <img
            src={alumnus.photo}
            alt={alumnus.name}
            loading={index < 8 ? "eager" : "lazy"}
            className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex size-full items-center justify-center font-display text-4xl text-muted-foreground/30">
            {(alumnus.name || "A").charAt(0).toUpperCase()}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              {alumnus.name || "Alumnus"}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary-glow">
              {alumnus.post || "Past Member"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <ul className="space-y-1.5 font-mono text-xs text-muted-foreground">
          <li>
            <span className="text-foreground/40">Course:</span> {alumnus.course || "SRMU"}
          </li>
          <li>
            <span className="text-foreground/40">Tenure:</span> {alumnus.tenure || "Alumni"}
          </li>
        </ul>
        {alumnus.socials && (
          <div className="mt-6 flex items-center gap-3">
            {alumnus.socials.linkedin && alumnus.socials.linkedin !== "#" && (
              <a
                href={alumnus.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary-glow"
              >
                <Linkedin className="size-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            {alumnus.socials.github && alumnus.socials.github !== "#" && (
              <a
                href={alumnus.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="size-4" />
                <span className="sr-only">GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>
    </GlowCard>
  );
}

function Alumni() {
  const [alumniList, setAlumniList] = useState<Alumnus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlumni().then((data) => {
      setAlumniList(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Section className="pb-8">
        <Reveal>
          <p className="eyebrow">TFC Alumni</p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            The foundation we stand on.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Meet the past members who paved the way. From general secretaries to core members, these
            are the individuals who shaped Tech Fusion Club.
          </p>
        </Reveal>
      </Section>

      <Section className="py-10 sm:py-12">
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground animate-pulse">Loading alumni...</p>
          </div>
        ) : alumniList.length > 0 ? (
          <ul className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {alumniList.map((member, i) => (
              <li key={member.id}>
                <Reveal delay={(i % 4) * 50}>
                  <AlumniCard alumnus={member} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="glass hero-gradient rounded-[2rem] p-12 text-center border border-border">
            <h2 className="font-display text-2xl font-bold mb-2">Alumni network coming soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Past members and leaders will be listed here once added by the admin team.
            </p>
          </Reveal>
        )}
      </Section>

      <CTABanner
        eyebrow="Continue the legacy"
        title="Leave your mark on the club."
        body="Join us today and be part of the next generation of Tech Fusion leaders."
      />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { MemberTier } from "@/data/members";
import { tierMeta } from "@/data/members";
import { getMembers } from "@/lib/db";
import type { Member } from "@/data/members";
import { MemberCard } from "@/components/site/MemberCard";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { CTABanner } from "@/components/site/CTABanner";
import { SEO_CONFIG, generateBreadcrumbSchema } from "@/data/seo";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Core Team & Leadership | Tech Fusion Club (TFC) SRMU Lucknow" },
      {
        name: "description",
        content:
          "Meet the student leaders, executive council, and faculty advisory board of Tech Fusion Club (TFC) at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
      },
      {
        name: "keywords",
        content:
          "Tech fusion club team, TFC SRMU members, SRMU club leads, tech fusion council, Er. Abhishek Kumar Saxena, student technical committee Lucknow, SRMU engineering heads",
      },
      { property: "og:title", content: "Core Team & Leadership | Tech Fusion Club (TFC) SRMU" },
      {
        property: "og:description",
        content:
          "Meet the core student leaders and faculty coordinators of Tech Fusion Club at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
      },
      { property: "og:url", content: `${SEO_CONFIG.siteUrl}/members` },
      { name: "twitter:title", content: "Core Team | Tech Fusion Club (TFC) SRMU" },
      {
        name: "twitter:description",
        content:
          "Student leaders and executive council of Tech Fusion Club at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
      },
    ],
    links: [{ rel: "canonical", href: `${SEO_CONFIG.siteUrl}/members` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          generateBreadcrumbSchema([{ name: "Core Team & Council", path: "/members" }])
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Tech Fusion Club (TFC) SRMU Core Team",
          description:
            "Student council, domain leads, and faculty coordinators running Tech Fusion Club at Shri Ramswaroop Memorial University.",
          url: `${SEO_CONFIG.siteUrl}/members`,
        }),
      },
    ],
  }),
  component: Team,
});

const tierOrder: { tier: MemberTier; size: "lg" | "md" | "sm"; cols: string }[] = [
  { tier: "faculty", size: "sm", cols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" },
  { tier: "gsec", size: "sm", cols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" },
  { tier: "jsec", size: "sm", cols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" },
  { tier: "head", size: "sm", cols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" },
  { tier: "core", size: "sm", cols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" },
];

function Team() {
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMembers().then((data) => {
      setAllMembers(data);
      setLoading(false);
    });
  }, []);

  const membersByTier = (tier: MemberTier) => allMembers.filter((m) => m.tier === tier);

  if (loading) {
    return (
      <Section className="pb-8">
        <div className="flex h-[400px] items-center justify-center">
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </Section>
    );
  }

  if (allMembers.length === 0) {
    return (
      <>
        <Section className="pb-8">
          <Reveal>
            <p className="eyebrow">The Leadership & Team</p>
            <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              The hierarchy powering Tech Fusion Club.
            </h1>
          </Reveal>
        </Section>
        <Section>
          <Reveal className="glass hero-gradient rounded-[2rem] p-12 text-center border border-border">
            <h2 className="font-display text-2xl font-bold mb-2">Team roster coming soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our core team members will appear here once they are added by the admin.
            </p>
          </Reveal>
        </Section>
      </>
    );
  }

  return (
    <>
      <Section className="pb-8">
        <Reveal>
          <p className="eyebrow">The Leadership & Team</p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            The hierarchy powering Tech Fusion Club.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Tap or click any card to flip it and reveal that member's official access badge —
            course, role, bio, and social links.
          </p>
        </Reveal>
      </Section>

      {tierOrder.map(({ tier, size, cols }) => {
        const people = membersByTier(tier);
        if (people.length === 0) return null;
        return (
          <Section key={tier} className="py-10 sm:py-12">
            <Reveal className="flex flex-col gap-2 border-b border-border/70 pb-5">
              <p className="font-display text-2xl font-bold text-foreground">
                {tierMeta[tier]?.label || tier}
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {tierMeta[tier]?.description || ""}
              </p>
            </Reveal>
            {(() => {
              const isEsports = (m: (typeof people)[0]) => {
                return m?.club === "Esports";
              };

              const departmentOrder = [
                "Treasurer",
                "Documentation",
                "Technical",
                "Management",
                "Creative",
                "Media",
              ];

              const getDeptIndex = (m: (typeof people)[0]) => {
                const d = String(m?.designation || "");
                const idx = departmentOrder.findIndex((dept) => d.includes(dept));
                return idx === -1 ? 999 : idx;
              };

              const tfcMembers = people
                .filter((m) => !isEsports(m))
                .sort((a, b) => getDeptIndex(a) - getDeptIndex(b));

              const esportsMembers = people
                .filter((m) => isEsports(m))
                .sort((a, b) => getDeptIndex(a) - getDeptIndex(b));

              return (
                <div className="mt-8 grid gap-12">
                  {tfcMembers.length > 0 && (
                    <div className="space-y-5">
                      <h3 className="font-display text-lg font-semibold tracking-wide text-primary">
                        Tech Fusion Club
                      </h3>
                      <ul className={`grid gap-5 ${cols}`}>
                        {tfcMembers.map((m, i) => (
                          <li key={m.id}>
                            <MemberCard member={m} size={size} index={i} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {esportsMembers.length > 0 && (
                    <div className="space-y-5">
                      <h3 className="font-display text-lg font-semibold tracking-wide text-primary">
                        TFC Esports Club
                      </h3>
                      <ul className={`grid gap-5 ${cols}`}>
                        {esportsMembers.map((m, i) => (
                          <li key={m.id}>
                            <MemberCard member={m} size={size} index={i} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })()}
          </Section>
        );
      })}

      <CTABanner
        eyebrow="Join the roster"
        title="Your badge could be on this page next semester."
        body="Applications open twice a year. Pick a domain, meet your mentor, and start shipping."
      />
    </>
  );
}

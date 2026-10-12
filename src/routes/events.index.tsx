import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { eventCategories, type EventCategory } from "@/data/events";
import { getEvents } from "@/lib/db";
import { EventCard, FilterPill } from "@/components/site/EventCard";
import { EventModal } from "@/components/site/EventModal";
import type { ClubEvent } from "@/data/events";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { CTABanner } from "@/components/site/CTABanner";
import { SEO_CONFIG, generateBreadcrumbSchema } from "@/data/seo";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "SRMU Events & Hackathons | Tech Fusion Club (TFC) Lucknow" },
      {
        name: "description",
        content:
          "Official technical workshops, national hackathons, coding competitions, and Viveka fest by Tech Fusion Club (TFC) at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
      },
      {
        name: "keywords",
        content:
          "SRMU EVENT, SRMU events, TFC SRMU events, Viveka SRMU, Viveka fest, Viveka The Intelligence, Ramswaroop Club events, SRMU hackathon, coding competitions lucknow, tech workshops SRMU, Lucknow university events",
      },
      { property: "og:title", content: "SRMU Events, Hackathons & Viveka Fest | Tech Fusion Club" },
      {
        property: "og:description",
        content:
          "Join workshops, hackathons, and the Viveka fest by Tech Fusion Club (TFC) at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
      },
      { property: "og:url", content: `${SEO_CONFIG.siteUrl}/events` },
      { name: "twitter:title", content: "SRMU Events & Hackathons | Tech Fusion Club (TFC)" },
      {
        name: "twitter:description",
        content:
          "Official tech events, engineering hackathons, and Viveka fest at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
      },
    ],
    links: [{ rel: "canonical", href: `${SEO_CONFIG.siteUrl}/events` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          generateBreadcrumbSchema([{ name: "Events & Hackathons", path: "/events" }])
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "SRMU Tech Events & Hackathons - Tech Fusion Club",
          description:
            "Directory of tech fests, coding hackathons, webinars, and hands-on workshops organized by Tech Fusion Club at Shri Ramswaroop Memorial University (SRMU).",
          url: `${SEO_CONFIG.siteUrl}/events`,
          publisher: {
            "@type": "Organization",
            name: "Tech Fusion Club (TFC) SRMU",
            url: SEO_CONFIG.siteUrl,
          },
        }),
      },
    ],
  }),
  component: Events,
});

const upcomingYears = [2027];

function Events() {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [year, setYear] = useState<number | "all">("all");
  const [category, setCategory] = useState<EventCategory | "all">("all");
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getEvents().then((data) => setEvents(data));
    }
  }, []);

  const getEventYear = (e: ClubEvent) => {
    if (typeof e.year === "number" && !isNaN(e.year)) return e.year;
    if (e.date) {
      const parsed = new Date(e.date).getFullYear();
      if (!isNaN(parsed)) return parsed;
    }
    return new Date().getFullYear();
  };

  const eventYears = useMemo(
    () => Array.from(new Set(events.map(getEventYear))).sort((a, b) => b - a),
    [events],
  );

  const filtered = useMemo(
    () =>
      events
        .filter((e) => (year === "all" ? true : getEventYear(e) === year))
        .filter((e) => (category === "all" ? true : e.category === category))
        .sort((a, b) => {
          const timeB = b.date ? +new Date(b.date) : 0;
          const timeA = a.date ? +new Date(a.date) : 0;
          return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
        }),
    [events, year, category],
  );

  const isFutureYear = year !== "all" && upcomingYears.includes(year);

  return (
    <>
      <Section className="pb-8">
        <Reveal>
          <p className="eyebrow">Events</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Everything we've run, and what's next.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {events.length} events across {eventYears.length} years — all open to students from any
            department, most of them free.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-6">
        <Reveal className="glass flex flex-col gap-5 rounded-2xl p-5 sm:p-6">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Year
            </p>
            <div className="flex flex-wrap gap-2">
              <FilterPill active={year === "all"} onClick={() => setYear("all")}>
                All years
              </FilterPill>
              {Array.from(new Set([...upcomingYears, ...eventYears])).map((y) => (
                <FilterPill key={y} active={year === y} onClick={() => setYear(y)}>
                  {y}
                </FilterPill>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              <FilterPill active={category === "all"} onClick={() => setCategory("all")}>
                All types
              </FilterPill>
              {eventCategories.map((c) => (
                <FilterPill key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </FilterPill>
              ))}
            </div>
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e, i) => (
              <Reveal as="li" key={e.slug} delay={(i % 3) * 70}>
                <EventCard
                  event={e as ClubEvent}
                  index={i}
                  onClick={() => setSelectedEvent(e as ClubEvent)}
                />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="glass-strong hero-gradient mt-10 rounded-[2rem] p-10 text-center sm:p-16">
            <p className="eyebrow">{isFutureYear ? `${year} calendar` : "No matches"}</p>
            <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
              {isFutureYear ? "Coming soon" : "Nothing here yet"}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {isFutureYear
                ? "The calendar for this year is still being planned. Announcements go out on our socials and to members first."
                : "Try a different year or category — or clear the filters to see everything."}
            </p>
          </Reveal>
        )}
      </Section>

      <CTABanner
        eyebrow="Stay in the loop"
        title="Members hear about events first."
        body="Applications open twice a year. Join to get event invites, mentor access, and project teams."
      />

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}

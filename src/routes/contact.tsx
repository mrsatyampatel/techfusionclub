import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { Mail, MapPin } from "lucide-react";
import { club } from "@/data/club";
import { SEO_CONFIG, generateBreadcrumbSchema } from "@/data/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tech Fusion Club (TFC) | SRMU Lucknow Campus" },
      {
        name: "description",
        content:
          "Contact Tech Fusion Club (TFC) at Shri Ramswaroop Memorial University (SRMU), Deva Road, Lucknow, Uttar Pradesh. Reach out for event inquiries, Viveka fest sponsorships, and tech partnerships.",
      },
      {
        name: "keywords",
        content:
          "Contact TFC, Contact Tech Fusion Club, SRMU contact, Shri Ramswaroop Memorial University address, TFC email, Viveka sponsorship, SRMU clubs Lucknow",
      },
      { property: "og:title", content: "Contact Tech Fusion Club (TFC) | SRMU Lucknow" },
      {
        property: "og:description",
        content:
          "Reach out to Tech Fusion Club at Shri Ramswaroop Memorial University (SRMU) for event partnerships, workshops, and Viveka fest.",
      },
      { property: "og:url", content: `${SEO_CONFIG.siteUrl}/contact` },
      { name: "twitter:title", content: "Contact Tech Fusion Club (TFC) SRMU" },
      {
        name: "twitter:description",
        content:
          "Official contact channel for Tech Fusion Club at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
      },
    ],
    links: [{ rel: "canonical", href: `${SEO_CONFIG.siteUrl}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          generateBreadcrumbSchema([{ name: "Contact", path: "/contact" }])
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Tech Fusion Club (TFC) SRMU",
          description:
            "Get in touch with Tech Fusion Club at Shri Ramswaroop Memorial University (SRMU), Lucknow.",
          url: `${SEO_CONFIG.siteUrl}/contact`,
          mainEntity: {
            "@type": "EducationalOrganization",
            name: "Tech Fusion Club (TFC) SRMU",
            email: SEO_CONFIG.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: SEO_CONFIG.university.address.streetAddress,
              addressLocality: SEO_CONFIG.university.address.addressLocality,
              addressRegion: SEO_CONFIG.university.address.addressRegion,
              postalCode: SEO_CONFIG.university.address.postalCode,
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: SEO_CONFIG.university.geo.latitude,
              longitude: SEO_CONFIG.university.geo.longitude,
            },
          },
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Section className="pb-20">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          Get in touch with us.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Reach out for event inquiries, partnerships, or any questions about the club.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-16">
        <Reveal delay={100} className="glass rounded-[2rem] p-10 border border-border">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 mb-8">
            <Mail className="size-6 text-primary-glow" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">Email Us</h2>
          <p className="text-muted-foreground mb-8">
            The official contact channel for Tech Fusion Club at Shri Ramswaroop Memorial
            University.
          </p>

          <a
            href={`mailto:${club.email}?subject=Inquiry:%20Tech%20Fusion%20Club&body=Hi%20TFC%20Team,%0A%0A`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground hover:scale-[1.02] transition-transform w-full sm:w-auto"
          >
            Email TFC
          </a>
          <p className="mt-4 font-mono text-sm text-primary-glow font-bold">{club.email}</p>
        </Reveal>

        <Reveal delay={200} className="glass rounded-[2rem] p-10 border border-border">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 mb-8">
            <MapPin className="size-6 text-primary-glow" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">Visit Us</h2>
          <p className="text-muted-foreground mb-8">
            Shri Ramswaroop Memorial University (SRMU)
            <br />
            B1 Block, 3rd Floor, Room 310-A
          </p>

          <div className="h-[200px] w-full rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.486870729398!2d81.0978324!3d26.952407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39995f0b269e340f%3A0x3202aba43761750e!2sTech%20Fusion%20Club%20-%20Only%20Technical%20Club%20of%20SRMU!5e1!3m2!1sen!2sin!4v1787226040908!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Tech Fusion Club Location"
            ></iframe>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

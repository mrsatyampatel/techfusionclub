/**
 * Unified SEO, AEO (Answer Engine Optimization), and GEO (Generative & Geo-Local SEO) Engine
 * Targets dominance for SRMU, TFC, Tech Fusion Club, Viveka, and Lucknow University/Colleges.
 */

export const SEO_CONFIG = {
  siteName: "Tech Fusion Club (TFC) | Official Technical Club of SRMU",
  siteShortName: "TFC SRMU",
  siteUrl: "https://techfusionclub.vercel.app",
  ogImage: "https://techfusionclub.vercel.app/images/branding/og-preview.jpg",
  logoUrl: "https://techfusionclub.vercel.app/images/branding/techfusionlogo.webp",
  logoLightSm: "https://techfusionclub.vercel.app/images/branding/techfusionlogolight-sm.webp",
  email: "techfusionclub@srmu.ac.in",
  facultyAdvisor: {
    name: "Er. Abhishek Kumar Saxena",
    designation: "Assistant Director, IQAC & Head Technical Society, SRMU",
    email: "abhishek.saxena@srmu.ac.in",
  },
  university: {
    name: "Shri Ramswaroop Memorial University",
    alternateName: "SRMU",
    shortName: "SRMU Lucknow",
    url: "https://srmu.ac.in",
    address: {
      streetAddress: "Deva Road, Village Hadaha, Post Daryabad",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "225003",
      addressCountry: "IN",
    },
    geo: {
      latitude: "26.9745",
      longitude: "81.1072",
    },
  },
  socials: {
    instagram: "https://www.instagram.com/techfusionclub_srmu/",
    linkedin: "https://www.linkedin.com/in/techfusion-club/",
  },
  masterKeywords: [
    // Direct University & Club Queries
    "SRMU",
    "TFC SRMU",
    "TFC",
    "Tech fusion club",
    "Tech fusion",
    "srmu club",
    "CLUB SRMU",
    "SRMU EVENT",
    "Ramswaroop Club",
    "TFC Ramswaroop",
    "CLUB Lucknow",
    "Lucknow collage",
    "Lucknow college",
    "lucknow university",
    "Shri ramswaroop memorial university",
    "SRMU Lucknow",
    "SRMU tech club",
    "SRMU technical club",
    "Tech Fusion Club SRMU",
    "Shri Ramswaroop Memorial University tech club",
    "SRMU CS club",
    "SRMU coding club",
    "SRMU student council",
    "SRMU technical society",
    // Flagship Fest & Events
    "Viveka",
    "Viveka SRMU",
    "Viveka fest",
    "Viveka The Intelligence",
    "SRMU hackathon",
    "SRMU coding competition",
    "SRMU tech fest 2026",
    "SRMU national tech fest",
    // Leadership & Coordination
    "Er. Abhishek Kumar Saxena SRMU",
    "Head Technical Society SRMU",
    // Geo-Local & Domain Searches
    "coding club lucknow",
    "technical clubs in lucknow colleges",
    "best tech club in lucknow university",
    "engineering clubs in uttar pradesh",
    "web development club lucknow",
    "AI ML club SRMU",
    "student developer community SRMU",
  ],
} as const;

/**
 * Universal Geo Metadata Tags for Local SEO & Generative AI location resolution
 */
export const GEO_META_TAGS = [
  { name: "geo.region", content: "IN-UP" },
  { name: "geo.placename", content: "Lucknow, Barabanki, Uttar Pradesh, India" },
  { name: "geo.position", content: "26.9745;81.1072" },
  { name: "ICBM", content: "26.9745, 81.1072" },
  { name: "city", content: "Lucknow" },
  { name: "country", content: "India" },
  { name: "DC.title", content: "Tech Fusion Club (TFC) | Shri Ramswaroop Memorial University (SRMU)" },
  { name: "DC.creator", content: "Tech Fusion Club (TFC) SRMU" },
  { name: "DC.publisher", content: "Tech Fusion Club SRMU" },
  { name: "DC.language", content: "en-IN" },
] as const;

/**
 * Root Schema.org Graph linking University, Technical Club, and Website with SearchAction.
 * Highly cited by ChatGPT, Perplexity, Gemini, and Google Knowledge Graph.
 */
export function generateGlobalSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "@id": `${SEO_CONFIG.university.url}#university`,
        name: SEO_CONFIG.university.name,
        alternateName: [
          SEO_CONFIG.university.alternateName,
          "SRMU Lucknow",
          "Ramswaroop University",
          "Shri Ramswaroop Memorial University Lucknow",
        ],
        url: SEO_CONFIG.university.url,
        logo: SEO_CONFIG.logoUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: SEO_CONFIG.university.address.streetAddress,
          addressLocality: SEO_CONFIG.university.address.addressLocality,
          addressRegion: SEO_CONFIG.university.address.addressRegion,
          postalCode: SEO_CONFIG.university.address.postalCode,
          addressCountry: SEO_CONFIG.university.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SEO_CONFIG.university.geo.latitude,
          longitude: SEO_CONFIG.university.geo.longitude,
        },
        sameAs: [
          "https://en.wikipedia.org/wiki/Shri_Ramswaroop_Memorial_University",
          "https://www.facebook.com/srmuofficial/",
          "https://www.instagram.com/srmuofficial/",
          "https://www.linkedin.com/school/srmuofficial/",
        ],
      },
      {
        "@type": ["EducationalOrganization", "Organization"],
        "@id": `${SEO_CONFIG.siteUrl}/#organization`,
        name: "Tech Fusion Club",
        alternateName: [
          "TFC",
          "TFC SRMU",
          "Tech Fusion Club SRMU",
          "CLUB SRMU",
          "Ramswaroop Club",
          "TFC Ramswaroop",
          "SRMU Club",
          "SRMU Tech Club",
        ],
        url: SEO_CONFIG.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: SEO_CONFIG.logoUrl,
          width: "512",
          height: "512",
        },
        image: SEO_CONFIG.ogImage,
        description:
          "Official premier student-led technical club of Shri Ramswaroop Memorial University (SRMU), Lucknow. Organizers of the flagship national tech fest Viveka, engineering hackathons, coding workshops, and student tech culture.",
        foundingDate: "2019",
        parentOrganization: {
          "@id": `${SEO_CONFIG.university.url}#university`,
        },
        employee: [
          {
            "@type": "Person",
            name: SEO_CONFIG.facultyAdvisor.name,
            jobTitle: SEO_CONFIG.facultyAdvisor.designation,
            email: SEO_CONFIG.facultyAdvisor.email,
          },
        ],
        email: SEO_CONFIG.email,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-5248-262637",
          contactType: "technical society student affairs",
          email: SEO_CONFIG.email,
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: SEO_CONFIG.university.address.streetAddress,
          addressLocality: SEO_CONFIG.university.address.addressLocality,
          addressRegion: SEO_CONFIG.university.address.addressRegion,
          postalCode: SEO_CONFIG.university.address.postalCode,
          addressCountry: SEO_CONFIG.university.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SEO_CONFIG.university.geo.latitude,
          longitude: SEO_CONFIG.university.geo.longitude,
        },
        hasMap: "https://maps.google.com/?q=Shri+Ramswaroop+Memorial+University+Deva+Road+Lucknow",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Uttar Pradesh",
        },
        knowsAbout: [
          "Web Development",
          "Full Stack Software Engineering",
          "Artificial Intelligence & Machine Learning",
          "Cybersecurity & Ethical Hacking",
          "Mobile App Development",
          "Cloud Computing & DevOps",
          "National Level Hackathons",
          "Open Source Contributions",
          "Competitive Coding & Algorithms",
          "Viveka National Tech Fest",
        ],
        sameAs: [
          SEO_CONFIG.socials.instagram,
          SEO_CONFIG.socials.linkedin,
        ],
        keywords: SEO_CONFIG.masterKeywords.join(", "),
      },
      {
        "@type": "WebSite",
        "@id": `${SEO_CONFIG.siteUrl}/#website`,
        url: SEO_CONFIG.siteUrl,
        name: "Tech Fusion Club (TFC) SRMU",
        alternateName: ["TFC SRMU Portal", "Tech Fusion Club Website"],
        publisher: {
          "@id": `${SEO_CONFIG.siteUrl}/#organization`,
        },
        inLanguage: "en-IN",
        description:
          "Official website of Tech Fusion Club (TFC) at Shri Ramswaroop Memorial University (SRMU). Explore events, hackathons, team members, alumni network, and Viveka tech fest.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SEO_CONFIG.siteUrl}/events?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".speakable-summary", ".speakable-faq"],
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SEO_CONFIG.siteUrl}/#sitenavigation`,
        name: "Site Navigation",
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: "Home",
            description: "Main portal of Tech Fusion Club at SRMU",
            url: `${SEO_CONFIG.siteUrl}/`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "About TFC & SRMU",
            description: "Club history, institutional profile, and tech domains",
            url: `${SEO_CONFIG.siteUrl}/about`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 3,
            name: "Events & Hackathons",
            description: "Workshops, coding bootcamps, and Viveka annual fest",
            url: `${SEO_CONFIG.siteUrl}/events`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 4,
            name: "Core Team & Council",
            description: "Executive council leads and student domain mentors",
            url: `${SEO_CONFIG.siteUrl}/members`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 5,
            name: "Alumni Network",
            description: "Distinguished club graduates across top tech firms",
            url: `${SEO_CONFIG.siteUrl}/alumni`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 6,
            name: "Event Gallery",
            description: "Photos from hackathons, workshops, and tech sessions",
            url: `${SEO_CONFIG.siteUrl}/gallery`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 7,
            name: "Contact",
            description: "Get in touch for event sponsorships, partnerships, and inquiries",
            url: `${SEO_CONFIG.siteUrl}/contact`,
          },
        ],
      },
    ],
  };
}

/**
 * BreadcrumbList Schema generator for Google SERP breadcrumb display
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SEO_CONFIG.siteUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${SEO_CONFIG.siteUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
      })),
    ],
  };
}

/**
 * FAQPage Schema generator for Google FAQ Rich Snippets and Answer Engines (AEO)
 */
export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Events ItemList Schema for Google Event Carousels
 */
export function generateEventsSchema(
  events: Array<{
    name: string;
    description: string;
    date?: string;
    venue?: string;
    category?: string;
    url?: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tech Fusion Club Events & Hackathons at SRMU",
    description:
      "List of upcoming and past technical events, hackathons, workshops, and Viveka fest organized by Tech Fusion Club at Shri Ramswaroop Memorial University.",
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.name,
        description: event.description,
        startDate: event.date || "2026-11-01T10:00:00+05:30",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: event.venue || "SRMU Campus, Lucknow",
          address: {
            "@type": "PostalAddress",
            streetAddress: SEO_CONFIG.university.address.streetAddress,
            addressLocality: SEO_CONFIG.university.address.addressLocality,
            addressRegion: SEO_CONFIG.university.address.addressRegion,
            postalCode: SEO_CONFIG.university.address.postalCode,
            addressCountry: "IN",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "Tech Fusion Club (TFC) SRMU",
          url: SEO_CONFIG.siteUrl,
        },
      },
    })),
  };
}

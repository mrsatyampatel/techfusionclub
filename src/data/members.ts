export type MemberTier = "faculty" | "gsec" | "jsec" | "head" | "core";

export type Member = {
  id: string;
  name: string;
  designation: string;
  tier: MemberTier;
  course: string;
  bio: string;
  photo: string;
  club?: "TFC" | "Esports";
  socials: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    portfolio?: string;
  };
};

export const tierMeta: Record<MemberTier, { label: string; description: string }> = {
  faculty: {
    label: "Faculty Coordinators",
    description: "Departmental oversight, institutional support, and university guidance.",
  },
  gsec: {
    label: "General Secretaries",
    description:
      "Overall leadership accountable for the club's direction, vision, and campus operations.",
  },
  jsec: {
    label: "Joint Secretaries",
    description: "Coordinating inter-departmental logistics, outreach, and internal mentorship.",
  },
  head: {
    label: "Department Heads",
    description:
      "Heads leading Technical, Documentation, Media, Creative, Management, and Treasury.",
  },
  core: {
    label: "Core Teams",
    description:
      "Core members driving Technical, Documentation, Media, Creative, and Management execution.",
  },
};

/**
 * Members data is dynamically managed via Firestore.
 * Fallback static list initialized as empty array.
 */
export const members: Member[] = [];

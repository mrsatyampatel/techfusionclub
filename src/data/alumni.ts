export type Alumnus = {
  id: string;
  name: string;
  course: string;
  tenure: string;
  post: string;
  photo?: string;
  socials?: {
    linkedin?: string;
    github?: string;
  };
};

/**
 * Alumni data is dynamically managed via Firestore.
 * Fallback static list initialized as empty array.
 */
export const alumniList: Alumnus[] = [];

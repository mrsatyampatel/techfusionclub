export type GalleryPhoto = {
  src: string;
  alt: string;
  event: string;
  eventSlug: string;
  year: number;
};

/**
 * Gallery photos are dynamically managed via Firestore.
 * Fallback static list initialized as empty array.
 */
export const galleryPhotos: GalleryPhoto[] = [];

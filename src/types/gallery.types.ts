export interface GalleryItem {
  id: string;
  type: "image" | "video";
  url: string;
  title?: string;
  description?: string;
  createdAt: Date;
}

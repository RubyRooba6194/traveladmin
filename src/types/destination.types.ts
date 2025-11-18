export interface Destination {
  id: string;
  name: string;
  region: "Madurai" | "Theni" | "Kerala" | "Other";
  description: string;
  highlights: string[];
  overview: string;
  images: string[];
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DestinationFormData {
  name: string;
  region: string;
  description: string;
  highlights: string[];
  overview: string;
  images: File[];
  videoUrl?: string;
}

/** Shared Sanity types for KRISNApedia content. */

export type SanityImage = {
  _type?: "image";
  asset?: { _ref?: string; _type?: string; url?: string };
};

export type SanityFile = {
  _type?: "file";
  asset?: { _ref?: string; _type?: string; url?: string; originalFilename?: string; size?: number };
};

export type PortableTextBlock = {
  _type?: string;
  _key?: string;
  children?: Array<{ _type?: string; text?: string; marks?: string[] }>;
  style?: string;
};

export type ViewerType = "pdf" | "slides" | "image" | "video" | "web";
export type FileTypeLabel =
  | "PDF"
  | "PPTX"
  | "DOCX"
  | "Web"
  | "Slides"
  | "Video"
  | "Image";

/** Common fields shared by Insight, Manual, Regulation. */
export type ContentBase = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
  description: string;
  longDescription?: PortableTextBlock[];
  coverImage?: SanityImage;
  file?: SanityFile;
  youtubeUrl?: string;
  viewer: ViewerType;
  fileType?: FileTypeLabel;
  author?: string;
  date: string;
  pages?: number;
  fileSize?: string;
  language?: string;
  readTime?: string;
  tags?: string[];
  status?: string;
  published?: boolean;
};

export type Insight = ContentBase;

export type Manual = ContentBase & {
  version?: string;
};

export type Regulation = ContentBase & {
  jurisdiction?: string;
  effectiveDate?: string;
  regulasiStatus?: string;
};

export type Faq = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  category?: string;
  orderIndex?: number;
  published?: boolean;
};

export type CategoryScope = "insight" | "manual" | "regulation";

export type CategoryOption = {
  _id: string;
  title: string;
  slug: string;
  scope: CategoryScope;
  orderIndex?: number;
};
  orderIndex?: number;
  published?: boolean;
};

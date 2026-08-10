export type BlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "video"
  | "code"
  | "quote"
  | "embed";

export type ContentBlock = {
  id: string;
  type: BlockType;
  text?: string;
  url?: string;
  alt?: string;
  caption?: string;
  language?: string;
  author?: string;
  title?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  tags: string[] | null;
  cover_url: string | null;
  content: ContentBlock[];
  status: "draft" | "published";
  featured: boolean;
  author: string;
  reading_time: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

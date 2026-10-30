export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Profile {
  id: string;
  full_name: string;
  tagline: string;
  bio: string;
  hero_photo_url: string;
  cv_url: string;
  email: string;
  location: string;
  available_for_work: boolean;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    dribbble?: string;
    readcv?: string;
  };
  metrics: {
    years_experience: number;
    projects_completed: number;
    design_awards: number;
    models_deployed: number;
  };
  updated_at?: string;
}

export type ProjectCategory = 'AI Systems' | 'Full Stack' | 'UI/UX Design' | 'Architecture';

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory | string;
  tags: string[];
  cover_image: string;
  client?: string;
  role?: string;
  year?: string;
  live_url?: string;
  github_url?: string;
  case_study_content?: string;
  featured: boolean;
  order_index: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  tags: string[];
  reading_time: string;
  published: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  category: 'Core & Systems Architecture' | 'Artificial Intelligence & ML' | 'Design & Creative Direction' | 'Cloud & Tooling' | string;
  name: string;
  proficiency_notes?: string;
  order_index: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  order_index: number;
  active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  created_at?: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  meta_description: string;
  keywords: string[];
  og_image_url: string;
  contact_email: string;
  footer_text: string;
  available_for_work: boolean;
  // Contact Page Customizations
  contact_eyebrow?: string;
  contact_heading?: string;
  contact_description?: string;
  contact_phone?: string;
  contact_location?: string;
  response_time?: string;
  availability_headline?: string;
  availability_description?: string;
  // Footer Customizations
  footer_version?: string;
  footer_location?: string;
  footer_copyright?: string;
  footer_tech_stack?: string;
}

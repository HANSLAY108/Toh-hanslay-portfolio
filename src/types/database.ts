export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Locale = "en" | "fr";

export type ProjectRole = "Software" | "AI" | "Design";

export interface ProjectMetricResult {
  value: string;
  label: string;
  label_fr?: string;
}

export interface Profile {
  id: string;
  full_name: string;
  tagline: string;
  tagline_fr?: string;
  bio: string;
  bio_fr?: string;
  hero_photo_url: string;
  cv_url: string;
  email: string;
  location: string;
  location_fr?: string;
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

export type ProjectCategory = "AI Systems" | "Full Stack" | "UI/UX Design" | "Architecture";

export interface Project {
  id: string;
  slug: string;
  title: string;
  title_fr?: string;
  summary: string;
  summary_fr?: string;
  category: ProjectCategory | string;
  roles?: ProjectRole[];
  tags: string[];
  tech_stack?: string[];
  cover_image: string;
  client?: string;
  role?: string;
  role_fr?: string;
  timeline?: string;
  timeline_fr?: string;
  year?: string;
  live_url?: string;
  github_url?: string;
  problem?: string;
  problem_fr?: string;
  process?: string;
  process_fr?: string;
  solution?: string;
  solution_fr?: string;
  results?: ProjectMetricResult[];
  case_study_content?: string;
  case_study_content_fr?: string;
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
  title_fr?: string;
  excerpt: string;
  excerpt_fr?: string;
  content: string;
  content_fr?: string;
  cover_image?: string;
  tags: string[];
  reading_time: string;
  reading_time_fr?: string;
  published: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  category:
    | "Core & Systems Architecture"
    | "Artificial Intelligence & ML"
    | "Design & Creative Direction"
    | "Cloud & Tooling"
    | string;
  category_fr?: string;
  name: string;
  proficiency_notes?: string;
  proficiency_notes_fr?: string;
  order_index: number;
}

export interface Service {
  id: string;
  title: string;
  title_fr?: string;
  description: string;
  description_fr?: string;
  deliverables: string[];
  deliverables_fr?: string[];
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
  site_title_fr?: string;
  meta_description: string;
  meta_description_fr?: string;
  keywords: string[];
  og_image_url: string;
  contact_email: string;
  cal_com_url?: string;
  footer_text: string;
  footer_text_fr?: string;
  available_for_work: boolean;
  // Contact Page Customizations
  contact_eyebrow?: string;
  contact_eyebrow_fr?: string;
  contact_heading?: string;
  contact_heading_fr?: string;
  contact_description?: string;
  contact_description_fr?: string;
  contact_phone?: string;
  contact_location?: string;
  response_time?: string;
  response_time_fr?: string;
  availability_headline?: string;
  availability_headline_fr?: string;
  availability_description?: string;
  availability_description_fr?: string;
  // Footer Customizations
  footer_version?: string;
  footer_location?: string;
  footer_copyright?: string;
  footer_copyright_fr?: string;
  footer_tech_stack?: string;
}

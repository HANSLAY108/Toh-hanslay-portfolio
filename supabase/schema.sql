-- ==============================================================================
-- Hanslay Portfolio & Admin Suite - Production Postgres Schema
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Single owner profile)
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null default 'Hanslay',
  tagline text not null default 'Software Engineer, AI Engineer & Graphic Designer',
  tagline_fr text default '',
  bio text not null,
  bio_fr text default '',
  hero_photo_url text,
  cv_url text,
  email text not null default 'hanslay@atelier.dev',
  location text default 'San Francisco & Remote',
  location_fr text default '',
  available_for_work boolean default true,
  socials jsonb default '{"github": "https://github.com", "twitter": "https://twitter.com", "linkedin": "https://linkedin.com", "readcv": "https://read.cv"}'::jsonb,
  metrics jsonb default '{"years_experience": 7, "projects_completed": 34, "design_awards": 6, "models_deployed": 18}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Projects Table
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  title_fr text default '',
  summary text not null,
  summary_fr text default '',
  category text not null default 'AI Systems',
  roles text[] default array[]::text[],
  tags text[] default array[]::text[],
  tech_stack text[] default array[]::text[],
  cover_image text,
  client text,
  role text,
  role_fr text default '',
  timeline text default '',
  timeline_fr text default '',
  year text default '2024',
  live_url text,
  github_url text,
  problem text default '',
  problem_fr text default '',
  process text default '',
  process_fr text default '',
  solution text default '',
  solution_fr text default '',
  results jsonb default '[]'::jsonb,
  case_study_content text,
  case_study_content_fr text default '',
  featured boolean default false,
  order_index integer default 0,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Blog Posts Table
create table if not exists public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  title_fr text default '',
  excerpt text not null,
  excerpt_fr text default '',
  content text not null,
  content_fr text default '',
  cover_image text,
  tags text[] default array[]::text[],
  reading_time text default '5 min read',
  reading_time_fr text default '',
  published boolean default true,
  published_at timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Skills Table
create table if not exists public.skills (
  id uuid primary key default uuid_generate_v4(),
  category text not null,
  category_fr text default '',
  name text not null,
  proficiency_notes text,
  proficiency_notes_fr text default '',
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Services Table
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  title_fr text default '',
  description text not null,
  description_fr text default '',
  deliverables text[] default array[]::text[],
  deliverables_fr text[] default array[]::text[],
  order_index integer default 0,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Contact Messages Table
create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Site Settings Table
create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  site_title text not null default 'Hanslay — Software Engineer, AI Engineer & Graphic Designer',
  site_title_fr text default '',
  meta_description text not null default 'Personal portfolio and technical writing of Hanslay.',
  meta_description_fr text default '',
  keywords text[] default array['Hanslay', 'AI Engineer', 'Software Engineer', 'Designer']::text[],
  og_image_url text default '/og-image.png',
  contact_email text not null default 'hanslay@atelier.dev',
  cal_com_url text default 'https://cal.com/hanslay/30min',
  footer_text text not null default 'Crafted with architectural precision, cognitive depth, and typographic conviction.',
  footer_text_fr text default '',
  available_for_work boolean default true,
  contact_eyebrow text default 'Open for Work',
  contact_eyebrow_fr text default '',
  contact_heading text default 'Let''s Build Together',
  contact_heading_fr text default '',
  contact_description text default '',
  contact_description_fr text default '',
  contact_phone text default '',
  contact_location text default 'San Francisco & Remote',
  response_time text default 'Within 24–48 hours',
  response_time_fr text default '',
  availability_headline text default 'Available for Select Projects',
  availability_headline_fr text default '',
  availability_description text default '',
  availability_description_fr text default '',
  footer_version text default 'v2.4',
  footer_location text default 'SF & Remote • Pacific Standard Time',
  footer_copyright text default 'All rights reserved. Editorial Minimalist Architecture.',
  footer_copyright_fr text default '',
  footer_tech_stack text default 'Next.js 14 · Supabase · Tailwind',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

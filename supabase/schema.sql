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
  bio text not null,
  hero_photo_url text,
  cv_url text,
  email text not null default 'hanslay@atelier.dev',
  location text default 'San Francisco & Remote',
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
  summary text not null,
  category text not null default 'AI Systems',
  tags text[] default array[]::text[],
  cover_image text,
  client text,
  role text,
  year text default '2024',
  live_url text,
  github_url text,
  case_study_content text,
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
  excerpt text not null,
  content text not null,
  cover_image text,
  tags text[] default array[]::text[],
  reading_time text default '5 min read',
  published boolean default true,
  published_at timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Skills Table
create table if not exists public.skills (
  id uuid primary key default uuid_generate_v4(),
  category text not null,
  name text not null,
  proficiency_notes text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Services Table
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  deliverables text[] default array[]::text[],
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
  meta_description text not null default 'Personal portfolio and technical writing of Hanslay.',
  keywords text[] default array['Hanslay', 'AI Engineer', 'Software Engineer', 'Designer']::text[],
  og_image_url text default '/og-image.png',
  contact_email text not null default 'hanslay@atelier.dev',
  footer_text text not null default 'Crafted with architectural precision, cognitive depth, and typographic conviction.',
  available_for_work boolean default true,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

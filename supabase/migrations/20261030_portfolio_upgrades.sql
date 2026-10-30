-- ==============================================================================
-- Migration: 20261030_portfolio_upgrades.sql
-- Purpose: Non-destructive schema upgrade for:
--   1. Case studies with outcomes (problem, process, solution, results, tech_stack, timeline)
--   2. Multi-select project roles (Software, AI, Design)
--   3. Cal.com booking widget URL in site_settings
--   4. English / French (i18n) content columns across all CMS tables
-- Preserves all existing data and Row-Level Security (RLS) policies.
-- ==============================================================================

-- 1. Projects Table Upgrades (Case Study + Role Filter + French i18n)
alter table public.projects
  add column if not exists problem text default '',
  add column if not exists process text default '',
  add column if not exists solution text default '',
  add column if not exists results jsonb default '[]'::jsonb,
  add column if not exists tech_stack text[] default array[]::text[],
  add column if not exists timeline text default '',
  add column if not exists roles text[] default array[]::text[],
  add column if not exists title_fr text default '',
  add column if not exists summary_fr text default '',
  add column if not exists role_fr text default '',
  add column if not exists timeline_fr text default '',
  add column if not exists problem_fr text default '',
  add column if not exists process_fr text default '',
  add column if not exists solution_fr text default '',
  add column if not exists case_study_content_fr text default '';

-- Backfill tech_stack from tags if empty
update public.projects
set tech_stack = tags
where (tech_stack is null or array_length(tech_stack, 1) is null)
  and tags is not null;

-- Backfill roles based on category where empty
update public.projects
set roles = case
  when category ilike '%AI%' then array['AI', 'Software']::text[]
  when category ilike '%Design%' then array['Design']::text[]
  else array['Software']::text[]
end
where roles is null or array_length(roles, 1) is null;

-- 2. Profiles Table Upgrades (French i18n)
alter table public.profiles
  add column if not exists tagline_fr text default '',
  add column if not exists bio_fr text default '',
  add column if not exists location_fr text default '';

-- 3. Blog Posts Table Upgrades (French i18n)
alter table public.blog_posts
  add column if not exists title_fr text default '',
  add column if not exists excerpt_fr text default '',
  add column if not exists content_fr text default '',
  add column if not exists reading_time_fr text default '';

-- 4. Skills Table Upgrades (French i18n)
alter table public.skills
  add column if not exists category_fr text default '',
  add column if not exists proficiency_notes_fr text default '';

-- 5. Services Table Upgrades (French i18n)
alter table public.services
  add column if not exists title_fr text default '',
  add column if not exists description_fr text default '',
  add column if not exists deliverables_fr text[] default array[]::text[];

-- 6. Site Settings Table Upgrades (Cal.com + Contact/Footer + French i18n)
alter table public.site_settings
  add column if not exists cal_com_url text default 'https://cal.com/hanslay/30min',
  add column if not exists contact_eyebrow text default 'Open for Work',
  add column if not exists contact_heading text default 'Let''s Build Together',
  add column if not exists contact_description text default '',
  add column if not exists contact_phone text default '',
  add column if not exists contact_location text default 'San Francisco & Remote',
  add column if not exists response_time text default 'Within 24–48 hours',
  add column if not exists availability_headline text default 'Available for Select Projects',
  add column if not exists availability_description text default '',
  add column if not exists footer_version text default 'v2.4',
  add column if not exists footer_location text default 'SF & Remote • Pacific Standard Time',
  add column if not exists footer_copyright text default 'All rights reserved. Editorial Minimalist Architecture.',
  add column if not exists footer_tech_stack text default 'Next.js 14 · Supabase · Tailwind',
  add column if not exists site_title_fr text default '',
  add column if not exists meta_description_fr text default '',
  add column if not exists footer_text_fr text default '',
  add column if not exists contact_eyebrow_fr text default '',
  add column if not exists contact_heading_fr text default '',
  add column if not exists contact_description_fr text default '',
  add column if not exists response_time_fr text default '',
  add column if not exists availability_headline_fr text default '',
  add column if not exists availability_description_fr text default '',
  add column if not exists footer_copyright_fr text default '';

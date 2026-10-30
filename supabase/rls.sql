-- ==============================================================================
-- Hanslay Portfolio & Admin Suite - Row Level Security (RLS) Policies
-- ==============================================================================

-- 1. Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;
alter table public.skills enable row level security;
alter table public.services enable row level security;
alter table public.messages enable row level security;
alter table public.site_settings enable row level security;

-- Drop existing policies if rerun
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Authenticated owner can update profile" on public.profiles;

drop policy if exists "Published projects are viewable by everyone" on public.projects;
drop policy if exists "Authenticated owner full access to projects" on public.projects;

drop policy if exists "Published blog posts are viewable by everyone" on public.blog_posts;
drop policy if exists "Authenticated owner full access to blog posts" on public.blog_posts;

drop policy if exists "Public can view skills" on public.skills;
drop policy if exists "Authenticated owner full access to skills" on public.skills;

drop policy if exists "Public can view active services" on public.services;
drop policy if exists "Authenticated owner full access to services" on public.services;

drop policy if exists "Anyone can insert contact messages" on public.messages;
drop policy if exists "Authenticated owner full access to messages" on public.messages;

drop policy if exists "Public can view site settings" on public.site_settings;
drop policy if exists "Authenticated owner full access to site settings" on public.site_settings;

-- 2. Profiles Policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Authenticated owner can update profile"
  on public.profiles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 3. Projects Policies
create policy "Published projects are viewable by everyone"
  on public.projects for select
  using (published = true or auth.role() = 'authenticated');

create policy "Authenticated owner full access to projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 4. Blog Posts Policies
create policy "Published blog posts are viewable by everyone"
  on public.blog_posts for select
  using (published = true or auth.role() = 'authenticated');

create policy "Authenticated owner full access to blog posts"
  on public.blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 5. Skills Policies
create policy "Public can view skills"
  on public.skills for select
  using (true);

create policy "Authenticated owner full access to skills"
  on public.skills for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 6. Services Policies
create policy "Public can view active services"
  on public.services for select
  using (active = true or auth.role() = 'authenticated');

create policy "Authenticated owner full access to services"
  on public.services for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 7. Messages Policies (Public write, owner read/manage)
create policy "Anyone can insert contact messages"
  on public.messages for insert
  with check (true);

create policy "Authenticated owner full access to messages"
  on public.messages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 8. Site Settings Policies
create policy "Public can view site settings"
  on public.site_settings for select
  using (true);

create policy "Authenticated owner full access to site settings"
  on public.site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

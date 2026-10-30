-- ==============================================================================
-- Supabase Storage Configuration & Policies
-- ==============================================================================

-- Create the portfolio-assets bucket if it does not exist
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

-- Allow public read access to portfolio-assets
create policy "Public Access to portfolio-assets"
  on storage.objects for select
  using (bucket_id = 'portfolio-assets');

-- Allow authenticated owners to upload, update, and delete in portfolio-assets
create policy "Authenticated owner upload access"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

create policy "Authenticated owner update access"
  on storage.objects for update
  using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

create policy "Authenticated owner delete access"
  on storage.objects for delete
  using (bucket_id = 'portfolio-assets' and auth.role() = 'authenticated');

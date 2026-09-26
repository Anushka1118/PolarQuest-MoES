-- ==========================================
-- POLARQUEST — Supabase Database Architecture
-- MoES SIH26063 Production SQL Migration Script
-- ==========================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT 'Polar Researcher',
  role TEXT CHECK (role IN ('public', 'researcher', 'admin')) DEFAULT 'public',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Stations Table
CREATE TABLE IF NOT EXISTS public.stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  region TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  description TEXT NOT NULL
);

-- 3. Research Records Table
CREATE TABLE IF NOT EXISTS public.research_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  station_id UUID REFERENCES public.stations(id),
  created_by UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  discipline TEXT NOT NULL,
  expedition_year INTEGER NOT NULL,
  abstract TEXT NOT NULL,
  key_findings TEXT[] DEFAULT '{}',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  file_url TEXT,
  status TEXT CHECK (status IN ('draft', 'pending_review', 'published', 'rejected')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Media Posts Table
CREATE TABLE IF NOT EXISTS public.media_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id UUID REFERENCES public.research_records(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  kids_fact TEXT,
  social_carousel JSONB,
  press_release TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Automatic Profile Creation Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'Polar Researcher'),
    'public'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_posts ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- RLS POLICIES (Idempotent & Re-runnable)
-- ==========================================

-- Profiles Policies
DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "User update own profile" ON public.profiles;
CREATE POLICY "User update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Stations Policies
DROP POLICY IF EXISTS "Public stations read" ON public.stations;
CREATE POLICY "Public stations read" ON public.stations FOR SELECT USING (true);

-- Research Records Policies
DROP POLICY IF EXISTS "Public published records read" ON public.research_records;
CREATE POLICY "Public published records read" ON public.research_records FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Researcher own records read" ON public.research_records;
CREATE POLICY "Researcher own records read" ON public.research_records FOR SELECT USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Researcher insert record" ON public.research_records;
CREATE POLICY "Researcher insert record" ON public.research_records FOR INSERT WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Researcher update own draft" ON public.research_records;
CREATE POLICY "Researcher update own draft" ON public.research_records 
  FOR UPDATE 
  USING (
    auth.uid() = created_by AND status IN ('draft', 'rejected')
  ) 
  WITH CHECK (
    auth.uid() = created_by AND status IN ('draft', 'pending_review')
  );

DROP POLICY IF EXISTS "Admin full research access" ON public.research_records;
CREATE POLICY "Admin full research access" ON public.research_records 
  FOR ALL 
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Media Posts Policies
DROP POLICY IF EXISTS "Public media posts read" ON public.media_posts;
CREATE POLICY "Public media posts read" ON public.media_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Researcher media insert" ON public.media_posts;
CREATE POLICY "Researcher media insert" ON public.media_posts FOR INSERT WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Admin media manage" ON public.media_posts;
CREATE POLICY "Admin media manage" ON public.media_posts 
  FOR ALL 
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ==========================================
-- 6. Storage Bucket DDL & RLS (25 MB limit & PDF filter)
-- ==========================================
INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
) 
VALUES (
  'research-pdfs',
  'research-pdfs',
  true,
  26214400,
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 26214400,
  allowed_mime_types = ARRAY['application/pdf'];

DROP POLICY IF EXISTS "Public PDF Storage Read" ON storage.objects;
CREATE POLICY "Public PDF Storage Read" ON storage.objects 
  FOR SELECT USING (bucket_id = 'research-pdfs');

DROP POLICY IF EXISTS "Authenticated PDF Storage Upload" ON storage.objects;
CREATE POLICY "Authenticated PDF Storage Upload" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'research-pdfs' AND auth.role() = 'authenticated');

-- ==========================================
-- 7. Seed Initial Research Stations
-- ==========================================
INSERT INTO public.stations (name, latitude, longitude, region, status, description) VALUES
  ('Maitri', -70.7, 11.7, 'Antarctica', 'active', 'Indias second permanent Antarctic research station located at the Schirmacher Oasis, operational since 1989.'),
  ('Bharati', -69.4, 76.2, 'Antarctica', 'active', 'Indias state-of-the-art Antarctic research facility located at Larsemann Hills, operational since 2012.'),
  ('Himadri', 78.9, 11.9, 'Arctic', 'active', 'Indias first Arctic research station located at Ny-Ålesund, Svalbard, Norway, operational since 2008.'),
  ('Himansh', 32.4, 77.6, 'Himalayas', 'active', 'Indias high-altitude glaciological research station located at Sutri Dhaka in Lahaul-Spiti, Himachal Pradesh.')
ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- 8. Quick Role Assignment Query
-- (Run in SQL Editor after creating researcher@demo.com and admin@demo.com in Auth Users)
-- ==========================================
/*
UPDATE public.profiles 
SET role = 'researcher' 
WHERE id IN (SELECT id FROM auth.users WHERE email = 'researcher@demo.com');

UPDATE public.profiles 
SET role = 'admin' 
WHERE id IN (SELECT id FROM auth.users WHERE email = 'admin@demo.com');
*/


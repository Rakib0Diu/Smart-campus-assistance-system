-- Run this script in your Supabase SQL Editor to create the users and requests tables

CREATE TABLE IF NOT EXISTS public.campus_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  student_id text NOT NULL,
  name text NOT NULL,
  department text NOT NULL,
  role text NOT NULL DEFAULT 'student',
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.campus_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to campus_users"
  ON public.campus_users
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed default Student & Admin accounts
INSERT INTO public.campus_users (email, student_id, name, department, role, password)
VALUES
  ('alex@eloyce.edu', 'ELU-2026-0419', 'Alex Rivera', 'Computer Science', 'student', 'student123'),
  ('priya@eloyce.edu', 'ELU-2026-0882', 'Priya Patel', 'Electrical Engineering', 'student', 'student123'),
  ('samira@gmail.com', 'ELU-2026-1094', 'samira', 'SWe', 'student', '123456'),
  ('admin@eloyce.edu', 'ADMIN-OPS-01', 'Dr. Marcus Vance', 'Campus Operations Authority', 'admin', 'admin123')
ON CONFLICT (email) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.campus_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  student_name text NOT NULL,
  student_id text NOT NULL,
  priority text NOT NULL,
  ai_recommended_priority text,
  department text NOT NULL,
  status text NOT NULL DEFAULT 'Submitted',
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.campus_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to campus_requests"
  ON public.campus_requests
  FOR ALL
  USING (true)
  WITH CHECK (true);

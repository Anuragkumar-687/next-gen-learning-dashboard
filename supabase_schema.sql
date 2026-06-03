-- 1. Create the 'courses' table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow anyone to read courses (select)
CREATE POLICY "Allow public read access" ON courses
    FOR SELECT
    USING (true);

-- 4. Seed sample data (4 courses as requested)
INSERT INTO courses (title, progress, icon_name)
VALUES
    ('Introduction to Next.js 15', 75, 'Code'),
    ('Advanced TypeScript Techniques', 40, 'Shield'),
    ('Mastering Framer Motion', 90, 'Sparkles'),
    ('Database Systems & Supabase', 15, 'Database')
ON CONFLICT DO NOTHING;

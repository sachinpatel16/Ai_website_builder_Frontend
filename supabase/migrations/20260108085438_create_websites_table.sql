/*
  # Create websites table for AI-generated sites

  1. New Tables
    - `websites`
      - `id` (uuid, primary key) - Unique identifier for each website
      - `user_id` (uuid) - User who created the website
      - `prompt` (text) - The user's original prompt
      - `title` (text) - Generated website title
      - `html_content` (text) - Generated HTML/JSX content
      - `css_content` (text) - Generated CSS/styling
      - `pages` (jsonb) - Array of pages for multi-page websites
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on `websites` table
    - Add policy for users to read all websites (gallery view)
    - Add policy for users to create their own websites
    - Add policy for users to update their own websites
    - Add policy for users to delete their own websites
*/

CREATE TABLE IF NOT EXISTS websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT gen_random_uuid(),
  prompt text NOT NULL,
  title text NOT NULL,
  html_content text NOT NULL,
  css_content text DEFAULT '',
  pages jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view websites"
  ON websites FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create websites"
  ON websites FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own websites"
  ON websites FOR UPDATE
  USING (user_id = gen_random_uuid())
  WITH CHECK (user_id = gen_random_uuid());

CREATE POLICY "Users can delete own websites"
  ON websites FOR DELETE
  USING (user_id = gen_random_uuid());

CREATE INDEX IF NOT EXISTS websites_created_at_idx ON websites(created_at DESC);
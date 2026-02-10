import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Website {
  id: string;
  user_id: string;
  prompt: string;
  title: string;
  html_content: string;
  css_content: string;
  pages: Page[];
  created_at: string;
  updated_at: string;
}

export interface Page {
  name: string;
  path: string;
  content: string;
}

// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rbsuobpaqwtmiesxwcaw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJic3VvYnBhcXd0bWllc3h3Y2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MzU4MzMsImV4cCI6MjA0OTQxMTgzM30.VgiV5um4sD_AJSt1fO3YRrsHyHdsixaGDtMpgThG6ZM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
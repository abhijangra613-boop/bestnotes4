import { supabase } from "./supabase";

export type Note = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  category: string | null;
  subject: string | null;
  language: string | null;
  tags: string[] | null;

  price: number;
  old_price: number;

  is_free: boolean;

  featured: boolean;
  bestseller: boolean;
  new_arrival: boolean;
  bundle_included: boolean;

  thumbnail_url: string | null;
  pdf_url: string | null;
  preview_pdf: string | null;

  icon: string | null;
  accent_start: string | null;
  accent_end: string | null;

  pages: number | null;
  rating: number;
  reviews: number;

  updated_date: string | null;

  published: boolean;

  created_at: string;
};

export async function getNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Note[];
}
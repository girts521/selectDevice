import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const [kitchen_bestsellers, ninja, kosmetik, rice_cooker] = await Promise.all([
          supabase.from("products").select("*").eq("search_term", "kitchen_bestsellers"),
          supabase.from("products").select("*").eq("search_term", "Ninja"),
          supabase.from("products").select("*").eq("search_term", "Kosmetik"),
          supabase.from("products").select("*").eq("search_term", "Reiskocher"),
        ]);
  
        res.status(200).json({
          kitchen_bestsellers: kitchen_bestsellers.data,
          ninja: ninja.data,
          kosmetik: kosmetik.data,
          rice_cooker: rice_cooker.data,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  

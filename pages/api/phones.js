import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
        const phones = await supabase.from("phones").select("*")
        res.status(200).json({...phones})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
}

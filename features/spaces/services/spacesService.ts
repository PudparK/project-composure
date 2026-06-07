import { supabase } from "../../../lib/supabase";
import { Database } from "../../../types/database";

export type Space = Database["public"]["Tables"]["spaces"]["Row"];

export async function listSpaces() {
  const { data, error } = await supabase
    .from("spaces")
    .select("*")
    .is("archived_at", null)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

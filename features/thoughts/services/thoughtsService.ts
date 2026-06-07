import { supabase } from "../../../lib/supabase";
import { ThoughtListItem } from "../types";

type CreateThoughtInput = {
  body: string;
  reviewAt: string | null;
  spaceId: string;
  userId: string;
};

const thoughtListSelect = `
  id,
  body,
  review_at,
  processed_at,
  created_at,
  spaces (
    name,
    kind
  )
`;

export async function createThought({
  body,
  reviewAt,
  spaceId,
  userId,
}: CreateThoughtInput) {
  const { error } = await supabase.from("thoughts").insert({
    body,
    review_at: reviewAt,
    space_id: spaceId,
    created_by: userId,
  });

  if (error) {
    throw error;
  }
}

export async function listInboxThoughts() {
  const { data, error } = await supabase
    .from("thoughts")
    .select(thoughtListSelect)
    .is("processed_at", null)
    .order("created_at", { ascending: false })
    .returns<ThoughtListItem[]>();

  if (error) {
    throw error;
  }

  return data;
}

export async function listUpcomingReviews() {
  const { data, error } = await supabase
    .from("thoughts")
    .select(thoughtListSelect)
    .is("processed_at", null)
    .not("review_at", "is", null)
    .order("review_at", { ascending: true })
    .returns<ThoughtListItem[]>();

  if (error) {
    throw error;
  }

  return data;
}

export async function markThoughtProcessed(thoughtId: string) {
  const { error } = await supabase
    .from("thoughts")
    .update({ processed_at: new Date().toISOString() })
    .eq("id", thoughtId);

  if (error) {
    throw error;
  }
}

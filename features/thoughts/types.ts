import { Database } from "../../types/database";

export type Thought = Database["public"]["Tables"]["thoughts"]["Row"];
export type SpaceKind = Database["public"]["Tables"]["spaces"]["Row"]["kind"];

export type ThoughtListItem = Pick<
  Thought,
  "id" | "body" | "review_at" | "processed_at" | "created_at"
> & {
  spaces: {
    name: string;
    kind: SpaceKind;
  } | null;
};

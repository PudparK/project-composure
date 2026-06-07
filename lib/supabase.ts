import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import { getRequiredEnv } from "./env";
import { Database } from "../types/database";

const supabaseUrl = getRequiredEnv("EXPO_PUBLIC_SUPABASE_URL");
const supabasePublishableKey = getRequiredEnv(
  "EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
);

export const supabase = createClient<Database>(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

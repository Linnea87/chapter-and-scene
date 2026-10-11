import { supabase } from "../supabaseClient";
import { toLibraryItem } from "./libraryMappers";

// ===== Get library items =====
// Fetches the signed-in user's library, newest first.
// Row Level Security makes sure only their own rows are returned.
// Throws on failure, so the caller can handle the error.

const getLibraryItems = async () => {
  const { data, error } = await supabase
    .from("library_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(toLibraryItem);
};

export default getLibraryItems;

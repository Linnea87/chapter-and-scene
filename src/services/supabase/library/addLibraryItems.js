import { supabase } from "../supabaseClient";
import { toLibraryRow } from "./libraryMappers";

// ===== Add library items =====
// Adds purchased digital items to the signed-in user's library.
// Renting a movie again updates the expiry time instead of adding a new row.
// Throws on failure, so the caller can handle the error.

const addLibraryItems = async (items) => {
  if (items.length === 0) return;

  const { error } = await supabase
    .from("library_items")
    .upsert(items.map(toLibraryRow), {
      onConflict: "user_id,media_type,external_id,format",
    });

  if (error) throw error;
};

export default addLibraryItems;

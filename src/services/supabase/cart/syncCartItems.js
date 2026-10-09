import { supabase } from "../supabaseClient";
import { toCartRow } from "./cartMappers";

// ===== Sync cart items =====
// Makes the signed-in user's saved cart match the cart in the app.
// Throws on failure, so the caller can handle the error.

const syncCartItems = async (items) => {
  // --- Empty cart: remove all saved rows ---
  if (items.length === 0) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .not("key", "is", null);

    if (error) throw error;
    return;
  }

  // --- Add new items and update existing ones ---
  const { error: upsertError } = await supabase
    .from("cart_items")
    .upsert(items.map(toCartRow), { onConflict: "user_id,key" });

  if (upsertError) throw upsertError;

  // --- Remove saved items that are no longer in the cart ---
  const keys = items.map((item) => item.key);

  const { error: deleteError } = await supabase
    .from("cart_items")
    .delete()
    .not("key", "in", `(${keys.map((key) => `"${key}"`).join(",")})`);

  if (deleteError) throw deleteError;
};

export default syncCartItems;

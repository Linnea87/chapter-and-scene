import { supabase } from "../supabaseClient";
import { toCartItem } from "./cartMappers";

// ===== Get cart items =====
// Fetches the signed-in user's cart.
// Row Level Security makes sure only their own rows are returned.
// Throws on failure, so the caller can handle the error.

const getCartItems = async () => {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .order("created_at");

  if (error) throw error;

  return data.map(toCartItem);
};

export default getCartItems;

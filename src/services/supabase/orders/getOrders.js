import { supabase } from "../supabaseClient";
import { toOrder } from "./orderMappers";

// ===== Get orders =====
// Fetches all of the signed-in user's orders with their items, newest first.
// Row Level Security makes sure only their own orders are returned.
// Throws on failure, so the caller can handle the error.

const getOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(toOrder);
};

export default getOrders;

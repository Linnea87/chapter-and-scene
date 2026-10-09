import { supabase } from "../supabaseClient";
import { toOrder } from "./orderMappers";

// ===== Get order =====
// Fetches one of the signed-in user's orders, with its items.
// Returns null when the order does not exist or belongs to someone else.
// Throws on other failures, so the caller can handle the error.

const getOrder = async (orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", orderId)
    .maybeSingle();

  if (error) throw error;

  return data ? toOrder(data) : null;
};

export default getOrder;

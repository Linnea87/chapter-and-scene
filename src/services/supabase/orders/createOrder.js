import { supabase } from "../supabaseClient";
import { toOrderItemRow } from "./orderMappers";

// ===== Create order =====
// Saves an order and its items for the signed-in user.
// Returns the new order id, used for the confirmation page.
// Throws on failure, so the caller can handle the error.

const createOrder = async ({
  items,
  subtotal,
  shipping,
  total,
  shippingAddress,
}) => {
  // --- Order ---
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      subtotal,
      shipping,
      total,
      shipping_address: shippingAddress ?? null,
    })
    .select("id")
    .single();

  if (orderError) throw orderError;

  // --- Order items ---
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items.map((item) => toOrderItemRow(item, order.id)));

  if (itemsError) throw itemsError;

  return order.id;
};

export default createOrder;

import { supabase } from '../db/supabaseClient.js';

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

export async function createPurchase({ productId, price, storeName = null }) {
  if (!productId) {
    throw badRequest('productId is required');
  }

  if (!Number.isInteger(price) || price <= 0) {
    throw badRequest('price must be a positive integer');
  }

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id')
    .eq('id', productId)
    .maybeSingle();

  if (productError) {
    throw productError;
  }

  if (!product) {
    throw badRequest('productId must reference an existing product');
  }

  const { data: purchase, error: insertError } = await supabase
    .from('purchases')
    .insert({
      product_id: productId,
      price,
      store_name: storeName
    })
    .select('*')
    .single();

  if (insertError) {
    throw insertError;
  }

  return purchase;
}

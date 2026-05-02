import { supabase } from '../db/supabaseClient.js';

export async function getProductByBarcode(barcode) {
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('barcode', barcode)
    .maybeSingle();

  if (productError) {
    throw productError;
  }

  if (!product) {
    return {
      id: null,
      barcode,
      name: null,
      needsInput: true
    };
  }

  const { data: lastPurchase, error: purchaseError } = await supabase
    .from('purchases')
    .select('*')
    .eq('product_id', product.id)
    .order('purchased_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (purchaseError) {
    throw purchaseError;
  }

  return {
    ...product,
    lastPurchase: lastPurchase ?? null
  };
}

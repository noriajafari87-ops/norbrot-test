type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = env as any;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return new Response("Missing env", { status: 500 });
    }

    // Use bundled build for Workers
    // @ts-ignore - Using runtime ESM import from CDN in Pages Functions environment
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2?bundle');
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, { global: { fetch } });

    const payload = await request.json();
    if (!payload?.userId) return new Response("userId required", { status: 400 });

    const { data, error } = await supabase
      .from('orders')
      .insert({
        userId: payload.userId,
        productName: payload.productName ?? 'Barbari',
        quantity: payload.quantity ?? 1,
        totalPrice: payload.totalPrice ?? 0,
        totalAmount: payload.totalAmount ?? payload.totalPrice ?? 0,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        street: payload.street,
        houseNumber: payload.houseNumber,
        apartment: payload.apartment,
        postalCode: payload.postalCode,
        city: payload.city,
        state: payload.state,
      })
      .select()
      .single();

    if (error) return new Response(error.message, { status: 500 });
    return new Response(JSON.stringify({ ok: true, order: data }), {
      headers: { 'content-type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(String(e?.message || e), { status: 500 });
  }
};



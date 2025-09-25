type PagesFunction = (ctx: any) => Promise<Response>;

function corsHeaders() {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'authorization,content-type',
  } as Record<string, string>;
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: corsHeaders() });
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = env as any;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return new Response("Missing env", { status: 500 });
    }

    // Use bundled build for Workers
    const payload = await request.json();
    if (!payload?.userId) return new Response("userId required", { status: 400, headers: corsHeaders() });

    // Insert via REST to avoid ESM import issues in local Miniflare
    const insertUrl = `${SUPABASE_URL}/rest/v1/orders?select=*`;
    const insertRes = await fetch(insertUrl, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
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
    });
    if (!insertRes.ok) {
      const errText = await insertRes.text().catch(() => '');
      return new Response(`orders insert failed: ${insertRes.status} ${errText}`, { status: 500, headers: corsHeaders() });
    }
    const createdArr = await insertRes.json();
    const data = Array.isArray(createdArr) ? createdArr[0] : createdArr;

    return new Response(JSON.stringify({ ok: true, order: data }), {
      headers: { 'content-type': 'application/json', ...corsHeaders() }
    });
  } catch (e: any) {
    return new Response(String(e?.message || e), { status: 500, headers: corsHeaders() });
  }
};



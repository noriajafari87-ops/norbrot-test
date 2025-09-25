function corsHeaders() {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'authorization,content-type',
  } as Record<string, string>;
}

export const onRequestOptions = async () => new Response(null, { status: 204, headers: corsHeaders() });

export async function onRequestPost({ request, env }: any) {
  try {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = env || {};
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return json({ ok: false, error: 'Missing env SUPABASE_URL or SUPABASE_SERVICE_ROLE' }, 500);
    }

    let bodyText = await request.text();
    const body = bodyText ? JSON.parse(bodyText) : {};
    const { phone, productName, quantity, totalPrice, totalAmount, firstName } = body || {};

    if (!phone) {
      return json({ ok: false, error: 'phone is required' }, 400);
    }

    // Minimal insert: only phone and order details. userId is optional in DB.
    const row: Record<string, any> = {
      phone,
      productName: productName ?? 'Barbari',
      quantity: Number(quantity ?? 1),
      totalPrice: Number(totalPrice ?? 0),
      totalAmount: Number(totalAmount ?? totalPrice ?? 0),
      firstName: firstName || 'Kunde'
    };

    const url = `${SUPABASE_URL}/rest/v1/orders?select=*`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(row)
    });

    const text = await res.text();
    if (!res.ok) {
      return json({ ok: false, error: text || res.statusText }, res.status || 500);
    }
    let data: any = null;
    try { data = text ? JSON.parse(text) : null; } catch (_) { data = null; }
    return json({ ok: true, data: Array.isArray(data) ? data[0] : data }, 200);
  } catch (e: any) {
    return json({ ok: false, error: e?.message || String(e) }, 500);
  }
}

function json(obj: any, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders() }
  });
}

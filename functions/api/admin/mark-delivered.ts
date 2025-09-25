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
      return new Response(JSON.stringify({ success: false, error: 'Missing env' }), { status: 500, headers: { 'content-type': 'application/json', ...corsHeaders() } });
    }

    const bodyText = await request.text();
    const body = bodyText ? JSON.parse(bodyText) : {};
    const orderId = Number(body?.orderId);
    if (!orderId) {
      return new Response(JSON.stringify({ success: false, error: 'orderId required' }), { status: 400, headers: { 'content-type': 'application/json', ...corsHeaders() } });
    }

    const url = `${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'content-type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify({ status: 'delivered' })
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return new Response(JSON.stringify({ success: false, error: `update failed: ${res.status} ${errText}` }), { status: 500, headers: { 'content-type': 'application/json', ...corsHeaders() } });
    }
    const updated = await res.json();
    return new Response(JSON.stringify({ success: true, order: Array.isArray(updated) ? updated[0] : updated }), { headers: { 'content-type': 'application/json', ...corsHeaders() } });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: String(e?.message || e) }), { status: 500, headers: { 'content-type': 'application/json', ...corsHeaders() } });
  }
};



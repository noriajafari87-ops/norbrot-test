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

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  try {
    const auth = request.headers.get('authorization') || '';
    if (!auth.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ success: false, error: 'unauthorized' }), { status: 401, headers: { 'content-type': 'application/json', ...corsHeaders() } });
    }

    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = env as any;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return new Response(JSON.stringify({ success: false, error: 'Missing env' }), { status: 500, headers: { 'content-type': 'application/json', ...corsHeaders() } });
    }

    // Fetch users and orders
    const [usersRes, ordersRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/users?select=*`, { headers: { apikey: SUPABASE_SERVICE_ROLE, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}` } }),
      fetch(`${SUPABASE_URL}/rest/v1/orders?select=*`, { headers: { apikey: SUPABASE_SERVICE_ROLE, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}` } }),
    ]);

    const users = usersRes.ok ? await usersRes.json() : [];
    const orders = ordersRes.ok ? await ordersRes.json() : [];

    return new Response(JSON.stringify({ success: true, totalUsers: users.length, totalOrders: orders.length, users, orders }), {
      headers: { 'content-type': 'application/json', ...corsHeaders() },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: String(e?.message || e) }), { status: 500, headers: { 'content-type': 'application/json', ...corsHeaders() } });
  }
};



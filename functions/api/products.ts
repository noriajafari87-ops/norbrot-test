type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestGet: PagesFunction = async ({ env }) => {
  try {
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = env as any;
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return new Response(JSON.stringify({ error: "Missing SUPABASE envs" }), { status: 500 });
    }
    // Read via REST to avoid ESM import issues in local Miniflare
    const url = `${SUPABASE_URL}/rest/v1/products?select=id,name,slug,priceCents,active&active=eq.true&order=id`;
    const res = await fetch(url, { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return new Response(JSON.stringify({ error: `products fetch failed: ${res.status} ${errText}` }), { status: 500 });
    }
    const rows = await res.json();
    const data = Array.isArray(rows)
      ? rows.map((p: any) => ({ ...p, price_cents: p.priceCents }))
      : [];

    return new Response(JSON.stringify({ products: data ?? [] }), {
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500, headers: { 'access-control-allow-origin': '*' } });
  }
};



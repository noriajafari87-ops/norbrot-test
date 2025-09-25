type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestGet: PagesFunction = async ({ env }) => {
  try {
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = env as any;
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return new Response(JSON.stringify({ error: "Missing SUPABASE envs" }), { status: 500 });
    }
    // Use bundled build for Workers
    // @ts-ignore using CDN import at runtime
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2?bundle');

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { fetch } });

    // Try snake_case first
    let { data, error } = await supabase
      .from('products')
      .select('id,name,slug,price_cents,active')
      .eq('active', true)
      .order('id');

    if (error) {
      // Try camelCase alternative
      const alt = await supabase
        .from('products')
        .select('id,name,slug,priceCents,active')
        .eq('active', true)
        .order('id');
      if (!alt.error) data = alt.data;
      else throw error;
    }

    return new Response(JSON.stringify({ products: data ?? [] }), {
      headers: { 'content-type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500 });
  }
};



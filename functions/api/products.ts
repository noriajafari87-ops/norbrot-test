type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestGet: PagesFunction = async (ctx) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = (ctx.env || {}) as any;

  // If env is present, try Supabase products; otherwise fallback to static product
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      // @ts-ignore using CDN import at runtime
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { fetch } });
      const { data, error } = await supabase
        .from('products')
        .select('id,name,slug,price_cents,active')
        .eq('active', true)
        .order('id');
      if (error) throw error;
      return Response.json({ products: data || [] });
    } catch (e: any) {
      // fallthrough to static
    }
  }

  const products = [
    { id: 1, name: 'Traditionelles Barbari-Brot', slug: 'barbari-brot', price_cents: 350, active: true },
  ];
  return Response.json({ products });
};



type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = env as any;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return new Response("Missing env", { status: 500 });
    }

    // @ts-ignore using CDN import at runtime for Workers
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2?bundle');
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, { global: { fetch } });

    const body = await request.json();
    const {
      firstName, lastName, phone,
      street, houseNumber, apartment, postalCode, city, state,
    } = body || {};

    if (!firstName || !lastName || !phone || !street || !houseNumber || !postalCode || !city || !state) {
      return new Response(JSON.stringify({ error: 'All required fields must be provided' }), {
        status: 400, headers: { 'content-type': 'application/json' }
      });
    }

    // Check if user exists by phone
    const { data: existing, error: findErr } = await supabase
      .from('users')
      .select('id,firstName,lastName,phone')
      .eq('phone', phone)
      .maybeSingle();
    if (findErr) return new Response(findErr.message, { status: 500 });
    if (existing) {
      return new Response(JSON.stringify({ error: 'User already exists with this phone number' }), {
        status: 400, headers: { 'content-type': 'application/json' }
      });
    }

    // Create user
    const { data: created, error: insertErr } = await supabase
      .from('users')
      .insert({
        firstName, lastName, phone,
        street, houseNumber, apartment, postalCode, city, state,
        country: 'Deutschland'
      })
      .select()
      .single();
    if (insertErr) return new Response(insertErr.message, { status: 500 });

    // Generate simple permanent token (base64 JSON like old app)
    const token = Buffer.from(JSON.stringify({ userId: created.id, timestamp: Date.now() })).toString('base64');

    return new Response(JSON.stringify({
      success: true,
      message: 'User registered successfully',
      token,
      user: created,
    }), { headers: { 'content-type': 'application/json' } });
  } catch (e: any) {
    return new Response(String(e?.message || e), { status: 500 });
  }
};



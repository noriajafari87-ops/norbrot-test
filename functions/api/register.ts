type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = env as any;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return new Response(JSON.stringify({ error: 'Missing env SUPABASE_URL or SUPABASE_SERVICE_ROLE' }), {
        status: 500,
        headers: { 'content-type': 'application/json' }
      });
    }

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

    // Check if user exists by phone via Supabase REST
    // Use a minimal select to avoid unknown column errors on differing schemas
    const selectUrl = `${SUPABASE_URL}/rest/v1/users?phone=eq.${encodeURIComponent(phone)}&select=id,phone`;
    const selectRes = await fetch(selectUrl, {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'content-type': 'application/json'
      }
    });
    if (!selectRes.ok) {
      const errText = await selectRes.text().catch(() => '');
      return new Response(JSON.stringify({ error: `users select failed: ${selectRes.status} ${errText}` }), { status: 500, headers: { 'content-type': 'application/json' } });
    }
    const existingArr = await selectRes.json();
    if (Array.isArray(existingArr) && existingArr.length > 0) {
      return new Response(JSON.stringify({ error: 'User already exists with this phone number' }), {
        status: 400, headers: { 'content-type': 'application/json' }
      });
    }

    // Create user via REST
    const insertUrl = `${SUPABASE_URL}/rest/v1/users?select=*`;
    const insertRes = await fetch(insertUrl, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName, lastName, phone,
        street, houseNumber, apartment, postalCode, city, state,
        country: 'Deutschland'
      })
    });
    let created = null as any;
    if (!insertRes.ok) {
      const errText = await insertRes.text().catch(() => '');
      // Fallback to snake_case columns if camelCase failed
      const insertResSnake = await fetch(insertUrl, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName, lastName, phone,
          street, houseNumber, apartment, postalCode, city, state,
          country: 'Deutschland'
        })
      });
      if (!insertResSnake.ok) {
        const errText2 = await insertResSnake.text().catch(() => '');
        return new Response(JSON.stringify({ error: `users insert failed: ${insertRes.status} ${errText} | snake_case: ${insertResSnake.status} ${errText2}` }), { status: 500, headers: { 'content-type': 'application/json' } });
      }
      const createdArrSnake = await insertResSnake.json();
      created = Array.isArray(createdArrSnake) ? createdArrSnake[0] : createdArrSnake;
    } else {
      const createdArr = await insertRes.json();
      created = Array.isArray(createdArr) ? createdArr[0] : createdArr;
    }

    // Generate simple permanent token (base64 JSON like old app)
    const token = Buffer.from(JSON.stringify({ userId: created.id, timestamp: Date.now() })).toString('base64');

    return new Response(JSON.stringify({
      success: true,
      message: 'User registered successfully',
      token,
      user: created,
    }), { headers: { 'content-type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};



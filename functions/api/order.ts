type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestPost: PagesFunction = async (ctx) => {
  const { request, env } = ctx;
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = env as any;

  const body = await request.json().catch(() => ({} as any));
  // Support both payload shapes: (user_id, items, total_cents, user) and (quantity, totalPrice, userId, userData)
  const user = body.user ?? body.userData;
  const finalUserId = body.user_id ?? body.userId ?? user?.id;
  const quantityFromItems = Array.isArray(body.items) && body.items.length > 0 ? (body.items[0]?.quantity ?? 1) : undefined;
  const quantity = body.quantity ?? quantityFromItems ?? 1;
  const totalCents = typeof body.total_cents === 'number' ? body.total_cents : undefined;
  const totalPriceBody = typeof body.totalPrice === 'number' ? body.totalPrice : undefined;

  if (!finalUserId) {
    return new Response('Bad payload: user not provided', { status: 400 });
  }

  // Import supabase-js v2 ESM from CDN
  // @ts-ignore - Using runtime ESM import from CDN in Pages Functions environment
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    global: { fetch },
  });

  // Map to your orders schema used in the app
  const totalPriceComputed = typeof totalCents === 'number' ? totalCents / 100 : totalPriceBody;
  const finalTotal = totalPriceComputed ?? quantity * 3.5;

  const payload = {
    userId: finalUserId,
    productName: 'Traditionelles Barbari-Brot',
    quantity,
    totalPrice: finalTotal,
    totalAmount: finalTotal,
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    street: user?.street,
    houseNumber: user?.houseNumber,
    apartment: user?.apartment,
    postalCode: user?.postalCode,
    city: user?.city,
    state: user?.state,
    status: 'confirmed',
  } as Record<string, any>;

  const { data, error } = await supabase
    .from('orders')
    .insert(payload)
    .select()
    .single();

  if (error) return new Response(error.message, { status: 500 });
  return Response.json({ order: data });
};



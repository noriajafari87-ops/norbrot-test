type PagesFunction = (ctx: any) => Promise<Response>;

function verifyToken(token: string | null): number | null {
  if (!token) return null;
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.userId || null;
  } catch {
    return null;
  }
}

export const onRequestGet: PagesFunction = async ({ request }) => {
  const auth = request.headers.get('authorization');
  const token = auth?.replace('Bearer ', '') || null;
  const userId = verifyToken(token);
  return new Response(JSON.stringify({ authenticated: !!userId, userId: userId || undefined }), {
    headers: { 'content-type': 'application/json' }
  });
};



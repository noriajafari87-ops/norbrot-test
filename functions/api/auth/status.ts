type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestGet: PagesFunction = async () => {
  return new Response(JSON.stringify({ authenticated: false }), {
    headers: { 'content-type': 'application/json' }
  });
};



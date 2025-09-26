type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestGet: PagesFunction = async () => {
  // Frontend uses localStorage token; server cannot see it. Return false.
  return new Response(JSON.stringify({ authenticated: false }), {
    headers: { 'content-type': 'application/json' }
  });
};



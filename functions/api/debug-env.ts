type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestGet: PagesFunction = async ({ env }) => {
  const data = {
    hasUrl: !!(env as any)?.SUPABASE_URL,
    hasAnon: !!(env as any)?.SUPABASE_ANON_KEY,
    hasService: !!(env as any)?.SUPABASE_SERVICE_ROLE,
  };
  return Response.json(data);
};



type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  // Alias to the same logic as /api/order for backward compatibility with frontend
  // Importing the module at runtime to avoid duplication
  const mod = await import('./order');
  return mod.onRequestPost({ request, env } as any);
};



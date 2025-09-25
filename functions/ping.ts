type PagesFunction = (ctx: any) => Promise<Response>;

export const onRequestGet: PagesFunction = async () => {
  return new Response("ok", {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};



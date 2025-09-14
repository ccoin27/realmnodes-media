export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  if (url.pathname === '/images/allay.gif') {
    return context.env.ASSETS.fetch(
      new URL('/images/allay.gif', request.url)
    );
  }
  
  return new Response('Not found', { status: 404 });
}
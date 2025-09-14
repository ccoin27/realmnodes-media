export async function onRequest(context) {
  const { params } = context;
  const path = params.path.join('/');
  
  if (!path.startsWith('images/')) {
    return new Response('Not found', { status: 404 });
  }

  if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(path)) {
    return new Response('Invalid file type', { status: 400 });
  }

  try {
    return await context.env.ASSETS.fetch(
      new URL(`/${path}`, context.request.url)
    );
  } catch (error) {
    return new Response('Image not found', { status: 404 });
  }
}

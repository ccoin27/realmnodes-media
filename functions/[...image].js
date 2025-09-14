export async function onRequest(context) {
  const { params } = context;
  const imageName = params.image.join('/');
  
  if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(imageName)) {
    return new Response('Not found', { status: 404 });
  }

  return context.env.ASSETS.fetch(
    new URL(`/images/${imageName}`, context.request.url)
  );
}
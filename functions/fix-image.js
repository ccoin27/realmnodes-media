export async function onRequest(context) {

  const imageResponse = await context.env.ASSETS.fetch(
    'https://storage.realmnodes.space/images/allay.gif'
  );
  
  return new Response(imageResponse.body, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

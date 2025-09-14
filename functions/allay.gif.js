export async function onRequest(context) {
  return context.env.ASSETS.fetch(
    new URL('/images/allay.gif', context.request.url)
  );
}

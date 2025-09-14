export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Только для путей начинающихся с /images/
  if (url.pathname.startsWith('/images/')) {
    try {
      const response = await context.env.ASSETS.fetch(
        new URL(url.pathname, request.url)
      );
      
      // Принудительно устанавливаем заголовки
      const headers = new Headers(response.headers);
      headers.set('Content-Type', getContentType(url.pathname));
      headers.set('Cache-Control', 'public, max-age=3600');
      
      return new Response(response.body, {
        status: response.status,
        headers: headers
      });
    } catch (error) {
      return new Response('Image not found', { status: 404 });
    }
  }
  
  // Для всех остальных запросов - 404
  return new Response('Not found', { status: 404 });
}

function getContentType(path) {
  if (path.endsWith('.gif')) return 'image/gif';
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.webp')) return 'image/webp';
  return 'application/octet-stream';
}

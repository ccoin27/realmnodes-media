export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return new Response(JSON.stringify({ error: "Изображение не передано" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Проверяем тип (разрешаем только изображения)
    if (!file.type.startsWith("image/")) {
      return new Response(JSON.stringify({ error: "Можно загружать только изображения" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const fileName = Date.now() + "-" + file.name;
    await context.env.IMAGES_BUCKET.put(fileName, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    return new Response(JSON.stringify({ success: true, fileName }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

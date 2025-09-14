const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Разрешаем все изображения из папки public/images
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const allowedExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(filename).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return res.status(400).send('Invalid file type');
  }

  const filePath = path.join(__dirname, 'public', 'images', filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Not found');
  }

  const contentType = {
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp'
  }[ext];

  res.sendFile(filePath, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

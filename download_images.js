const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const { URL } = require('url');

const dir = path.join(__dirname, 'client', 'public', 'images');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const downloadImage = (url, filename, redirectsLeft = 5) => {
  const filepath = path.join(dir, filename);
  const u = new URL(url);
  const lib = u.protocol === 'http:' ? http : https;
  const options = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
  };

  const req = lib.get(url, options, (response) => {
    if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
      const location = response.headers.location;
      if (location && redirectsLeft > 0) {
        response.resume();
        const nextUrl = new URL(location, url).toString();
        downloadImage(nextUrl, filename, redirectsLeft - 1);
      } else {
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        console.error(`❌ Redirect failed for ${filename}`);
      }
      return;
    }

    if (response.statusCode !== 200) {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      console.error(`❌ Failed: ${filename} (Status: ${response.statusCode})`);
      response.resume();
      return;
    }

    const contentType = String(response.headers['content-type'] || '');
    if (!contentType.startsWith('image')) {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      console.error(`❌ Invalid content-type for ${filename}: ${contentType}`);
      response.resume();
      return;
    }

    const file = fs.createWriteStream(filepath);
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`✅ Downloaded ${filename}`);
    });

    file.on('error', (err) => {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      console.error(`❌ File error: ${err.message}`);
    });
  });

  req.setTimeout(15000, () => {
    req.destroy(new Error('Request timeout'));
  });

  req.on('error', (err) => {
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    console.error(`❌ Error downloading ${filename}: ${err.message}`);
  });
};

const images = [
  {
    url: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1920&q=80',
    name: 'hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    name: 'silk.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
    name: 'cotton.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    name: 'linen.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80',
    name: 'velvet.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
    name: 'wool.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584677626646-7c8f83690304?auto=format&fit=crop&w=1200&q=80',
    name: 'denim.jpg'
  }
];

console.log('🚀 Starting image downloads...\n');

images.forEach(img => downloadImage(img.url, img.name));

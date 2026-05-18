import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const blogs = [
  {
    slug: 'erbium-yag-laser-guide',
    oldUrl: 'https://the-oneclinic.co.uk/blog/erbium-yag-laser-guide/',
    imageName: 'Erbium-YAG-Laser-Guide-Featured-Image.jpg'
  },
  {
    slug: 'endolift-side-effects',
    oldUrl: 'https://the-oneclinic.co.uk/blog/endolift-side-effects/',
    imageName: 'Endolift-Side-Effects-Featured-Image.jpg'
  },
  {
    slug: 'how-long-do-endolift-results-last',
    oldUrl: 'https://the-oneclinic.co.uk/blog/how-long-do-endolift-results-last/',
    imageName: 'How-Long-Does-Endolift-Last-Featured-Image.jpg'
  },
  {
    slug: 'how-much-does-endolift-cost',
    oldUrl: 'https://the-oneclinic.co.uk/blog/how-much-does-endolift-cost/',
    imageName: 'How-Much-Does-Endolift-Cost-Featured-Image.jpg'
  },
  {
    slug: 'endolift-aftercare-guide',
    oldUrl: 'https://the-oneclinic.co.uk/blog/endolift-aftercare-guide/',
    imageName: 'Endolift-Aftercare-Guide-Featured-Image.jpg'
  }
];

const imgDir = path.join(process.cwd(), 'public/images');

function fetchImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, { redirect: 'follow' }, (res) => {
      if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      } else {
        reject(new Error(`Status ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function downloadImages() {
  console.log('Ready to download images from old website.\n');
  console.log('To download images, run:');
  console.log('node scripts/download-blog-images-from-old-site.mjs --download\n');
  
  if (process.argv[2] !== '--download') {
    console.log('Blogs pending image download:');
    blogs.forEach(b => {
      console.log(`  - ${b.slug}`);
      console.log(`    Old URL: ${b.oldUrl}`);
      console.log(`    Image: ${b.imageName}`);
    });
    return;
  }

  console.log('Downloading images...\n');
  
  for (const blog of blogs) {
    try {
      // Try to fetch from the old website's images
      const imageUrl = `${blog.oldUrl.replace('/blog/', '/images/').split('?')[0]}${blog.imageName.split('-Featured-Image')[0]}-featured-image.jpg`;
      console.log(`Downloading: ${imageUrl}`);
      
      const buffer = await fetchImage(imageUrl);
      const filepath = path.join(imgDir, blog.imageName);
      fs.writeFileSync(filepath, buffer);
      console.log(`✓ Saved: ${blog.imageName}\n`);
    } catch (err) {
      console.log(`✗ Failed to download ${blog.slug}: ${err.message}`);
      console.log(`  Manual download needed from: ${blog.oldUrl}\n`);
    }
  }
}

downloadImages().catch(console.error);

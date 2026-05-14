const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const blogsFile = path.join(__dirname, '../blogs.json');
const imageDir = path.join(__dirname, '../public/blog-images');

// Ensure blog-images directory exists
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
  console.log(`✓ Created directory: ${imageDir}`);
}

// Read blogs.json
const blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf-8'));

// Extract unique image URLs
const imageUrlSet = new Set();
const urlMapping = new Map(); // Map full URL to local path

blogs.forEach((post) => {
  const matches = post.content.match(/src="([^"]*the-oneclinic\.co\.uk\/wp-content\/uploads\/[^"]*)"/g);
  if (matches) {
    matches.forEach((match) => {
      const url = match.match(/src="([^"]*)"/)[1];
      imageUrlSet.add(url);
    });
  }
});

const imageUrls = Array.from(imageUrlSet);
console.log(`\nFound ${imageUrls.length} unique image URLs to process\n`);

let downloaded = 0;
let skipped = 0;
let failed = 0;

// Download each image
const downloadPromises = imageUrls.map((fullUrl) => {
  return new Promise((resolve) => {
    try {
      // Extract filename from URL
      const urlParts = fullUrl.split('/');
      let filename = urlParts[urlParts.length - 1];

      // Decode URL-encoded characters
      filename = decodeURIComponent(filename);

      const localPath = path.join(imageDir, filename);
      const relativePath = `/blog-images/${filename}`;

      // Store mapping
      urlMapping.set(fullUrl, relativePath);

      // Check if file already exists
      if (fs.existsSync(localPath)) {
        console.log(`⊘ SKIPPED: ${filename} (already exists)`);
        skipped++;
        return resolve();
      }

      // Download the image
      const protocol = fullUrl.startsWith('https') ? https : http;
      const urlObj = new URL(`https://${fullUrl}`); // Ensure https

      protocol.get(urlObj.toString(), (response) => {
        if (response.statusCode !== 200) {
          console.log(`✗ FAILED: ${filename} (HTTP ${response.statusCode})`);
          failed++;
          return resolve();
        }

        const fileStream = fs.createWriteStream(localPath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ DOWNLOADED: ${filename}`);
          downloaded++;
          resolve();
        });

        fileStream.on('error', (err) => {
          fs.unlink(localPath, () => {}); // Delete partial file
          console.log(`✗ FAILED: ${filename} (${err.message})`);
          failed++;
          resolve();
        });
      }).on('error', (err) => {
        console.log(`✗ FAILED: ${filename} (${err.message})`);
        failed++;
        resolve();
      });
    } catch (error) {
      console.log(`✗ FAILED: Error processing URL (${error.message})`);
      failed++;
      resolve();
    }
  });
});

// Wait for all downloads to complete
Promise.all(downloadPromises).then(() => {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  // Update blogs.json with new image URLs
  console.log('Updating blogs.json with local image URLs...\n');

  blogs.forEach((post) => {
    let updatedContent = post.content;

    urlMapping.forEach((localPath, fullUrl) => {
      const regex = new RegExp(`src="${fullUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
      updatedContent = updatedContent.replace(regex, `src="${localPath}"`);
    });

    post.content = updatedContent;
  });

  // Write updated blogs.json
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
  console.log('✓ Updated blogs.json with local image paths');
  console.log('\nDone!');
});

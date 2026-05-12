const fs = require('fs');
const path = require('path');

const blogsFile = path.join(__dirname, '../blogs.json');
const blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf-8'));

// Map of /blog-images/ filenames to /images/ paths
const imageMap = {
  '/blog-images/How-to-get-rid-of-jowls-infographic-showing-non-surgical-treatments-like-Endolift-laser-fillers-RF-thread-lifts-and-jawline-slimming.png': '/images/How-to-get-rid-of-jowls-infographic-showing-non-surgical-treatments-like-Endolift-laser-fillers-RF-thread-lifts-and-jawline-slimming.png',
  '/blog-images/Woman-applying-SPF-sunscreen-with-a-protective-shield-graphic-on-her-face-highlighting-sun-protection-for-maintaining-Endolift-results.jpg': '/images/Woman-applying-SPF-sunscreen-with-a-protective-shield-graphic-on-her-face-highlighting-sun-protection-for-maintaining-Endolift-results.jpg',
  '/blog-images/📸-Endolift-–-Incredible-Before-After-Results✨Wondering-what-Endolift-can-do-for-you-Here-are-1-1.jpg': '/images/📸-Endolift-–-Incredible-Before-After-Results✨Wondering-what-Endolift-can-do-for-you-Here-are-1-1 - Copy.jpg',
  '/blog-images/Endolift-before-after.jpg': '/images/Endolift-before-after.jpg',
  '/blog-images/Endolift-before-after-real-result.jpg': '/images/Endolift-before-after-real-result.jpg',
  '/blog-images/Endolift-laser-before-after.jpg': '/images/Endolift-laser-before-after.jpg'
};

blogs.forEach((post) => {
  let updatedContent = post.content;

  // Replace all image paths
  Object.entries(imageMap).forEach(([oldPath, newPath]) => {
    updatedContent = updatedContent.split(oldPath).join(newPath);
  });

  post.content = updatedContent;
});

fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
console.log('✓ Updated blogs.json with /images/ paths');

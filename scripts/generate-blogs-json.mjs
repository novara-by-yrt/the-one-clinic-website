import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../content/blog');

function calculateReadingTime(markdown) {
  const wordCount = markdown.trim().split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

function getAllPosts() {
  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      return {
        ...data,
        content,
        readingTime: calculateReadingTime(content)
      };
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  return posts;
}

const posts = getAllPosts();
fs.writeFileSync(
  path.join(__dirname, '../blogs.json'),
  JSON.stringify(posts, null, 2)
);

console.log(`Generated blogs.json with ${posts.length} posts`);
posts.forEach(p => console.log(`  - ${p.title}`));

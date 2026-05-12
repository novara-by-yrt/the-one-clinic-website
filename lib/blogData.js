import posts from '../blogs.json';

export { posts };

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getExcerpt(post, maxLength = 150) {
  if (post.excerpt && post.excerpt.trim()) return post.excerpt;
  const plain = post.content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return plain.length > maxLength ? plain.slice(0, maxLength).trimEnd() + '…' : plain;
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatAuthor(raw) {
  return raw
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());
}

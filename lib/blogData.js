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

const AUTHOR_NAMES = {
  carteremily:  'Carter Emily',
  SumitVirmani: 'Sumit Virmani',
  adam_admin:   'Adam Valera',
};

export function formatAuthor(raw) {
  return AUTHOR_NAMES[raw] ?? raw;
}

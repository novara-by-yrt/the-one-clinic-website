import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts, getPostBySlug, formatDate, formatAuthor } from '@/lib/blogData';
import BookCta from './BookCta';
import CallbackTrigger from '@/components/blog/CallbackTrigger';
import ContentWithCTAs from './ContentWithCTAs';

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | The One Clinic Blog`,
    description: post.excerpt || post.content.replace(/<[^>]+>/g, '').slice(0, 160),
  };
}

function cleanHtml(html) {
  return html
    .replace(/style="[^"]*"/g, '')
    .replace(/<a\s+href="https:\/\/the-oneclinic\.co\.uk\/contact\/[^"]*"[^>]*>([\s\S]*?)<\/a>/gi,
      '<a href="/contact" class="internal-cta">$1</a>')
    .replace(/<a\s+href="https:\/\/the-oneclinic\.co\.uk\/([^"]*)"[^>]*>/gi,
      '<a href="/$1">');
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = cleanHtml(post.content);
  const hasContent = html.trim().length > 0;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#090909] pt-28 pb-14 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white/80 transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Articles
          </Link>

          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] font-bold tracking-widest uppercase text-white/50 bg-white/10 rounded-full px-3 py-1"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-white/40">
            <span className="font-semibold text-white/70">{formatAuthor(post.author)}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="w-full h-96 bg-neutral-100 relative overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-neutral-100" />

      {/* Article body - Two column layout for all blogs on desktop */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* Desktop: Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.35fr] gap-8 lg:gap-12">
          {/* Left column - Content */}
          <article>
            {hasContent ? (
              <>
                {/* Split content and insert CTAs in the middle */}
                <ContentWithCTAs html={html} />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-neutral-600 text-base mb-6">
                  This article content is not yet available. Please visit the original article to read the full content.
                </p>
                <a
                  href={post.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-900 border border-neutral-200 rounded-full px-6 py-3 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors duration-200"
                >
                  Read on original site
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 2h10M12 2v10M2 12L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            )}

            {/* CTA card */}
            {hasContent && <BookCta />}

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-neutral-100">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to all articles
              </Link>
            </div>
          </article>

          {/* Right column - Sticky form (hidden on mobile/tablet) */}
          <div className="hidden lg:block">
            <div className="sticky" style={{ top: '6rem' }}>
              <CallbackTrigger />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Form below content */}
        <div className="lg:hidden mt-12 pt-12 border-t border-neutral-100">
          <div className="mb-8">
            <CallbackTrigger />
          </div>
        </div>
      </div>
    </main>
  );
}

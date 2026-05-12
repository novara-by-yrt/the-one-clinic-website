import Link from 'next/link';
import { posts, getExcerpt, formatDate, formatAuthor } from '@/lib/blogData';

export const metadata = {
  title: 'Blog | The One Clinic Leicester',
  description:
    'Expert advice, treatment guides and health insights from the doctors at The One Clinic, Leicester.',
};

export default function BlogListingPage() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#090909] pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
            The One Clinic
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Expert Insights &amp;{' '}
            <em className="font-normal italic" style={{ fontFamily: 'Georgia, serif' }}>
              Advice
            </em>
          </h1>
          <p className="mt-4 text-white/55 text-base max-w-xl mx-auto leading-relaxed">
            Treatment guides, health tips and clinic news from our doctors in Leicester.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Category ribbon */}
              <div className="px-6 pt-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 bg-neutral-100 rounded-full px-3 py-1"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg font-bold text-neutral-900 leading-snug mb-2 group-hover:text-neutral-600 transition-colors">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                  {getExcerpt(post)}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-auto px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-neutral-700">{formatAuthor(post.author)}</p>
                  <p className="text-xs text-neutral-400">{formatDate(post.date)}</p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold uppercase tracking-widest text-neutral-900 border border-neutral-200 rounded-full px-4 py-2 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors duration-200"
                >
                  Read
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

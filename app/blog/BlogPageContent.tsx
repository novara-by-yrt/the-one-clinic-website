'use client';

import { motion } from 'framer-motion';
import BlogCard from '@/components/blog/BlogCard';
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion';
import type { BlogPost } from '@/lib/blog';
import styles from './page.module.css';

interface BlogPageContentProps {
  posts: BlogPost[];
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  return (
    <motion.div
      className={styles.blogGrid}
      variants={stagger(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={fadeUp}>
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}

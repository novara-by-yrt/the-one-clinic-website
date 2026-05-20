import { CLINIC } from './schema/clinic';
import { getTeamMemberByName } from '@/data/team';
import type { BlogPost } from './blog';

/**
 * Generate Article JSON-LD schema for blog posts
 */
export function generateArticleSchema(post: BlogPost, siteUrl: string) {
  const author = getTeamMemberByName(post.author);
  const reviewer = post.medicalReviewer
    ? getTeamMemberByName(post.medicalReviewer)
    : null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.heroImage.startsWith('http')
      ? post.heroImage
      : `${siteUrl}${post.heroImage}`,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt || post.publishedAt).toISOString(),
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          url: `${siteUrl}/team/${author.slug}`,
          jobTitle: author.role,
          identifier: author.gmcNumber
            ? { '@type': 'PropertyValue', propertyID: 'GMC', value: author.gmcNumber }
            : undefined,
        }
      : {
          '@type': 'Person',
          name: post.author,
        },
    publisher: {
      '@type': 'LocalBusiness',
      name: CLINIC.name,
      url: siteUrl,
      logo: `${siteUrl}${CLINIC.logo}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINIC.address.streetAddress,
        addressLocality: CLINIC.address.addressLocality,
        postalCode: CLINIC.address.postalCode,
        addressCountry: CLINIC.address.addressCountry,
      },
    },
    creator: [
      {
        '@type': 'Person',
        name: post.author,
      },
      ...(reviewer && post.reviewedAt
        ? [
            {
              '@type': 'Person',
              name: post.medicalReviewer,
              role: 'Medical Reviewer',
              dateReviewed: new Date(post.reviewedAt).toISOString(),
            },
          ]
        : []),
    ],
  };

  return schema;
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(
  post: BlogPost,
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };
}

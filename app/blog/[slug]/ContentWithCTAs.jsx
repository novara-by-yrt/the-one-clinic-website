'use client';

import DoctorCTA1 from '@/components/blog/DoctorCTA1';
import DoctorCTA2 from '@/components/blog/DoctorCTA2';

function splitHtmlAtMiddle(html) {
  // Find all h2 and h3 tags to split at a section boundary
  const headingRegex = /<h2[^>]*>.*?<\/h2>/gi;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      text: match[0],
      index: match.index,
      endIndex: match.index + match[0].length,
    });
  }

  // If we have at least 2 headings, split after the first heading + some content
  if (headings.length >= 2) {
    // Split after the second heading for better content flow
    const splitPoint = headings[1].endIndex;
    return {
      firstPart: html.substring(0, splitPoint),
      secondPart: html.substring(splitPoint),
    };
  }

  // Fallback: split roughly in the middle by character count
  const middlePoint = Math.floor(html.length / 2);

  // Find the nearest closing tag after the middle point
  const nearbyContent = html.substring(middlePoint - 100, middlePoint + 100);
  const closingTagMatch = nearbyContent.match(/<\/p>|<\/li>|<\/h[1-6]>/);

  if (closingTagMatch) {
    const adjustedSplitPoint = middlePoint - 100 + nearbyContent.indexOf(closingTagMatch[0]) + closingTagMatch[0].length;
    return {
      firstPart: html.substring(0, adjustedSplitPoint),
      secondPart: html.substring(adjustedSplitPoint),
    };
  }

  // Fallback to simple middle split
  return {
    firstPart: html.substring(0, middlePoint),
    secondPart: html.substring(middlePoint),
  };
}

export default function ContentWithCTAs({ html }) {
  const { firstPart, secondPart } = splitHtmlAtMiddle(html);

  const proseClasses = `prose prose-neutral prose-lg max-w-none
    prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-neutral-900
    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
    prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
    prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:my-4
    prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-neutral-600
    prose-ul:my-4 prose-ul:space-y-1
    prose-li:text-neutral-700
    prose-strong:text-neutral-900 prose-strong:font-bold`;

  return (
    <>
      {/* First part of article */}
      <div className={proseClasses} dangerouslySetInnerHTML={{ __html: firstPart }} />

      {/* Doctor CTAs in the middle */}
      <DoctorCTA1 />
      <DoctorCTA2 />

      {/* Second part of article */}
      <div className={proseClasses} dangerouslySetInnerHTML={{ __html: secondPart }} />
    </>
  );
}

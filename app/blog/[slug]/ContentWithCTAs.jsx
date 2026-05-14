'use client';

import DoctorCTA1 from '@/components/blog/DoctorCTA1';
import DoctorCTA2 from '@/components/blog/DoctorCTA2';

function splitHtmlForCTAs(html) {
  // Find all h2 tags to position CTAs strategically
  const h2Regex = /<h2[^>]*>.*?<\/h2>/gi;
  const h2Matches = [];
  let match;

  while ((match = h2Regex.exec(html)) !== null) {
    h2Matches.push({
      text: match[0],
      index: match.index,
      endIndex: match.index + match[0].length,
    });
  }

  let doctorCTA1Point = null;
  let doctorCTA2Point = null;

  // Place DoctorCTA1 before the first h2 heading (after intro)
  if (h2Matches.length > 0) {
    doctorCTA1Point = h2Matches[0].index;
  } else {
    // Fallback: split roughly in the middle
    doctorCTA1Point = Math.floor(html.length / 2);
  }

  // Place DoctorCTA2 near the end (before last 10% of content)
  doctorCTA2Point = Math.floor(html.length * 0.85);

  return {
    firstPart: html.substring(0, doctorCTA1Point),
    middlePart: html.substring(doctorCTA1Point, doctorCTA2Point),
    lastPart: html.substring(doctorCTA2Point),
  };
}

export default function ContentWithCTAs({ html }) {
  const { firstPart, middlePart, lastPart } = splitHtmlForCTAs(html);

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
      {/* First part of article (intro + first section) */}
      <div className={proseClasses} dangerouslySetInnerHTML={{ __html: firstPart }} />

      {/* DoctorCTA1 - above first major section */}
      <DoctorCTA1 />

      {/* Middle part of article */}
      <div className={proseClasses} dangerouslySetInnerHTML={{ __html: middlePart }} />

      {/* DoctorCTA2 - near the end (before FAQ/conclusion) */}
      <DoctorCTA2 />

      {/* Last part of article */}
      <div className={proseClasses} dangerouslySetInnerHTML={{ __html: lastPart }} />
    </>
  );
}

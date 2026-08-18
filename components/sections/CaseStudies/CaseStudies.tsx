'use client';

import BeforeAfterSlideshow from '@/components/sections/BeforeAfterSlideshow';

const SLIDES_BASE = [
  // Endolift
  { src: '/images/Endolift B-A.jpg',                  title: 'Endolift',               alt: 'Endolift before and after results' },
  { src: '/images/Endolift 1 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 1' },
  { src: '/images/Endolift 2 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 2' },
  { src: '/images/Endolift 3 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 3' },
  { src: '/images/Endolift 4 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 4' },
  { src: '/images/Endolift 5 B-A.jpg',                title: 'Endolift',               alt: 'Endolift before and after result 5' },
  { src: '/images/Endolift Before & After 1.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 2.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 3.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 4.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 5.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 6.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 7.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  { src: '/images/Endolift Before & After 8.jpg',     title: 'Endolift',               alt: 'Endolift before and after result' },
  // Lumecca / IPL
  { src: '/images/Lumecca Before & After 2.jpg',      title: 'Lumecca Laser',          alt: 'Lumecca laser before and after results' },
  { src: '/images/Lumecca IPL B-A.jpg',               title: 'Lumecca IPL',            alt: 'Lumecca IPL before and after results' },
  // Anti-Wrinkle Injections
  { src: '/images/Botox Before & After.jpg',          title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Botox Before & After-1.jpg',        title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Botox Before & After-2.jpg',        title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Botox Before & After-3.jpg',        title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Botox Before & After-4.jpg',        title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Botox Before & After-5.jpg',        title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Botox Before & After-6.jpg',        title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Botox Before & After-7.jpg',        title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Botox Before & After-8.jpg',        title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Botox Before & After-9.jpg',        title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  { src: '/images/Wrinkle Relaxing Injections BA.jpg', title: 'Anti-Wrinkle Injections', alt: 'Anti-wrinkle injections before and after results' },
  // Morpheus 8
  { src: '/images/Morpheus8 Before & After 1.jpg',    title: 'Morpheus 8',             alt: 'Morpheus 8 before and after result' },
  { src: '/images/Morpheus8 Before & After 2.jpg',    title: 'Morpheus 8',             alt: 'Morpheus 8 before and after results' },
  { src: '/images/Morpheus8 Before & After 3.jpg',    title: 'Morpheus 8',             alt: 'Morpheus 8 before and after result' },
  { src: '/images/Morpheus8 1 B-A.jpg',               title: 'Morpheus 8',             alt: 'Morpheus8 before and after result 1' },
  { src: '/images/Morpheus8 2  B-A.jpg',              title: 'Morpheus 8',             alt: 'Morpheus8 before and after result 2' },
  // Hydrafacial
  { src: '/images/Hydrafacial  Before & After 1.jpg', title: 'Hydrafacial',            alt: 'Hydrafacial before and after results' },
  { src: '/images/Hydrafacial  Before & After 2.jpg', title: 'Hydrafacial',            alt: 'Hydrafacial before and after results' },
  // Lip Filler / Filler
  { src: '/images/Lip Filler  Before & After.jpg',    title: 'Lip Filler',             alt: 'Lip filler before and after results' },
  { src: '/images/Lip Filler  Before & After 4.jpg',  title: 'Lip Filler',             alt: 'Lip filler before and after results' },
  { src: '/images/Lip Filler  Before & After 6.jpg',  title: 'Lip Filler',             alt: 'Lip filler before and after results' },
  { src: '/images/Filler  Before & After 1.jpg',      title: 'Filler',                 alt: 'Filler before and after results' },
  { src: '/images/Filler  Before & After 2.jpg',      title: 'Filler',                 alt: 'Filler before and after results' },
  // Non-Surgical Rhinoplasty
  { src: '/images/Non surgical rhinoplasty  Before & After.jpg',  title: 'Non-Surgical Rhinoplasty', alt: 'Non-surgical rhinoplasty before and after results' },
  { src: '/images/Non surgical rhinoplasty  Before & After1.jpg', title: 'Non-Surgical Rhinoplasty', alt: 'Non-surgical rhinoplasty before and after results' },
  // Pigmentation
  { src: '/images/Pigmentation Before & After 1.jpg', title: 'Pigmentation',           alt: 'Pigmentation treatment before and after' },
  { src: '/images/Pigmentation Before & After 2.jpg', title: 'Pigmentation Treatment', alt: 'Pigmentation treatment before and after' },
  // Other
  { src: '/images/Mole Removal Before & After.jpg',   title: 'Mole Removal',           alt: 'Mole removal before and after results' },
  { src: '/images/ACNE Before & After.jpg',           title: 'Acne Treatment',         alt: 'Acne treatment before and after results' },
  // Patient Results
  { src: '/images/B-A2.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A4.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A6.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A7.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A8.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
  { src: '/images/B-A9.png',                          title: 'Patient Results',        alt: 'Patient before and after results' },
];

export default function CaseStudies() {
  return (
    <BeforeAfterSlideshow
      id="results"
      chip="Patient Outcomes"
      heading="Real Transformations"
      description="Helping patients achieve confidence and long-term results, one personalised treatment at a time."
      images={SLIDES_BASE}
      cta={{ href: '/results', label: 'View More Results' }}
    />
  );
}

import type { Metadata } from 'next';
import SkinAnalysisPage from './SkinAnalysisPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/skin-analysis-leicester' },
  title: 'Skin Analysis, Life Viz 3D Camera Leicester',
  description: 'Advanced 3D skin analysis with the Life Viz camera in Leicester. Understand your skin at a deeper level and create a truly personalised treatment plan at The…',
  openGraph: {
    title: 'Skin Analysis, Life Viz 3D Camera Leicester',
    description:
      'Precision 3D skin analysis in Leicester. See beneath the surface and build a bespoke treatment plan with our expert team at The One Clinic.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skin Analysis, Life Viz 3D Camera Leicester',
    description:
      'Precision 3D skin analysis in Leicester. See beneath the surface and build a bespoke treatment plan with our expert team at The One Clinic.',
  },
};

export default function Page() {
  return <SkinAnalysisPage />;
}

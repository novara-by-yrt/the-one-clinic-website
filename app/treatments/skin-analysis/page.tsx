import type { Metadata } from 'next';
import SkinAnalysisPage from './SkinAnalysisPage';

export const metadata: Metadata = {
  title: 'Skin Analysis, Life Viz 3D Camera Leicester | The One Clinic',
  description:
    'Advanced 3D skin analysis with the Life Viz camera in Leicester. Understand your skin at a deeper level and create a truly personalised treatment plan at The One Clinic.',
  keywords: [
    'skin analysis Leicester',
    'Life Viz 3D camera Leicester',
    '3D skin analysis Leicester',
    'skin assessment Leicester',
    'personalised skincare Leicester',
    'facial analysis Leicester',
  ],
  openGraph: {
    title: 'Skin Analysis, Life Viz 3D Camera Leicester | The One Clinic',
    description:
      'Precision 3D skin analysis in Leicester. See beneath the surface and build a bespoke treatment plan with our expert team at The One Clinic.',
  },
};

export default function Page() {
  return <SkinAnalysisPage />;
}

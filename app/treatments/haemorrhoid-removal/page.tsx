import type { Metadata } from 'next';
import HaemorrhoidRemovalPage from './HaemorrhoidRemovalPage';

export const metadata: Metadata = {
  title: 'Haemorrhoid Removal Leicester | The One Clinic',
  description:
    'Expert haemorrhoid removal in Leicester performed by GMC-registered doctors. Surgical treatment for grades I–III under local anaesthetic — no hospital stay, same-day procedure.',
  keywords: [
    'haemorrhoid removal Leicester',
    'piles treatment Leicester',
    'haemorrhoidectomy Leicester',
    'rubber band ligation Leicester',
    'haemorrhoid surgery Leicester',
    'piles doctor Leicester',
    'haemorrhoid specialist Leicester',
    'private haemorrhoid treatment Leicester',
  ],
  openGraph: {
    title: 'Haemorrhoid Removal Leicester | The One Clinic',
    description:
      'Expert haemorrhoid removal in Leicester performed by GMC-registered doctors. Surgical treatment for grades I–III under local anaesthetic — no hospital stay, same-day procedure.',
  },
};

export default function Page() {
  return <HaemorrhoidRemovalPage />;
}

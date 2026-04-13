import type { Metadata } from 'next';
import MenopauseHRTPage from './MenopauseHRTPage';

export const metadata: Metadata = {
  title: "Menopause, HRT & Contraception Leicester | Women's Health | The One Clinic",
  description:
    "Private menopause assessment, HRT prescriptions, and contraception consultations in Leicester. Expert women's health care with GMC-registered doctors at The One Clinic.",
  keywords: [
    'menopause clinic Leicester',
    'HRT Leicester',
    'hormone replacement therapy Leicester',
    'contraception consultation Leicester',
    'perimenopause treatment Leicester',
    'menopause specialist Leicester',
    'contraception pill Leicester',
  ],
  openGraph: {
    title: "Menopause, HRT & Contraception Leicester | The One Clinic",
    description:
      "Expert menopause assessment, HRT management, and contraception advice in Leicester. Personalised women's health care at The One Clinic.",
  },
};

export default function Page() {
  return <MenopauseHRTPage />;
}

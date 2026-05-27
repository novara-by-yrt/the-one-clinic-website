import type { Metadata } from 'next';
import MenopauseHRTPage from './MenopauseHRTPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/menopause-hrt-leicester' },
  title: "Menopause, HRT & Contraception Leicester | Women's Health",
  description:
    "Private menopause assessment, HRT prescriptions, and contraception consultations in Leicester. Expert women's health care with GMC-registered doctors at The One Clinic.",
  openGraph: {
    title: "Menopause, HRT & Contraception Leicester",
    description:
      "Expert menopause assessment, HRT management, and contraception advice in Leicester. Personalised women's health care at The One Clinic.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menopause, HRT & Contraception Leicester',
    description:
      'Expert menopause assessment, HRT management, and contraception advice in Leicester. Personalised women',
  },
};

export default function Page() {
  return <MenopauseHRTPage />;
}

import type { Metadata } from 'next';
import WomensHealthPage from './WomensHealthPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/womens-health-leicester' },
  title: "Women's Health Clinic Leicester | Private GP for Women",
  description:
    "Private women's health consultations in Leicester. Expert care for contraception, cervical screening, menstrual health, fertility concerns, and general women's wellbeing at The One Clinic.",
  openGraph: {
    title: "Women's Health Clinic Leicester",
    description:
      "Confidential, expert women's health care in Leicester. Trusted female-friendly GP consultations at The One Clinic.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Women's Health Clinic Leicester",
    description:
      "Confidential, expert women's health care in Leicester. Trusted female-friendly GP consultations at The One Clinic.",
  },
};

export default function Page() {
  return <WomensHealthPage />;
}

import type { Metadata } from 'next';
import WomensHealthPage from './WomensHealthPage';

export const metadata: Metadata = {
  title: "Women's Health Clinic Leicester | Private GP for Women | The One Clinic",
  description:
    "Private women's health consultations in Leicester. Expert care for contraception, cervical screening, menstrual health, fertility concerns, and general women's wellbeing at The One Clinic.",
  keywords: [
    "women's health Leicester",
    "private women's health clinic Leicester",
    "female GP Leicester",
    "contraception consultation Leicester",
    "cervical screening Leicester",
    "menstrual health Leicester",
    "women's wellbeing Leicester",
  ],
  openGraph: {
    title: "Women's Health Clinic Leicester | The One Clinic",
    description:
      "Confidential, expert women's health care in Leicester. Trusted female-friendly GP consultations at The One Clinic.",
  },
};

export default function Page() {
  return <WomensHealthPage />;
}

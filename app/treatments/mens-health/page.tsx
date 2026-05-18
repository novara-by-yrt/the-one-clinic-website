import type { Metadata } from 'next';
import MensHealthPage from './MensHealthPage';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments/mens-health' },
  title: "Men's Health Clinic Leicester | Private GP for Men",
  description:
    "Private men's health consultations in Leicester. Expert care for testosterone, erectile dysfunction, prostate health, sexual health, and general men's wellbeing at The One Clinic.",
  openGraph: {
    title: "Men's Health Clinic Leicester",
    description:
      "Confidential, expert men's health care in Leicester. Discreet GP consultations for all aspects of male health at The One Clinic.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Men's Health Clinic Leicester",
    description:
      "Confidential, expert men's health care in Leicester. Discreet GP consultations for all aspects of male health at The One Clinic.",
  },
};

export default function Page() {
  return <MensHealthPage />;
}

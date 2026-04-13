import type { Metadata } from 'next';
import MensHealthPage from './MensHealthPage';

export const metadata: Metadata = {
  title: "Men's Health Clinic Leicester | Private GP for Men | The One Clinic",
  description:
    "Private men's health consultations in Leicester. Expert care for testosterone, erectile dysfunction, prostate health, sexual health, and general men's wellbeing at The One Clinic.",
  keywords: [
    "men's health Leicester",
    "private men's health clinic Leicester",
    'testosterone clinic Leicester',
    'erectile dysfunction Leicester',
    'prostate health Leicester',
    'male sexual health Leicester',
    "men's wellbeing Leicester",
  ],
  openGraph: {
    title: "Men's Health Clinic Leicester | The One Clinic",
    description:
      "Confidential, expert men's health care in Leicester. Discreet GP consultations for all aspects of male health at The One Clinic.",
  },
};

export default function Page() {
  return <MensHealthPage />;
}

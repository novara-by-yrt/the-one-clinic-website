import type { Metadata } from 'next';
import ContactPage from './ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us | The One Clinic Leicester',
  description:
    'Get in touch with The One Clinic in Leicester. Book a consultation, ask a question, or find us at 36 DeMontfort Street, Leicester LE1 7GS. Call 07481 342374.',
  keywords: [
    'contact The One Clinic',
    'book consultation Leicester',
    'aesthetic clinic Leicester contact',
    'The One Clinic address',
    'Leicester aesthetic clinic phone',
  ],
  openGraph: {
    title: 'Contact Us | The One Clinic Leicester',
    description:
      'Get in touch with The One Clinic. Book a consultation or ask a question — our team is ready to help.',
  },
};

export default function Page() {
  return <ContactPage />;
}

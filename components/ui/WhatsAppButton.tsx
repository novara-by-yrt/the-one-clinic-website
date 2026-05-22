'use client';

import { useState, useEffect } from 'react';
import styles from './WhatsAppButton.module.css';

const WHATSAPP_NUMBER = '447481342374';
const WHATSAPP_MESSAGE = 'Hello, I am interested in your services at The One Clinic.';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <button
      className={styles.whatsappButton}
      onClick={handleClick}
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.94 1.498c-1.538.92-2.64 2.227-2.913 3.882-.281 1.71.057 3.497 1.207 5.064 1.149 1.567 2.961 2.766 5.144 3.276 2.183.509 4.646.213 6.523-.882 1.877-1.095 3.235-2.787 3.652-4.768.417-1.981.052-4.137-1.076-5.812-1.128-1.675-2.96-2.787-5.152-2.958a9.87 9.87 0 00-1.501.048zm0-2.021C12.696.5 18.426 3.384 19.624 9.32c.565 2.77.197 5.744-1.064 8.336-1.261 2.593-3.439 4.608-6.04 5.584-2.602.976-5.626 1.078-8.31.289-2.683-.79-4.99-2.489-6.373-4.767-1.383-2.278-1.861-5.078-1.348-7.739.513-2.66 1.953-4.96 4.018-6.394 2.065-1.434 4.72-2.096 7.393-1.898z"/>
      </svg>
    </button>
  );
}

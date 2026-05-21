'use client';

import Image from 'next/image';
import Script from 'next/script';

export default function DoctorCTA3() {
  const handleClick = () => {
    window.dispatchEvent(new Event('openBookConsultationModal'));
  };

  return (
    <>
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      <div className="bg-black rounded-lg overflow-hidden my-3 md:my-4 lg:my-5">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-0 items-center">
          {/* Content */}
          <div className="p-3 md:p-4 lg:p-4 md:pr-2 flex flex-col justify-center order-2 md:order-1">
            <h3 className="text-sm md:text-base lg:text-lg font-extrabold mb-2 md:mb-2.5 text-white leading-snug text-center md:text-left" style={{ color: '#ffffff' }}>
              Take the Next Step in Your Aesthetic or Health Journey!
            </h3>

            <ul className="space-y-1 md:space-y-1.5 mb-3 text-xs" style={{ listStyle: 'none', marginLeft: 0 }}>
              <li className="flex items-start gap-2 text-white/90">
                <span className="text-white flex-shrink-0 mt-0.5">•</span>
                <span>Personalised treatments for your unique needs.</span>
              </li>
              <li className="flex items-start gap-2 text-white/90">
                <span className="text-white flex-shrink-0 mt-0.5">•</span>
                <span>Safe, effective, and natural-looking results.</span>
              </li>
              <li className="flex items-start gap-2 text-white/90">
                <span className="text-white flex-shrink-0 mt-0.5">•</span>
                <span>Expert guidance from our professionals.</span>
              </li>
            </ul>

            <button
              onClick={handleClick}
              className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors w-fit text-sm mx-auto md:mx-0"
            >
              Book a Consultation
            </button>
          </div>

          {/* Image with frame */}
          <div className="p-3 md:p-4 lg:p-4 order-1 md:order-2">
            <div className="relative aspect-square w-full rounded-md overflow-hidden bg-white">
              <Image
                src="/DR-GUNJAN.jpg"
                alt="Dr Gunjan Bedi"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                style={{ objectPosition: '50% 45%' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

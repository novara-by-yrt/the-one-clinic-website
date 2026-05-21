'use client';

import Image from 'next/image';
import Script from 'next/script';

export default function DoctorCTA1() {
  const handleClick = () => {
    window.dispatchEvent(new Event('openBookConsultationModal'));
  };

  return (
    <>
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      <div className="bg-black rounded-lg overflow-hidden my-6 lg:my-8">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-0 items-center">
          {/* Image with frame */}
          <div className="p-4 md:p-5 lg:p-6">
            <div className="relative aspect-square w-full rounded-md overflow-hidden bg-white">
              <Image
                src="/DR-SUMIT.jpg"
                alt="Dr Sumit Virmani"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-5 lg:p-6 md:pl-0 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-2 md:mb-3 text-white leading-tight" style={{ color: '#ffffff' }}>
              Look and Feel Your Best Every Day!
            </h3>

            <ul className="space-y-2 mb-4 text-sm md:text-base">
              <li className="flex items-start gap-2 text-white/90">
                <span className="text-white flex-shrink-0 mt-1">•</span>
                <span>Advanced facial, body, and hair treatments.</span>
              </li>
              <li className="flex items-start gap-2 text-white/90">
                <span className="text-white flex-shrink-0 mt-1">•</span>
                <span>Tailored solutions for lasting confidence.</span>
              </li>
              <li className="flex items-start gap-2 text-white/90">
                <span className="text-white flex-shrink-0 mt-1">•</span>
                <span>Caring support at every step.</span>
              </li>
            </ul>

            <button
              onClick={handleClick}
              className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors w-fit text-sm mx-auto md:mx-0"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

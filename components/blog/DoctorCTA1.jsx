'use client';

import Image from 'next/image';
import Script from 'next/script';

export default function DoctorCTA1() {
  const handleClick = () => {
    window.dispatchEvent(new Event('openCallbackModal'));
  };

  return (
    <>
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      <div className="bg-black rounded-lg overflow-hidden my-6 lg:my-8">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-0">
          {/* Image with white border */}
          <div className="relative h-56 md:h-60 lg:h-72 px-3 md:px-4 pt-0 pb-3 md:pb-4 flex items-center justify-center">
            <div className="relative w-full h-full border-3 border-white rounded-lg overflow-hidden">
              <Image
                src="/images/imgi_20_team-thumb-VIRMANI.jpg"
                alt="Dr Sumit Virmani"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-5 lg:p-6 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-2 md:mb-3 text-white leading-tight">
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
              className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors w-fit text-sm"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

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

      <div className="bg-black rounded-lg overflow-hidden my-10 lg:my-12">
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-0">
          {/* Image with white border */}
          <div className="relative h-60 md:h-72 lg:h-80 p-4 md:p-6 lg:p-8 flex items-center justify-center">
            <div className="relative w-full h-full border-4 border-white rounded-lg overflow-hidden">
              <Image
                src="/images/imgi_20_team-thumb-VIRMANI.jpg"
                alt="Dr Sumit Virmani"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-white leading-tight">
              Look and Feel Your Best Every Day!
            </h3>

            <ul className="space-y-3 mb-6 text-base md:text-lg">
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-white flex-shrink-0">•</span>
                <span>Advanced facial, body, and hair treatments.</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-white flex-shrink-0">•</span>
                <span>Tailored solutions for lasting confidence.</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-white flex-shrink-0">•</span>
                <span>Caring support at every step.</span>
              </li>
            </ul>

            <button
              onClick={handleClick}
              className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors w-fit text-base"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

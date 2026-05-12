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

      <div className="bg-black text-white rounded-lg overflow-hidden my-8 lg:my-10">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-0">
          {/* Image */}
          <div className="relative h-48 md:h-56 lg:h-64">
            <Image
              src="/images/imgi_20_team-thumb-VIRMANI.jpg"
              alt="Dr Sumit Virmani"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 lg:p-7 flex flex-col justify-center">
            <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold mb-3 leading-tight">
              Look and Feel Your Best Every Day!
            </h3>

            <ul className="space-y-2 mb-4 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-white/70 flex-shrink-0">•</span>
                <span className="text-white/90">Advanced facial, body, and hair treatments.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/70 flex-shrink-0">•</span>
                <span className="text-white/90">Tailored solutions for lasting confidence.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/70 flex-shrink-0">•</span>
                <span className="text-white/90">Caring support at every step.</span>
              </li>
            </ul>

            <button
              onClick={handleClick}
              className="bg-white text-black font-bold px-5 py-2 rounded-full hover:bg-gray-100 transition-colors w-fit text-xs md:text-sm"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

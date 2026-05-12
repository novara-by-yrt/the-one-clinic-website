'use client';

import Image from 'next/image';
import Script from 'next/script';

export default function DoctorCTA2() {
  const handleClick = () => {
    window.dispatchEvent(new Event('openCallbackModal'));
  };

  return (
    <>
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      <div className="bg-black rounded-lg overflow-hidden my-10 lg:my-12">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-0">
          {/* Content */}
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-white leading-tight">
              Take the Next Step in Your Aesthetic or Health Journey!
            </h3>

            <ul className="space-y-3 mb-6 text-base md:text-lg">
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-white flex-shrink-0">•</span>
                <span>Personalised treatments for your unique needs.</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-white flex-shrink-0">•</span>
                <span>Safe, effective, and natural-looking results.</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-white flex-shrink-0">•</span>
                <span>Expert guidance from our professionals.</span>
              </li>
            </ul>

            <button
              onClick={handleClick}
              className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors w-fit text-base"
            >
              Book a Consultation
            </button>
          </div>

          {/* Image with white border */}
          <div className="relative h-60 md:h-72 lg:h-80 p-4 md:p-6 lg:p-8 flex items-center justify-center order-1 md:order-2">
            <div className="relative w-full h-full border-4 border-white rounded-lg overflow-hidden">
              <Image
                src="/images/imgi_21_team-thumb-BEDI.jpg"
                alt="Dr Gunjan Bedi"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

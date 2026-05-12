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

      <div className="bg-black text-white rounded-lg overflow-hidden my-8 lg:my-10">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-0">
          {/* Content */}
          <div className="p-5 md:p-6 lg:p-7 flex flex-col justify-center order-2 md:order-1">
            <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold mb-3 leading-tight">
              Take the Next Step in Your Aesthetic or Health Journey!
            </h3>

            <ul className="space-y-2 mb-4 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-white/70 flex-shrink-0">•</span>
                <span className="text-white/90">Personalised treatments for your unique needs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/70 flex-shrink-0">•</span>
                <span className="text-white/90">Safe, effective, and natural-looking results.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/70 flex-shrink-0">•</span>
                <span className="text-white/90">Expert guidance from our professionals.</span>
              </li>
            </ul>

            <button
              onClick={handleClick}
              className="bg-white text-black font-bold px-5 py-2 rounded-full hover:bg-gray-100 transition-colors w-fit text-xs md:text-sm"
            >
              Book a Consultation
            </button>
          </div>

          {/* Image */}
          <div className="relative h-48 md:h-56 lg:h-64 order-1 md:order-2">
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
    </>
  );
}

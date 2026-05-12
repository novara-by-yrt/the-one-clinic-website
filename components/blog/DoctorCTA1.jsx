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

      <div className="bg-black text-white rounded-lg overflow-hidden my-12 lg:my-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-0">
          {/* Image */}
          <div className="relative h-64 md:h-80 lg:h-96">
            <Image
              src="/images/Doctor1.jpg"
              alt="Dr. Lead Specialist"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
              Look and Feel Your Best Every Day!
            </h3>

            <ul className="space-y-3 mb-6 text-base md:text-lg">
              <li className="flex items-start gap-3">
                <span className="text-white/70">•</span>
                <span className="text-white/90">Advanced facial, body, and hair treatments.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/70">•</span>
                <span className="text-white/90">Tailored solutions for lasting confidence.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/70">•</span>
                <span className="text-white/90">Caring support at every step.</span>
              </li>
            </ul>

            <button
              onClick={handleClick}
              className="bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors w-fit text-sm md:text-base"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

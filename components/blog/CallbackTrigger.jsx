'use client';

import Script from 'next/script';

export default function CallbackTrigger() {
  return (
    <>
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      <div className="bg-[#0a0a0a] rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Request a Call Back</h3>

        {/* LeadPipeline form iframe */}
        <iframe
          src="https://link.leadpipeline.ai/widget/form/Az3D8kxDVBz2diDQJ3uY"
          style={{
            width: '100%',
            height: '450px',
            border: 'none',
            borderRadius: '0.5rem'
          }}
          id="popup-callback-Az3D8kxDVBz2diDQJ3uY"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Book Consultation"
          data-height="450"
          data-layout-iframe-id="popup-callback-Az3D8kxDVBz2diDQJ3uY"
          data-form-id="Az3D8kxDVBz2diDQJ3uY"
          title="Request a Call Back"
        />
      </div>
    </>
  );
}

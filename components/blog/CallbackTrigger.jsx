'use client';

import Script from 'next/script';

export default function CallbackTrigger() {
  return (
    <>
      <Script src="https://link.leadpipeline.ai/js/form_embed.js" strategy="lazyOnload" />

      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 lg:p-7">
        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">Request a Call Back</h3>

        {/* LeadPipeline form iframe */}
        <div className="overflow-hidden rounded-md">
          <iframe
            src="https://link.leadpipeline.ai/widget/form/fegqbVjvGrZqMfbk64P4"
            style={{
              width: '100%',
              height: '650px',
              border: 'none',
              overflow: 'hidden',
            }}
            id="popup-callback-fegqbVjvGrZqMfbk64P4"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Request a Call Back Form"
            data-height="650"
            data-layout-iframe-id="popup-callback-fegqbVjvGrZqMfbk64P4"
            data-form-id="fegqbVjvGrZqMfbk64P4"
            title="Request a Call Back"
            scrolling="no"
          />
        </div>
      </div>
    </>
  );
}

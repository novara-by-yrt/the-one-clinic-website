'use client';

export default function CallbackTrigger() {
  const handleClick = () => {
    // Dispatch event to open the existing StickyCallbackCTA modal
    window.dispatchEvent(new Event('openCallbackModal'));
  };

  return (
    <div className="bg-[#0a0a0a] rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Request a Call Back</h3>
      <p className="text-white/70 text-sm mb-6 leading-relaxed">
        Interested in Endolift? Let our specialists discuss your treatment options and answer any questions you have.
      </p>
      <button
        onClick={handleClick}
        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M13.5 10.5l-2-2a1 1 0 00-1.4 0l-.9.9a8.2 8.2 0 01-3.1-3.1l.9-.9a1 1 0 000-1.4l-2-2A1 1 0 003.6 2L2.5 3.1C1.8 3.8 1.7 4.9 2.3 5.8a15.5 15.5 0 008 8c.9.5 2 .4 2.7-.3l1.1-1.1a1 1 0 00-.6-1.9z" fill="currentColor"/>
        </svg>
        Request a Call Back
      </button>
    </div>
  );
}

'use client';

export default function BookCta() {
  return (
    <div className="mt-14 rounded-2xl bg-[#090909] px-8 py-10 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
        The One Clinic Leicester
      </p>
      <h2 className="text-2xl font-extrabold text-white tracking-tight mb-3">
        Ready to Book a Consultation?
      </h2>
      <p className="text-white/55 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
        Speak with one of our doctors and discover the right treatment for you.
      </p>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('openBookConsultationModal'))}
        className="bg-white text-neutral-900 font-bold text-sm uppercase tracking-widest rounded-full px-8 py-3 hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
      >
        Book Your Consultation
      </button>
    </div>
  );
}

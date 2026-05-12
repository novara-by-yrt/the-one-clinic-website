'use client';

import { useState } from 'react';

export default function RequestCallbackForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interestedIn: 'Endolift',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/callback-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('✓ Thank you! We will be in touch soon.');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          interestedIn: 'Endolift',
          message: '',
        });
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitMessage('✗ Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('✗ Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="request-callback-form">
      <h3 className="text-xl font-bold text-white mb-6">Request a Call Back</h3>

      {/* Full Name */}
      <div className="mb-5">
        <label htmlFor="fullName" className="block text-sm text-white/80 mb-2 font-semibold">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full bg-transparent text-white border-b border-white/30 pb-2 focus:outline-none focus:border-white transition-colors placeholder-white/40"
          placeholder="Enter your full name"
        />
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label htmlFor="phone" className="block text-sm text-white/80 mb-2 font-semibold">
          Phone <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full bg-transparent text-white border-b border-white/30 pb-2 focus:outline-none focus:border-white transition-colors placeholder-white/40"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className="block text-sm text-white/80 mb-2 font-semibold">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-transparent text-white border-b border-white/30 pb-2 focus:outline-none focus:border-white transition-colors placeholder-white/40"
          placeholder="Enter your email"
        />
      </div>

      {/* Interested In */}
      <div className="mb-5">
        <label htmlFor="interestedIn" className="block text-sm text-white/80 mb-2 font-semibold">
          Interested In <span className="text-red-400">*</span>
        </label>
        <select
          id="interestedIn"
          name="interestedIn"
          value={formData.interestedIn}
          onChange={handleChange}
          required
          className="w-full bg-transparent text-white border-b border-white/30 pb-2 focus:outline-none focus:border-white transition-colors cursor-pointer appearance-none"
        >
          <option value="Endolift" className="bg-neutral-900">Endolift</option>
          <option value="Blepharoplasty" className="bg-neutral-900">Blepharoplasty</option>
          <option value="Laser Skin Resurfacing" className="bg-neutral-900">Laser Skin Resurfacing</option>
          <option value="HydraFacial" className="bg-neutral-900">HydraFacial</option>
          <option value="Wart & Verruca Removal" className="bg-neutral-900">Wart & Verruca Removal</option>
          <option value="Brown Spots" className="bg-neutral-900">Brown Spots</option>
          <option value="Other" className="bg-neutral-900">Other</option>
        </select>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm text-white/80 mb-2 font-semibold">
          Message <span className="text-gray-500 text-xs">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          className="w-full bg-transparent text-white border-b border-white/30 pb-2 focus:outline-none focus:border-white transition-colors resize-none placeholder-white/40"
          placeholder="Any additional information..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Request'}
      </button>

      {/* Submit Message */}
      {submitMessage && (
        <p className={`mt-4 text-sm text-center ${submitMessage.includes('✓') ? 'text-green-400' : 'text-red-400'}`}>
          {submitMessage}
        </p>
      )}
    </form>
  );
}

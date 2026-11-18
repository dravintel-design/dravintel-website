import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface FreeAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FreeAuditModal({ isOpen, onClose }: FreeAuditModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle form submission here
    console.log('Free audit request submitted:', formData);
    
    // Show success message or redirect
    alert('Thank you! We will contact you soon for your free audit.');
    
    // Reset form and close modal
    setFormData({ name: '', email: '', phone: '', website: '' });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/70 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div data-lenis-prevent className="bg-black text-white max-w-2xl w-full p-8 md:p-12 pointer-events-auto relative max-h-[90svh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close" className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="mb-8">
                <h2 className="dna-h2 text-white mb-5">
                  Let's Start Free
                </h2>
                <p className="dna-body text-white/70">
                  Get a free website audit and consultation. We'll review your site and provide actionable insights.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block dna-overline text-white/60 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/30 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white hover:border-white transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block dna-overline text-white/60 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/30 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white hover:border-white transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block dna-overline text-white/60 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/30 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white hover:border-white transition-colors"
                    placeholder="+91 12345 67890"
                  />
                </div>

                {/* Website (Optional) */}
                <div>
                  <label htmlFor="website" className="block dna-overline text-white/60 mb-1">
                    Website Link <span className="text-white/60">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/30 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white hover:border-white transition-colors"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="dna-btn dna-btn--invert w-full mt-8"
                >
                  Get Free Audit
                </button>
              </form>

              {/* Footer note */}
              <p className="dna-small text-white/50 text-center mt-5">
                We'll review your information and get back to you within 24 hours.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
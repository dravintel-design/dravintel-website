import { motion } from 'motion/react';
import { ArrowRight, Phone, MessageCircle, Mail } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    services: [] as string[],
  });

  const services = ['UX UI', 'WEB DESIGN', 'PRODUCT DESIGN', 'WEB APP', 'MOBILE APP', 'INDUSTRIAL DESIGN', 'WORKSHOP', 'OTHER'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (mock)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you in 2 working days.');
    setFormData({ name: '', email: '', phone: '', message: '', services: [] });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleService = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter((s) => s !== service)
        : [...formData.services, service],
    });
  };

  return (
    <div className="relative bg-[#F5F5F5] pt-20">
      {/* Main Contact Section */}
      <div className="relative py-16 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-[1.05] mb-12">
              Let's build<br />something bold.
            </h1>

            {/* Two-column description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 max-w-5xl">
              <p className="text-base lg:text-lg text-black leading-relaxed">
                Whether you are starting something new or ready to scale, let's talk about how thoughtful design and technology can move your next phase forward.
              </p>
              <p className="text-base lg:text-lg text-black leading-relaxed">
                You can book a call or send us a message, either way, we'd love to hear from you.
              </p>
            </div>

            {/* What can we do for you? */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-8">
              What can we do for you?
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Service Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-6 py-3 rounded-full border-2 text-sm font-medium tracking-wide uppercase transition-all ${
                      formData.services.includes(service)
                        ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                        : 'bg-white text-black border-black hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6]'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>

              {/* Name, Email, and Phone fields */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 text-base bg-white border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-gray-500 placeholder:uppercase placeholder:text-sm placeholder:tracking-wider"
                  placeholder="NAME"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 text-base bg-white border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-gray-500 placeholder:uppercase placeholder:text-sm placeholder:tracking-wider"
                  placeholder="EMAIL ADDRESS"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 text-base bg-white border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder:text-gray-500 placeholder:uppercase placeholder:text-sm placeholder:tracking-wider"
                  placeholder="PHONE NUMBER"
                />
              </div>

              {/* Message field */}
              <div className="mb-6 relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-6 py-5 text-base bg-white border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none placeholder:text-gray-400 placeholder:italic"
                  placeholder="Tell us what's on your mind—big ideas, small details, or anything in between..."
                />
              </div>

              {/* Response time info and Submit button */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <p className="text-sm text-gray-600">
                  We'll get back to you in <span className="font-bold text-black">2 working days</span>
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full bg-[#8B5CF6] px-10 py-4 text-base font-bold text-white hover:bg-[#5B21B6] transition-all uppercase tracking-wide ml-auto"
                >
                  <ArrowRight className="h-5 w-5" />
                  Send
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Method Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 pt-20 border-t-2 border-gray-300"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-8">
              Need a faster response?
            </h2>
            <p className="text-base lg:text-lg text-gray-700 mb-12 max-w-2xl">
              Choose your preferred method of contact based on how quickly you need to hear from us.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phone Card */}
              <a
                href="tel:+916369638870"
                className="group relative bg-white rounded-3xl p-8 border-2 border-black hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all"
              >
                <div className="mb-6">
                  <Phone className="h-12 w-12 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black group-hover:text-white mb-2 transition-colors">
                  Phone Call
                </h3>
                <p className="text-2xl font-bold text-black group-hover:text-white mb-4 transition-colors">
                  +91-6369638870
                </p>
                <div className="inline-block px-4 py-2 rounded-full bg-[#4ADE80] group-hover:bg-white text-black text-sm font-bold uppercase tracking-wide transition-colors">
                  Immediate Response
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/916369638870"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-3xl p-8 border-2 border-black hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all"
              >
                <div className="mb-6">
                  <MessageCircle className="h-12 w-12 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black group-hover:text-white mb-2 transition-colors">
                  WhatsApp
                </h3>
                <p className="text-2xl font-bold text-black group-hover:text-white mb-4 transition-colors">
                  +91-6369638870
                </p>
                <div className="inline-block px-4 py-2 rounded-full bg-[#FFD93D] group-hover:bg-white text-black text-sm font-bold uppercase tracking-wide transition-colors">
                  10 mins response
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:founder@dravintel.com"
                className="group relative bg-white rounded-3xl p-8 border-2 border-black hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all"
              >
                <div className="mb-6">
                  <Mail className="h-12 w-12 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black group-hover:text-white mb-2 transition-colors">
                  Email
                </h3>
                <p className="text-xl font-bold text-black group-hover:text-white mb-4 transition-colors break-all">
                  founder@dravintel.com
                </p>
                <div className="inline-block px-4 py-2 rounded-full bg-[#FFA500] group-hover:bg-white text-black text-sm font-bold uppercase tracking-wide transition-colors">
                  24 hours response
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
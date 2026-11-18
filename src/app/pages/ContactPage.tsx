import { useDocumentTitle } from '@/app/components/dna/useDocumentTitle';
import { ArrowRight, Phone, MessageCircle, Mail, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { PageHero } from '@/app/components/dna/PageHero';
import { DyeText } from '@/app/components/dna/DyeText';
import { Reveal } from '@/app/components/dna/Reveal';

export function ContactPage() {
  useDocumentTitle('Contact');

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Inline result, announced to screen readers (toasts alone are easy to miss)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    services: [] as string[],
  });

  const services = ['UX UI', 'WEB DESIGN', 'PRODUCT DESIGN', 'WEB APP', 'MOBILE APP', 'INDUSTRIAL DESIGN', 'WORKSHOP', 'OTHER'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setStatus(null);

    if (!supabase) {
      const message = "We couldn't send your message right now. Please email founder@dravintel.com or call +91-6369638870.";
      toast.error(message);
      setStatus({ type: 'error', message });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            service_type: formData.services,
          },
        ]);

      if (error) throw error;

      // Send email notification via EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        try {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: formData.name,
              from_email: formData.email,
              phone: formData.phone,
              message: formData.message,
              service_type: formData.services.join(', '),
            },
            publicKey
          );
        } catch (emailError) {
          console.error('Failed to send email:', emailError);
          // Don't throw error to user, as database save was successful
        }
      }

      const message = "Thank you for your message! We'll get back to you in 2 working days.";
      toast.success(message);
      setStatus({ type: 'success', message });
      setFormData({ name: '', email: '', phone: '', message: '', services: [] });
    } catch (error) {
      console.error('Error submitting form:', error);
      const message = 'Something went wrong. Please try again or contact us directly at founder@dravintel.com.';
      toast.error(message);
      setStatus({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
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

  const contactMethods = [
    { icon: Phone, label: 'Phone Call', value: '+91-6369638870', href: 'tel:+916369638870', note: 'Immediate response', external: false },
    { icon: MessageCircle, label: 'WhatsApp', value: '+91-6369638870', href: 'https://wa.me/916369638870', note: '10 mins response', external: true },
    { icon: Mail, label: 'Email', value: 'founder@dravintel.com', href: 'mailto:founder@dravintel.com', note: '24 hours response', external: false },
  ];

  return (
    <div className="relative bg-[var(--sai-bg)]">
      <PageHero video="coast" lines={["Let's build", 'something bold.']}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-[3vw] dna-body">
          <p className="lg:col-span-4 lg:col-start-6">
            Whether you are starting something new or ready to scale, let's talk about how thoughtful design and technology can move your next phase forward.
          </p>
          <p className="lg:col-span-3">
            You can book a call or send us a message, either way, we'd love to hear from you.
          </p>
        </div>
      </PageHero>

      {/* 01. Form */}
      <section className="dna-gutter pb-[14vw] md:pb-[10vw] grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-[4vw]">
        <div className="lg:col-span-4">
          <DyeText text={'What can\nwe do\nfor you?'} className="dna-h2" />
        </div>

        <Reveal className="lg:col-span-7 lg:col-start-6">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className="dna-overline text-[var(--dna-gray-600)] mb-5">Select services</legend>
              <div className="flex flex-wrap gap-2.5 mb-12">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    aria-pressed={formData.services.includes(service)}
                    className="dna-btn !py-3 !px-5"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </fieldset>

            <p className="dna-small text-[var(--dna-gray-600)]">All fields are required.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div>
                <label htmlFor="cf-name" className="dna-label">Name *</label>
                <input id="cf-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className="dna-input" placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="cf-email" className="dna-label">Email address *</label>
                <input id="cf-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className="dna-input" placeholder="you@company.com" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cf-phone" className="dna-label">Phone number *</label>
                <input id="cf-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} required className="dna-input" placeholder="+91 00000 00000" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cf-message" className="dna-label">Message *</label>
                <textarea
                  id="cf-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="dna-input resize-none"
                  placeholder="Tell us what's on your mind—big ideas, small details, or anything in between..."
                />
              </div>
            </div>

            <div role="status" aria-live="polite" className="mt-8 empty:hidden">
              {status && (
                <p className={`dna-body border-l-2 pl-4 ${status.type === 'error' ? 'border-[#ff7a7a] text-[#ffb3b3]' : 'border-[var(--sai-accent)] text-white'}`}>
                  {status.message}
                </p>
              )}
            </div>

            <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="dna-body text-[var(--dna-gray-600)]">
                We'll get back to you in <span className="font-semibold text-[var(--sai-accent)]">2 working days</span>
              </p>
              <button type="submit" disabled={isSubmitting} className="dna-cta disabled:opacity-50">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" strokeWidth={1.5} />}
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </Reveal>
      </section>

      {/* 02. Faster response — light surface so it is clearly separated from the black footer */}
      <section className="sai-panel text-white dna-section dna-gutter mb-[var(--dna-section)]">
        <DyeText text={'Need a faster\nresponse?'} className="dna-h1" off="#8a8a8a" />
        <Reveal delay={0.15} className="dna-lead mt-8 max-w-2xl">
          Choose your preferred method of contact based on how quickly you need to hear from us.
        </Reveal>

        <ul className="mt-[10vw] md:mt-[6vw] border-t border-[var(--dna-rule-strong)]">
          {contactMethods.map(({ icon: Icon, label, value, href, note, external }, index) => (
            <li key={label} className="border-b border-[var(--dna-rule-strong)]">
              <Reveal delay={index * 0.1}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group grid grid-cols-12 items-center gap-4 py-8 md:py-10"
                >
                  <Icon className="col-span-2 lg:col-span-1 h-6 w-6" strokeWidth={1.25} />
                  <span className="col-span-10 lg:col-span-3 dna-overline text-[var(--dna-gray-600)]">{label}</span>
                  <span
                    className="col-span-12 lg:col-span-5 font-bold tracking-[0.02em] text-[clamp(1.125rem,4.5vw,2.25rem)] leading-tight [overflow-wrap:anywhere] transition-transform duration-500 group-hover:translate-x-[1vw]"
                    style={{ transitionTimingFunction: 'var(--dna-ease)' }}
                  >
                    {value}
                  </span>
                  <span className="col-span-12 lg:col-span-3 lg:text-right dna-overline text-[var(--dna-gray-600)]">{note}</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

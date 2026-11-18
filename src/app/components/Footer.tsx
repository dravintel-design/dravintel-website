import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpToLine, CornerDownRight, Instagram, Youtube } from 'lucide-react';
import logo from '@/assets/dravintel-logo.png';
import { Reveal } from '@/app/components/dna/Reveal';
import { scrollToTarget } from '@/app/components/dna/SmoothScroll';

const whatWeDo = [
  { name: 'UX UI Design', path: '/services' },
  { name: 'Product Design', path: '/services' },
  { name: 'Web Development', path: '/services' },
  { name: 'AI Automation', path: '/services' },
];
const about = [
  { name: 'Our Work', path: '/work' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];
const socials = [
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/dravintel_design?igsh=MTh0azV1dWlsamhubw%3D%3D&utm_source=qr' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@dravintelux?si=SHiBF1NJBIc3h9Qz' },
];

/** Live Chennai time (HH:MM), refreshed on the minute — SAI's office clock chips. */
function useChennaiTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        setTime(fmt());
        schedule();
      }, 60000 - (Date.now() % 60000));
    };
    schedule();
    return () => clearTimeout(t);
  }, []);
  return time;
}

function FooterHeading({ children, id }: { children: string; id?: string }) {
  return (
    <h2 id={id} className="mb-6 text-[15px] font-semibold uppercase tracking-[0.02em] text-[var(--sai-bg)]">
      {children}
    </h2>
  );
}

export function Footer() {
  const { pathname } = useLocation();
  const onContact = pathname === '/contact';
  const time = useChennaiTime();

  return (
    <>
      {/* SAI closing CTA: big centred statement with a lime highlight + primary pill */}
      {!onContact && (
        <section aria-labelledby="cta-title" className="relative overflow-hidden bg-[var(--sai-bg)] py-[calc(var(--dna-section)*1.3)] text-center">
          <div aria-hidden="true" className="sai-glow left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2" />
          <div className="dna-container dna-gutter relative">
            <Reveal>
              <h2 id="cta-title" className="dna-h1 mx-auto max-w-[18ch] !text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)]">
                Let's <span className="sai-hl">create</span> something that lasts.
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <Link to="/contact" className="dna-cta">
                Let's Talk
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <footer id="contact" className="relative z-10 bg-white text-[var(--sai-bg)]">
        <div className="dna-container px-5 md:px-[52px] pt-16 md:pt-20 pb-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <Link to="/" aria-label="Dravintel Design — home" className="self-start">
              <img src={logo} alt="" width={399} height={109} className="h-11 md:h-12 w-auto max-w-none object-contain" />
            </Link>
            <div className="md:text-right">
              <FooterHeading>Join our network</FooterHeading>
              <ul className="flex gap-3 md:justify-end">
                {socials.map(({ name, icon: Icon, href }) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`} className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-[var(--sai-bg)] hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 md:mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            <nav aria-labelledby="ft-what">
              <FooterHeading id="ft-what">What we do</FooterHeading>
              <ul className="space-y-3 text-[15px]">
                {whatWeDo.map((l) => (
                  <li key={l.name}><Link to={l.path} className="dna-nav-link !font-normal">{l.name}</Link></li>
                ))}
              </ul>
            </nav>
            <nav aria-labelledby="ft-about">
              <FooterHeading id="ft-about">About</FooterHeading>
              <ul className="space-y-3 text-[15px]">
                {about.map((l) => (
                  <li key={l.name}><Link to={l.path} className="dna-nav-link !font-normal">{l.name}</Link></li>
                ))}
              </ul>
            </nav>
            <div>
              <FooterHeading>Info</FooterHeading>
              <ul className="space-y-3 text-[15px]">
                <li><a href="mailto:founder@dravintel.com" className="dna-nav-link !font-normal [overflow-wrap:anywhere]">founder@dravintel.com</a></li>
                <li><a href="tel:+916369638870" className="dna-nav-link !font-normal">+91-6369638870</a></li>
                <li><a href="https://wa.me/916369638870" target="_blank" rel="noopener noreferrer" className="dna-nav-link !font-normal">WhatsApp</a></li>
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <FooterHeading>Office</FooterHeading>
              <p className="text-[15px] leading-relaxed">
                Innov8, The Address,
                <br />
                Radial Ring Road, Pallavaram, Chennai
              </p>
              <Link to="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-[40px] bg-[var(--sai-accent)] px-6 text-[15px] font-medium text-[var(--sai-accent-ink)] transition-shadow hover:shadow-[0_0_24px_rgba(172,236,0,0.5)]">
                <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Start a project
              </Link>
            </div>
          </div>

          {/* Office clock chip */}
          <p className="mt-12 flex items-center gap-2.5 text-[15px]">
            <span className="rounded-lg border border-[#7fae00] px-3.5 py-1.5 tabular-nums">{time}</span>
            Chennai, India
          </p>

          <div className="mt-10 flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[14px] text-[#3d5266]">© {new Date().getFullYear()} Dravintel Design. All rights reserved.</p>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-[40px] bg-[#eefbd2] px-6 text-[15px] font-medium text-[var(--sai-bg)] transition-colors hover:bg-[var(--sai-accent)] md:self-auto"
            >
              Back to top <ArrowUpToLine className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

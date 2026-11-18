import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CornerDownRight, Menu, X } from 'lucide-react';
import logoWhite from '@/assets/dravintel-logo-white.png';
import { cn } from '@/app/components/ui/utils';
import { Sheet, SheetContent, SheetTitle } from '@/app/components/ui/sheet';

const navItems = [
  { name: 'Our work', path: '/work' },
  { name: 'Our services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Insights', path: '/#blog' },
  { name: 'Contact', path: '/contact' },
];

/**
 * Header: a floating navy bar with rounded bottom corners, logo left,
 * centred navigation, lime "Let's Talk" pill right. Gains a blurred backdrop once scrolled.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-2 md:px-3.5">
        <div
          className={cn(
            'mx-auto flex h-[72px] md:h-[92px] max-w-[1440px] items-center justify-between gap-6 rounded-b-[28px] md:rounded-b-[40px] border-b px-4 md:px-12 transition-[background-color,border-color,box-shadow] duration-500',
            scrolled
              ? 'border-[rgba(172,236,0,0.28)] bg-[rgba(0,18,36,0.82)] shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl'
              : 'border-[rgba(255,255,255,0.12)] bg-[rgba(0,24,46,0.35)] backdrop-blur-md'
          )}
        >
          <Link to="/" aria-label="Dravintel Design — home" className="block shrink-0 py-2">
            <img src={logoWhite} alt="" width={399} height={109} className="h-8 md:h-10 w-auto max-w-none object-contain" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-10 xl:gap-12">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      cn('dna-nav-link text-[15px] text-white', isActive && item.path !== '/#blog' && 'active text-[var(--dv-accent)]')
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/contact" className="dna-cta !min-h-11 !px-5 !text-[15px] md:!px-7">
              <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Let's talk
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              className="grid h-11 w-11 place-items-center rounded-full text-white lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="!w-screen !max-w-none border-none bg-[var(--dv-bg)] text-white p-0 flex flex-col overflow-y-auto [&>button]:hidden"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex h-[72px] items-center justify-between px-6">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2">
              <img src={logoWhite} alt="Dravintel Design" width={399} height={109} className="h-8 w-auto max-w-none object-contain" />
            </Link>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full">
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Menu" className="flex-1 px-6 pt-8">
            <ul className="space-y-2">
              {[{ name: 'Home', path: '/' }, ...navItems].map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block py-2 text-[2rem] font-medium leading-tight',
                        isActive && item.path !== '/#blog' ? 'text-[var(--dv-accent)]' : 'text-[var(--dv-head)]'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6 px-6 pb-10 pt-10">
            <div className="dna-body">
              <a href="mailto:founder@dravintel.com" className="dna-nav-link block text-white">founder@dravintel.com</a>
              <a href="tel:+916369638870" className="dna-nav-link block text-white">+91-6369638870</a>
              <p className="mt-3">Innov8, The Address, Radial Ring Road, Pallavaram, Chennai</p>
            </div>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="dna-cta">
              <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Let's talk
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

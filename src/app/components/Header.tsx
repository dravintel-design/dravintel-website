import { useState } from 'react';
import { Menu, X, ArrowRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/logosmall.svg'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex items-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black px-6 py-2 text-sm uppercase tracking-wider text-black hover:bg-black hover:text-white transition-all"
            >
              <ArrowRight className="h-4 w-4" />
              Let's Talk
            </a>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="block">
              <img src={logoImage} alt="Dravintel" className="h-8" />
            </Link>
          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="hidden lg:flex">
            <button
              className="rounded-full border-2 border-black p-2 text-black hover:bg-black hover:text-white transition-all"
              aria-label="Menu"
              onClick={() => setDesktopMenuOpen(true)}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>
      
      {/* Desktop menu */}
      <AnimatePresence>
        {desktopMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#8B5CF6]"
          >
            <div className="relative h-full flex flex-col">
              {/* Header bar with logo and close button */}
              <div className="flex items-center justify-between px-6 lg:px-8 py-6">
                {/* Logo */}
                <Link to="/" className="block" onClick={() => setDesktopMenuOpen(false)}>
                  <img src={logoImage} alt="Dravintel" className="h-8 brightness-0 invert" />
                </Link>

                {/* Close button */}
                <button
                  className="rounded-full border-2 border-white p-2 text-white hover:bg-white hover:text-[#8B5CF6] transition-all"
                  aria-label="Close menu"
                  onClick={() => setDesktopMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Main menu content */}
              <div className="flex-1 flex items-center px-6 lg:px-16">
                <div className="w-full max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left side - Navigation links */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="space-y-8 pl-16"
                    >
                      {navigation.map((link, index) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          onClick={() => setDesktopMenuOpen(false)}
                        >
                          <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            whileHover={{ 
                              x: 30,
                              scale: 1.05,
                              transition: { type: 'spring', stiffness: 400, damping: 10 }
                            }}
                            className="block text-6xl sm:text-7xl lg:text-8xl font-bold text-white hover:font-black transition-all leading-[0.95] relative group"
                            onClick={() => setDesktopMenuOpen(false)}
                          >
                            <motion.span
                              className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-5xl"
                              initial={{ x: -20 }}
                              whileHover={{ x: 0 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                              →
                            </motion.span>
                            {link.name}
                            <motion.span
                              className="absolute bottom-0 left-0 h-1 bg-white"
                              initial={{ width: 0 }}
                              whileHover={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.span>
                        </Link>
                      ))}
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="pt-8"
                      >
                        <p className="text-2xl sm:text-3xl text-white/80 italic">
                          Elevate beyond ordinary
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* Right side - Contact button */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex justify-start lg:justify-end"
                    >
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-3 rounded-full border-2 border-white px-8 py-4 text-lg uppercase tracking-wider text-white hover:bg-white hover:text-[#8B5CF6] transition-all"
                        onClick={() => setDesktopMenuOpen(false)}
                      >
                        <ArrowRight className="h-6 w-6" />
                        Let's Talk
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-[#8B5CF6] px-6 py-6"
            >
              {/* Header with logo and close */}
              <div className="flex items-center justify-between mb-16">
                <Link to="/" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <img src={logoImage} alt="Dravintel" className="h-8 brightness-0 invert" />
                </Link>
                <button
                  type="button"
                  className="rounded-full border-2 border-white p-2 text-white hover:bg-white hover:text-[#8B5CF6] transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="space-y-8 mb-12">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="block text-5xl sm:text-6xl font-bold text-white hover:opacity-70 transition-opacity leading-[0.95]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="pt-4"
                >
                  <p className="text-xl sm:text-2xl text-white/80 italic">
                    Elevate beyond ordinary
                  </p>
                </motion.div>
              </div>

              {/* Contact button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 rounded-full border-2 border-white px-8 py-4 text-base uppercase tracking-wider text-white hover:bg-white hover:text-[#8B5CF6] transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ArrowRight className="h-5 w-5" />
                  Let's Talk
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
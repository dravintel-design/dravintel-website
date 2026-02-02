import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ArrowRight, Plus, X } from 'lucide-react';
import logoSmall from '@/assets/logosmall.svg';
import logoWhite from '@/assets/logobig.svg'; // Assuming we want the white logo for the purple background
import { cn } from '@/app/components/ui/utils';
import { Button } from '@/app/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
} from '@/app/components/ui/sheet';

const navItems = [
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-white/30 backdrop-blur-md py-4 shadow-sm border-b border-white/20" : "bg-transparent py-8"
            )}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                <div className="flex items-center justify-between">

                    {/* Left: LE'TS TALK Button */}
                    <Button
                        asChild
                        variant="outline"
                        className="hidden sm:inline-flex rounded-full border-black text-black hover:bg-[#8B5CF6] hover:border-[#8B5CF6] hover:text-white transition-all px-6 py-5 text-xs font-bold tracking-widest uppercase gap-2"
                    >
                        <Link to="/contact">
                            <ArrowRight className="w-3 h-3" />
                            Let's Talk
                        </Link>
                    </Button>

                    {/* Center: Logo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src={logoSmall} alt="Dravintel" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Right: + Menu Button */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-10 w-10 border-black text-black hover:bg-[#8B5CF6] hover:border-[#8B5CF6] hover:text-white transition-all ml-auto"
                            >
                                <Plus className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="!w-screen !max-w-none border-none bg-[#8B5CF6] p-0 flex flex-col [&>button]:hidden font-sans"
                        >
                            <SheetTitle className="sr-only">Full Screen Navigation Menu</SheetTitle>

                            {/* Menu Header */}
                            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-8 flex items-center justify-between">
                                {/* White Logo */}
                                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                    <img src={logoWhite} alt="Dravintel" className="h-8 w-auto brightness-0 invert" />
                                </Link>

                                {/* Close Button */}
                                <SheetClose asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full h-10 w-10 border border-white/30 text-white hover:bg-white hover:text-[#8B5CF6] transition-all"
                                    >
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close menu</span>
                                    </Button>
                                </SheetClose>
                            </div>

                            {/* Menu Content */}
                            <div className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
                                <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-center">
                                    {/* Left Column: Nav & Tagline */}
                                    <div className="flex flex-col gap-16 md:gap-24 w-full md:w-auto">
                                        <nav className="flex flex-col gap-4">
                                            {navItems.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.path}
                                                    onClick={() => setIsOpen(false)}
                                                    className={({ isActive }) =>
                                                        cn(
                                                            "group flex items-center gap-4 text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white transition-all",
                                                            isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                                                        )
                                                    }
                                                >
                                                    <ArrowRight
                                                        className="w-8 h-8 sm:w-10 sm:h-10 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                                    />
                                                    <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-2">
                                                        {item.name}
                                                    </span>
                                                </NavLink>
                                            ))}
                                        </nav>

                                        <div>
                                            <p className="text-white/60 text-lg sm:text-xl font-light tracking-wide pl-2 sm:pl-14">
                                                Elevate beyond ordinary
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Column: Let's Talk Button */}
                                    <div className="hidden md:block mt-8 md:mt-0">
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="rounded-full border-white text-white hover:bg-white hover:text-[#8B5CF6] transition-all px-8 py-6 text-sm font-bold tracking-widest uppercase gap-2 bg-transparent"
                                        >
                                            <Link to="/contact" onClick={() => setIsOpen(false)}>
                                                <ArrowRight className="w-4 h-4" />
                                                Let's Talk
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
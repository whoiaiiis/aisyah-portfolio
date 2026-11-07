import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => sections.forEach((s) => s && observer.unobserve(s));
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6 lg:px-8"
    >
      <div
        className={`max-w-5xl mx-auto flex items-center justify-between px-5 sm:px-6 h-14 sm:h-16 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-border/70'
            : 'bg-white/70 backdrop-blur-md border border-border/40 shadow-sm'
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="font-heading font-bold text-lg sm:text-xl text-primary flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-accent/40 shadow-xs flex items-center justify-center p-1 group-hover:border-accent group-hover:scale-105 transition-all duration-300">
            <img src="/favicon.svg" alt="Aisyah Arianti Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-0.5">
            <span>Aisyah</span>
            <span className="text-accent group-hover:scale-125 transition-transform duration-200">.</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-accent bg-accent/10 font-semibold'
                  : 'text-text-dark hover:text-accent hover:bg-accent/5'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="ml-2 px-4 py-1.5 bg-accent text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-accent-dark transition-all duration-200 shadow-md shadow-accent/25 hover:shadow-accent/40"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-primary rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden max-w-5xl mx-auto mt-2 overflow-hidden transition-all duration-300 rounded-2xl bg-white/95 backdrop-blur-xl border border-border/60 ${
          mobileOpen ? 'max-h-[350px] shadow-xl p-4' : 'max-h-0 p-0 border-transparent'
        }`}
      >
        <div className="space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-accent bg-accent/10 font-semibold'
                  : 'text-text-dark hover:text-accent hover:bg-gray-50'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="block text-center mt-2 px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-md shadow-accent/20"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}

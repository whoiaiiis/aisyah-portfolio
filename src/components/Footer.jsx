import { ArrowUp } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Organization', href: '#organization' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0b0b] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="font-heading font-bold text-2xl tracking-tight"
            >
              Aisyah<span className="text-accent">.</span>
            </a>
            <p className="text-white/60 text-sm mt-1 max-w-sm">
              Information Management Graduate | Administration & Data Management | Digital Design & Technology
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/aisyah-arianti-405a7b429/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent hover:bg-white/10 transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://github.com/AisyahArianti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent hover:bg-white/10 transition-colors"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://instagram.com/aisyaharnt_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent hover:bg-white/10 transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://wa.me/62831880331540"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#25D366] hover:border-[#25D366] hover:bg-white/10 transition-colors"
            >
              <WhatsAppIcon size={18} />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors ml-2"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 py-8 text-sm text-white/60">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright & credit */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-3">
          <p>Designed & Developed by Aisyah Arianti.</p>
          <p>© 2026 Aisyah Arianti. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

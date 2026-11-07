import { ArrowUp } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'ORGANIZATION', href: '#organization' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CERTIFICATES', href: '#certificates' },
  { label: 'CONTACT', href: '#contact' },
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
    <footer className="bg-[#080809] text-white border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Background subtle aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Tech Stamp Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-white/10 text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-white font-semibold">PORTFOLIO DECK // AISYAH ARIANTI</span>
          </div>
          <div className="flex items-center gap-4">
            <span>LOC: PALEMBANG, ID</span>
            <span className="text-accent">+</span>
            <span>POLITEKNIK NEGERI SRIWIJAYA</span>
            <span className="text-accent">+</span>
            <span>VER: 2.6</span>
          </div>
        </div>

        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 border-b border-white/10">
          <div>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="font-heading font-black text-2xl sm:text-3xl tracking-tight uppercase"
            >
              AISYAH ARIANTI<span className="text-accent">.</span>
            </a>
            <p className="text-white/60 text-xs sm:text-sm mt-2 max-w-md font-sans leading-relaxed">
              Information Management Graduate | Administration & Data Management | Digital Design & Technology
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/aisyah-arianti-405a7b429/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent hover:bg-white/10 transition-all hover:scale-105"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://github.com/whoiaiiis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent hover:bg-white/10 transition-all hover:scale-105"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://instagram.com/aisyaharnt_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent hover:bg-white/10 transition-all hover:scale-105"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://wa.me/6283188031540"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#25D366] hover:border-[#25D366] hover:bg-white/10 transition-all hover:scale-105"
            >
              <WhatsAppIcon size={18} />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="w-11 h-11 rounded-2xl bg-accent text-white flex items-center justify-center hover:bg-accent-dark transition-all hover:scale-105 shadow-lg shadow-accent/30 ml-2"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Monospace Navigation Link Row */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 py-8 text-xs font-mono uppercase tracking-wider text-white/60">
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

        {/* Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-3">
          <p>© 2026 AISYAH ARIANTI. ALL RIGHTS RESERVED.</p>
          <p className="text-white/60">INFORMATION MANAGEMENT & CREATIVE SPECIALIST</p>
        </div>
      </div>
    </footer>
  );
}

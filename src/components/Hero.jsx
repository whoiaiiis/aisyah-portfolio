import { Database, Code2, Palette, Users, Megaphone, ArrowDown, Download, Mail } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';

const expertiseAreas = [
  { icon: Database, label: 'Administration & Data Management' },
  { icon: Code2, label: 'Information Technology' },
  { icon: Palette, label: 'UI/UX & Graphic Design' },
  { icon: Users, label: 'Communication & Coordination' },
  { icon: Megaphone, label: 'Digital Marketing & Partnership Support' },
];

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Dynamic ambient glowing aura background (Aura Membuyar) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/15 rounded-full aura-blob pointer-events-none" />
        <div className="absolute top-1/3 -right-28 w-[420px] h-[420px] bg-accent/10 rounded-full aura-blob-delayed pointer-events-none" />
        <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-accent/10 rounded-full aura-blob pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-accent/30 rounded-full animate-float-slow" />
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-accent/25 rounded-full animate-float-delayed" />
        <div className="absolute bottom-1/3 left-1/5 w-2.5 h-2.5 bg-primary/20 rounded-full animate-float-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="order-2 lg:order-1">
            <h1 className="reveal-blur font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-4">
              Hello, I'm{' '}
              <span className="text-accent">Aisyah Arianti</span>
              <span className="text-accent">.</span>
            </h1>

            <h2 className="reveal-blur delay-100 font-heading text-lg sm:text-xl lg:text-2xl text-text-muted font-medium mb-6 leading-relaxed">
              Turning Ideas into Organized, Functional, and Creative Solutions.
            </h2>

            <p className="reveal-blur delay-150 text-text-muted text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
              An Information Management graduate interested in administration, data management, IT, and creative design, with experience in administrative support, digital projects, communication, and KOL management.
            </p>

            {/* Areas of Expertise */}
            <div className="reveal-blur delay-200 mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                Areas of Expertise
              </p>
              <div className="flex flex-wrap gap-2.5">
                {expertiseAreas.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2 bg-bg-light rounded-lg text-xs sm:text-sm text-text-dark border border-border hover:border-accent/40 hover:bg-accent/5 hover:shadow-md hover:shadow-accent/10 transition-all duration-300"
                  >
                    <Icon size={16} className="text-accent shrink-0" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="reveal-blur delay-300 flex flex-wrap gap-3 mb-8">
              <a
                href="#projects"
                onClick={scrollTo('#projects')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
              >
                Explore My Portfolio
                <ArrowDown size={18} />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <Download size={18} />
                Download My CV
              </a>
              <a
                href="#contact"
                onClick={scrollTo('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3 text-text-dark font-semibold rounded-lg hover:bg-bg-light transition-colors duration-200"
              >
                <Mail size={18} />
                Contact Me
              </a>
            </div>

            {/* Social */}
            <div className="reveal-blur delay-400 flex items-center gap-4">
              <span className="text-sm text-text-muted">Find me on</span>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/aisyah-arianti-405a7b429/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-bg-light rounded-lg text-text-dark hover:bg-accent hover:text-white hover:scale-105 transition-all duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={20} />
                </a>
                <a
                  href="https://github.com/AisyahArianti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-bg-light rounded-lg text-text-dark hover:bg-accent hover:text-white hover:scale-105 transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href="https://instagram.com/aisyaharnt_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-bg-light rounded-lg text-text-dark hover:bg-accent hover:text-white hover:scale-105 transition-all duration-200"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon size={20} />
                </a>
                <a
                  href="https://wa.me/6283188031540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-bg-light rounded-lg text-text-dark hover:bg-[#25D366] hover:text-white hover:scale-105 transition-all duration-200"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Profile Image with Aura Membuyar */}
          <div className="order-1 lg:order-2 flex justify-center reveal-blur-right">
            <div className="relative animate-float-slow">
              {/* Dynamic breathing glowing background aura */}
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/30 via-accent/15 to-transparent rounded-full aura-blob pointer-events-none" />
              
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-gradient-to-br from-bg-light to-border flex items-center justify-center border-4 border-white shadow-2xl aura-portrait-ring">
                <img
                  src="/aisyah-portrait.png"
                  alt="Aisyah Arianti"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextSibling) {
                      e.currentTarget.nextSibling.style.display = 'block';
                    }
                  }}
                />
                <div className="hidden text-center">
                  <span className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold text-accent/30">AA</span>
                  <p className="text-sm text-text-muted mt-2">Aisyah Arianti</p>
                </div>
              </div>
              {/* Floating accent dots */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full shadow-lg shadow-accent/40 animate-float-delayed" />
              <div className="absolute -bottom-4 left-8 w-6 h-6 bg-accent/80 rounded-full shadow-lg shadow-accent/30 animate-float-slow" />
              <div className="absolute top-1/2 -left-6 w-4 h-4 bg-accent/50 rounded-full animate-float-delayed" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

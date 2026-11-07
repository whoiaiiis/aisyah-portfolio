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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F5F7] pt-24 pb-16">
      {/* Dynamic ambient glowing aura background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/15 rounded-full aura-blob pointer-events-none" />
        <div className="absolute top-1/3 -right-28 w-[420px] h-[420px] bg-accent/10 rounded-full aura-blob-delayed pointer-events-none" />
        <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-accent/10 rounded-full aura-blob pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Editorial Frame with Crosshairs */}
        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl border border-border/70 p-6 sm:p-10 lg:p-12 shadow-xl">
          {/* Corner Crosshair Marks */}
          <span className="absolute top-4 left-4 font-mono text-base font-bold text-accent select-none">+</span>
          <span className="absolute top-4 right-4 font-mono text-base font-bold text-accent select-none">+</span>
          <span className="absolute bottom-4 left-4 font-mono text-base font-bold text-accent select-none">+</span>
          <span className="absolute bottom-4 right-4 font-mono text-base font-bold text-accent select-none">+</span>

          {/* Top Tech Label */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-widest text-text-muted mb-6">
            <span className="flex items-center gap-1.5 font-bold text-primary">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              SYS // 2026 // READY
            </span>
            <span className="hidden sm:inline">POLITEKNIK NEGERI SRIWIJAYA</span>
            <span className="text-accent font-bold">DVS // 01</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left - Kinetic Typography & Content (7 cols) */}
            <div className="lg:col-span-7">
              {/* Kinetic Typography Block with Vertical Orange Accent */}
              <div className="relative my-2 select-none">
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-accent rounded-sm shadow-xl shadow-accent/25 absolute -top-3 left-0 pointer-events-none" />
                <h1 className="relative font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-primary leading-tight tracking-tight z-10">
                  AISYAH ARIANTI<span className="text-accent">.</span>
                </h1>
                <span className="relative font-heading text-3xl sm:text-5xl lg:text-6xl font-black stroke-text tracking-tight block -mt-3 sm:-mt-5 opacity-75 z-20 pointer-events-none">
                  CREATIVE & TECH
                </span>
              </div>

              {/* Monospace Subtitle Row with Crosshairs */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-text-muted my-4 border-t border-b border-border/60 py-2">
                <span className="font-semibold text-primary">ADMINISTRATION</span>
                <span className="text-accent">+</span>
                <span className="font-semibold text-primary">DATA MANAGEMENT</span>
                <span className="text-accent">+</span>
                <span className="font-semibold text-primary">IT & DESIGN</span>
              </div>

              <p className="text-text-muted text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
                An Information Management graduate interested in administration, data management, IT, and creative design, with experience in administrative support, digital projects, communication, and KOL management.
              </p>

              {/* Areas of Expertise (Deck Card Pills) */}
              <div className="mb-8">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-1.5">
                  <span className="text-accent">●</span> AREAS OF EXPERTISE
                </p>
                <div className="flex flex-wrap gap-2">
                  {expertiseAreas.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl text-xs sm:text-sm text-text-dark border border-border/70 shadow-xs hover:border-accent hover:shadow-md hover:shadow-accent/15 transition-all duration-300"
                    >
                      <Icon size={15} className="text-accent shrink-0" />
                      <span className="font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="#projects"
                  onClick={scrollTo('#projects')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5"
                >
                  Explore My Portfolio
                  <ArrowDown size={18} />
                </a>
                <a
                  href="/CV_Aisyah_Arianti.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="CV_Aisyah_Arianti.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                >
                  <Download size={18} />
                  Download CV
                </a>
                <a
                  href="#contact"
                  onClick={scrollTo('#contact')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-text-dark font-semibold rounded-full border border-border hover:bg-bg-light transition-all duration-200"
                >
                  <Mail size={18} />
                  Contact Me
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider">FIND ME ON:</span>
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/aisyah-arianti-405a7b429/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white rounded-full text-text-dark border border-border/70 hover:border-accent hover:text-accent hover:scale-110 shadow-xs transition-all duration-200"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                  <a
                    href="https://github.com/whoiaiiis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white rounded-full text-text-dark border border-border/70 hover:border-accent hover:text-accent hover:scale-110 shadow-xs transition-all duration-200"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={18} />
                  </a>
                  <a
                    href="https://instagram.com/aisyaharnt_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white rounded-full text-text-dark border border-border/70 hover:border-accent hover:text-accent hover:scale-110 shadow-xs transition-all duration-200"
                    aria-label="Instagram Profile"
                  >
                    <InstagramIcon size={18} />
                  </a>
                  <a
                    href="https://wa.me/6283188031540"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white rounded-full text-text-dark border border-border/70 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:scale-110 shadow-xs transition-all duration-200"
                    aria-label="Chat on WhatsApp"
                  >
                    <WhatsAppIcon size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Profile Card in Rounded 3XL Deck Frame (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Dynamic Breathing Glowing Background Aura */}
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 via-accent/15 to-transparent rounded-3xl aura-blob pointer-events-none" />

                {/* Sleek Deck Card Frame */}
                <div className="relative bg-white rounded-3xl p-3 border-2 border-white/80 shadow-2xl overflow-hidden card-hover-aura">
                  {/* Top Card Badge Header */}
                  <div className="flex items-center justify-between px-3 py-2 bg-neutral-900 rounded-2xl mb-3 text-white">
                    <span className="text-[10px] font-mono tracking-wider text-accent font-bold">
                      DVS // PORTRAIT 01
                    </span>
                    <span className="text-[9px] font-mono text-white/70">
                      ID // AA-2026
                    </span>
                  </div>

                  {/* Portrait Image Container */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
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
                    <div className="hidden text-center pt-20">
                      <span className="font-heading text-6xl font-bold text-accent/30">AA</span>
                      <p className="text-sm text-text-muted mt-2">Aisyah Arianti</p>
                    </div>

                    {/* Gradient Overlay at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                      <span className="text-[10px] font-mono uppercase text-accent font-semibold tracking-widest block">
                        POLSRI ALUMNA
                      </span>
                      <h3 className="font-heading text-base font-bold text-white">
                        Aisyah Arianti
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Metadata Strip */}
                  <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-mono text-text-muted">
                    <span>SPEC: ADMIN • IT • DESIGN</span>
                    <span className="text-accent font-bold">● ACTIVE</span>
                  </div>
                </div>

                {/* Floating Accent Badges */}
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-accent text-white rounded-full text-[10px] font-mono font-bold shadow-lg shadow-accent/40 animate-float-slow">
                  VERIFIED
                </div>
                <div className="absolute -bottom-3 -left-3 px-3 py-1 bg-primary text-white rounded-full text-[10px] font-mono text-xs shadow-lg animate-float-delayed">
                  2024-2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

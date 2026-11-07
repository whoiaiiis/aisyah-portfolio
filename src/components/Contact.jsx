import { useState } from 'react';
import { Mail, ArrowUpRight, Send, MessageCircle, Sparkles } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';

const contactInfo = [
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    stamp: 'CONN // WA-01',
    value: '+62 831-8803-1540',
    href: 'https://wa.me/6283188031540',
    badge: 'FAST RESPONSE',
    highlight: true,
  },
  {
    icon: Mail,
    label: 'Email',
    stamp: 'CONN // MAIL-02',
    value: 'arrraisyah@gmail.com',
    href: 'mailto:arrraisyah@gmail.com',
    badge: 'PRIMARY INBOX',
    highlight: false,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    stamp: 'CONN // LINKEDIN-03',
    value: 'aisyah-arianti-405a7b429',
    href: 'https://www.linkedin.com/in/aisyah-arianti-405a7b429/',
    badge: 'PROFESSIONAL',
    highlight: false,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    stamp: 'CONN // GIT-04',
    value: 'whoiaiiis',
    href: 'https://github.com/whoiaiiis',
    badge: 'CODE REPO',
    highlight: false,
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    stamp: 'CONN // IG-05',
    value: '@aisyaharnt_',
    href: 'https://instagram.com/aisyaharnt_',
    badge: 'SOCIALS',
    highlight: false,
  },
];

export default function Contact() {
  const [burstIdx, setBurstIdx] = useState(null);

  const handleCardClick = (idx) => {
    setBurstIdx(idx);
    setTimeout(() => {
      setBurstIdx(null);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#0D0D0E] text-white relative overflow-hidden">
      {/* Dynamic Background glowing aura */}
      <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-accent/20 rounded-full aura-blob pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] bg-accent/15 rounded-full aura-blob-delayed pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Kinetic Section Header */}
        <div className="text-center mb-16 reveal-blur">
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
            <span className="text-accent font-bold">+</span>
            <span>CONN // DIRECT ACCESS</span>
            <span className="text-accent font-bold">+</span>
          </div>

          <div className="relative my-3 flex flex-col items-center justify-center select-none">
            <div className="w-20 sm:w-28 h-20 sm:h-28 bg-accent rounded-sm shadow-2xl shadow-accent/40 absolute -top-3 pointer-events-none" />
            <h2 className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase z-10">
              LET'S CONNECT
            </h2>
            <span className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black stroke-text-white tracking-tight uppercase -mt-4 sm:-mt-6 opacity-60 z-20 pointer-events-none">
              LET'S CONNECT
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/50 border-t border-b border-white/10 py-2 px-4 max-w-3xl mx-auto mt-4">
            <span>AVAILABLE FOR OPPORTUNITIES</span>
            <span className="text-accent">+</span>
            <span>PALEMBANG & REMOTE</span>
            <span className="text-accent">+</span>
            <span>FAST RESPONSE</span>
          </div>
        </div>

        {/* Contact Deck Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
          {contactInfo.map((item, idx) => {
            const Icon = item.icon;
            const isBursting = burstIdx === idx;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={() => handleCardClick(idx)}
                className={`group rounded-3xl border transition-all duration-300 p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden ${
                  isBursting ? 'animate-membuyar-burst' : 'card-hover-aura'
                } ${
                  item.highlight
                    ? 'bg-accent/15 border-accent/50 shadow-xl shadow-accent/20 hover:bg-accent/25'
                    : 'bg-white/5 border-white/10 hover:border-accent/50 hover:bg-white/10'
                }`}
              >
                <div>
                  {/* Top stamp header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                      {item.stamp}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        item.highlight
                          ? 'bg-accent text-white shadow-md shadow-accent/40'
                          : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      item.highlight
                        ? 'bg-accent text-white group-hover:scale-110 shadow-lg shadow-accent/40'
                        : 'bg-white/10 text-accent group-hover:bg-accent group-hover:text-white group-hover:scale-110'
                    }`}
                  >
                    <Icon size={22} />
                  </div>

                  <p className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-white/95 break-all group-hover:text-accent transition-colors leading-tight">
                    {item.value}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50 group-hover:text-accent transition-colors">
                  <span>DISPATCH</span>
                  <ArrowUpRight
                    size={15}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Central Call to Action Card */}
        <div className="max-w-2xl mx-auto text-center bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden card-hover-aura">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-accent mb-3">
            <Sparkles size={14} />
            <span>OPEN FOR NEW CHALLENGES</span>
            <Sparkles size={14} />
          </div>

          <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3 tracking-tight">
            Have a role, collaboration, or question in mind?
          </h3>
          <p className="text-white/70 text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Reach out directly via WhatsApp for fast responses or send an email to discuss opportunities further.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/6283188031540"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-[#25D366]/30 hover:scale-105"
            >
              <WhatsAppIcon size={18} />
              CHAT ON WHATSAPP
            </a>
            <a
              href="mailto:arrraisyah@gmail.com"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent hover:bg-accent-dark text-white font-mono font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-accent/30 hover:scale-105"
            >
              <Send size={18} />
              SEND AN EMAIL
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

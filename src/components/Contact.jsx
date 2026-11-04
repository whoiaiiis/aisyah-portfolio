import { Mail, ArrowUpRight, Send, MessageCircle } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';

const contactInfo = [
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: '+62 831-8803-1540',
    href: 'https://wa.me/6283188031540',
    isPlaceholder: false,
    highlight: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'arrraisyah@gmail.com',
    href: 'mailto:arrraisyah@gmail.com',
    isPlaceholder: false,
    highlight: false,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/aisyah-arianti-405a7b429',
    href: 'https://www.linkedin.com/in/aisyah-arianti-405a7b429/',
    isPlaceholder: false,
    highlight: false,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/AisyahArianti',
    href: 'https://github.com/AisyahArianti',
    isPlaceholder: false,
    highlight: false,
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@aisyaharnt_',
    href: 'https://instagram.com/aisyaharnt_',
    isPlaceholder: false,
    highlight: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-primary text-white relative overflow-hidden">
      {/* Background glowing accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium text-accent mb-4 border border-white/10">
            Let's Collaborate
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Let's Connect and Create Opportunities.
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-6" />
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            I'm always open to professional opportunities, new experiences, creative collaborations, and meaningful projects. Feel free to get in touch.
          </p>
        </div>

        {/* Contact cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`reveal group p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  item.highlight
                    ? 'bg-accent/15 border-accent/40 hover:bg-accent/25 hover:border-accent'
                    : 'bg-white/5 border-white/10 hover:border-accent/40 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                    item.highlight
                      ? 'bg-accent text-white group-hover:scale-105'
                      : 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white'
                  }`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs uppercase tracking-wider text-white/50 font-semibold">{item.label}</p>
                    {item.highlight && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent text-white font-semibold">Fast Response</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-white/90 mt-1 break-all group-hover:text-accent transition-colors">
                    {item.value}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/60 group-hover:text-white transition-colors">
                  <span>Connect</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Central Call to Action */}
        <div className="reveal max-w-xl mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="font-heading text-xl font-bold mb-2">Have a role, collaboration, or question in mind?</h3>
          <p className="text-white/70 text-sm mb-6">
            Reach out directly via WhatsApp for quick response or send an email to discuss further.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/6283188031540"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-[#25D366]/30"
            >
              <WhatsAppIcon size={18} />
              Chat on WhatsApp
            </a>
            <a
              href="mailto:arrraisyah@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent/30"
            >
              <Send size={18} />
              Send an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

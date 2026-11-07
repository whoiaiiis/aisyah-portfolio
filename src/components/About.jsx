import { User, GraduationCap, MapPin, Briefcase, Building2, CheckCircle2 } from 'lucide-react';

const info = [
  { icon: User, label: 'Full Name', value: 'Aisyah Arianti' },
  { icon: GraduationCap, label: 'Education', value: 'Diploma III in Information Management' },
  { icon: Building2, label: 'Institution', value: 'Politeknik Negeri Sriwijaya' },
  { icon: CheckCircle2, label: 'Academic Status', value: 'Graduated' },
  { icon: Briefcase, label: 'Professional Interests', value: 'Administration • Data Management • Information Technology • UI/UX Design • Digital Marketing & KOL Management' },
  { icon: MapPin, label: 'Location', value: 'South Sumatra, Indonesia' },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F5F5F7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Editorial Section Header with Kinetic Typography & Orange Block */}
        <div className="text-center mb-14 reveal-blur">
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
            <span className="text-accent font-bold">+</span>
            <span>SYS // IDENTITY</span>
            <span className="text-accent font-bold">+</span>
          </div>

          <div className="relative my-3 flex flex-col items-center justify-center select-none">
            <div className="w-20 sm:w-28 h-20 sm:h-28 bg-accent rounded-sm shadow-xl shadow-accent/25 absolute -top-3 pointer-events-none" />
            <h2 className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black text-primary tracking-tight uppercase z-10">
              GET TO KNOW ME
            </h2>
            <span className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black stroke-text tracking-tight uppercase -mt-4 sm:-mt-6 opacity-75 z-20 pointer-events-none">
              GET TO KNOW ME
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-wider text-text-muted border-t border-b border-border/60 py-2 px-4 max-w-3xl mx-auto mt-4">
            <span>AISYAH ARIANTI</span>
            <span className="text-accent">+</span>
            <span>POLITEKNIK NEGERI SRIWIJAYA</span>
            <span className="text-accent">+</span>
            <span>CLASS OF 2025</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Bio Deck Card (7 cols) */}
          <div className="lg:col-span-7 reveal-blur-left">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-white/80 p-8 sm:p-10 shadow-xl card-hover-aura h-full flex flex-col justify-between relative overflow-hidden">
              {/* Corner Stamp */}
              <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
                <span className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase">
                  DVS // PROFILE NARRATIVE
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-primary text-white">
                  DOC 01
                </span>
              </div>

              <div className="space-y-4 text-text-muted leading-relaxed text-sm sm:text-base">
                <p>
                  I'm <span className="text-primary font-bold">Aisyah Arianti</span>, a Diploma III graduate in Information Management from <span className="text-primary font-semibold">Politeknik Negeri Sriwijaya</span>.
                </p>
                <p>
                  My educational background has introduced me to information systems, database management, programming, and digital technology.
                </p>
                <p>
                  Beyond technical knowledge, I have gained practical experience through internships and organizational activities, particularly in administrative support, data processing, communication, coordination, and teamwork.
                </p>
                <p>
                  I am someone who enjoys exploring new opportunities, learning new skills, and adapting to different professional environments.
                </p>
                <p>
                  I believe that combining technical knowledge, organizational abilities, and creativity can contribute to effective and meaningful work.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>FOCUS: SYSTEMATIC • CREATIVE • ADAPTIVE</span>
                <span className="text-accent font-bold">● VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Info Deck Card (5 cols) */}
          <div className="lg:col-span-5 reveal-blur-right">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-white/80 p-8 sm:p-10 shadow-xl card-hover-aura h-full flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase">
                    SYS // METADATA
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent text-white">
                    INFO
                  </span>
                </div>

                <div className="space-y-4">
                  {info.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3.5 p-3 rounded-2xl bg-bg-light/70 border border-border/40 hover:border-accent/40 transition-colors duration-200"
                    >
                      <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={18} className="text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-text-muted">{label}</p>
                        <p className="text-primary font-semibold text-xs sm:text-sm mt-0.5 leading-snug">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>STATUS: READY FOR OPPORTUNITIES</span>
                <span className="text-accent font-bold">2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

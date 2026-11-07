import { useState } from 'react';
import { Calendar, CheckCircle2, Briefcase, Sparkles, Building2 } from 'lucide-react';
import { experiences } from '../data/experience';

export default function Experience() {
  const [burstId, setBurstId] = useState(null);

  const handleCardClick = (id) => {
    setBurstId(id);
    setTimeout(() => {
      setBurstId(null);
    }, 700);
  };

  return (
    <section id="experience" className="py-20 lg:py-28 bg-[#F5F5F7] relative overflow-hidden">
      {/* Background ambient aura */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-accent/10 rounded-full aura-blob pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-accent/10 rounded-full aura-blob-delayed pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Editorial Section Header with Kinetic Typography & Orange Block */}
        <div className="text-center mb-14 reveal-blur">
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
            <span className="text-accent font-bold">+</span>
            <span>EXP // CAREER TRACK</span>
            <span className="text-accent font-bold">+</span>
          </div>

          <div className="relative my-3 flex flex-col items-center justify-center select-none">
            <div className="w-20 sm:w-28 h-20 sm:h-28 bg-accent rounded-sm shadow-xl shadow-accent/25 absolute -top-3 pointer-events-none" />
            <h2 className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black text-primary tracking-tight uppercase z-10">
              EXPERIENCE
            </h2>
            <span className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black stroke-text tracking-tight uppercase -mt-4 sm:-mt-6 opacity-75 z-20 pointer-events-none">
              EXPERIENCE
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-wider text-text-muted border-t border-b border-border/60 py-2 px-4 max-w-3xl mx-auto mt-4">
            <span>PLN ULP RIVAI</span>
            <span className="text-accent">+</span>
            <span>YOUR BEAUTY ERA</span>
            <span className="text-accent">+</span>
            <span>DATA & ADMIN SUPPORT</span>
          </div>
        </div>

        {/* Timeline Deck Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle central guideline */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-border/60 -translate-x-1/2" />

          <div className="space-y-10 lg:space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const isBursting = burstId === exp.id;
              const stampCode = idx === 0 ? 'EXP // PLN-01' : 'EXP // YBE-02';

              return (
                <div
                  key={exp.id}
                  className={`relative lg:flex items-stretch gap-10 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 z-20 items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary border-4 border-[#F5F5F7] shadow-md flex items-center justify-center text-accent">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div
                    onClick={() => handleCardClick(exp.id)}
                    className={`lg:w-1/2 cursor-pointer transition-all duration-300 ${
                      isBursting ? 'animate-membuyar-burst' : ''
                    }`}
                  >
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-white/80 p-6 sm:p-8 shadow-xl card-hover-aura relative overflow-hidden h-full flex flex-col justify-between">
                      {/* Top Stamp Header */}
                      <div>
                        <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-5">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                            <span className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase">
                              {stampCode}
                            </span>
                          </div>
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-accent/10 text-accent border border-accent/20">
                            {exp.type}
                          </span>
                        </div>

                        {/* Title and Company Header */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                            <Building2 size={22} className="text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading text-lg sm:text-xl font-bold text-primary leading-tight">
                              {exp.company}
                            </h3>
                            <p className="text-accent font-semibold text-sm mt-1 flex items-center gap-1.5">
                              <Briefcase size={14} />
                              {exp.position}
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-xs text-text-muted font-mono mt-1">
                              <Calendar size={13} />
                              {exp.period}
                            </span>
                          </div>
                        </div>

                        {/* Responsibilities */}
                        <div className="space-y-3 mb-6">
                          {exp.responsibilities.map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Highlights Pill Badges */}
                      <div className="pt-4 border-t border-border/40">
                        <div className="mb-2.5">
                          <span className="text-[10px] font-mono uppercase text-text-muted tracking-wider">
                            Focus Areas & Achievements:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.highlights.map((h) => (
                            <span
                              key={h}
                              className="px-3 py-1 bg-bg-light border border-border/60 text-primary text-xs font-mono font-medium rounded-lg"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for desktop layout */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

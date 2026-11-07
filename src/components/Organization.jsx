import { useState } from 'react';
import { Calendar, CheckCircle2, Users, Shield, Award } from 'lucide-react';
import { organizations } from '../data/organizations';

export default function Organization() {
  const [burstId, setBurstId] = useState(null);

  const handleCardClick = (id) => {
    setBurstId(id);
    setTimeout(() => {
      setBurstId(null);
    }, 700);
  };

  const orgStamps = [
    { code: 'ORG // HMME-01', roleTag: 'GENERAL SECRETARY' },
    { code: 'ORG // HMJ-MI-02', roleTag: 'DEPARTMENT SECRETARY' },
    { code: 'ORG // LDK-03', roleTag: 'PSDM DIVISION' },
  ];

  return (
    <section id="organization" className="py-20 lg:py-28 bg-[#F5F5F7] relative overflow-hidden">
      {/* Background ambient aura */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-accent/10 rounded-full aura-blob pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-accent/10 rounded-full aura-blob-delayed pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Editorial Section Header with Kinetic Typography & Orange Block */}
        <div className="text-center mb-14 reveal-blur">
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
            <span className="text-accent font-bold">+</span>
            <span>ORG // LEADERSHIP & GOVERNANCE</span>
            <span className="text-accent font-bold">+</span>
          </div>

          <div className="relative my-3 flex flex-col items-center justify-center select-none">
            <div className="w-20 sm:w-28 h-20 sm:h-28 bg-accent rounded-sm shadow-xl shadow-accent/25 absolute -top-3 pointer-events-none" />
            <h2 className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black text-primary tracking-tight uppercase z-10">
              ORGANIZATION
            </h2>
            <span className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black stroke-text tracking-tight uppercase -mt-4 sm:-mt-6 opacity-75 z-20 pointer-events-none">
              ORGANIZATION
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-wider text-text-muted border-t border-b border-border/60 py-2 px-4 max-w-3xl mx-auto mt-4">
            <span>HMME POLSRI</span>
            <span className="text-accent">+</span>
            <span>HMJ MANAJEMEN INFORMATIKA</span>
            <span className="text-accent">+</span>
            <span>LDK KARISMA</span>
          </div>
        </div>

        {/* 3 Organization Deck Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {organizations.map((org, idx) => {
            const isBursting = burstId === org.id;
            const stamp = orgStamps[idx] || { code: `ORG // 0${idx + 1}`, roleTag: 'EXECUTIVE' };

            return (
              <div
                key={org.id}
                onClick={() => handleCardClick(org.id)}
                className={`cursor-pointer transition-all duration-300 ${
                  isBursting ? 'animate-membuyar-burst' : ''
                }`}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-white/80 p-7 sm:p-8 shadow-xl card-hover-aura h-full flex flex-col justify-between relative overflow-hidden group">
                  {/* Top Stamp Header */}
                  <div>
                    <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                        <span className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase">
                          {stamp.code}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary text-white">
                        {stamp.roleTag}
                      </span>
                    </div>

                    {/* Org Icon & Title */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 bg-accent/15 text-accent rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Users size={22} className="text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-lg font-bold text-primary leading-tight">
                          {org.name}
                        </h3>
                        <p className="text-accent font-semibold text-sm mt-1">
                          {org.position}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-muted font-mono mt-1">
                          <Calendar size={13} />
                          {org.period}
                        </span>
                      </div>
                    </div>

                    {/* Key Contributions */}
                    <div className="space-y-2.5 mb-6">
                      {org.responsibilities.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Stamp */}
                  <div className="pt-4 border-t border-border/40 text-[10px] font-mono">
                    <span className="text-text-muted uppercase">ACTIVE TENURE: {org.period}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

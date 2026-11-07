import { Database, Code2, Palette, Users, Wrench } from 'lucide-react';
import { skills } from '../data/skills';

const iconMap = { Database, Code2, Palette, Users };

export default function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-[#F5F5F7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Editorial Section Header with Kinetic Typography & Orange Block */}
        <div className="text-center mb-14 reveal-blur">
          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
            <span className="text-accent font-bold">+</span>
            <span>SYS // CAPABILITIES</span>
            <span className="text-accent font-bold">+</span>
          </div>

          <div className="relative my-3 flex flex-col items-center justify-center select-none">
            <div className="w-20 sm:w-28 h-20 sm:h-28 bg-accent rounded-sm shadow-xl shadow-accent/25 absolute -top-3 pointer-events-none" />
            <h2 className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black text-primary tracking-tight uppercase z-10">
              SKILLS & EXPERTISE
            </h2>
            <span className="relative font-heading text-3xl sm:text-5xl md:text-6xl font-black stroke-text tracking-tight uppercase -mt-4 sm:-mt-6 opacity-75 z-20 pointer-events-none">
              SKILLS & EXPERTISE
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-wider text-text-muted border-t border-b border-border/60 py-2 px-4 max-w-3xl mx-auto mt-4">
            <span>DATA & ADMIN</span>
            <span className="text-accent">+</span>
            <span>INFORMATION TECH</span>
            <span className="text-accent">+</span>
            <span>UI/UX DESIGN</span>
            <span className="text-accent">+</span>
            <span>COMMUNICATION</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(skills).map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Database;
            const delayClass = idx === 0 ? '' : idx === 1 ? 'delay-150' : idx === 2 ? 'delay-200' : 'delay-300';
            const catCodes = ['DATA // 01', 'TECH // 02', 'DESIGN // 03', 'COMM // 04'];
            return (
              <div
                key={cat.title}
                className={`reveal-blur ${delayClass} bg-white/80 backdrop-blur-md rounded-3xl border-2 border-white/80 p-8 shadow-xl card-hover-aura flex flex-col justify-between relative overflow-hidden`}
              >
                <div>
                  {/* Top Card Badge Header */}
                  <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-5">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase">
                      DVS // {catCodes[idx]}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-neutral-900 text-white">
                      VERIFIED
                    </span>
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-primary">{cat.title}</h3>
                  </div>

                  <p className="text-text-muted text-sm mb-6 leading-relaxed">{cat.description}</p>

                  {/* Skill tags in Monospace Pill style */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-bg-light text-text-dark font-mono text-xs font-medium rounded-xl border border-border/60 hover:border-accent hover:bg-accent/5 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                {cat.tools.length > 0 && (
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench size={13} className="text-accent" />
                      <span className="text-[11px] font-mono font-bold text-text-muted uppercase tracking-wider">
                        PROFICIENCY TOOLS
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-white rounded-lg text-xs font-mono"
                        >
                          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                          <span>{tool.name}</span>
                          {tool.details && (
                            <span className="text-white/60">({tool.details})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

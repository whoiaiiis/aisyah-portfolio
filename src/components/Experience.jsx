import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { experiences } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-28 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16 reveal-blur">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Professional Experience
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent/20 -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const revealDir = idx % 2 === 0 ? 'reveal-blur-left' : 'reveal-blur-right';
              return (
                <div key={exp.id} className={`${revealDir} relative`}>
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-accent rounded-full border-4 border-white shadow-md z-10 items-center justify-center top-8">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>

                  <div className={`md:flex items-start gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Card side */}
                    <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="bg-white rounded-2xl shadow-md p-8 border border-border/30 card-hover-aura">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                          <span className="font-heading text-xl font-bold text-accent">
                            {exp.company.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-lg font-bold text-primary leading-snug">{exp.company}</h3>
                          <p className="text-accent font-semibold mt-1">{exp.position}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <span className="flex items-center gap-1.5 text-sm text-text-muted">
                              <Calendar size={14} />
                              {exp.period}
                            </span>
                            <span className="px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="space-y-3 mb-5">
                        {exp.responsibilities.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                            <p className="text-sm text-text-muted leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-3 py-1 bg-bg-light text-text-dark text-xs font-medium rounded-full"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}

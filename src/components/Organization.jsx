import { Calendar, CheckCircle2, Users } from 'lucide-react';
import { organizations } from '../data/organizations';

export default function Organization() {
  return (
    <section id="organization" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-6 reveal-blur">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Organizational Experience
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>
        <p className="text-center text-text-muted text-base lg:text-lg max-w-2xl mx-auto mb-16 reveal-blur delay-100">
          Leadership & community involvement beyond professional internships.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizations.map((org, idx) => {
            const delayClass = idx === 0 ? '' : idx === 1 ? 'delay-150' : 'delay-200';
            return (
              <div
                key={org.id}
                className={`reveal-blur ${delayClass} bg-white rounded-2xl border border-border/50 shadow-sm card-hover-aura overflow-hidden flex flex-col justify-between`}
              >
              {/* Orange left accent */}
              <div className="flex">
                <div className="w-1.5 bg-accent shrink-0" />
                <div className="p-8 flex-1">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <Users size={22} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-primary leading-snug">{org.name}</h3>
                      <p className="text-accent font-semibold mt-1">{org.position}</p>
                      <span className="flex items-center gap-1.5 text-sm text-text-muted mt-1">
                        <Calendar size={14} />
                        {org.period}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2.5">
                    {org.responsibilities.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                        <p className="text-sm text-text-muted leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
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

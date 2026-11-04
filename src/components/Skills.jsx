import { Database, Code2, Palette, Users, Wrench } from 'lucide-react';
import { skills } from '../data/skills';

const iconMap = { Database, Code2, Palette, Users };

export default function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16 reveal">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(skills).map((cat) => {
            const Icon = iconMap[cat.icon] || Database;
            return (
              <div
                key={cat.title}
                className="reveal bg-white rounded-2xl border border-border/50 p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary">{cat.title}</h3>
                </div>

                <p className="text-text-muted text-sm mb-6 leading-relaxed">{cat.description}</p>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-bg-light text-text-dark text-xs font-medium rounded-full border border-border/50 hover:border-accent/30 hover:bg-accent/5 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Tools */}
                {cat.tools.length > 0 && (
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench size={14} className="text-accent" />
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tools</span>
                    </div>
                    <div className="space-y-2">
                      {cat.tools.map((tool) => (
                        <div key={tool.name} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                          <span className="text-sm text-primary font-medium">{tool.name}</span>
                          {tool.details && (
                            <span className="text-xs text-text-muted">— {tool.details}</span>
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

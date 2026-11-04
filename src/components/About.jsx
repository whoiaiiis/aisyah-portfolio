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
    <section id="about" className="py-20 lg:py-28 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16 reveal">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Get to Know Me
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Bio */}
          <div className="reveal space-y-5 text-text-muted leading-relaxed text-base lg:text-lg">
            <p>
              I'm <span className="text-primary font-semibold">Aisyah Arianti</span>, a Diploma III graduate in Information Management from Politeknik Negeri Sriwijaya.
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

          {/* Info Card */}
          <div className="reveal">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-border/50">
              <h3 className="font-heading text-xl font-bold text-primary mb-6">Personal Information</h3>
              <div className="space-y-5">
                {info.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted font-medium">{label}</p>
                      <p className="text-primary font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Award, Calendar, Eye, X } from 'lucide-react';

const certificates = [
  {
    id: 1,
    title: 'Workshop UI/UX Design Meets Indonesia 2024',
    issuer: 'UI/UX Design Meets Indonesia',
    year: '2024',
    category: 'Technology & Digital Skills',
    image: '/certificates/cert_1.png',
  },
  {
    id: 2,
    title: 'Android Development Training — IT Festival',
    issuer: 'IT Festival Committee',
    year: '2024',
    category: 'Technology & Digital Skills',
    image: '/certificates/cert_2.png',
  },
  {
    id: 3,
    title: 'Informatics Study Club (SINTAK) — Web & IT Training',
    issuer: 'HMJ Manajemen Informatika Polsri',
    year: '2025',
    category: 'Technology & Digital Skills',
    image: '/certificates/cert_3.png',
  },
  {
    id: 4,
    title: 'SIAP 2024 Creative Video Competition — 2nd Place',
    issuer: 'SIAP 2024 Committee (LDK KARISMA Polsri)',
    year: '2024',
    category: 'Professional Development',
    image: '/certificates/cert_4.png',
  },
  {
    id: 8,
    title: 'Department Secretary Service Certificate (Sekretaris Departemen)',
    issuer: 'HMJ Manajemen Informatika Polsri',
    year: '2025',
    category: 'Organizational Activities',
    image: '/certificates/cert_8.png',
  },
  {
    id: 9,
    title: 'Intellectual Property Copyright (HKI) — Website Pengukuran Harga Komoditas Pangan',
    issuer: 'Kementerian Hukum RI (DJKI)',
    year: '2025',
    category: 'Technology & Digital Skills',
    image: '/certificates/cert_9.png',
  },
  {
    id: 10,
    title: 'EXPO Hasil Penelitian & Pengabdian Masyarakat 2025',
    issuer: 'P3M Politeknik Negeri Sriwijaya',
    year: '2025',
    category: 'Professional Development',
    image: '/certificates/cert_10.png',
  },
  {
    id: 11,
    title: 'Professional Internship Completion',
    issuer: 'PT PLN (Persero) ULP Rivai',
    year: '2025',
    category: 'Professional Development',
    image: '/certificates/cert_11.png',
  },
  {
    id: 12,
    title: 'Best Intern of the Month — KOL Specialist (Consecutive September & October 2026)',
    issuer: 'Your Beauty Era (YBE) — Role: KOL Specialist Intern',
    year: '2026',
    category: 'Professional Development',
    image: '/certificates/cert_12.png',
  },
];

const categories = [
  'All',
  'Technology & Digital Skills',
  'Professional Development',
  'Organizational Activities',
];

export default function Certificates() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);

  const filtered =
    activeFilter === 'All'
      ? certificates
      : certificates.filter((c) => c.category === activeFilter);

  const categoryColors = {
    'Technology & Digital Skills': 'bg-blue-50 text-blue-700 border-blue-200',
    'Professional Development': 'bg-green-50 text-green-700 border-green-200',
    'Communication & English': 'bg-purple-50 text-purple-700 border-purple-200',
    'Organizational Activities': 'bg-orange-50 text-orange-700 border-orange-200',
  };

  return (
    <section id="certificates" className="py-20 lg:py-28 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-6 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-xs font-semibold text-accent mb-3">
            Credentials & Recognition
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Certificates & Training
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>
        <p className="text-center text-text-muted text-base lg:text-lg max-w-2xl mx-auto mb-12 reveal">
          Official certificates, competition awards, and training verifications across academic, technological, and organizational activities.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-white text-text-dark border border-border hover:border-accent/40 hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((cert) => (
            <div
              key={cert.id}
              className="reveal group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden border border-border/40 flex flex-col justify-between"
            >
              <div>
                {/* Certificate image preview */}
                <div
                  className="relative h-48 bg-neutral-900 cursor-pointer overflow-hidden flex items-center justify-center p-2"
                  onClick={() => setSelectedCert(cert)}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-accent text-white text-xs font-semibold rounded-full shadow-lg">
                      <Eye size={13} />
                      Enlarge
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full border mb-2.5 ${
                      categoryColors[cert.category] || 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {cert.category}
                  </span>
                  <h3
                    onClick={() => setSelectedCert(cert)}
                    className="font-heading text-base font-bold text-primary mb-1 line-clamp-2 hover:text-accent cursor-pointer transition-colors"
                  >
                    {cert.title}
                  </h3>
                  <p className="text-xs text-text-muted mb-3">{cert.issuer}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-border/30 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Calendar size={12} />
                  {cert.year}
                </span>
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
                >
                  <Eye size={13} />
                  View Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-border/50">
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full border mb-1.5 ${
                    categoryColors[selectedCert.category] ||
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {selectedCert.category}
                </span>
                <h3 className="font-heading text-xl font-bold text-primary">
                  {selectedCert.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-1">
                  Issued by {selectedCert.issuer} ({selectedCert.year})
                </p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                className="p-2 text-text-muted hover:text-primary hover:bg-bg-light rounded-xl transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 sm:p-6 bg-neutral-950 flex items-center justify-center min-h-[300px]">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[600px] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="p-4 sm:p-5 bg-bg-light/60 border-t border-border/50 flex justify-end">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-accent transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

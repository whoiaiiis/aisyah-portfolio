import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  ExternalLink,
  Calendar,
  Grid,
  Layers,
  Award,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';

const certificates = [
  {
    id: 13,
    title: 'Sertifikat Kompetensi BNSP — Junior Web Programmer',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP) & LSP Polsri',
    year: '2026',
    category: 'Technology & Digital Skills',
    code: 'CERT // BNSP-01',
    image: '/certificates/cert_13.png',
    imagePage2: '/certificates/cert_13_p2.png',
    featured: true,
    regNo: 'No. Reg. J.351.00038 2026',
    certNo: 'No. 62019 3514 5 0008690 2026',
    competencies: [
      'Menggunakan Struktur Data',
      'Mengimplementasikan User Interface',
      'Melakukan Instalasi Software Tools Pemrograman',
      'Menulis Kode dengan Prinsip Sesuai Guidelines dan Best Practices',
      'Mengimplementasikan Pemrograman Terstruktur',
      'Menggunakan Library atau Komponen Pre-existing',
      'Membuat Dokumen Kode Program',
      'Melakukan Debugging',
    ],
  },
  {
    id: 1,
    title: 'Workshop UI/UX Design Meets Indonesia 2024',
    issuer: 'UI/UX Design Meets Indonesia',
    year: '2024',
    category: 'Technology & Digital Skills',
    code: 'CERT // UIUX-02',
    image: '/certificates/cert_1.png',
  },
  {
    id: 2,
    title: 'Android Development Training — IT Festival',
    issuer: 'IT Festival Committee',
    year: '2024',
    category: 'Technology & Digital Skills',
    code: 'CERT // ANDROID-03',
    image: '/certificates/cert_2.png',
  },
  {
    id: 3,
    title: 'Informatics Study Club (SINTAK) — Web & IT Training',
    issuer: 'HMJ Manajemen Informatika Polsri',
    year: '2025',
    category: 'Technology & Digital Skills',
    code: 'CERT // SINTAK-04',
    image: '/certificates/cert_3.png',
  },
  {
    id: 9,
    title: 'Intellectual Property Copyright (HKI) — Website Pengukuran Harga Komoditas Pangan',
    issuer: 'Kementerian Hukum RI (DJKI)',
    year: '2025',
    category: 'Technology & Digital Skills',
    code: 'CERT // HKI-05',
    image: '/certificates/cert_9.png',
  },
  {
    id: 11,
    title: 'Professional Internship Completion',
    issuer: 'PT PLN (Persero) ULP Rivai',
    year: '2025',
    category: 'Professional Development',
    code: 'CERT // PLN-06',
    image: '/certificates/cert_11.png',
  },
  {
    id: 12,
    title: 'Best Intern of the Month — KOL Specialist (Consecutive Sept & Oct 2026)',
    issuer: 'Your Beauty Era (YBE) — Role: KOL Specialist Intern',
    year: '2026',
    category: 'Professional Development',
    code: 'CERT // YBE-07',
    image: '/certificates/cert_12.png',
  },
  {
    id: 10,
    title: 'EXPO Hasil Penelitian & Pengabdian Masyarakat 2025',
    issuer: 'P3M Politeknik Negeri Sriwijaya',
    year: '2025',
    category: 'Professional Development',
    code: 'CERT // EXPO-08',
    image: '/certificates/cert_10.png',
  },
  {
    id: 8,
    title: 'Department Secretary Service Certificate (Sekretaris Departemen)',
    issuer: 'HMJ Manajemen Informatika Polsri',
    year: '2025',
    category: 'Organizational Activities',
    code: 'CERT // SERVICE-09',
    image: '/certificates/cert_8.png',
  },
  {
    id: 4,
    title: 'SIAP 2024 Creative Video Competition — 2nd Place',
    issuer: 'SIAP 2024 Committee (LDK KARISMA Polsri)',
    year: '2024',
    category: 'Organizational Activities',
    code: 'CERT // AWARD-10',
    image: '/certificates/cert_4.png',
  },
];

const categoryList = [
  'All',
  'Technology & Digital Skills',
  'Professional Development',
  'Organizational Activities',
];

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('deck'); // 'deck' | 'grid'
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [burstingCardId, setBurstingCardId] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeModalPage, setActiveModalPage] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  // Filtered certificates list
  const filteredCerts =
    activeCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  // Reset active index when category changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveDeckIndex(0);
  };

  const nextCard = useCallback(() => {
    if (filteredCerts.length === 0) return;
    setActiveDeckIndex((prev) => (prev + 1) % filteredCerts.length);
  }, [filteredCerts.length]);

  const prevCard = useCallback(() => {
    if (filteredCerts.length === 0) return;
    setActiveDeckIndex((prev) => (prev - 1 + filteredCerts.length) % filteredCerts.length);
  }, [filteredCerts.length]);

  // Open large detail modal immediately
  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
    setActiveModalPage(1);
    setIsZoomed(false);
  };

  // Keyboard navigation for deck view
  useEffect(() => {
    if (viewMode !== 'deck' || selectedCert) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, selectedCert, nextCard, prevCard]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  // 7-card radial offsets for fan arc
  const fanOffsets = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <section id="certificates" className="py-20 lg:py-28 bg-[#F5F5F7] relative overflow-hidden">
      {/* Background ambient glowing aura */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-accent/10 rounded-full aura-blob pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-accent/10 rounded-full aura-blob-delayed pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Editorial Frame with Corner Crosshairs */}
        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl border border-border/70 p-6 sm:p-10 lg:p-12 shadow-xl">
          {/* Corner Crosshair Marks */}
          <span className="absolute top-4 left-4 font-mono text-base font-bold text-accent select-none">+</span>
          <span className="absolute top-4 right-4 font-mono text-base font-bold text-accent select-none">+</span>
          <span className="absolute bottom-4 left-4 font-mono text-base font-bold text-accent select-none">+</span>
          <span className="absolute bottom-4 right-4 font-mono text-base font-bold text-accent select-none">+</span>

          {/* Top Tech Stamp Header */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-widest text-text-muted mb-4">
            <span className="flex items-center gap-1.5 font-bold text-primary">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              CERT // CREDENTIALS & ACCOLADES
            </span>
            <span className="hidden sm:inline font-mono">
              POLITEKNIK NEGERI SRIWIJAYA
            </span>
            <div className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary">
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            </div>
          </div>

          {/* Giant Kinetic Typography Header with Orange Block */}
          <div className="relative my-2 sm:my-6 flex flex-col items-center justify-center select-none">
            <div className="w-20 sm:w-28 h-28 sm:h-36 bg-accent rounded-sm shadow-xl shadow-accent/25 absolute -top-4 pointer-events-none" />
            <h2 className="relative font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary tracking-tighter uppercase z-10 drop-shadow-sm">
              CERTIFICATES
            </h2>
            <span className="relative font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black stroke-text tracking-tighter uppercase -mt-5 sm:-mt-8 opacity-80 z-20 pointer-events-none">
              CERTIFICATES
            </span>
          </div>

          {/* Monospace Subtitle Row with Crosshairs */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-wider text-text-muted border-t border-b border-border/60 py-2 px-2 sm:px-6 my-6">
            <span className="font-semibold text-primary">BNSP JUNIOR WEB PROGRAMMER</span>
            <span className="text-accent">+</span>
            <span className="hidden sm:inline">+</span>
            <span className="text-accent">+</span>
            <span className="font-semibold text-primary">10 VERIFIED CREDENTIALS</span>
          </div>

          {/* Category Tabs and View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categoryList.map((cat) => {
                const count =
                  cat === 'All'
                    ? certificates.length
                    : certificates.filter((c) => c.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white/90 text-text-dark border border-border/80 hover:border-accent hover:text-accent'
                    }`}
                  >
                    <span>{cat === 'All' ? 'ALL CREDENTIALS' : cat}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-accent text-white' : 'bg-bg-light text-text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Switcher: Fan Deck vs Grid */}
            <div className="inline-flex items-center p-1 bg-white/90 border border-border/70 rounded-2xl shadow-sm shrink-0">
              <button
                onClick={() => setViewMode('deck')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  viewMode === 'deck'
                    ? 'bg-primary text-white font-bold shadow-sm'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                <Layers size={14} className={viewMode === 'deck' ? 'text-accent' : ''} />
                <span>FAN DECK</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white font-bold shadow-sm'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                <Grid size={14} className={viewMode === 'grid' ? 'text-accent' : ''} />
                <span>GRID VIEW</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* VIEW MODE 1: INTERACTIVE FAN DECK ARC (Matching Projects section) */}
          {/* ======================================================== */}
          {viewMode === 'deck' && (
            <div className="relative">
              {/* Left & Right Side Navigation Arrows */}
              <button
                onClick={prevCard}
                aria-label="Previous certificate"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-white/90 hover:bg-accent hover:text-white text-primary shadow-lg border border-border/80 transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextCard}
                aria-label="Next certificate"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-white/90 hover:bg-accent hover:text-white text-primary shadow-lg border border-border/80 transition-all duration-200 hover:scale-110"
              >
                <ChevronRight size={22} />
              </button>

              {/* Radial Fan Deck Arc Container */}
              <div className="relative h-[390px] sm:h-[460px] md:h-[510px] flex items-center justify-center my-4 overflow-visible">
                {fanOffsets.map((offset) => {
                  const certIndex =
                    (activeDeckIndex + offset + filteredCerts.length * 10) % filteredCerts.length;
                  const cert = filteredCerts[certIndex];
                  const isCenter = offset === 0;
                  const isBursting = burstingCardId === cert?.id;

                  if (!cert) return null;

                  // Absolute arc transforms matching Projects Fan Deck
                  let transformStyle = '';
                  let zIndex = 10;
                  let opacity = 1;
                  let hideOnMobile = false;

                  if (offset === 0) {
                    transformStyle = 'translate3d(0, -22px, 0) rotate(0deg) scale(1.08)';
                    zIndex = 40;
                    opacity = 1;
                  } else if (offset === -1) {
                    transformStyle = 'translate3d(-115px, 8px, 0) rotate(-11deg) scale(0.95)';
                    zIndex = 30;
                    opacity = 0.95;
                  } else if (offset === 1) {
                    transformStyle = 'translate3d(115px, 8px, 0) rotate(11deg) scale(0.95)';
                    zIndex = 30;
                    opacity = 0.95;
                  } else if (offset === -2) {
                    transformStyle = 'translate3d(-220px, 36px, 0) rotate(-22deg) scale(0.88)';
                    zIndex = 20;
                    opacity = 0.85;
                  } else if (offset === 2) {
                    transformStyle = 'translate3d(220px, 36px, 0) rotate(22deg) scale(0.88)';
                    zIndex = 20;
                    opacity = 0.85;
                  } else if (offset === -3) {
                    transformStyle = 'translate3d(-315px, 75px, 0) rotate(-32deg) scale(0.78)';
                    zIndex = 10;
                    opacity = 0.65;
                    hideOnMobile = true;
                  } else if (offset === 3) {
                    transformStyle = 'translate3d(315px, 75px, 0) rotate(32deg) scale(0.78)';
                    zIndex = 10;
                    opacity = 0.65;
                    hideOnMobile = true;
                  }

                  return (
                    <div
                      key={`${cert.id}-${offset}`}
                      onClick={() => {
                        if (isCenter) {
                          handleOpenModal(cert);
                        } else {
                          setActiveDeckIndex(certIndex);
                        }
                      }}
                      style={{
                        transform: transformStyle,
                        zIndex,
                        opacity,
                        transition:
                          'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease',
                      }}
                      className={`absolute cursor-pointer select-none ${
                        hideOnMobile ? 'hidden sm:block' : ''
                      } ${isBursting ? 'animate-membuyar-burst' : ''}`}
                    >
                      {/* Playing-Card Deck Frame (Rounded 3XL) */}
                      <div
                        className={`relative w-48 h-72 sm:w-56 sm:h-84 md:w-64 md:h-96 rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                          isCenter
                            ? 'border-accent shadow-2xl shadow-accent/30 ring-4 ring-accent/20'
                            : 'border-white/80 shadow-xl hover:border-accent/60'
                        } bg-[#0D0D11] group`}
                      >
                        {/* Certificate Image Preview */}
                        <div className="w-full h-full p-2.5 pb-20 flex items-center justify-center bg-[#060608]">
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        {/* Top Stamp Bar */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md text-white border border-white/20">
                            {cert.code}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-accent text-white uppercase tracking-wider">
                            {cert.year}
                          </span>
                        </div>

                        {/* Bottom Gradient Overlay & Title */}
                        <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col justify-end">
                          <p className="text-[10px] font-mono uppercase text-accent font-semibold tracking-wider mb-1 line-clamp-1">
                            {cert.category}
                          </p>
                          <h3 className="font-heading text-sm font-bold text-white line-clamp-2 leading-tight">
                            {cert.title}
                          </h3>

                          {/* Center Card Action Prompt */}
                          {isCenter && (
                            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/20">
                              <span className="text-[11px] font-semibold text-accent inline-flex items-center gap-1.5">
                                <Eye size={13} />
                                Expand
                              </span>
                              <span className="text-[10px] text-white/70 font-mono">
                                Open ↗
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Rotating Dial & Counter */}
              <div className="relative flex flex-col items-center justify-center mt-6 select-none">
                <span className="text-xs font-mono font-bold text-accent tracking-widest mb-1 flex items-center gap-1">
                  <span>▲</span>
                  <span>CERT</span>
                </span>

                {/* Circular Compass Dial */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-dashed border-border flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-inner">
                  {/* Rotating Circular Text Ring */}
                  <div className="absolute inset-0 flex items-center justify-center animate-spin-slow pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <path
                        id="certDialCircle"
                        d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                        fill="none"
                      />
                      <text className="text-[7px] font-mono tracking-widest uppercase fill-text-muted">
                        <textPath href="#certDialCircle" startOffset="0%">
                          CERTIFICATES • AISYAH ARIANTI • 2026 •
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  {/* Center Badge with Active Index */}
                  <button
                    onClick={() => handleOpenModal(filteredCerts[activeDeckIndex])}
                    className="w-14 h-14 rounded-full bg-primary text-white flex flex-col items-center justify-center shadow-lg hover:bg-accent transition-colors group cursor-pointer"
                    title="Click to expand current certificate"
                  >
                    <span className="text-xs font-mono font-bold leading-none">
                      {String(activeDeckIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] font-mono text-white/70 uppercase">
                      / {filteredCerts.length}
                    </span>
                  </button>
                </div>

                <p className="text-xs text-text-muted font-mono mt-3">
                  Use ◀ ▶ arrows or click any card to fan through certificates
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW MODE 2: FULL GRID VIEW */}
          {/* ======================================================== */}
          {viewMode === 'grid' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
              {filteredCerts.map((cert) => {
                const isBursting = burstingCardId === cert.id;

                return (
                  <div
                    key={cert.id}
                    onClick={() => handleOpenModal(cert)}
                    className={`cursor-pointer transition-all duration-300 ${
                      isBursting ? 'animate-membuyar-burst' : ''
                    }`}
                  >
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-white/80 shadow-xl card-hover-aura overflow-hidden flex flex-col justify-between h-full group">
                      <div>
                        {/* Top Stamp Header */}
                        <div className="p-5 pb-3 flex items-center justify-between border-b border-border/40">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                            <span className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase">
                              {cert.code}
                            </span>
                          </div>
                          {cert.featured && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-accent text-white">
                              ★ FEATURED
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-bg-light text-text-muted border border-border/60">
                            {cert.year}
                          </span>
                        </div>

                        {/* Dark Preview Frame */}
                        <div className="relative h-48 bg-[#0D0D0E] overflow-hidden flex items-center justify-center p-3">
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Glow overlay */}
                          <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-xs font-mono font-bold uppercase rounded-full shadow-xl shadow-accent/40 group-hover:scale-105 transition-transform">
                              <Eye size={14} />
                              Expand
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-6">
                          <span className="inline-block px-2.5 py-1 text-[10px] font-mono font-semibold rounded-lg bg-accent/10 text-accent border border-accent/20 mb-3">
                            {cert.category}
                          </span>
                          <h3 className="font-heading text-base font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                            {cert.title}
                          </h3>
                          <p className="text-xs text-text-muted leading-relaxed">
                            Issued by:{' '}
                            <span className="font-medium text-text-dark">{cert.issuer}</span>
                          </p>
                          {cert.regNo && (
                            <p className="text-[11px] font-mono text-accent mt-2">
                              {cert.regNo}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bottom Action */}
                      <div className="px-6 py-4 border-t border-border/40 bg-bg-light/40 flex items-center justify-between text-xs font-mono">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Calendar size={13} />
                          {cert.year}
                        </span>
                        <span className="text-accent font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Expand ↗
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* LARGE DETAIL MODAL (Expansive view for crystal-clear readability) */}
      {/* ======================================================== */}
      {selectedCert &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setSelectedCert(null)}
          >
          <div
            className="bg-[#0D0D11] rounded-3xl max-w-6xl w-full max-h-[96vh] overflow-hidden shadow-2xl relative my-auto border-2 border-white/20 flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-[#14151C] gap-4 shrink-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-accent text-white">
                    {selectedCert.code}
                  </span>
                  <span className="text-xs font-mono text-white/60">
                    {selectedCert.category}
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    • Year: {selectedCert.year}
                  </span>
                </div>
                <h3 className="font-heading text-lg sm:text-2xl font-bold text-white leading-tight">
                  {selectedCert.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-mono mt-1">
                  Issued by: <span className="text-white font-medium">{selectedCert.issuer}</span>
                </p>
                {selectedCert.regNo && (
                  <p className="text-xs font-mono text-accent font-semibold mt-1">
                    {selectedCert.regNo} {selectedCert.certNo ? `| ${selectedCert.certNo}` : ''}
                  </p>
                )}
              </div>

              {/* Controls: Zoom, Open Image, Close */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border transition-colors ${
                    isZoomed
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white/5 text-white/80 border-white/15 hover:bg-white/10'
                  }`}
                  title="Toggle Zoom"
                >
                  {isZoomed ? <ZoomOut size={15} /> : <ZoomIn size={15} />}
                  <span>{isZoomed ? 'Reset Zoom' : 'Zoom In'}</span>
                </button>
                <a
                  href={activeModalPage === 2 && selectedCert.imagePage2 ? selectedCert.imagePage2 : selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  title="Open full image in new tab"
                >
                  <ExternalLink size={17} />
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close modal"
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-accent text-white transition-colors ml-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* If Certificate has Page 2 (like BNSP), Page Switcher Bar */}
            {selectedCert.imagePage2 && (
              <div className="px-5 sm:px-6 py-2.5 bg-[#090A0D] border-b border-white/10 flex items-center justify-between shrink-0">
                <span className="text-xs font-mono text-white/60">
                  OFFICIAL 2-SIDED DOCUMENT:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveModalPage(1);
                      setIsZoomed(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                      activeModalPage === 1
                        ? 'bg-accent text-white font-bold shadow-md shadow-accent/30'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    PAGE 1 (CERTIFICATE)
                  </button>
                  <button
                    onClick={() => {
                      setActiveModalPage(2);
                      setIsZoomed(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                      activeModalPage === 2
                        ? 'bg-accent text-white font-bold shadow-md shadow-accent/30'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    PAGE 2 (COMPETENCIES)
                  </button>
                </div>
              </div>
            )}

            {/* Expansive Image Stage (Large display for reading all text & details) */}
            <div className="p-4 sm:p-6 bg-[#060608] flex-1 overflow-auto flex items-center justify-center min-h-[420px] max-h-[72vh]">
              <div className="relative max-w-full flex items-center justify-center transition-transform duration-300">
                <img
                  src={
                    activeModalPage === 2 && selectedCert.imagePage2
                      ? selectedCert.imagePage2
                      : selectedCert.image
                  }
                  alt={selectedCert.title}
                  style={{
                    transform: isZoomed ? 'scale(1.45)' : 'scale(1)',
                    transformOrigin: 'center center',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl cursor-zoom-in"
                  onClick={() => setIsZoomed((prev) => !prev)}
                />
              </div>
            </div>

            {/* Competency unit breakdown for BNSP */}
            {selectedCert.competencies && activeModalPage === 2 && (
              <div className="p-5 sm:p-6 bg-[#111218] text-white border-t border-white/10 shrink-0">
                <p className="text-xs font-mono uppercase text-accent mb-2.5 font-bold">
                  8 Daftar Unit Kompetensi Teruji (Junior Web Programmer):
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-white/80">
                  {selectedCert.competencies.map((unit, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                      <span>{unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-[#14151C] border-t border-white/10 flex items-center justify-between shrink-0">
              <span className="text-xs font-mono text-white/50">
                VERIFIED ARCHIVE // POLITEKNIK NEGERI SRIWIJAYA
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors shadow-md shadow-accent/20"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

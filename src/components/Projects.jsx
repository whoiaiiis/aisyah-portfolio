import { useState, useEffect } from 'react';
import { Eye, X, Layers, Wrench, Code2, ChevronLeft, ChevronRight, Images, ExternalLink } from 'lucide-react';
import { projects, projectCategories } from '../data/projects';

export default function Projects() {
  const [viewMode, setViewMode] = useState('fan'); // 'fan' | 'grid'
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [burstingCardId, setBurstingCardId] = useState(null);

  const filtered =
    activeFilter === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Trigger bursting blur ("membuyar") before opening modal
  const handleOpenModal = (project) => {
    setBurstingCardId(project.id);
    setTimeout(() => {
      setSelectedProject(project);
      setActiveImageIndex(0);
      setBurstingCardId(null);
    }, 280);
  };

  const nextCard = () => {
    setActiveDeckIndex((prev) => (prev + 1) % projects.length);
  };

  const prevCard = () => {
    setActiveDeckIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) {
        if (e.key === 'Escape') setSelectedProject(null);
        if (e.key === 'ArrowRight' && selectedProject.images?.length > 1) {
          setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
        if (e.key === 'ArrowLeft' && selectedProject.images?.length > 1) {
          setActiveImageIndex((prev) =>
            prev === 0 ? selectedProject.images.length - 1 : prev - 1
          );
        }
      } else if (viewMode === 'fan') {
        if (e.key === 'ArrowLeft') prevCard();
        if (e.key === 'ArrowRight') nextCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, viewMode, activeDeckIndex]);

  // Fan deck offsets: [-3, -2, -1, 0, 1, 2, 3]
  const fanOffsets = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#f5f5f7] relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full aura-blob pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full aura-blob-delayed pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* View Mode Switcher Pills */}
        <div className="flex justify-center mb-8 reveal-blur">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-border/80 shadow-sm">
            <button
              onClick={() => setViewMode('fan')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                viewMode === 'fan'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-muted hover:text-primary hover:bg-bg-light'
              }`}
            >
              <span>🎴</span>
              <span>Interactive Fan Deck</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-muted hover:text-primary hover:bg-bg-light'
              }`}
            >
              <span>⊞</span>
              <span>All Projects Grid ({projects.length})</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            MODE A: INTERACTIVE FAN DECK (Inspired by reference image)
            ======================================================== */}
        {viewMode === 'fan' && (
          <div className="relative bg-white/70 backdrop-blur-md rounded-3xl border border-border/60 p-6 sm:p-10 shadow-xl overflow-hidden reveal-blur">
            {/* Corner Crosshair Marks */}
            <span className="absolute top-4 left-4 font-mono text-base font-bold text-accent select-none">+</span>
            <span className="absolute top-4 right-4 font-mono text-base font-bold text-accent select-none">+</span>
            <span className="absolute bottom-4 left-4 font-mono text-base font-bold text-accent select-none">+</span>
            <span className="absolute bottom-4 right-4 font-mono text-base font-bold text-accent select-none">+</span>

            {/* Top Row: Welcome & Tech Glyph */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-left font-mono leading-tight">
                <span className="text-[11px] sm:text-xs text-text-muted tracking-widest uppercase block">
                  WELCOME
                </span>
                <span className="text-xs sm:text-sm font-bold text-primary tracking-widest uppercase block">
                  TO MY
                </span>
              </div>

              {/* Center Emblem/Glyph */}
              <div className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:border-accent hover:text-accent transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              </div>
            </div>

            {/* Giant Kinetic Typography Header with Orange Block */}
            <div className="relative my-2 sm:my-6 flex flex-col items-center justify-center select-none">
              {/* Vertical Orange Accent Block */}
              <div className="w-20 sm:w-28 h-28 sm:h-36 bg-accent rounded-sm shadow-xl shadow-accent/25 absolute -top-4 pointer-events-none" />

              {/* Bold Primary PORTFOLIO */}
              <h2 className="relative font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary tracking-tighter uppercase z-10 drop-shadow-sm">
                PORTFOLIO
              </h2>

              {/* Kinetic Curved Stroke Outline PORTFOLIO Layer */}
              <span className="relative font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black stroke-text tracking-tighter uppercase -mt-5 sm:-mt-8 opacity-80 z-20 pointer-events-none">
                PORTFOLIO
              </span>
            </div>

            {/* Monospace Subtitle Row with Crosshairs */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-wider text-text-muted border-t border-b border-border/60 py-2 px-2 sm:px-6 my-6">
              <span className="font-semibold text-primary">AISYAH ARIANTI</span>
              <span className="text-accent">+</span>
              <span className="hidden sm:inline">+</span>
              <span className="text-accent">+</span>
              <span className="font-semibold text-primary">INFORMATION MANAGEMENT & CREATIVE</span>
            </div>

            {/* Left & Right Side Navigation Arrows */}
            <button
              onClick={prevCard}
              aria-label="Previous project card"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-white/90 hover:bg-accent hover:text-white text-primary shadow-lg border border-border/80 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextCard}
              aria-label="Next project card"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-white/90 hover:bg-accent hover:text-white text-primary shadow-lg border border-border/80 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight size={22} />
            </button>

            {/* THE FAN DECK CONTAINER (Radial / Arc Layout) */}
            <div className="relative h-[380px] sm:h-[450px] md:h-[500px] flex items-center justify-center my-4 overflow-visible">
              {fanOffsets.map((offset) => {
                const projectIndex =
                  (activeDeckIndex + offset + projects.length * 10) % projects.length;
                const project = projects[projectIndex];
                const isCenter = offset === 0;
                const isBursting = burstingCardId === project.id;

                // Absolute positions and rotations along the arc
                let transformStyle = '';
                let zIndex = 10;
                let opacity = 1;
                let hideOnMobile = false;

                if (offset === 0) {
                  transformStyle = 'translate3d(0, -22px, 0) rotate(0deg) scale(1.08)';
                  zIndex = 40;
                  opacity = 1;
                } else if (offset === -1) {
                  transformStyle = 'translate3d(-110px, 8px, 0) rotate(-11deg) scale(0.95)';
                  zIndex = 30;
                  opacity = 0.95;
                } else if (offset === 1) {
                  transformStyle = 'translate3d(110px, 8px, 0) rotate(11deg) scale(0.95)';
                  zIndex = 30;
                  opacity = 0.95;
                } else if (offset === -2) {
                  transformStyle = 'translate3d(-210px, 36px, 0) rotate(-22deg) scale(0.88)';
                  zIndex = 20;
                  opacity = 0.85;
                } else if (offset === 2) {
                  transformStyle = 'translate3d(210px, 36px, 0) rotate(22deg) scale(0.88)';
                  zIndex = 20;
                  opacity = 0.85;
                } else if (offset === -3) {
                  transformStyle = 'translate3d(-305px, 75px, 0) rotate(-32deg) scale(0.78)';
                  zIndex = 10;
                  opacity = 0.65;
                  hideOnMobile = true;
                } else if (offset === 3) {
                  transformStyle = 'translate3d(305px, 75px, 0) rotate(32deg) scale(0.78)';
                  zIndex = 10;
                  opacity = 0.65;
                  hideOnMobile = true;
                }

                return (
                  <div
                    key={`${project.id}-${offset}`}
                    onClick={() => {
                      if (isCenter) {
                        handleOpenModal(project);
                      } else {
                        setActiveDeckIndex(projectIndex);
                      }
                    }}
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity,
                      transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease',
                    }}
                    className={`absolute cursor-pointer select-none ${
                      hideOnMobile ? 'hidden sm:block' : ''
                    } ${isBursting ? 'animate-membuyar-burst' : ''}`}
                  >
                    {/* The Playing-Card Shape (Rounded 3XL, Sleek Border) */}
                    <div
                      className={`relative w-48 h-72 sm:w-56 sm:h-84 md:w-64 md:h-96 rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                        isCenter
                          ? 'border-accent shadow-2xl shadow-accent/30 ring-4 ring-accent/20'
                          : 'border-white/80 shadow-xl hover:border-accent/60'
                      } bg-neutral-900 group`}
                    >
                      {/* Card Cover Image */}
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Top Stamp / Badge Bar */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/75 backdrop-blur-md text-white border border-white/20">
                          {String(project.id).padStart(2, '0')} // {project.category.split(' ')[0]}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-accent text-white uppercase tracking-wider">
                          DVS
                        </span>
                      </div>

                      {/* Bottom Gradient Overlay & Title */}
                      <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end">
                        <p className="text-[10px] font-mono uppercase text-accent font-semibold tracking-wider mb-1 line-clamp-1">
                          {project.type}
                        </p>
                        <h3 className="font-heading text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
                          {project.title}
                        </h3>

                        {/* Interactive Click Prompt for Center Card */}
                        {isCenter && (
                          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/20">
                            <span className="text-[11px] font-semibold text-accent inline-flex items-center gap-1">
                              <Eye size={12} />
                              Click to Open
                            </span>
                            <span className="text-[10px] text-white/70 font-mono">
                              Membuyar →
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Circular Dial (Inspired by reference image) */}
            <div className="relative flex flex-col items-center justify-center mt-6 select-none">
              <span className="text-xs font-mono font-bold text-accent tracking-widest mb-1 flex items-center gap-1">
                <span>▲</span>
                <span>ME</span>
              </span>

              {/* Circular Compass Dial */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-dashed border-border flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-inner">
                {/* Rotating Circular Text Ring */}
                <div className="absolute inset-0 flex items-center justify-center animate-spin-slow pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path
                      id="dialCircle"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      fill="none"
                    />
                    <text className="text-[7px] font-mono tracking-widest uppercase fill-text-muted">
                      <textPath href="#dialCircle" startOffset="0%">
                        PORTFOLIO • AISYAH ARIANTI • 2026 •
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Center Badge with Active Index */}
                <button
                  onClick={() => handleOpenModal(projects[activeDeckIndex])}
                  className="w-14 h-14 rounded-full bg-primary text-white flex flex-col items-center justify-center shadow-lg hover:bg-accent transition-colors group cursor-pointer"
                  title="Click to view current project"
                >
                  <span className="text-xs font-mono font-bold leading-none">
                    {String(activeDeckIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-mono text-white/70 uppercase">
                    / {projects.length}
                  </span>
                </button>
              </div>

              <p className="text-xs text-text-muted font-mono mt-3">
                Use ◀ ▶ arrows or click any card to fan through projects
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            MODE B: ALL PROJECTS GRID (Comprehensive filter gallery)
            ======================================================== */}
        {viewMode === 'grid' && (
          <div className="reveal-blur">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
              {projectCategories.map((cat) => {
                const count =
                  cat === 'All Projects'
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length;
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-accent text-white shadow-lg shadow-accent/25'
                        : 'bg-white text-text-dark border border-border hover:border-accent/40 hover:text-accent'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-bg-light text-text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Project Grid with Rounded 3XL Deck Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project) => {
                const isBursting = burstingCardId === project.id;
                return (
                  <div
                    key={project.id}
                    onClick={() => handleOpenModal(project)}
                    className={`group bg-white rounded-3xl shadow-sm card-hover-aura overflow-hidden border border-border/50 flex flex-col justify-between animate-blur-in cursor-pointer ${
                      isBursting ? 'animate-membuyar-burst' : ''
                    }`}
                  >
                    <div>
                      {/* Project Image Preview */}
                      <div className="relative h-60 bg-neutral-900 overflow-hidden flex items-center justify-center">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Stamp Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-white text-[11px] font-semibold rounded-full border border-white/10">
                            {project.category}
                          </span>
                          <span className="px-2 py-0.5 bg-accent text-white font-mono text-[10px] font-bold rounded-md">
                            DVS {String(project.id).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Multiple images indicator */}
                        {project.images?.length > 1 && (
                          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/75 backdrop-blur-md text-white text-[11px] font-medium rounded-full border border-white/10">
                            <Images size={12} className="text-accent" />
                            {project.images.length}
                          </span>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-xs font-semibold rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye size={14} />
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-1">
                          {project.type}
                        </p>
                        <h3 className="font-heading text-lg font-bold text-primary mb-2.5 line-clamp-2 group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-text-muted text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-bg-light text-text-dark text-[11px] font-medium rounded-md border border-border/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 pb-6 pt-2 border-t border-border/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                        <Code2 size={13} className="text-accent" />
                        <span className="truncate max-w-[130px] sm:max-w-[160px]">
                          {project.tools?.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                            title="Open Live Website"
                          >
                            <ExternalLink size={12} />
                            Live
                          </a>
                        )}
                        <span className="text-xs font-semibold text-accent group-hover:text-accent-dark inline-flex items-center gap-1 transition-colors">
                          Details →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 flex items-start justify-between p-5 sm:p-6 border-b border-border/50">
              <div className="pr-8">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-text-muted font-medium">
                    {selectedProject.type}
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="p-2 text-text-muted hover:text-primary hover:bg-bg-light rounded-xl transition-colors shrink-0"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 space-y-6">
              {/* Image Carousel / Gallery */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative bg-neutral-950 rounded-xl overflow-hidden flex items-center justify-center min-h-[260px] max-h-[500px]">
                    <img
                      src={selectedProject.images[activeImageIndex]}
                      alt={`${selectedProject.title} - Preview ${activeImageIndex + 1}`}
                      className="max-h-[500px] w-auto max-w-full object-contain mx-auto"
                    />

                    {/* Navigation Arrows for multi-images */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev === 0 ? selectedProject.images.length - 1 : prev - 1
                            )
                          }
                          aria-label="Previous image"
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-accent text-white transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() =>
                            setActiveImageIndex(
                              (prev) => (prev + 1) % selectedProject.images.length
                            )
                          }
                          aria-label="Next image"
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-accent text-white transition-colors"
                        >
                          <ChevronRight size={20} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/75 backdrop-blur-sm text-white text-xs rounded-full font-medium">
                          {activeImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row if more than 1 image */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                      {selectedProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                            activeImageIndex === idx
                              ? 'border-accent shadow-md scale-105'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Full Title (if different) */}
              {selectedProject.fullTitle && (
                <div className="p-4 bg-bg-light rounded-xl border border-border/50">
                  <h4 className="font-heading text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                    Academic Project Title
                  </h4>
                  <p className="text-primary font-medium text-sm leading-relaxed">
                    {selectedProject.fullTitle}
                  </p>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="font-heading text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Project Overview
                </h4>
                <p className="text-text-dark text-sm sm:text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Method badge for Decision Support System */}
              {selectedProject.method && (
                <div>
                  <h4 className="font-heading text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Decision Support Method
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-lg border border-accent/20">
                    {selectedProject.method}
                  </span>
                  <p className="text-xs text-text-muted mt-1.5">
                    * The system applies the SAW algorithm to calculate and prioritize overdue customer accounts based on overdue criteria.
                  </p>
                </div>
              )}

              {/* Features (if provided) */}
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div>
                  <h4 className="font-heading text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers size={14} className="text-accent" />
                    Key Features & Modules
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2.5 bg-bg-light rounded-lg text-xs sm:text-sm text-text-dark"
                      >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contributions & Tools */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="font-heading text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Key Contributions
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.contributions?.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Wrench size={13} className="text-accent" />
                    Tools & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tools?.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 bg-bg-light text-text-dark text-xs font-medium rounded-full border border-border/50"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 bg-bg-light/60 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
              {selectedProject.link ? (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-md shadow-emerald-600/20"
                >
                  <ExternalLink size={15} />
                  Visit Live Website
                </a>
              ) : (
                <div />
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-accent transition-colors"
              >
                Close Project View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Eye,
  X,
  Layers,
  Wrench,
  Code2,
  ChevronLeft,
  ChevronRight,
  Images,
  ExternalLink,
  Calendar,
  Grid,
} from 'lucide-react';
import { projects, projectCategories } from '../data/projects';

export default function Projects() {
  const [viewMode, setViewMode] = useState('deck'); // 'deck' | 'grid'
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [burstingCardId, setBurstingCardId] = useState(null);

  const filtered =
    activeFilter === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleCategoryChange = (cat) => {
    setActiveFilter(cat);
    setActiveDeckIndex(0);
  };

  const nextCard = useCallback(() => {
    if (filtered.length === 0) return;
    setActiveDeckIndex((prev) => (prev + 1) % filtered.length);
  }, [filtered.length]);

  const prevCard = useCallback(() => {
    if (filtered.length === 0) return;
    setActiveDeckIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
  }, [filtered.length]);

  // Open modal directly with immediate responsiveness
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  // Lock body scroll when project modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedProject) {
      const handleModalKeys = (e) => {
        if (e.key === 'Escape') setSelectedProject(null);
        if (e.key === 'ArrowRight' && selectedProject.images?.length > 1) {
          setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
        if (e.key === 'ArrowLeft' && selectedProject.images?.length > 1) {
          setActiveImageIndex((prev) =>
            prev === 0 ? selectedProject.images.length - 1 : prev - 1
          );
        }
      };
      window.addEventListener('keydown', handleModalKeys);
      return () => window.removeEventListener('keydown', handleModalKeys);
    } else if (viewMode === 'deck') {
      const handleDeckKeys = (e) => {
        if (e.key === 'ArrowLeft') prevCard();
        if (e.key === 'ArrowRight') nextCard();
      };
      window.addEventListener('keydown', handleDeckKeys);
      return () => window.removeEventListener('keydown', handleDeckKeys);
    }
  }, [selectedProject, viewMode, activeDeckIndex, nextCard, prevCard]);

  // Fan deck offsets: [-3, -2, -1, 0, 1, 2, 3]
  const fanOffsets = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#f5f5f7] relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full aura-blob pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full aura-blob-delayed pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Unified Editorial Frame with Corner Crosshairs (Matching Certificates) */}
        <div className="relative bg-white/70 backdrop-blur-md rounded-3xl border border-border/70 p-6 sm:p-10 lg:p-12 shadow-xl">
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

          {/* Category Tabs and View Mode Switcher (Identical to Certificates layout) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Category Filter Pills on Left */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {projectCategories.map((cat) => {
                const count =
                  cat === 'All Projects'
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length;
                const isActive = activeFilter === cat;

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
                    <span>{cat}</span>
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

            {/* View Switcher: Fan Deck vs Grid on Right (Exact match with Certificates) */}
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

          {/* ========================================================
              MODE A: INTERACTIVE FAN DECK
              ======================================================== */}
          {viewMode === 'deck' && (
            <div className="relative">
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

              {/* Radial Fan Deck Arc Container */}
              <div className="relative h-[390px] sm:h-[460px] md:h-[510px] flex items-center justify-center my-4 overflow-visible">
                {fanOffsets.map((offset) => {
                  const projectIndex =
                    (activeDeckIndex + offset + filtered.length * 10) % filtered.length;
                  const project = filtered[projectIndex];
                  const isCenter = offset === 0;
                  const isBursting = burstingCardId === project?.id;

                  if (!project) return null;

                  // Absolute arc transforms
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
                        } bg-neutral-900 group`}
                      >
                        {/* Cover Image */}
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Top Stamp Bar */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md text-white border border-white/20">
                            PRJ // {String(project.id).padStart(2, '0')}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-accent text-white uppercase tracking-wider">
                            DVS
                          </span>
                        </div>

                        {/* Bottom Gradient Overlay & Title */}
                        <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col justify-end">
                          <p className="text-[10px] font-mono uppercase text-accent font-semibold tracking-wider mb-1 line-clamp-1">
                            {project.category}
                          </p>
                          <h3 className="font-heading text-sm font-bold text-white line-clamp-2 leading-tight">
                            {project.title}
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

              {/* Bottom Rotating Compass Dial */}
              <div className="relative flex flex-col items-center justify-center mt-6 select-none">
                <span className="text-xs font-mono font-bold text-accent tracking-widest mb-1 flex items-center gap-1">
                  <span>▲</span>
                  <span>ME</span>
                </span>

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
                    onClick={() => handleOpenModal(filtered[activeDeckIndex])}
                    className="w-14 h-14 rounded-full bg-primary text-white flex flex-col items-center justify-center shadow-lg hover:bg-accent transition-colors group cursor-pointer"
                    title="Click to view current project"
                  >
                    <span className="text-xs font-mono font-bold leading-none">
                      {String(activeDeckIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] font-mono text-white/70 uppercase">
                      / {filtered.length}
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
              MODE B: ALL PROJECTS GRID (Exact Match with Certificates Grid Cards)
              ======================================================== */}
          {viewMode === 'grid' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
              {filtered.map((project) => {
                const isBursting = burstingCardId === project.id;

                return (
                  <div
                    key={project.id}
                    onClick={() => handleOpenModal(project)}
                    className={`cursor-pointer transition-all duration-300 ${
                      isBursting ? 'animate-membuyar-burst' : ''
                    }`}
                  >
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-white/80 shadow-xl card-hover-aura overflow-hidden flex flex-col justify-between h-full group">
                      <div>
                        {/* Top Stamp Header (Identical to Certificates) */}
                        <div className="p-5 pb-3 flex items-center justify-between border-b border-border/40">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                            <span className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase">
                              PRJ // {String(project.id).padStart(2, '0')}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-bg-light text-text-muted border border-border/60">
                            {project.tools?.[0] || 'DEV'}
                          </span>
                        </div>

                        {/* Dark Preview Frame (Identical to Certificates) */}
                        <div className="relative h-48 bg-[#0D0D0E] overflow-hidden flex items-center justify-center p-3">
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Multiple Images Indicator Badge */}
                          {project.images?.length > 1 && (
                            <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono font-medium rounded-md border border-white/15">
                              <Images size={11} className="text-accent" />
                              {project.images.length}
                            </span>
                          )}

                          {/* Glow Overlay with Expand */}
                          <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-xs font-mono font-bold uppercase rounded-full shadow-xl shadow-accent/40 group-hover:scale-105 transition-transform">
                              <Eye size={14} />
                              Expand
                            </span>
                          </div>
                        </div>

                        {/* Card Info Body */}
                        <div className="p-6">
                          <span className="inline-block px-2.5 py-1 text-[10px] font-mono font-semibold rounded-lg bg-accent/10 text-accent border border-accent/20 mb-3">
                            {project.category}
                          </span>
                          <h3 className="font-heading text-base font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                            {project.title}
                          </h3>
                          <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tools?.slice(0, 3).map((tool) => (
                              <span
                                key={tool}
                                className="px-2 py-0.5 bg-bg-light border border-border/50 text-[10px] font-mono text-text-dark rounded-md"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action (Identical to Certificates) */}
                      <div className="px-6 py-4 border-t border-border/40 bg-bg-light/40 flex items-center justify-between text-xs font-mono">
                        <span className="text-text-muted flex items-center gap-1.5">
                          <Code2 size={13} className="text-accent" />
                          <span className="truncate max-w-[140px]">
                            {project.type.split('—')[0].trim()}
                          </span>
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

      {/* ========================================================
          PROJECT DETAILS MODAL (Teleported to Document Body via createPortal)
          ======================================================== */}
      {selectedProject &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto animate-in zoom-in-95 duration-200"
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
                          className="px-2.5 py-1 bg-bg-light text-text-dark text-xs font-medium rounded-lg border border-border/40"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tools?.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-lg"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-bg-light/60 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
                {selectedProject.link ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-accent/25"
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
          </div>,
          document.body
        )}
    </section>
  );
}

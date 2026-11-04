import { useState, useEffect } from 'react';
import { Eye, X, Layers, Wrench, Code2, ChevronLeft, ChevronRight, Images, ExternalLink } from 'lucide-react';
import { projects, projectCategories } from '../data/projects';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const filtered =
    activeFilter === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Reset image index when opening a new project
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
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
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-xs font-semibold text-accent mb-3">
            Portfolio Gallery
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Projects & Portfolio
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>
        <p className="text-center text-text-muted text-base lg:text-lg max-w-2xl mx-auto mb-12 reveal">
          A showcase of 18 academic, training, personal, and administrative projects demonstrating versatile capabilities in technology, design, and data organization.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 reveal">
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

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden border border-border/40 flex flex-col justify-between animate-in fade-in duration-200"
            >
              <div>
                {/* Project Image Preview */}
                <div
                  className="relative h-56 bg-neutral-900 cursor-pointer overflow-hidden flex items-center justify-center"
                  onClick={() => handleOpenModal(project)}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-primary/80 backdrop-blur-md text-white text-[11px] font-semibold rounded-full border border-white/10">
                    {project.category}
                  </span>

                  {/* Multiple images indicator */}
                  {project.images?.length > 1 && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/75 backdrop-blur-md text-white text-[11px] font-medium rounded-full border border-white/10">
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
                  <h3
                    onClick={() => handleOpenModal(project)}
                    className="font-heading text-lg font-bold text-primary mb-2.5 line-clamp-2 hover:text-accent cursor-pointer transition-colors"
                  >
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
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="text-xs font-semibold text-accent hover:text-accent-dark inline-flex items-center gap-1 transition-colors"
                  >
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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

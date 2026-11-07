import { useEffect, useState } from 'react';
import ParticleBurstIntro from './components/ParticleBurstIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Organization from './components/Organization';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    // Only start observing scroll-reveal animations once the intro begins revealing
    if (showIntro && !isRevealing) return;

    const selector =
      '.reveal, .reveal-blur, .reveal-blur-left, .reveal-blur-right, .reveal-blur-scale';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeElements = () => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains('active')) {
          observer.observe(el);
        }
      });
    };

    // Small delay to ensure the DOM is painted smoothly
    const timer = setTimeout(observeElements, 100);

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [showIntro, isRevealing]);

  return (
    <div className="min-h-screen bg-secondary relative overflow-x-hidden">
      {/* Cinematic Particle Burst Intro Overlay */}
      {showIntro && (
        <ParticleBurstIntro
          onFadeStart={() => setIsRevealing(true)}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Main Portfolio Content with Synchronized Dissolve Entrance */}
      <div
        className={
          showIntro
            ? `transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
                !isRevealing
                  ? 'opacity-0 scale-[0.985] filter blur-md pointer-events-none'
                  : 'opacity-100 scale-100 filter-none pointer-events-auto'
              }`
            : 'relative'
        }
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Organization />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;

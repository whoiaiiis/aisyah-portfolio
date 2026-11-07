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
  useEffect(() => {
    const selector = '.reveal, .reveal-blur, .reveal-blur-left, .reveal-blur-right, .reveal-blur-scale';
    
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

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      {showIntro && (
        <ParticleBurstIntro onComplete={() => setShowIntro(false)} />
      )}
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
  );
}

export default App;

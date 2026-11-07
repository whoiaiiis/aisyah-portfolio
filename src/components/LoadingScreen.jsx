import { useState, useEffect } from 'react';

export default function LoadingScreen({ onFadeStart, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'fading' | 'done'

  useEffect(() => {
    let current = 0;
    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds total for snappy & silky feel

    let animationFrameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      // Smooth custom easing curve: fast initial acceleration, steady middle, micro-pause near 90-95%
      let eased;
      if (t < 0.7) {
        eased = Math.pow(t / 0.7, 1.2) * 0.85;
      } else {
        eased = 0.85 + Math.pow((t - 0.7) / 0.3, 0.9) * 0.15;
      }

      current = Math.min(100, Math.floor(eased * 100));
      setProgress(current);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        
        // Brief pause at 100% before smooth fade-out
        setTimeout(() => {
          setPhase('fading');
          if (onFadeStart) onFadeStart();

          // Wait for smooth dissolve transition to finish before unmounting
          setTimeout(() => {
            setPhase('done');
            if (onComplete) onComplete();
          }, 800);
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onFadeStart, onComplete]);

  if (phase === 'done') return null;

  // Dynamic subtitle based on progress
  let statusText = 'Memuat assets...';
  if (progress > 35 && progress <= 75) {
    statusText = 'Menyiapkan portfolio...';
  } else if (progress > 75 && progress < 100) {
    statusText = 'Menyempurnakan tampilan...';
  } else if (progress === 100) {
    statusText = 'Siap!';
  }

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-[#050505] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none select-none ${
        phase === 'fading'
          ? 'opacity-0 scale-[1.03] blur-sm'
          : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Center Percentage Display & Progress Bar */}
      <div className="flex flex-col items-center justify-center">
        {/* Large Percentage */}
        <div className="flex items-baseline font-heading font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none mb-5 text-white">
          <span>{progress}</span>
          <span className="text-[#3B82F6] ml-1 text-4xl sm:text-5xl md:text-6xl font-extrabold">
            %
          </span>
        </div>

        {/* Sleek Horizontal Progress Bar */}
        <div className="w-56 sm:w-72 md:w-80 h-[3px] bg-white/10 rounded-full overflow-hidden relative mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text */}
        <p className="text-white/60 text-xs sm:text-sm font-sans tracking-wide">
          {statusText}
        </p>
      </div>
    </div>
  );
}

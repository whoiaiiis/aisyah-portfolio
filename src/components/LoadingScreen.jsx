import { useState, useEffect } from 'react';

export default function LoadingScreen({ onFadeStart, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'fading' | 'done'

  useEffect(() => {
    let animationFrameId;
    const duration = 2000; // 2 seconds silky smooth easing
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      // Silky cubic-bezier ease-out curve for continuous, fluid number increment
      // Fast responsive start, gliding effortlessly into 100%
      const eased = 1 - Math.pow(1 - t, 3.5);
      const current = Math.min(100, Math.round(eased * 100));

      setProgress(current);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);

        // Smooth pause at 100% before dissolve
        setTimeout(() => {
          setPhase('fading');
          if (onFadeStart) onFadeStart();

          // Complete transition seamlessly
          setTimeout(() => {
            setPhase('done');
            if (onComplete) onComplete();
          }, 900);
        }, 180);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onFadeStart, onComplete]);

  if (phase === 'done') return null;

  // Dynamic portfolio status labels matching Aisyah's branding
  let statusText = 'Memuat aset portofolio...';
  if (progress > 30 && progress <= 70) {
    statusText = 'Menyiapkan showcase karya...';
  } else if (progress > 70 && progress < 100) {
    statusText = 'Menyempurnakan visual...';
  } else if (progress === 100) {
    statusText = 'Selamat datang!';
  }

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-[#0A0B0D] flex flex-col items-center justify-center transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none select-none overflow-hidden ${
        phase === 'fading'
          ? 'opacity-0 scale-[1.04] filter blur-xl'
          : 'opacity-100 scale-100 filter-none'
      }`}
    >
      {/* Portfolio Ambient Warm Glow Behind Counter */}
      <div className="absolute w-80 h-80 rounded-full bg-[#F47B20]/15 blur-3xl pointer-events-none -translate-y-4" />

      {/* Center Percentage Display & Progress Bar */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Large Percentage */}
        <div className="flex items-baseline font-heading font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none mb-6 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          <span className="tabular-nums">{progress}</span>
          <span className="text-[#F47B20] ml-1.5 text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-[0_0_20px_rgba(244,123,32,0.5)]">
            %
          </span>
        </div>

        {/* Sleek Horizontal Progress Bar with Portfolio Accent */}
        <div className="w-56 sm:w-72 md:w-80 h-[3.5px] bg-white/10 rounded-full overflow-hidden relative mb-5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#F47B20] via-[#FF9F43] to-[#FFC371] rounded-full transition-all duration-75 ease-out shadow-[0_0_16px_rgba(244,123,32,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text with Animated Warm Indicator */}
        <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm font-sans tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F47B20] shadow-[0_0_8px_#F47B20] animate-pulse" />
          <span>{statusText}</span>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

export default function ParticleBurstIntro({ onComplete, onFadeStart }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('charge'); // 'charge' | 'burst' | 'fade' | 'done'
  const [showText, setShowText] = useState(false);
  const [flashOpacity, setFlashOpacity] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      onFadeStart?.();
      onComplete?.();
      return;
    }

    // Lock body scroll during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    // High-energy particle color palette (Futuristic Neon Orange & White Core)
    const colors = [
      '#FFFFFF', // Core flash
      '#FFF2DF', // Hot core ember
      '#FFB057', // Bright amber
      '#F47B20', // Signature Neon Orange
      '#FF5A1F', // Intense orange
      '#E05D06', // Deep flame
      '#FFD29D', // Golden spark
    ];

    // Particle arrays
    const particles = [];
    const shockwaves = [];
    const energyRays = [];

    // 1. Pre-burst charge particles (drawn inward to singularity)
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 160 + Math.random() * 340;
      energyRays.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        targetX: cx,
        targetY: cy,
        speed: 0.045 + Math.random() * 0.065,
        size: 1.2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let startTime = performance.now();
    let burstTriggered = false;
    let fadeTriggered = false;

    // Helper: spawn explosive burst particles
    const triggerBurst = () => {
      burstTriggered = true;
      setPhase('burst');
      setShowText(true);

      // Flash effect - quick cinematic bloom
      setFlashOpacity(0.92);
      setTimeout(() => setFlashOpacity(0), 160);

      // Multiple shockwave energy rings
      shockwaves.push({ radius: 8, maxRadius: Math.max(width, height) * 0.95, speed: 26, strokeWidth: 4, alpha: 1, color: '#FFFFFF' });
      shockwaves.push({ radius: 4, maxRadius: Math.max(width, height) * 0.8, speed: 19, strokeWidth: 6, alpha: 0.85, color: '#F47B20' });
      shockwaves.push({ radius: 0, maxRadius: Math.max(width, height) * 0.65, speed: 13, strokeWidth: 8, alpha: 0.7, color: '#FFB057' });

      // Generate 450 cinematic particles
      const count = 460;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.pow(Math.random(), 2.2) * 25 + (Math.random() * 11 + 2);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isSpark = Math.random() > 0.42;
        const size = isSpark ? Math.random() * 2.2 + 1 : Math.random() * 4.5 + 2;

        particles.push({
          x: cx,
          y: cy,
          prevX: cx,
          prevY: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          friction: isSpark ? 0.95 : 0.972,
          color,
          size,
          isSpark,
          alpha: 1,
          decay: isSpark ? Math.random() * 0.012 + 0.008 : Math.random() * 0.007 + 0.005,
          curl: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    // Main animation loop
    const render = (currentTime) => {
      const elapsed = currentTime - startTime;

      // Dark background clearing with smooth trail persistence
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = fadeTriggered ? 'rgba(5, 5, 8, 0.16)' : 'rgba(5, 5, 8, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // Additive blending for luminous energy glow
      ctx.globalCompositeOperation = 'lighter';

      // ==========================================
      // PHASE 1: CHARGING SINGULARITY (0 - 650ms)
      // ==========================================
      if (elapsed < 650 && !burstTriggered) {
        const progress = elapsed / 650;
        const coreSize = 3 + progress * 18 + (Math.random() - 0.5) * 3;

        // Central pulsing core glow
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize * 3);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.35, '#FFA048');
        gradient.addColorStop(0.7, '#F47B20');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, coreSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Inward suction energy rays
        for (const ray of energyRays) {
          ray.x += (cx - ray.x) * ray.speed;
          ray.y += (cy - ray.y) * ray.speed;

          ctx.fillStyle = ray.color;
          ctx.beginPath();
          ctx.arc(ray.x, ray.y, ray.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Trigger burst at 650ms
      if (elapsed >= 650 && !burstTriggered) {
        triggerBurst();
      }

      // ==========================================
      // PHASE 2 & 3: BURST & DISSOLVE
      // ==========================================
      if (burstTriggered) {
        // Draw Expanding Shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const sw = shockwaves[i];
          sw.radius += sw.speed;
          sw.alpha *= 0.945;

          if (sw.alpha > 0.01) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = sw.color;
            ctx.lineWidth = sw.strokeWidth;
            ctx.globalAlpha = sw.alpha;
            ctx.stroke();
            ctx.restore();
          } else {
            shockwaves.splice(i, 1);
          }
        }

        // Draw and update explosion particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.prevX = p.x;
          p.prevY = p.y;

          // Physics: friction & graceful curved drift
          p.vx *= p.friction;
          p.vy *= p.friction;

          const vx = p.vx * Math.cos(p.curl) - p.vy * Math.sin(p.curl);
          const vy = p.vx * Math.sin(p.curl) + p.vy * Math.cos(p.curl);
          p.vx = vx;
          p.vy = vy;

          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);

          if (p.isSpark) {
            // Motion-blurred spark streaks with tails
            ctx.beginPath();
            ctx.moveTo(p.prevX, p.prevY);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = p.size;
            ctx.lineCap = 'round';
            ctx.stroke();
          } else {
            // Glowing energy embers
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          }

          ctx.restore();
        }

        // Central residual dissipation glow
        const residualTime = elapsed - 650;
        if (residualTime < 2400) {
          const resAlpha = Math.max(0, 1 - residualTime / 2400) * 0.4;
          const resRadius = 70 + residualTime * 0.16;
          const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, resRadius);
          glowGrad.addColorStop(0, `rgba(255, 255, 255, ${resAlpha})`);
          glowGrad.addColorStop(0.3, `rgba(244, 123, 32, ${resAlpha * 0.75})`);
          glowGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, resRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Smooth Reveal Trigger: Begin graceful fade at 2000ms
      if (elapsed > 2000 && !fadeTriggered) {
        fadeTriggered = true;
        setPhase('fade');
        onFadeStart?.();
      }

      // Intro completion at 3400ms (1400ms transition time for ultra-smooth cross-dissolve)
      if (elapsed > 3400) {
        setPhase('done');
        document.body.style.overflow = originalOverflow;
        onComplete?.();
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete, onFadeStart]);

  const handleSkip = () => {
    if (phase === 'fade' || phase === 'done') return;
    setPhase('fade');
    onFadeStart?.();
    setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
      onComplete?.();
    }, 550);
  };

  if (phase === 'done') return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center transition-all duration-[1300ms] cubic-bezier(0.16, 1, 0.3, 1) select-none ${
        phase === 'fade'
          ? 'opacity-0 scale-[1.03] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. Cinematic Fullscreen Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* 2. Instantaneous White-Orange Flash */}
      <div
        className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-200 ease-out"
        style={{ opacity: flashOpacity }}
      />

      {/* 3. Luminous Radial Bloom (Bridges dark burst into bright portfolio canvas) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-[1200ms] ease-out ${
          phase === 'fade' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(244, 123, 32, 0.25) 0%, rgba(255, 230, 200, 0.12) 35%, rgba(5, 5, 8, 0) 70%)',
        }}
      />

      {/* 4. Central Cinematic Typography (Revealed by burst, lifted & blurred during fade) */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none ${
          phase === 'fade'
            ? 'opacity-0 -translate-y-8 scale-105 filter blur-lg'
            : showText
            ? 'opacity-100 translate-y-0 scale-100 filter blur-none'
            : 'opacity-0 translate-y-4 scale-90 filter blur-md'
        }`}
      >
        {/* Glowing Monospace Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent font-mono text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-3 shadow-[0_0_20px_rgba(244,123,32,0.4)]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span>PORTFOLIO INITIALIZED</span>
        </div>

        {/* Cinematic Main Name */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_0_35px_rgba(244,123,32,0.65)]">
          Aisyah <span className="text-accent">Arianti</span>
          <span className="text-accent">.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-white/70">
          Information Management & Creative Specialist
        </p>
      </div>

      {/* 5. Top-Right Skip Button */}
      <button
        onClick={handleSkip}
        className={`absolute top-5 right-5 sm:top-8 sm:right-8 z-20 px-4 py-2 rounded-full bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 text-white/70 hover:text-white text-xs font-mono tracking-widest transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center gap-2 ${
          phase === 'fade' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Skip introduction"
      >
        <span>SKIP INTRO</span>
        <span className="text-accent">➔</span>
      </button>

      {/* 6. Bottom Technical Loading Coordinates */}
      <div
        className={`absolute bottom-6 inset-x-0 text-center pointer-events-none transition-opacity duration-700 ${
          phase === 'fade' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
          SYS // 2026 // READY
        </span>
      </div>
    </div>
  );
}

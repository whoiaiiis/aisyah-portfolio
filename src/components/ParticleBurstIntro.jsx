import { useEffect, useRef, useState } from 'react';

export default function ParticleBurstIntro({ onComplete }) {
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
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    // Particle color palettes (Futuristic Neon Orange & White Core)
    const colors = [
      '#FFFFFF', // Core flash
      '#FFF0D4', // White-orange hot
      '#FF9A3C', // Bright neon amber
      '#F47B20', // Signature Neon Orange
      '#D96A15', // Deep accent orange
      '#FF5E13', // High-energy flame
      '#FFBE76', // Soft spark
    ];

    // Particle arrays
    const particles = [];
    const shockwaves = [];
    const energyRays = [];

    // 1. Pre-burst charge particles (drawn inward to singularity)
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 180 + Math.random() * 320;
      energyRays.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        targetX: cx,
        targetY: cy,
        speed: 0.04 + Math.random() * 0.06,
        size: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.1 + Math.random() * 0.7,
      });
    }

    let startTime = performance.now();
    let burstTriggered = false;

    // Helper: spawn explosive burst particles
    const triggerBurst = () => {
      burstTriggered = true;
      setPhase('burst');
      setShowText(true);

      // Flash effect
      setFlashOpacity(0.95);
      setTimeout(() => setFlashOpacity(0), 120);

      // Multiple shockwave energy rings
      shockwaves.push({ radius: 10, maxRadius: Math.max(width, height) * 0.9, speed: 28, strokeWidth: 4, alpha: 1, color: '#FFFFFF' });
      shockwaves.push({ radius: 5, maxRadius: Math.max(width, height) * 0.75, speed: 20, strokeWidth: 6, alpha: 0.9, color: '#F47B20' });
      shockwaves.push({ radius: 0, maxRadius: Math.max(width, height) * 0.6, speed: 14, strokeWidth: 8, alpha: 0.8, color: '#FF9A3C' });

      // Generate 450+ cinematic particles
      const count = 480;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Exponential distribution for high velocity variation
        const speed = Math.pow(Math.random(), 2) * 26 + (Math.random() * 12 + 2);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isSpark = Math.random() > 0.45;
        const size = isSpark ? Math.random() * 2.5 + 1 : Math.random() * 5 + 2.5;

        particles.push({
          x: cx,
          y: cy,
          prevX: cx,
          prevY: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          friction: isSpark ? 0.94 : 0.965,
          color,
          size,
          isSpark,
          alpha: 1,
          decay: isSpark ? Math.random() * 0.016 + 0.012 : Math.random() * 0.009 + 0.007,
          curl: (Math.random() - 0.5) * 0.06,
        });
      }
    };

    // Main animation loop
    const render = (currentTime) => {
      const elapsed = currentTime - startTime;

      // Dark background clearing with subtle trail persist
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(5, 5, 8, 0.28)';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';

      // ==========================================
      // PHASE 1: CHARGING SINGULARITY (0 - 650ms)
      // ==========================================
      if (elapsed < 650 && !burstTriggered) {
        const progress = elapsed / 650;
        const coreSize = 3 + progress * 16 + (Math.random() - 0.5) * 3;

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
          sw.alpha *= 0.94;

          if (sw.alpha > 0.01) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = sw.color;
            ctx.lineWidth = sw.strokeWidth;
            ctx.globalAlpha = sw.alpha;
            ctx.shadowColor = '#F47B20';
            ctx.shadowBlur = 24;
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

          // Apply physics: friction & subtle curl
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
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 12;
            ctx.stroke();
          } else {
            // Glowing energy embers
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 16;
            ctx.fill();
          }

          ctx.restore();
        }

        // Central residual dissipation glow
        const residualTime = elapsed - 650;
        if (residualTime < 1800) {
          const resAlpha = Math.max(0, 1 - residualTime / 1800) * 0.45;
          const resRadius = 80 + residualTime * 0.15;
          const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, resRadius);
          glowGrad.addColorStop(0, `rgba(255, 255, 255, ${resAlpha})`);
          glowGrad.addColorStop(0.3, `rgba(244, 123, 32, ${resAlpha * 0.8})`);
          glowGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, resRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Phase timing transitions
      if (elapsed > 2200 && phase !== 'fade') {
        setPhase('fade');
      }

      if (elapsed > 3100) {
        // Complete intro
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
  }, [onComplete]);

  const handleSkip = () => {
    document.body.style.overflow = '';
    onComplete?.();
  };

  if (phase === 'done') return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center transition-all duration-700 ease-out select-none ${
        phase === 'fade' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. Cinematic Fullscreen Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* 2. Instantaneous White-Orange Flash */}
      <div
        className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-150 ease-out"
        style={{ opacity: flashOpacity }}
      />

      {/* 3. Central Cinematic Typography (Revealed by the burst) */}
      <div
        className={`relative z-10 text-center transition-all duration-700 pointer-events-none ${
          showText
            ? 'opacity-100 scale-100 filter blur-none'
            : 'opacity-0 scale-90 filter blur-md'
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

      {/* 4. Top-Right Skip Button for User Convenience */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-20 px-4 py-2 rounded-full bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 text-white/70 hover:text-white text-xs font-mono tracking-widest transition-all duration-200 backdrop-blur-md cursor-pointer flex items-center gap-2"
        aria-label="Skip introduction"
      >
        <span>SKIP INTRO</span>
        <span className="text-accent">➔</span>
      </button>

      {/* 5. Bottom Technical Loading Coordinates */}
      <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none">
        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
          SYS // 2026 // READY
        </span>
      </div>
    </div>
  );
}

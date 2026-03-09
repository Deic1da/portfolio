/* ─── Visual FX ─────────────────────────────────────────────────── */

/* Particle network background */
export function initParticleBg() {
  const bg = document.querySelector('.bg');
  if (!bg) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
  bg.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H;

  const N        = 65;
  const MAX_DIST = 130;
  const particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .45,
      vy: (Math.random() - .5) * .45,
      r:  Math.random() * 1.4 + .5,
    };
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124,111,247,.6)';
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,111,247,${(1 - d / MAX_DIST) * .22})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(tick);
  }

  resize();
  for (let i = 0; i < N; i++) particles.push(mkParticle());
  tick();

  window.addEventListener('resize', () => {
    resize();
    particles.length = 0;
    for (let i = 0; i < N; i++) particles.push(mkParticle());
  });
}

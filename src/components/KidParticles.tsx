import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'ball' | 'confetti' | 'dust';
  rotation: number;
  rotationSpeed: number;
  bounceY: number;
}

export default function KidParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#ef4444', '#fbbf24', '#3b82f6', '#22c55e', '#f472b6', '#f97316'];

    const createParticle = (): Particle => {
      const typeRoll = Math.random();
      let type: Particle['type'];
      if (typeRoll < 0.25) type = 'ball';
      else if (typeRoll < 0.6) type = 'confetti';
      else type = 'dust';

      return {
        x: Math.random() * canvas.width,
        y: type === 'ball' ? Math.random() * canvas.height : -Math.random() * 50,
        size: type === 'ball' ? Math.random() * 8 + 4 : type === 'confetti' ? Math.random() * 6 + 3 : Math.random() * 3 + 1,
        speedY: type === 'ball' ? (Math.random() - 0.5) * 1.5 : Math.random() * 1.2 + 0.4,
        speedX: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.35 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 1000 + 600,
        type,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        bounceY: type === 'ball' ? canvas.height - Math.random() * 200 : 0,
      };
    };

    for (let i = 0; i < 50; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.type === 'ball') {
          p.y += p.speedY;
          if (p.y > p.bounceY) {
            p.y = p.bounceY;
            p.speedY = -Math.abs(p.speedY) * 0.85;
          }
          p.speedY += 0.08;
        } else {
          p.y += p.speedY;
        }

        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 4, 1);
        const fadeOut = lifeRatio > 0.92 ? (1 - lifeRatio) / 0.08 : 1;
        const currentOpacity = p.opacity * fadeIn * fadeOut;

        ctx.save();
        ctx.globalAlpha = currentOpacity;

        if (p.type === 'ball') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.fill();
        } else if (p.type === 'confetti') {
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size, -p.size / 2, p.size * 2, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentOpacity * 0.5;
          ctx.fill();
        }

        ctx.restore();

        if (p.life >= p.maxLife || (p.type !== 'ball' && p.y > canvas.height + 30)) {
          particlesRef.current[i] = createParticle();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

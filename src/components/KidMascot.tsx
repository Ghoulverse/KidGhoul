import { useEffect, useRef, useState, useCallback } from 'react';
import { useKidCursor } from '@/hooks/useKidCursor';

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
}

interface MiniGhost {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  scale: number;
  rotation: number;
}

const SPEECH_LINES = [
  "Let's make a mess!",
  "Art is freedom!",
  "Cleanup time!",
];

const EXPRESSIONS = [
  { name: 'happy', filter: 'none' },
  { name: 'excited', filter: 'hue-rotate(-30deg) saturate(1.3)' },
  { name: 'superhero', filter: 'hue-rotate(180deg) saturate(1.4) brightness(1.1)' },
];

export default function KidMascot() {
  const { x, y, isMoving, velocity } = useKidCursor();
  const [expression, setExpression] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [speechBubble, setSpeechBubble] = useState('');
  const [superMode, setSuperMode] = useState(false);

  const confettiRef = useRef<ConfettiPiece[]>([]);
  const miniGhostsRef = useRef<MiniGhost[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const clickCountRef = useRef(0);
  const cursorRef = useRef({ x, y, isMoving, velocity, mascotSize: 0, superMode });

  const mascotSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 280;

  const spawnConfetti = useCallback((cx: number, cy: number, count = 12) => {
    const colors = ['#ef4444', '#fbbf24', '#3b82f6', '#22c55e', '#f472b6'];
    for (let i = 0; i < count; i++) {
      confettiRef.current.push({
        x: cx + mascotSize / 2,
        y: cy + mascotSize / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 5 - 2,
        size: Math.random() * 6 + 3,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        life: 0,
        maxLife: Math.random() * 60 + 40,
      });
    }
  }, [mascotSize]);

  const handleClick = useCallback(() => {
    clickCountRef.current = (clickCountRef.current + 1) % 3;
    const newExpr = clickCountRef.current;
    setExpression(newExpr);
    spawnConfetti(x, y, newExpr === 2 ? 24 : 12);

    if (newExpr === 2) {
      setSuperMode(true);
      setTimeout(() => {
        setSuperMode(false);
      }, 3000);
    }

    const line = SPEECH_LINES[newExpr] || SPEECH_LINES[0];
    setSpeechBubble(line);
    setTimeout(() => setSpeechBubble(''), 3000);
  }, [x, y, spawnConfetti]);

  const handleDoubleClick = useCallback(() => {
    if (miniGhostsRef.current.length >= 6) return;
    for (let i = 0; i < 3; i++) {
      miniGhostsRef.current.push({
        x: x + mascotSize / 2 + (Math.random() - 0.5) * 60,
        y: y + mascotSize,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 1,
        opacity: 1,
        scale: 0.2 + Math.random() * 0.15,
        rotation: Math.random() * 360,
      });
    }
    spawnConfetti(x, y, 18);
  }, [x, y, mascotSize, spawnConfetti]);

  cursorRef.current = { x, y, isMoving, velocity, mascotSize, superMode };

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

    let trailTimer = 0;

    const animate = () => {
      const { x, y, isMoving, velocity, mascotSize, superMode } = cursorRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Confetti / crayon trails when moving
      if (isMoving && velocity > 1) {
        trailTimer++;
        if (trailTimer > 8) {
          trailTimer = 0;
          const cx = x + mascotSize / 2;
          const cy = y + mascotSize / 2;
          const colors = ['#ef4444', '#fbbf24', '#3b82f6', '#22c55e'];
          confettiRef.current.push({
            x: cx + (Math.random() - 0.5) * 20,
            y: cy + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 1.5 + 0.5,
            size: Math.random() * 4 + 2,
            opacity: 0.8,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 6,
            life: 0,
            maxLife: Math.random() * 40 + 30,
          });
        }
      }

      // Ambient confetti drops
      if (Math.random() < 0.02) {
        confettiRef.current.push({
          x: x + mascotSize / 2 + (Math.random() - 0.5) * 40,
          y: y + mascotSize * 0.2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 1 + 0.5,
          size: Math.random() * 3 + 2,
          opacity: 0.5,
          color: ['#ef4444', '#fbbf24', '#3b82f6'][Math.floor(Math.random() * 3)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 4,
          life: 0,
          maxLife: Math.random() * 50 + 30,
        });
      }

      // Confetti pieces
      confettiRef.current = confettiRef.current.filter((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.06;
        c.rotation += c.rotationSpeed;
        c.life++;
        const lifeRatio = c.life / c.maxLife;
        c.opacity = Math.max(0, 1 - lifeRatio);

        if (c.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = c.opacity;
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size, -c.size / 2, c.size * 2, c.size);
        ctx.restore();

        return true;
      });

      // Mini ghosts
      miniGhostsRef.current = miniGhostsRef.current.filter((mg) => {
        mg.x += mg.vx;
        mg.y += mg.vy;
        mg.vy -= 0.01;
        mg.vx *= 0.998;
        mg.opacity -= 0.003;
        mg.rotation += 1;

        if (mg.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = mg.opacity;
        ctx.translate(mg.x, mg.y);
        ctx.rotate((mg.rotation * Math.PI) / 180);
        ctx.scale(mg.scale, mg.scale);

        // Mini ghost body
        ctx.beginPath();
        ctx.arc(0, -5, 16, Math.PI, 0);
        ctx.bezierCurveTo(16, 10, 12, 22, 8, 18);
        ctx.bezierCurveTo(4, 24, 0, 20, -4, 22);
        ctx.bezierCurveTo(-8, 24, -12, 20, -16, 18);
        ctx.bezierCurveTo(-20, 14, -16, 6, -16, -5);
        ctx.fillStyle = '#ef4444';
        ctx.fill();

        // Mini eyes
        ctx.beginPath();
        ctx.arc(-5, -4, 2.5, 0, Math.PI * 2);
        ctx.arc(5, -4, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-5, -4, 1, 0, Math.PI * 2);
        ctx.arc(5, -4, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#1f2937';
        ctx.fill();

        ctx.restore();
        return true;
      });

      // Super mode overlay
      if (superMode) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9996 }}
      />

      <div
        className="fixed pointer-events-none"
        style={{
          left: x,
          top: y,
          zIndex: 9997,
          width: mascotSize,
          height: mascotSize,
        }}
      >
        {speechBubble && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl whitespace-nowrap font-kid text-xs tracking-wider pointer-events-none"
            style={{
              background: 'rgba(255, 248, 240, 0.95)',
              border: '2px solid #ef4444',
              color: '#ef4444',
              boxShadow: '0 4px 20px rgba(239,68,68,0.15)',
              animation: 'bounce-subtle 0.6s ease-in-out infinite',
              zIndex: 9999,
            }}
          >
            {speechBubble}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #ef4444',
              }}
            />
          </div>
        )}

        <div
          className="relative pointer-events-none cursor-default"
          style={{
            width: mascotSize,
            height: mascotSize,
            animation: !isMoving ? 'ghost-bob 2s ease-in-out infinite, ghost-sway 3s ease-in-out infinite' : undefined,
          }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="/ghoul_mascot.png"
            alt="KID GHOUL"
            className="w-full h-full object-contain"
            draggable={false}
            style={{
              filter: isHovered
                ? 'brightness(1.15) drop-shadow(0 0 12px rgba(239,68,68,0.3))'
                : EXPRESSIONS[expression].filter,
              transition: 'filter 0.3s ease',
            }}
          />
        </div>
      </div>
    </>
  );
}

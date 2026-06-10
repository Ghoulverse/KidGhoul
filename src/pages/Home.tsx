import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Twitter, Instagram, Youtube, ArrowRight, Gamepad2,
  Ghost, Palette, Sparkles, Smile, Star, Zap,
  Briefcase, Building2, Wind, CircleDot, Waves, Flame,
} from 'lucide-react';
import { config } from '@/data/ghoul.config';
import KidParticles from '@/components/KidParticles';
import EcosystemMap from '@/components/EcosystemMap';
import MarketStats from '@/components/MarketStats';
import IPBadge from '@/components/IPBadge';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import InvestorCTA from '@/components/InvestorCTA';

gsap.registerPlugin(ScrollTrigger);

const GHOULVERSE_LINK = config.crossLinks.find((g) => g.id === 'ghoulverse');
const OTHER_GHOULS = config.crossLinks.filter((g) => g.id !== 'ghoulverse');

const PRODUCT_ICONS = [Palette, Sparkles, Star, Zap, Smile, Flame, Wind, CircleDot, Waves];
const TABS = [
  { key: 'core' as const, label: 'Core' },
  { key: 'pro' as const, label: 'Pro' },
  { key: 'tool' as const, label: 'Tools' },
  { key: 'refill' as const, label: 'Refills' },
  { key: 'limited' as const, label: 'Limited' },
];

function FloatingOrb({ delay, size, color, className }: { delay: number; size: number; color: string; className?: string }) {
  return (
    <div className={`absolute rounded-full pointer-events-none blur-3xl opacity-[0.08] ${className || ''}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        animation: `float-orb 10s ease-in-out infinite ${delay}s`,
      }} />
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'core' | 'pro' | 'tool' | 'refill' | 'limited'>('core');
  const heroRef = useRef<HTMLDivElement>(null);
  const breathRef = useRef<HTMLDivElement>(null);
  const scienceRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const collectiveRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const ipRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-fade', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.3,
      });

      gsap.to('.breathe', {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.utils.toArray('.orb-drift').forEach((orb: any, i: number) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -30 : 30,
          x: i % 3 === 0 ? 15 : -15,
          duration: 6 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      [breathRef, scienceRef, productRef, collectiveRef, gameRef, portfolioRef, ctaRef, ecosystemRef, marketRef, ipRef, roadmapRef].forEach((ref) => {
        if (ref.current) {
          gsap.from(ref.current.querySelectorAll('.reveal'), {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const filtered = config.products.filter((p) => p.category === activeTab);

  return (
    <div className="relative font-sans min-h-screen overflow-x-hidden" style={{ background: '#fff8f0' }}>
      <FloatingOrb delay={0} size={500} color="#ef4444" className="-top-32 -left-32" />
      <FloatingOrb delay={2} size={400} color="#fbbf24" className="top-1/3 -right-24" />
      <FloatingOrb delay={4} size={350} color="#3b82f6" className="bottom-0 left-1/3" />
      <FloatingOrb delay={1} size={300} color="#ef4444" className="top-1/2 left-1/2" />

      <KidParticles />

      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-8 md:px-16"
        style={{ background: 'rgba(255,248,240,0.7)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/ghoul_logo.png" alt={config.name} className="w-10 h-10 object-contain" draggable={false} />
            <span className="font-kid text-sm tracking-[0.2em] text-[#ef4444] font-bold">{config.name}</span>
          </div>
          <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer"
            className="text-[10px] tracking-[0.3em] uppercase text-[#78716c] hover:text-[#ef4444] transition-colors">
            GHOULVERSE
          </a>
          <a href="#ecosystem" className="hidden md:flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#94a3b8] hover:text-[#ef4444] transition-colors">
            <Briefcase className="w-3 h-3" /> Investors
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center px-8 text-center">
        <div className="hero-fade mb-8 flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[9px] tracking-[0.3em] uppercase text-[#ef4444]/70 font-bold"
            style={{ background: 'rgba(239,68,68,0.06)', borderRadius: '9999px', border: '1px solid rgba(239,68,68,0.12)' }}>
            <Building2 className="w-3 h-3" /> House of GHOUL
          </span>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#ef4444]/60 font-kid">The Playground</span>
        </div>

        <h1 className="hero-fade font-kid leading-[0.9] mb-10">
          <span className="block text-[18vw] md:text-[12rem] text-[#ef4444]">Kid</span>
          <span className="block text-[18vw] md:text-[12rem] text-[#fbbf24] -mt-4 md:-mt-8">Ghoul</span>
        </h1>

        <p className="hero-fade text-[#78716c]/70 text-base md:text-lg max-w-sm mb-12 leading-relaxed font-light">
          Chaos contained. Creativity unleashed. Every masterpiece needs a cleanup crew.
        </p>

        <div className="hero-fade">
          <a href="#playground" className="group inline-flex items-center gap-3 px-8 py-4 font-kid text-sm tracking-wider text-[#ef4444] transition-all hover:scale-105 font-bold"
            style={{ border: '2px solid rgba(239,68,68,0.3)', borderRadius: '9999px' }}>
            Enter The Playground
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-12 w-64 h-64 mx-auto">
          <img src="/ghoul_mascot.png" alt="KidGhoul mascot" className="w-full h-full object-contain" draggable={false} style={{ animation: 'ghost-bob 2s ease-in-out infinite, ghost-sway 3s ease-in-out infinite' }} />
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 mx-auto" style={{ background: 'linear-gradient(to bottom, rgba(239,68,68,0.3), transparent)' }} />
        </div>
      </section>

      {/* ===== BREATH / STATS ===== */}
      <section ref={breathRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal mb-16">
            <h2 className="font-kid text-4xl md:text-5xl text-[#292524] mb-6 leading-tight">
              Eww! Gross! AWESOME!<br />
              <span className="text-[#ef4444]">We clean it all.</span>
            </h2>
            <p className="text-[#78716c]/70 text-base max-w-md mx-auto leading-relaxed font-light">
              Finger paint on the ceiling? Slime in your socks? A glitter explosion that reached the neighbours? No mess is too mega. We turn disasters into "let's do that again!"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Palette, value: '∞', label: 'Masterpieces Made', color: '#ef4444', rot: -2 },
              { icon: Sparkles, value: '100%', label: 'Smiles Saved', color: '#fbbf24', rot: 1 },
              { icon: Zap, value: '<30s', label: 'Pigment Breakdown', color: '#3b82f6', rot: -1 },
              { icon: Star, value: '11/10', label: 'Fun Factor', color: '#ef4444', rot: 2 },
            ].map((stat, i) => (
              <div key={i} className="reveal breathe p-8 text-center sticker-badge transition-all duration-300 hover:scale-[1.08]"
                style={{ transform: `rotate(${stat.rot}deg)`, animationDelay: `${i * 0.5}s` }}>
                <stat.icon className="w-8 h-8 mx-auto mb-4" style={{ color: stat.color, opacity: 0.9 }} />
                <div className="font-kid text-3xl text-[#292524] mb-2 font-bold">{stat.value}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#78716c]/50 font-kid">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ECOSYSTEM ===== */}
      <section ref={ecosystemRef} id="ecosystem" className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ef4444]/50 mb-4 block font-kid">The Ecosystem</span>
            <h2 className="font-kid text-4xl md:text-5xl text-[#292524] mb-3">House of GHOUL</h2>
            <p className="font-kid text-lg text-[#ef4444]/80">Twelve brands. One universe. Infinite potential.</p>
          </div>
          <div className="reveal">
            <EcosystemMap />
          </div>
        </div>
      </section>

      {/* ===== SCIENCE ===== */}
      <section ref={scienceRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ef4444]/50 mb-4 block font-kid">Proprietary Technology</span>
            <h2 className="font-kid text-4xl md:text-5xl text-[#292524] mb-3">The Science</h2>
            <p className="font-kid text-lg text-[#ef4444]/80">{config.science.subtitle}</p>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-10" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '24px', border: '2px solid rgba(239,68,68,0.06)' }}>
              <p className="text-[#78716c]/80 leading-relaxed font-light">{config.science.description}</p>
            </div>
            <div className="p-10" style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '24px', border: '2px solid rgba(239,68,68,0.06)' }}>
              <p className="text-[#78716c]/60 leading-relaxed text-sm font-light">{config.science.adaptation}</p>
            </div>
          </div>

          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.science.stats.map((stat, i) => (
              <div key={i} className="p-8 text-center" style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '20px', border: '2px solid rgba(239,68,68,0.06)' }}>
                <div className="font-kid text-2xl text-[#ef4444] mb-1 font-bold">{stat.value}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#78716c]/40 font-kid">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IP ===== */}
      <section ref={ipRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ef4444]/50 mb-4 block font-kid">Intellectual Property</span>
            <h2 className="font-kid text-4xl md:text-5xl text-[#292524] mb-3">Protected Assets</h2>
            <p className="text-[#78716c]/60 max-w-sm mx-auto font-light">Trademarked. Registered. Defensible.</p>
          </div>
          <div className="reveal">
            <IPBadge />
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section ref={productRef} id="playground" className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ef4444]/50 mb-4 block font-kid">Super Powers!</span>
            <h2 className="font-kid text-4xl md:text-5xl text-[#292524] mb-3">The Playground</h2>
            <p className="text-[#78716c]/60 max-w-sm mx-auto font-light">Nine awesome weapons against mess. Pick your favourite colour!</p>
          </div>

          <div className="reveal flex flex-wrap justify-center gap-3 mb-16">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              const count = config.products.filter((p) => p.category === tab.key).length;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className="px-6 py-2.5 text-xs tracking-wider transition-all min-h-11 font-kid font-bold"
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #ef4444, #fbbf24)' : 'rgba(255,255,255,0.5)',
                    color: isActive ? '#fff' : '#78716c',
                    borderRadius: '9999px',
                    boxShadow: isActive ? '0 8px 25px rgba(239,68,68,0.2)' : 'none',
                    border: isActive ? 'none' : '2px solid rgba(239,68,68,0.08)',
                  }}>
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => {
              const Icon = PRODUCT_ICONS[i % PRODUCT_ICONS.length];
              const colors = ['#ef4444', '#fbbf24', '#3b82f6'];
              const color = colors[i % colors.length];
              const rotation = (i % 3 === 0) ? -1 : (i % 3 === 1) ? 1 : 0;

              return (
                <div key={i} className="reveal orb-drift group p-8 text-center sticker-card"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    borderColor: `${color}25`,
                    boxShadow: `4px 4px 0 ${color}15, 0 8px 40px ${color}08`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = `rotate(0deg) scale(1.05)`; e.currentTarget.style.boxShadow = `6px 6px 0 ${color}20, 0 16px 50px ${color}15`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`; e.currentTarget.style.boxShadow = `4px 4px 0 ${color}15, 0 8px 40px ${color}08`; }}>

                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${color}12`, border: `2px solid ${color}25` }}>
                    <Icon className="w-7 h-7" style={{ color, opacity: 0.9 }} />
                  </div>

                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#78716c]/40 block mb-3 font-kid">{product.category}</span>

                  <h3 className="font-kid text-lg text-[#292524] mb-2 break-words font-bold">{product.name}</h3>
                  <p className="text-[#ef4444]/70 text-xs mb-3 font-kid">{product.tagline}</p>
                  <p className="text-[#78716c]/50 text-xs leading-relaxed mb-4 font-light">{product.description}</p>

                  {product.heroIngredient && (
                    <div className="mb-3">
                      <span className="text-[9px] tracking-wider uppercase text-[#78716c]/30">Powered by </span>
                      <span className="text-[10px] font-bold font-kid" style={{ color }}>{product.heroIngredient}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3 pt-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#78716c]/30 font-kid">{product.volume}</span>
                    <span className="font-kid text-sm font-bold" style={{ color }}>{product.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== MARKET ===== */}
      <section ref={marketRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ef4444]/50 mb-4 block font-kid">Market Opportunity</span>
            <h2 className="font-kid text-4xl md:text-5xl text-[#292524] mb-3">The Numbers</h2>
            <p className="text-[#78716c]/60 max-w-sm mx-auto font-light">Play meets clean. A $120B+ intersection.</p>
          </div>
          <div className="reveal">
            <MarketStats />
          </div>
        </div>
      </section>

      {/* ===== ROADMAP ===== */}
      <section ref={roadmapRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ef4444]/50 mb-4 block font-kid">The Road Ahead</span>
            <h2 className="font-kid text-4xl md:text-5xl text-[#292524] mb-3">Roadmap</h2>
            <p className="text-[#78716c]/60 max-w-sm mx-auto font-light">From idea to empire. Milestone by milestone.</p>
          </div>
          <div className="reveal">
            <RoadmapTimeline />
          </div>
        </div>
      </section>

      {/* ===== COLLECTIVE ===== */}
      <section ref={collectiveRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24]/60 mb-4 block font-kid">The Collective</span>
            <h2 className="font-kid text-4xl md:text-5xl text-[#292524] mb-3">The Ghoulverse</h2>
            <p className="text-[#78716c]/60 max-w-sm mx-auto font-light">Twelve spirits. One universe. Find your path.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 mb-12">
            {OTHER_GHOULS.map((g) => (
              <a key={g.id}
                href={g.live ? g.domain : `https://www.ghoulverse.com/ghouls/${g.id}/`}
                target="_blank" rel="noopener noreferrer"
                className="reveal group flex flex-col items-center p-6 transition-all duration-500 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '20px', width: '120px', height: '120px', border: '2px solid rgba(239,68,68,0.06)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 40px ${g.color}12`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}>
                <div className="text-3xl mb-2">{g.icon}</div>
                <h3 className="font-kid text-[10px] text-[#292524] tracking-wider font-bold">{g.name}</h3>
                {!g.live && <span className="text-[8px] text-[#78716c]/20 mt-0.5 font-kid">TBA</span>}
              </a>
            ))}
          </div>

          <div className="reveal text-center">
            <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 font-kid text-sm tracking-wider text-[#ef4444] transition-all hover:scale-105 font-bold"
              style={{ border: '2px solid rgba(239,68,68,0.3)', borderRadius: '9999px' }}>
              Enter the GHOULVERSE <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== GAME ===== */}
      <section ref={gameRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="reveal p-12 md:p-20 text-center"
            style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '32px', border: '2px solid rgba(239,68,68,0.08)' }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full opacity-[0.03] blur-3xl" style={{ background: '#ef4444' }} />
            </div>
            <Gamepad2 className="w-10 h-10 text-[#ef4444]/60 mx-auto mb-6" />
            <h2 className="font-kid text-3xl md:text-4xl text-[#292524] mb-4">Play GHOULVERSE!</h2>
            <p className="text-[#78716c]/60 max-w-sm mx-auto mb-8 font-light">Smash germs, collect power-ups, and unlock all 12 ghouls. High scores guaranteed!</p>
            <a href={config.gameUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-kid text-sm tracking-wider text-[#ef4444] transition-all hover:scale-105 font-bold"
              style={{ border: '2px solid rgba(239,68,68,0.3)', borderRadius: '9999px' }}>
              <Gamepad2 className="w-4 h-4" /> Play Now
            </a>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section ref={portfolioRef} className="relative py-20 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#78716c]/30 mb-2 block font-kid">The House of GHOUL</span>
            <h3 className="font-kid text-2xl text-[#292524]">The Portfolio</h3>
          </div>
          <div className="reveal flex flex-wrap justify-center gap-4">
            {config.crossLinks.map((g) => {
              const isActive = g.id === config.id;
              return (
                <a key={g.id}
                  href={g.live ? g.domain : `https://www.ghoulverse.com/ghouls/${g.id}/`}
                  target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 transition-all duration-500"
                  style={{
                    background: isActive ? `${g.color}08` : 'rgba(255,255,255,0.4)',
                    borderRadius: '16px',
                    width: '90px',
                    height: '90px',
                    border: isActive ? `2px solid ${g.color}30` : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.borderColor = `${g.color}20`; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.borderColor = 'transparent'; }}>
                  <div className="text-xl group-hover:scale-110 transition-transform">{g.icon}</div>
                  <p className="text-[8px] tracking-wider uppercase text-[#292524] mt-1 font-kid font-bold">{g.name.replace(' GHOUL', '')}</p>
                  {isActive && <span className="text-[7px] mt-0.5 font-kid" style={{ color: g.color }}>{config.products.length} Products</span>}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== INVESTOR CTA ===== */}
      <section className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <InvestorCTA />
          </div>
        </div>
      </section>

      {/* ===== CTA / FOOTER ===== */}
      <section ref={ctaRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="reveal mb-10">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ef4444]/50 mb-4 block font-kid">Stay in the Loop</span>
            <h2 className="font-kid text-4xl text-[#292524] mb-4">{config.cta.headline}</h2>
            <p className="text-[#78716c]/60 font-light">{config.cta.subheadline}</p>
          </div>

          <div className="reveal flex flex-col sm:flex-row gap-3 mb-16">
            <input type="email" placeholder={config.cta.placeholderText}
              className="flex-1 px-6 py-4 text-sm text-[#292524] placeholder:text-[#78716c]/25 outline-none bg-transparent font-light"
              style={{ border: '2px solid rgba(239,68,68,0.12)', borderRadius: '9999px' }} />
            <button className="px-8 py-4 font-kid text-sm tracking-wider text-white transition-all hover:scale-105 font-bold"
              style={{ background: 'linear-gradient(135deg, #ef4444, #fbbf24)', borderRadius: '9999px', boxShadow: '0 8px 25px rgba(239,68,68,0.2)' }}>
              {config.cta.buttonText}
            </button>
          </div>

          <div className="reveal flex items-center justify-center gap-4 mb-10">
            {[Twitter, Instagram, Youtube].map((Icon, i) => {
              const colors = ['#ef4444', '#fbbf24', '#3b82f6'];
              return (
                <div key={i} className="w-11 h-11 flex items-center justify-center transition-all hover:scale-110"
                  style={{ borderRadius: '50%', border: `2px solid ${colors[i]}15`, background: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${colors[i]}30`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${colors[i]}15`; }}>
                  <Icon className="w-4 h-4" style={{ color: colors[i], opacity: 0.7 }} />
                </div>
              );
            })}
          </div>

          <div className="reveal mb-8 flex items-center justify-center gap-4 text-xs font-light flex-wrap">
            <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer"
              className="text-[#78716c]/50 hover:text-[#ef4444] transition-colors flex items-center gap-1 py-2 px-3 min-h-11">
              <Ghost className="w-3 h-3" /> Explore GHOULVERSE
            </a>
            <span className="text-[#78716c]/10">|</span>
            <a href={config.gameUrl} target="_blank" rel="noopener noreferrer"
              className="text-[#78716c]/50 hover:text-[#3b82f6] transition-colors flex items-center gap-1 py-2 px-3 min-h-11">
              <Gamepad2 className="w-3 h-3" /> Play GHOULVERSE
            </a>
            <span className="text-[#78716c]/10">|</span>
            <a href="#ecosystem"
              className="text-[#78716c]/50 hover:text-[#fbbf24] transition-colors flex items-center gap-1 py-2 px-3 min-h-11">
              <Briefcase className="w-3 h-3" /> Investors
            </a>
          </div>

                    <div className="reveal mb-4 flex items-center justify-center gap-3 text-[10px] tracking-wider uppercase text-[#78716c]/30">
            <a href="/privacy.html" className="hover:text-[#ef4444] transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/terms.html" className="hover:text-[#ef4444] transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="/cookies.html" className="hover:text-[#ef4444] transition-colors">Cookie Policy</a>
          </div>

<p className="reveal text-[#78716c]/15 text-xs tracking-wider font-light">
            &copy; 2025 <span className="font-kid text-[#ef4444]/30 font-bold">{config.name}</span> — Part of the{' '}
            <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-[#ef4444] transition-colors">GHOULVERSE</a>
          </p>
        </div>
      </section>
    </div>
  );
}

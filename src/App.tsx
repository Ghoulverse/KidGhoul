import KidMascot from '@/components/KidMascot';
import KidParticles from '@/components/KidParticles';
import Home from '@/pages/Home';
import CookieBanner from '@/components/CookieBanner';

export default function App() {
  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Ambient kid particles (balls, confetti, dust) */}
      <KidParticles />

      {/* The interactive kid mascot */}
      <KidMascot />

      {/* Page content */}
      <Home />
      <CookieBanner />
</>
  );
}

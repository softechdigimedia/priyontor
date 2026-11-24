import {Check, Copy, ExternalLink} from 'lucide-react';
import {useRef, useState} from 'react';
import {CountdownTimer} from './components/CountdownTimer';
import {WaitlistForm} from './components/WaitlistForm';

const PILLARS = [
  {
    index: '01',
    title: 'Heritage Craftsmanship',
    description:
      'Every piece begins with time-honored techniques, honoring regional artistry and meticulous hand-finished detail.',
  },
  {
    index: '02',
    title: 'Heartfelt Provenance',
    description:
      'Rooted in cultural memory and quiet warmth, bridging generational stories with purposeful material integrity.',
  },
  {
    index: '03',
    title: 'Made for Today',
    description:
      'Composed for contemporary homes and everyday rituals—enduring objects crafted to be lived with and treasured.',
  },
];

export default function App() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [logoFailed, setLogoFailed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  function handleNotifyJump() {
    const waitlistSection = document.getElementById('early-access');
    waitlistSection?.scrollIntoView({behavior: 'smooth', block: 'center'});
    window.setTimeout(() => {
      emailInputRef.current?.focus();
    }, 350);
  }

  async function handleCopyEmail() {
    const address = 'hello@priyontor.com';
    try {
      await navigator.clipboard.writeText(address);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback selection-free feedback if clipboard permission is unavailable
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF3E6] text-[#2C1610] selection:bg-[#2C1610] selection:text-[#FAF3E6]">
      {/* Top Navigation Bar — 3-Zone Contract */}
      <header className="w-full border-b border-[#2C1610]/12 bg-[#FAF3E6]/95 backdrop-blur-xs sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-2xl font-semibold tracking-tight text-[#2C1610] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2C1610]"
          >
            Priyontor
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C4033]"
          >
            
          </nav>

        
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero & Launch Countdown */}
        <section
          id="countdown"
          className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-10 pb-16 sm:pt-14 sm:pb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Provided Brand Emblem */}
            <div className="lg:col-span-5">
              <div className="border border-[#2C1610]/15 bg-[#F6EEDF] p-6 sm:p-10 rounded-sm">
                <div className="aspect-[4/3] flex items-center justify-center overflow-hidden">
                  {!logoFailed ? (
                    <img
                      src="/assets/aistudio/image (1)"
                      alt="Priyontor — Redefining Indian Heritage Culture to the World through Fashion"
                      referrerPolicy="no-referrer"
                      onError={() => setLogoFailed(true)}
                      className="w-full h-full object-contain mix-blend-multiply select-none"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 border border-[#2C1610]/10 bg-[#FAF3E6]">
                      <span className="font-display text-4xl font-semibold tracking-wide text-[#2C1610]">
                        PRIYONTOR
                      </span>
                      <span className="mt-2 text-xs tracking-widest text-[#8A612B]">
                        WHERE HERITAGE MEETS HEART
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-[#2C1610]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E4F3D]">
                  <span> Redefining Indian Heritage Culture </span>
                  <span aria-hidden="true">·</span>
                  <span>to the World through Fashion</span>
                </div>
              </div>
            </div>

            {/* Right Column: Coming Soon Proposition, Timer & Waitlist */}
            <div className="lg:col-span-7 flex flex-col gap-7">
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#8A612B]">
                  Coming Soon · Inaugural Release
                </p>
                <h1
                  className="mt-3 font-display font-medium text-[#2C1610] tracking-tight leading-[1.06]"
                  style={{
                    fontSize: 'clamp(2.35rem, 4.1vw, 3.65rem)',
                    textWrap: 'balance',
                  }}
                >
                  Something timeless is taking shape for December 10, 2026.
                </h1>
                <p className="mt-4 text-base sm:text-[17px] leading-relaxed text-[#5C4033] max-w-[62ch]">
                  Priyontor is preparing its inaugural digital home—bringing heritage artistry and
                  enduring craft together in one quiet collection. Join the list to receive your
                  opening-day invitation.
                </p>
              </div>

              <CountdownTimer />

            </div>
          </div>
        </section>




      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#2C1610]/15 bg-[#F5ECDB]/70">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#5C4033]">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="font-medium text-[#2C1610]">Priyontor</span>
            <span aria-hidden="true">·</span>
            <span>© 2026 Priyontor. All rights reserved.</span>
          </div>

       
        </div>
      </footer>
    </div>
  );
}

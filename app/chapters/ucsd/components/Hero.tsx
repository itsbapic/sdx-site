'use client'

import React from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { EASE_SOFT } from '@/lib/motion';
import ColorBends from '@/components/ColorBends';
import styles from '../ucsd.module.css';

const TITLE = 'SDxUCSD';

const COLORS = ['#d92c2d', '#fc5715', '#fac205', '#03C661', '#11BBCD', '#035593'] as const;

export default function Hero() {
  const d = (_stingerDelay: number, navDelay: number) => navDelay;

  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  const contentY = useTransform(scrollY, [0, 480], [0, -56]);
  const fieldOpacity = useTransform(scrollY, [0, 640], [1, 0.15]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Single full-bleed vibrance blob ── */}
      <m.div className="absolute inset-0" style={{ opacity: fieldOpacity }} aria-hidden="true">
        <div className="absolute inset-0" style={{ opacity: 0.9 }}>
          <ColorBends
            className=""
            style={{ width: '100%', height: '100%' }}
            rotation={45}
            speed={0.35}
            colors={[...COLORS] as any}
            transparent={false}
            autoRotate={0.55}
            scale={1.7}
            frequency={1.25}
            warpStrength={0}
            mouseInfluence={0.9}
            parallax={0}
            noise={0}
          />
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            opacity: 0.5,
          }}
        />
        {/* Blend under the fixed nav */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/35 to-transparent" />
        {/* Film grain */}
        <div className={`absolute inset-0 ${styles.grain}`} />
      </m.div>

      {/* ── Hero copy ── */}
      <m.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-28 -translate-y-10 md:-translate-y-16"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Soft gaussian dark fade behind the wordmark — dim for read, not a blackout */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[min(110vw,56rem)] h-[min(52vw,20rem)] md:h-[min(42vw,22rem)]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.32) 34%, rgba(0,0,0,0.12) 58%, transparent 74%)',
            filter: 'blur(36px)',
          }}
        />

        {/* Headline — letter-staggered, UCSD outlined per chapter naming */}
        <h1
          aria-label="SDxUCSD"
          className="relative font-display text-[clamp(3.25rem,12.5vw,10.5rem)] leading-[0.95] tracking-tight prismatic-glow select-none"
        >
          {TITLE.split('').map((ch, i) => (
            <m.span
              key={i}
              aria-hidden="true"
              className={`inline-block ${i < 3 ? 'text-white' : 'text-outline'}`}
              initial={{ opacity: 0, y: '0.4em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE_SOFT, delay: d(2.3 + i * 0.055, 0.2 + i * 0.055) }}
            >
              {ch}
            </m.span>
          ))}
        </h1>

        {/* Subhead */}
        <m.p
          className="relative mt-8 max-w-xl text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE_SOFT, delay: d(2.85, 0.5) }}
        >
          <span className="text-white/90">the home for UCSD&apos;s most ambitious builders and founders.</span>
        </m.p>
      </m.div>
    </section>
  );
}

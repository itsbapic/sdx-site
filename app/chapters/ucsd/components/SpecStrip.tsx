'use client'

import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { EASE_SOFT } from '@/lib/motion';

const stats = [
  { value: 500, suffix: '+', label: 'Members' },
  { value: 85, suffix: '', label: 'Projects shipped' },
  { value: 24, suffix: '', label: 'Demo nights / yr' },
  { value: 5, suffix: '', label: 'Companies started' },
];

function Count({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE_SOFT,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function SpecStrip() {
  return (
    <section className="relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-6 py-10 md:py-14 text-center md:text-left border-white/[0.06] ${
              [
                '',
                'border-l',
                'border-t md:border-t-0 md:border-l',
                'border-l border-t md:border-t-0',
              ][i]
            }`}
          >
            <span className="block font-display text-5xl md:text-6xl text-white/90 tracking-tight">
              <Count to={stat.value} suffix={stat.suffix} />
            </span>
            <span className="block mt-3 text-[10px] uppercase tracking-widest text-white/30">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

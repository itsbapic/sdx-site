'use client'

import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import StartBuilding from './components/StartBuilding';

export default function UCSDChapterPage() {
  return (
    <main className="relative">
      <Hero />
      <Stats />
      <About />
      <StartBuilding />
    </main>
  );
}

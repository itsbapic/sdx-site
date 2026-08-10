'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { m } from 'motion/react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import AsciiButton from '@/app/components/AsciiButton';
import LogoContextMenu from '@/app/components/LogoContextMenu';
import { UCSD_EVENTS, UCSD_HOME, UCSD_JOIN_FORM } from '../lib/links';

const navLinks = [{ href: UCSD_EVENTS, label: 'events' }];

/**
 * Chapter-only top bar for /chapters/ucsd/*.
 * Global site Navigation is hidden via ucsd-chrome.css while this is mounted.
 */
export default function UcsdNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = (linkUrl: string) => {
    sendGAEvent('clicked', { link_url: linkUrl });
    setIsMenuOpen(false);
  };

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/');

  // Solid through the full nav row, then a short fade just below it
  const fadeMask = {
    maskImage:
      'linear-gradient(to bottom, black 0%, black 68%, transparent 100%)',
    WebkitMaskImage:
      'linear-gradient(to bottom, black 0%, black 68%, transparent 100%)',
  } as const;

  return (
    <nav data-ucsd-nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Backdrop blur — solid over the bar, short drop-off under the links */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 backdrop-blur-md"
        style={fadeMask}
      />
      {/* Dark wash: full black through the h-16 row, then snappier falloff */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.88) 62%, rgba(0,0,0,0.35) 82%, transparent 100%)',
        }}
      />

      <div className="relative w-full h-16 pointer-events-auto">
        <div className="relative flex items-center justify-center h-16">
          {/* Logo → SDxUCSD chapter home */}
          <div className="absolute left-3 top-0 bottom-0 flex items-center z-10 pl-3">
            <LogoContextMenu>
              <Link
                href={UCSD_HOME}
                className="flex-shrink-0 group relative"
                onClick={() => handleLinkClick(UCSD_HOME)}
              >
                <m.span
                  className="font-display text-2xl tracking-tight flex relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {'SDxUCSD'.split('').map((letter, i) => {
                    const isSuffix = i >= 3;
                    return (
                      <span key={`${letter}-${i}`} className="relative inline-block">
                        {isSuffix ? (
                          <span className="text-outline">{letter}</span>
                        ) : (
                          <>
                            <span
                              className="group-hover:opacity-0 transition-opacity duration-200"
                              style={{ transitionDelay: `${i * 60}ms` }}
                            >
                              {letter}
                            </span>
                            <span
                              className="absolute inset-0 text-outline opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              style={{ transitionDelay: `${i * 60}ms` }}
                            >
                              {letter}
                            </span>
                          </>
                        )}
                      </span>
                    );
                  })}
                </m.span>
              </Link>
            </LogoContextMenu>
          </div>

          {/* Desktop — center: events only */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-3 py-2 text-sm tracking-wide transition-colors duration-200 lowercase ${
                    active ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA — Join us */}
          <div className="hidden md:flex items-center gap-1 absolute right-3 top-0 bottom-0 pr-1 z-10">
            <Link
              href={UCSD_JOIN_FORM}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(UCSD_JOIN_FORM)}
              className="block"
            >
              <AsciiButton>Join us</AsciiButton>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-white/60 hover:text-white transition-colors duration-200">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open chapter menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-black border-white/5 p-0">
                <div className="flex flex-col pt-12">
                  {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={`px-6 py-3 text-sm tracking-wide transition-colors duration-200 lowercase ${
                          active
                            ? 'text-white bg-white/[0.04]'
                            : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <div className="border-t border-white/5 my-2" />
                  <div className="px-6 pt-4">
                    <Link
                      href={UCSD_JOIN_FORM}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleLinkClick(UCSD_JOIN_FORM)}
                      className="block"
                    >
                      <AsciiButton>Join us</AsciiButton>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

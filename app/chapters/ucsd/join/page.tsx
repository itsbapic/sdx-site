'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Join is on the home page now — keep old URL working */
export default function UCSDJoinRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/chapters/ucsd#join');
  }, [router]);
  return null;
}

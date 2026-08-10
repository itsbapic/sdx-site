import type { Metadata } from 'next';
import UcsdNav from './components/UcsdNav';
import './ucsd-chrome.css';

export const metadata: Metadata = {
  title: {
    default: 'SDxUCSD',
    template: '%s · SDxUCSD',
  },
  description:
    "The home for UCSD's most ambitious builders and founders. SDx chapter at UC San Diego.",
};

export default function UCSDChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-ucsd-chapter>
      <UcsdNav />
      {children}
    </div>
  );
}

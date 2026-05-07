import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/space-grotesk';
import '@fontsource/instrument-serif';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import EasterEggs from '../components/EasterEggs';
import BackToTopButton from '../components/BackToTopButton';
import ToastProvider from '../components/ToastProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const metadata = {
  title: 'BYTCD — Code · Design · Web | Byte-sized Studio',
  description: 'BYTCD is a byte-sized studio for code, design and the web. Three humans, fixed prices, weekly demos.',
  keywords: 'bytcd, web development, ui/ux design, web design, react, next.js, brand identity',
  openGraph: {
    title: 'BYTCD — Code · Design · Web',
    description: 'A byte-sized studio for code, design and the web.',
    url: 'https://bytcd.com',
    siteName: 'BYTCD',
    images: [{ url: 'https://bytcd.com/logo.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BYTCD — Code · Design · Web',
    description: 'A byte-sized studio for code, design and the web.',
    images: ['https://bytcd.com/logo.png'],
  },
  metadataBase: new URL('https://bytcd.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var s=localStorage.getItem('theme');var prefersDark=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s===null&&prefersDark))document.documentElement.classList.add('dark');})();` }} />
      </head>
      <body id="root" className="p-0">
        <ToastProvider />
        <CustomCursor />
        <Navbar />
        {children}
        <BackToTopButton />
        <Analytics />
        <SpeedInsights />
        <EasterEggs />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Forkd - Discover Culinary Experiences',
  description: 'Connect with local chefs for personalized cooking classes and exclusive dining events.',
  keywords: ['cooking', 'chefs', 'culinary', 'classes', 'dining', 'food'],
  authors: [{ name: 'Forkd Team' }],
  openGraph: {
    title: 'Forkd - Discover Culinary Experiences',
    description: 'Connect with local chefs for personalized cooking classes and exclusive dining events.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

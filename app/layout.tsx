import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Header from '@/components/Header/Header';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const BASE_URL = 'https://travel-trucks-app-navy.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'TravelTrucks',
  description: 'Camper rental service in Ukraine',
  openGraph: {
    title: 'TravelTrucks',
    description: 'Find your perfect camper van for rent',
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/hero-bg.jpg`,
        width: 1200,
        height: 630,
        alt: 'TravelTrucks Preview',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Providers>
          <Header />
          <main>
            {children}
            
          </main>
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
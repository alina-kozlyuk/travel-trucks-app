//app/layuot.tsx
import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Header from '@/components/Header/Header';
import './globals.css';
import Providers from "./providers"

// Підключаємо основний шрифт Inter (задаємо змінну --font-inter)
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

// Підключаємо додатковий шрифт Manrope (задаємо змінну --font-manrope)
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TravelTrucks',
  description: 'Camper rental service in Ukraine',

  openGraph: {
    title: 'TravelTrucks',
    description: 'Find your perfect camper van for rent',
    url: 'https://traveltrucks.com',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'TravelTrucks Preview',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
  <Providers>
    <Header />
    <main>{children}</main>
  </Providers>
</body>
    </html>
  );
}
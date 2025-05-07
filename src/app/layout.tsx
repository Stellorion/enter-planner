import type { Metadata } from 'next';
import { Inter } from "next/font/google"
import './globals.css';
import Header from '../components/header/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Enter Planner',
  description: 'Plan your time easily',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

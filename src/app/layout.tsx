import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import PageShell from '@/components/shell/PageShell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Himesh Dua - Teacher's Dashboard for tracking students performance",
  description:
    'A Dashboard for Teacher to track progress and analyse the performance of students - made by Himesh Dua'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <PageShell>{children}</PageShell>
        </main>
      </body>
    </html>
  );
}

import { Inter } from 'next/font/google';
import { RootProvider } from '@/components/providers/rootProvider';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gemini-Style Chat',
  description: 'A chat application with Gemini AI-like interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          'bg-[hsl(var(--background))] text-[hsl(var(--foreground))]',
          inter.className
        )}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
} 
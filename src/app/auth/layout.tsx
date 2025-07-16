'use client';

import * as React from 'react';
import { ThemeToggle } from '@/components/dashboard/ThemeToggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[hsl(var(--background))] font-sans text-[hsl(var(--foreground))]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--secondary))] to-[hsl(var(--background))]" />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/10 blur-3xl" />
        <div className="absolute -right-48 -bottom-48 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/5 blur-3xl" />
      </div>
      
      {/* Theme toggle */}
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[480px] flex-col px-6 py-12 sm:px-8">
        {children}
      </div>
    </div>
  );
} 
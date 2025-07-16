'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeSetup } from '@/hooks/useThemeSetup';

export function ThemeToggle() {
  const { mounted, resolvedTheme, toggleTheme } = useThemeSetup();

  if (!mounted) {
    return (
      <Button variant="ghost" className="h-9 w-9 p-0" disabled>
        <Sun className="h-4 w-4 text-[hsl(var(--foreground))]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className="h-9 w-9 p-0"
      onClick={toggleTheme}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4 text-[hsl(var(--foreground))] transition-colors" />
      ) : (
        <Moon className="h-4 w-4 text-[hsl(var(--foreground))] transition-colors" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 
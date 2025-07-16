'use client';

import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
  const { mounted, theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (mounted && theme) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [mounted, theme]);

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
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-[hsl(var(--foreground))] transition-colors" />
      ) : (
        <Moon className="h-4 w-4 text-[hsl(var(--foreground))] transition-colors" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 
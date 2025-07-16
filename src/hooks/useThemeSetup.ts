import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useThemeSetup() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    mounted,
    resolvedTheme,
    toggleTheme,
  };
} 
'use client';

import { ReactNode, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { getCookie } from '@/lib/utils';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  // Initialize auth state from cookie
  useEffect(() => {
    const authData = getCookie(LOCAL_STORAGE_KEYS.AUTH);
    if (authData?.state) {
      const { user, isAuthenticated } = authData.state;
      if (user && isAuthenticated) {
        useAuthStore.getState().login(user);
      }
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-[hsl(var(--background))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))]',
          duration: 3000,
          style: {
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--primary-foreground))',
            },
          },
          error: {
            iconTheme: {
              primary: 'hsl(var(--destructive))',
              secondary: 'hsl(var(--destructive-foreground))',
            },
          },
        }}
      />
    </ThemeProvider>
  );
} 
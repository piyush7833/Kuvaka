import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState } from '@/types';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: 'light',
      mounted: false,
      resolvedTheme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
          resolvedTheme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: LOCAL_STORAGE_KEYS.THEME,
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            useThemeStore.setState({ mounted: true });
          }
        };
      },
    }
  )
); 
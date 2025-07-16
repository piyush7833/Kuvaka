import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState } from '@/types';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: LOCAL_STORAGE_KEYS.THEME,
    }
  )
); 
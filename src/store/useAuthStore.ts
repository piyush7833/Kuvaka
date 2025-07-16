import { create } from 'zustand';
import { AuthState, User } from '@/types';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';
import { setCookie, deleteCookie } from '@/lib/utils';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

type AuthStore = AuthState & {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  login: (user) => {
    const newState = {
      user,
      isAuthenticated: true,
      isLoading: false,
    };
    set(newState);
    // Set cookie with the same state structure as before
    setCookie(LOCAL_STORAGE_KEYS.AUTH, { state: newState });
  },
  logout: () => {
    set(initialState);
    // Remove the auth cookie
    deleteCookie(LOCAL_STORAGE_KEYS.AUTH);
  },
  setLoading: (loading) => set({ isLoading: loading }),
})); 
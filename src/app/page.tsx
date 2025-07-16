'use client';

import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import { useAuthStore } from '@/store/useAuthStore';

export default function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  redirect(isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH);
} 
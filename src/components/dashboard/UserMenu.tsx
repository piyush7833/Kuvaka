'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPhoneNumber } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

export function UserMenu() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    router.push(ROUTES.AUTH);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">
          {formatPhoneNumber(user.phoneNumber, user.countryCode)} 
        </span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-2 shadow-lg">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
} 
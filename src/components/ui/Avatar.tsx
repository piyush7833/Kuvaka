'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { IconUser, IconBot } from '@/components/ui/Icons';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  sender: 'user' | 'ai';
}

export function Avatar({ sender, className, ...props }: AvatarProps) {
  const isAI = sender === 'ai';
  return (
    <div
      className={cn(
        'flex h-8 w-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full',
        isAI
          ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
          : 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
        className
      )}
      {...props}
    >
      {isAI ? (
        <IconBot className="h-5 w-5" />
      ) : (
        <IconUser className="h-5 w-5" />
      )}
    </div>
  );
} 
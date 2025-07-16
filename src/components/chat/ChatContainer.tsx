'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ChatContainer({ children, className, ...props }: ChatContainerProps) {
  return (
    <div className="relative flex h-[calc(100vh-4rem)] flex-col">
      <div 
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900",
          "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600",
          "scrollbar-track-gray-100 dark:scrollbar-track-gray-800",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-6 pb-32 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
} 
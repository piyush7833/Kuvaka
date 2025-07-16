'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: React.ReactNode;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  className?: string;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder,
  error,
  className,
}: SelectProps) {
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-2">
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger
          className={cn(
            'flex h-12 w-full items-center justify-between rounded-xl border px-4 py-2',
            'border-[hsl(var(--input))] bg-white dark:bg-[hsl(var(--background))] text-[hsl(var(--foreground))]',
            'placeholder:text-[hsl(var(--muted-foreground))]',
            'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2',
            'hover:bg-[hsl(var(--accent))] hover:bg-opacity-5 transition-colors duration-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-[hsl(var(--destructive))] focus:ring-[hsl(var(--destructive))]',
            className
          )}
        >
          <SelectPrimitive.Value>
            {selectedOption ? selectedOption.label : (
              <span className="text-[hsl(var(--muted-foreground))]">{placeholder}</span>
            )}
          </SelectPrimitive.Value>
          <SelectPrimitive.Icon>
            <ChevronDown className="h-5 w-5 text-[hsl(var(--muted-foreground))] transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'relative z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border',
              'border-[hsl(var(--border))] bg-white dark:bg-[hsl(var(--background))] shadow-lg',
              'animate-in fade-in-0 zoom-in-95 duration-200',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport 
              className="p-2 max-h-[var(--radix-select-content-available-height)] overflow-y-auto"
            >
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    'relative flex h-11 select-none items-center rounded-lg pl-10 pr-4',
                    'text-base text-[hsl(var(--foreground))] outline-none',
                    'transition-colors duration-200',
                    'cursor-pointer hover:bg-[hsl(var(--accent))] hover:bg-opacity-10',
                    'focus:bg-[hsl(var(--accent))] focus:bg-opacity-10',
                    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    'data-[state=checked]:bg-[hsl(var(--accent))] data-[state=checked]:bg-opacity-10'
                  )}
                >
                  <span className="absolute left-3 flex h-6 w-6 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <Check className="h-4 w-4 text-[hsl(var(--primary))]" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && <p className="text-xs text-[hsl(var(--destructive))]">{error}</p>}
    </div>
  );
} 
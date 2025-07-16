'use client';

import { Listbox } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: React.ReactNode;
}

interface SelectProps {
  value: string | null;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: React.ReactNode;
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
  const selectedOption = value ? options.find(opt => opt.value === value) : null;

  return (
    <div className="space-y-2">
      <Listbox value={value ?? null} onChange={onValueChange}>
        <div className="relative">
          <Listbox.Button
            className={cn(
              'flex h-12 w-full items-center justify-between rounded-xl border px-4 py-2',
              'border-[hsl(var(--input))] bg-white dark:bg-[hsl(var(--background))] text-[hsl(var(--foreground))]',
              'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-[hsl(var(--destructive))] focus:ring-[hsl(var(--destructive))]',
              !selectedOption && 'text-[hsl(var(--muted-foreground))]',
              className
            )}
          >
            <span className="block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
          </Listbox.Button>

          <Listbox.Options
            className={cn(
              'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border',
              'border-[hsl(var(--border))] bg-white py-1 shadow-lg dark:bg-[hsl(var(--background))]',
              'focus:outline-none'
            )}
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) =>
                  cn(
                    'relative cursor-pointer select-none py-2 px-4',
                    'focus:outline-none',
                    (active || selected) && 'bg-[hsl(var(--accent))] bg-opacity-10'
                  )
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    {option.label}
                    {selected && (
                      <Check className="h-4 w-4 text-[hsl(var(--primary))]" />
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {error && <p className="text-sm text-[hsl(var(--destructive))]">{error}</p>}
    </div>
  );
} 
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Form } from '@/components/ui/Form';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useCountries } from '@/hooks/useCountries';
import Image from 'next/image';

const phoneFormSchema = z.object({
  countryCode: z.string().min(1, 'Please select a country code'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
});

type PhoneFormValues = z.infer<typeof phoneFormSchema>;

interface PhoneFormProps {
  onSubmit: (data: PhoneFormValues) => void;
  isLoading?: boolean;
  className?: string;
}

export function PhoneForm({
  onSubmit,
  isLoading = false,
  className,
}: PhoneFormProps) {
  const { countries, isLoading: isLoadingCountries, error } = useCountries();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      countryCode: '',
      phoneNumber: '',
    },
  });

  const countryCode = watch('countryCode');

  const formattedCountries = countries.map(country => ({
    value: country.value,
    label: (
      <div className="flex items-center gap-2">
        <Image
          src={country.flag}
          alt={`${country.label} flag`}
          width={20}
          height={15}
          className="flex-none rounded"
        />
        <span className="flex-none text-[hsl(var(--muted-foreground))]">
          {country.value}
        </span>
        <span className="flex-1 truncate">{country.label}</span>
      </div>
    ),
  }));

  const placeholder = (
    <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
      <div className="h-[15px] w-5 rounded bg-[hsl(var(--muted))]" />
      <span>Select country</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
      <div className="space-y-2">
        {isLoadingCountries ? (
          <div className="flex h-12 items-center justify-center rounded-xl border border-[hsl(var(--input))]">
            <LoadingSpinner size="sm" />
          </div>
        ) : error ? (
          <div className="text-sm text-[hsl(var(--destructive))]">{error}</div>
        ) : (
          <Select
            value={countryCode || null}
            onValueChange={(value) => setValue('countryCode', value)}
            options={formattedCountries}
            placeholder={placeholder}
            error={errors.countryCode?.message}
          />
        )}
      </div>

      <Input
        type="tel"
        placeholder="Phone number"
        {...register('phoneNumber')}
        error={errors.phoneNumber?.message}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Continue
      </Button>
    </form>
  );
} 
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const otpFormSchema = z.object({
  otp: z
    .string()
    .min(6, 'Please enter the 6-digit code')
    .max(6, 'Code must be exactly 6 digits')
    .regex(/^\d+$/, 'Code must contain only digits'),
});

type OTPFormValues = z.infer<typeof otpFormSchema>;

interface OTPFormProps {
  onSubmit: (values: OTPFormValues) => void;
  isLoading?: boolean;
  phoneNumber: string;
  countryCode: string;
  className?: string;
}

export function OTPForm({
  onSubmit,
  isLoading = false,
  phoneNumber,
  countryCode,
  className,
}: OTPFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-4', className)}
    >
      <div className="space-y-4">
        <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
          We sent a code to{' '}
          <span className="font-medium text-[hsl(var(--foreground))]">
            {countryCode} {phoneNumber}
          </span>
        </p>
        <Input
          {...register('otp')}
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6-digit code"
          className={cn(
            'text-center text-lg tracking-widest',
            errors.otp && 'border-[hsl(var(--destructive))] focus:border-[hsl(var(--destructive))]'
          )}
        />
        {errors.otp && (
          <p className="text-center text-xs text-[hsl(var(--destructive))]">
            {errors.otp.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="h-12 w-full text-sm font-medium"
        disabled={isLoading}
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </Button>
    </form>
  );
} 
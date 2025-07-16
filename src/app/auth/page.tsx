'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PhoneForm } from '@/components/auth/PhoneForm';
import { OTPForm } from '@/components/auth/OtpForm';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/lib/constants';
import { toast } from 'react-hot-toast';

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showOTP, setShowOTP] = React.useState(false);
  const [phoneData, setPhoneData] = React.useState({ countryCode: '', phoneNumber: '' });
  const login = useAuthStore((state) => state.login);

  // Simulate OTP send with throttling
  const handlePhoneSubmit = React.useCallback(async (values: { countryCode: string; phoneNumber: string }) => {
    setIsLoading(true);
    
    // Simulate API delay with random timing between 1-2 seconds
    const delay = Math.random() * 1000 + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    setPhoneData(values);
    setShowOTP(true);
    setIsLoading(false);
    toast.success('OTP sent successfully');
  }, []);

  // Simulate OTP verification with throttling
  const handleOTPSubmit = React.useCallback(async (values: { otp: string }) => {
    setIsLoading(true);

    // Simulate API verification with random timing between 1-3 seconds
    const delay = Math.random() * 2000 + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Simulate successful verification (in real app, this would be an API call)
    if (values.otp === '123456') { // For demo purposes
      login({
        id: '1',
        phoneNumber: phoneData.phoneNumber,
        countryCode: phoneData.countryCode,
      });
      router.push(ROUTES.DASHBOARD);
      toast.success('Login successful');
    } else {
      toast.error('Invalid OTP code');
      setIsLoading(false);
    }
  }, [login, phoneData, router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {showOTP ? 'Enter verification code' : 'Sign in to your account'}
          </h1>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            {showOTP
              ? 'We sent you a verification code. Enter it below to verify your identity.'
              : 'Enter your phone number to receive a verification code.'}
          </p>
        </div>

        {showOTP ? (
          <OTPForm
            onSubmit={handleOTPSubmit}
            isLoading={isLoading}
            phoneNumber={phoneData.phoneNumber}
            countryCode={phoneData.countryCode}
          />
        ) : (
          <PhoneForm
            onSubmit={handlePhoneSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
} 
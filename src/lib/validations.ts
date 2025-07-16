import * as z from 'zod';

export const phoneFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  countryCode: z.string().min(1, 'Please select a country'),
});

export const otpFormSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP must contain only digits'),
});

export const chatroomFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 50 characters'),
});

export const messageFormSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  image: z.any().optional(),
});

export type PhoneFormValues = z.infer<typeof phoneFormSchema>;
export type OTPFormValues = z.infer<typeof otpFormSchema>;
export type ChatroomFormValues = z.infer<typeof chatroomFormSchema>;
export type MessageFormValues = z.infer<typeof messageFormSchema>; 
import * as z from 'zod';

export const step3Schema = z.object({
  pinCode: z
    .string()
    .regex(/^\d{6}$/, 'PIN code must be exactly 6 digits'),
  state: z
    .string()
    .min(1, 'State is required'),
  city: z
    .string()
    .min(1, 'City is required'),
  addressLine: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(120, 'Address must not exceed 120 characters'),
  guardianName: z
    .string()
    .min(2, 'Guardian name is required')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  guardianMobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Mobile must be 10 digits starting with 6-9'),
  paymentPlan: z.enum(['Quarterly', 'Half-Yearly', 'Annual'], {
    required_error: 'Please select a payment plan',
  }),
  paymentMode: z.enum(['UPI', 'Card', 'NetBanking'], {
    required_error: 'Please select a payment mode',
  }),
});
import * as z from 'zod';

export const step1Schema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must not exceed 60 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces')
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Mobile must be 10 digits starting with 6-9'),
  class: z.enum(['9', '10', '11', '12'], {
    required_error: 'Please select a class',
  }),
  board: z.enum(['CBSE', 'ICSE', 'State Board'], {
    required_error: 'Please select a board',
  }),
  preferredLanguage: z.enum(['English', 'Hindi', 'Hinglish'], {
    required_error: 'Please select a language',
  }),
});
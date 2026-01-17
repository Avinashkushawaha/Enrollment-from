import * as z from 'zod';

export const step2Schema = z
  .object({
    subjects: z
      .array(z.string())
      .min(2, 'Select at least 2 subjects'),
    examGoal: z.enum(
      ['Board Excellence', 'Concept Mastery', 'Competitive Prep'],
      {
        required_error: 'Please select an exam goal',
      }
    ),
    weeklyStudyHours: z
      .number({
        required_error: 'Study hours is required',
        invalid_type_error: 'Must be a number',
      })
      .min(1, 'Must be at least 1 hour')
      .max(40, 'Cannot exceed 40 hours'),
    scholarshipApplication: z.boolean(),
    lastExamPercentage: z
      .number()
      .min(0)
      .max(100)
      .optional()
      .nullable(),
    achievements: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.scholarshipApplication) {
        return (
          data.lastExamPercentage !== undefined &&
          data.lastExamPercentage !== null &&
          data.lastExamPercentage >= 0
        );
      }
      return true;
    },
    {
      message: 'Last exam percentage is required for scholarship application',
      path: ['lastExamPercentage'],
    }
  );
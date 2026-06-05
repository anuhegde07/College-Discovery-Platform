import { z } from 'zod';

// Auth validators
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// College validators
export const collegeFilterSchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  minFees: z.number().optional(),
  maxFees: z.number().optional(),
  minRating: z.number().optional(),
  search: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(10),
});

// Review validators
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(1000),
});

// Predictor validators
export const predictionSchema = z.object({
  exam: z.enum(['JEE', 'NEET', 'CAT', 'GMAT', 'GRE']),
  rank: z.number().min(1, 'Rank must be greater than 0'),
});

// Comparison validators
export const comparisonSchema = z.object({
  collegeIds: z.array(z.string()).min(2).max(3),
  name: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CollegeFilters = z.infer<typeof collegeFilterSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type PredictionInput = z.infer<typeof predictionSchema>;
export type ComparisonInput = z.infer<typeof comparisonSchema>;

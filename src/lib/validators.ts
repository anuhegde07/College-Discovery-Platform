import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

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

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(1000),
});

export const predictionSchema = z.object({
  exam: z.enum(['JEE', 'NEET', 'CAT', 'GMAT', 'GRE']),
  rank: z.number().min(1),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type PredictionInput = z.infer<typeof predictionSchema>;

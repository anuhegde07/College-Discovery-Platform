import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const calculatePlacementRate = (placed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((placed / total) * 100);
};

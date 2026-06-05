// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// College Types
export interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  country: string;
  fees: number;
  rating: number;
  description?: string;
  imageUrl?: string;
  website?: string;
  phone?: string;
  email?: string;
  established?: number;
  ranking?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollegeDetail extends College {
  courses: Course[];
  placements: Placement[];
  reviews: Review[];
  reviewCount: number;
  averageRating: number;
}

// Course Types
export interface Course {
  id: string;
  name: string;
  duration: string;
  collegeId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Placement Types
export interface Placement {
  id: string;
  year: number;
  placedStudents: number;
  totalStudents: number;
  averageSalary: number;
  highestSalary: number;
  collegeId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  collegeId: string;
  user: {
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Saved College Types
export interface SavedCollege {
  id: string;
  userId: string;
  collegeId: string;
  college: College;
  createdAt: Date;
}

// Comparison Types
export interface Comparison {
  id: string;
  name: string;
  userId: string;
  colleges: College[];
  createdAt: Date;
  updatedAt: Date;
}

// Predictor Types
export interface PredictionRequest {
  exam: 'JEE' | 'NEET' | 'CAT' | 'GMAT' | 'GRE';
  rank: number;
}

// Filter Types
export interface CollegeFilters {
  city?: string;
  state?: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

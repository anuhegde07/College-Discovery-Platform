# College Discovery Platform

A production-grade MVP for college discovery and decision-making platform.

## Features

### ✨ Core Features
- **College Listing & Search**: Searchable college listings with filters and pagination
- **College Detail Page**: Comprehensive college information including overview, courses, placements, and reviews
- **Compare Colleges**: Side-by-side comparison of 2-3 colleges
- **Predictor Tool**: Recommend colleges based on exam scores and rank
- **Authentication**: User registration, login, and profile management
- **Saved Items**: Save colleges and comparisons for later reference

## Tech Stack

### Frontend
- **Next.js 14**: Full-stack React framework
- **React 18**: UI library
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Next.js API Routes**: RESTful API endpoints
- **TypeScript**: Type-safe backend code

### Database
- **PostgreSQL**: Relational database
- **Prisma ORM**: Type-safe database client and migrations

### Authentication
- **bcryptjs**: Password hashing
- **JWT**: JSON Web Tokens for session management

### Deployment
- **Vercel**: Recommended deployment platform
- **Railway/Render**: Alternative options
- **Neon**: PostgreSQL hosting

## Project Structure

college-discovery-platform/ ├── src/ │ ├── app/ # Next.js App Router │ │ ├── api/ # API routes │ │ ├── auth/ # Authentication pages │ │ ├── colleges/ # College listing & detail pages │ │ ├── compare/ # Comparison page │ │ ├── predict/ # Predictor tool page │ │ └── layout.tsx # Root layout │ ├── components/ # Reusable React components │ ├── lib/ # Utility functions │ ├── middleware.ts # Next.js middleware │ ├── styles/ # Global styles │ └── types/ # TypeScript type definitions ├── prisma/ │ ├── schema.prisma # Database schema │ └── migrations/ # Database migrations ├── public/ # Static assets ├── .env.example # Environment variables template ├── next.config.js # Next.js configuration ├── tailwind.config.ts # TailwindCSS configuration ├── tsconfig.json # TypeScript configuration └── package.json # Dependencies and scripts


## Getting Started

### Prerequisites
- Node.js 18+ or higher
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anuhegde07/college-discovery-platform.git
   cd college-discovery-platform



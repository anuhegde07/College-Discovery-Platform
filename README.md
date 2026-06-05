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

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anuhegde07/college-discovery-platform.git
   cd college-discovery-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:3000`

## Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Prisma Studio
```

## Project Structure

```
college-discovery-platform/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── styles/
├── prisma/
│   └── schema.prisma
├── public/
└── package.json
```

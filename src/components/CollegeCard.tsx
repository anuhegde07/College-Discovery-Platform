'use client';

import Link from 'next/link';
import { Star, MapPin, DollarSign, Trophy } from 'lucide-react';
import { College } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Link href={`/colleges/${college.id}`}>
      <div className="card-hover">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-dark hover:text-primary transition">
              {college.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <MapPin size={14} />
              <span>
                {college.city}, {college.state}
              </span>
            </div>
          </div>
          {college.ranking && (
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
              <Trophy size={14} className="text-primary" />
              <span className="text-sm font-semibold text-primary">#{college.ranking}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(college.rating) ? 'fill-accent text-accent' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-dark">{college.rating.toFixed(1)}/5</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign size={14} />
          <span>{formatCurrency(college.fees)}/year</span>
        </div>

        {college.description && (
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{college.description}</p>
        )}
      </div>
    </Link>
  );
}

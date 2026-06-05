'use client';

import { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { SavedCollege } from '@/types';
import toast from 'react-hot-toast';

export default function SavedCollegesPage() {
  const [savedColleges, setSavedColleges] = useState<SavedCollege[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedColleges();
  }, []);

  const fetchSavedColleges = async () => {
    try {
      const response = await fetch('/api/saved-colleges');
      const data = await response.json();

      if (response.ok && data.success) {
        setSavedColleges(data.data);
      } else if (response.status === 401) {
        window.location.href = '/auth/login';
      }
    } catch (error) {
      toast.error('Failed to load saved colleges');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const response = await fetch(`/api/saved-colleges/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSavedColleges(savedColleges.filter((c) => c.id !== id));
        toast.success('College removed from saved');
      } else {
        toast.error('Failed to remove college');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="container-max py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-max py-8">
      <h1 className="section-title">Saved Colleges</h1>
      <p className="section-subtitle">Colleges you've bookmarked for later</p>

      {savedColleges.length === 0 ? (
        <div className="card text-center py-20">
          <Heart size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-dark mb-2">No Saved Colleges</h3>
          <p className="text-gray-600 mb-6">
            Start exploring colleges and save your favorites for later comparison
          </p>
          <Link href="/colleges" className="btn-primary inline-block">
            Browse Colleges
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedColleges.map((saved) => (
            <div key={saved.id} className="card hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <Link
                    href={`/colleges/${saved.college.id}`}
                    className="font-bold text-lg text-dark hover:text-primary transition"
                  >
                    {saved.college.name}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {saved.college.city}, {saved.college.state}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(saved.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-light p-3 rounded">
                  <p className="text-xs text-gray-600">Rating</p>
                  <p className="font-bold text-dark">{saved.college.rating.toFixed(1)}/5</p>
                </div>
                <div className="bg-light p-3 rounded">
                  <p className="text-xs text-gray-600">Fees/Year</p>
                  <p className="font-bold text-dark">₹{(saved.college.fees / 100000).toFixed(2)}L</p>
                </div>
                <div className="bg-light p-3 rounded">
                  <p className="text-xs text-gray-600">Rank</p>
                  <p className="font-bold text-dark">#{saved.college.ranking || 'N/A'}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/colleges/${saved.college.id}`}
                  className="flex-1 px-3 py-2 bg-primary text-white rounded text-center text-sm hover:bg-blue-600 transition"
                >
                  View Details
                </Link>
                <Link
                  href={`/compare?colleges=${saved.college.id}`}
                  className="flex-1 px-3 py-2 border border-primary text-primary rounded text-center text-sm hover:bg-primary/10 transition"
                >
                  Compare
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

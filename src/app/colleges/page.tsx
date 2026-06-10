'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import CollegeCard from '@/components/CollegeCard';
import { College } from '@/types';
import toast from 'react-hot-toast';

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [filters, setFilters] = useState({
    search: '',
    city: '',
    state: '',
    minFees: '',
    maxFees: '',
    minRating: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const fetchColleges = async (pageNum = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', pageNum.toString());
      params.append('limit', '9');

      if (filters.search) params.append('search', filters.search);
      if (filters.city) params.append('city', filters.city);
      if (filters.state) params.append('state', filters.state);
      if (filters.minFees) params.append('minFees', filters.minFees);
      if (filters.maxFees) params.append('maxFees', filters.maxFees);
      if (filters.minRating) params.append('minRating', filters.minRating);

      const response = await fetch(`/api/colleges?${params}`);
      const data = await response.json();

      if (data.success) {
        setColleges(data.data.colleges);
        setTotal(data.data.total);
        setTotalPages(data.data.totalPages);
        setPage(pageNum);
      }
    } catch (error) {
      toast.error('Failed to fetch colleges');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges(1);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setPage(1);
    fetchColleges(1);
  };

  const handleReset = async () => {
  setFilters({
    search: '',
    city: '',
    state: '',
    minFees: '',
    maxFees: '',
    minRating: '',
  });

  await fetch('/api/colleges?page=1&limit=10');
  fetchColleges(1);
};

  return (
    <div className="container-max py-8">
      <div className="mb-8">
        <h1 className="section-title">Find Your College</h1>
        <p className="section-subtitle">Explore colleges by filters and preferences</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-dark mb-2">Search</label>
            <div className="relative">
              <Search className="absolute right-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="search"
                placeholder="Search by college name or location..."
                value={filters.search}
                onChange={handleFilterChange}
                className="input-field pl-8"
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition"
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={18} className={`transition ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={filters.city}
                onChange={handleFilterChange}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">State</label>
              <input
                type="text"
                name="state"
                placeholder="Enter state"
                value={filters.state}
                onChange={handleFilterChange}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Min Rating</label>
              <input
                type="number"
                name="minRating"
                placeholder="0-5"
                min="0"
                max="5"
                step="0.1"
                value={filters.minRating}
                onChange={handleFilterChange}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Min Fees</label>
              <input
                type="number"
                name="minFees"
                placeholder="Min fees"
                value={filters.minFees}
                onChange={handleFilterChange}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Max Fees</label>
              <input
                type="number"
                name="maxFees"
                placeholder="Max fees"
                value={filters.maxFees}
                onChange={handleFilterChange}
                className="input-field text-sm"
              />
            </div>

            <div className="flex gap-2 items-end">
              <button
                onClick={handleApplyFilters}
                className="flex-1 btn-primary"
              >
                Apply Filters
              </button>
              <button
                onClick={handleReset}
                className="flex-1 btn-secondary"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {colleges.length > 0 ? (page - 1) * 10 + 1 : 0} -{' '}
          {Math.min(page * 10, total)} of {total} colleges
        </p>
      </div>

      {/* Colleges Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse h-64 bg-gray-200" />
          ))}
        </div>
      ) : colleges.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => fetchColleges(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => fetchColleges(i + 1)}
                    className={`px-3 py-2 rounded-lg transition ${
                      page === i + 1
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 hover:border-primary'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => fetchColleges(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No colleges found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

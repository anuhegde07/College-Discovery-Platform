'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Plus, Trash2 } from 'lucide-react';
import { College } from '@/types';
import { formatCurrency, calculatePlacementRate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function ComparisonPage() {
  const searchParams = useSearchParams();
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllColleges();
    const collegeIds = searchParams.get('colleges')?.split(',');
    if (collegeIds) {
      collegeIds.forEach((id) => fetchCollegeDetail(id));
    }
  }, [searchParams]);

  const fetchAllColleges = async () => {
    try {
      const response = await fetch('/api/colleges?limit=100');
      const data = await response.json();
      if (data.success) {
        setAllColleges(data.data.colleges);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCollegeDetail = async (id: string) => {
    try {
      const response = await fetch(`/api/colleges/${id}`);
      const data = await response.json();
      if (data.success) {
        setSelectedColleges((prev) => {
          const exists = prev.find((c) => c.id === id);
          return exists ? prev : [...prev, data.data];
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCollege = (college: College) => {
    if (selectedColleges.length >= 3) {
      toast.error('You can compare up to 3 colleges only');
      return;
    }
    if (selectedColleges.find((c) => c.id === college.id)) {
      toast.error('College already selected');
      return;
    }
    setSelectedColleges([...selectedColleges, college]);
  };

  const handleRemoveCollege = (id: string) => {
    setSelectedColleges(selectedColleges.filter((c) => c.id !== id));
  };

  const filteredColleges = allColleges.filter(
    (college) =>
      !selectedColleges.find((c) => c.id === college.id) &&
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const comparisonFields = [
    { label: 'Annual Fees', key: 'fees', format: (val: any) => formatCurrency(val) },
    { label: 'Rating', key: 'rating', format: (val: any) => val.toFixed(1) + '/5' },
    { label: 'Ranking', key: 'ranking', format: (val: any) => val ? `#${val}` : 'N/A' },
    { label: 'Location', key: 'location', format: (val: any) => val },
    { label: 'Established', key: 'established', format: (val: any) => val || 'N/A' },
  ];

  return (
    <div className="container-max py-8">
      <h1 className="section-title">Compare Colleges</h1>
      <p className="section-subtitle">Compare up to 3 colleges side by side</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search and Add Colleges */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h3 className="font-bold text-lg mb-4">Select Colleges</h3>
            <div className="relative mb-4">
              <Search className="absolute right-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredColleges.map((college) => (
                <button
                  key={college.id}
                  onClick={() => handleAddCollege(college)}
                  className="w-full text-left p-3 rounded-lg hover:bg-primary/10 transition border border-gray-200"
                >
                  <p className="font-semibold text-dark text-sm">{college.name}</p>
                  <p className="text-xs text-gray-600">{college.city}, {college.state}</p>
                </button>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {selectedColleges.length}/3 selected
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="lg:col-span-3">
          {selectedColleges.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 mb-4">No colleges selected for comparison</p>
              <p className="text-sm text-gray-500">Select colleges from the left panel to compare</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="px-4 py-4 text-left font-bold text-dark w-40">Criteria</th>
                    {selectedColleges.map((college) => (
                      <th key={college.id} className="px-4 py-4 text-left font-bold">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-dark">{college.name}</p>
                            <p className="text-xs text-gray-600">{college.city}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveCollege(college.id)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFields.map((field, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-light transition">
                      <td className="px-4 py-4 font-semibold text-dark bg-gray-50">{field.label}</td>
                      {selectedColleges.map((college) => (
                        <td key={college.id} className="px-4 py-4 text-dark">
                          {field.format((college as any)[field.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedColleges.length > 0 && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  const ids = selectedColleges.map((c) => c.id).join(',');
                  // Save comparison logic here
                  toast.success('Comparison saved!');
                }}
                className="btn-primary flex-1"
              >
                Save This Comparison
              </button>
              <Link href="/colleges" className="btn-secondary flex-1 text-center">
                Back to Colleges
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

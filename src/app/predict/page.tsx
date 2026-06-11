'use client';

import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { College } from '@/types';
import toast from 'react-hot-toast';

export default function PredictorPage() {
  const [exam, setExam] = useState('JEE');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!rank || parseInt(rank) <= 0) {
      toast.error('Please enter a valid rank');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          rank: parseInt(rank),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.data.colleges);
        if (data.data.colleges.length === 0) {
          toast.error('No colleges found for this rank. Try a different rank.');
        } else {
          toast.success(`Found ${data.data.colleges.length} colleges!`);
        }
      } else {
        toast.error(data.error || 'Prediction failed');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-max py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-dark mb-3">College Predictor</h1>
        <p className="text-xl text-gray-600">
          Get college recommendations based on your exam score and rank
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Prediction Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handlePredict} className="card sticky top-20">
            <h2 className="font-bold font-size-15 text-lg mb-6">
              Enter Your Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Exam Type</label>
                <select
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  className="input-field"
                >
                  <option value="JEE">JEE Main</option>
                  <option value="JEE">JEE Advanced</option>
                  <option value="NEET">NEET</option>
                  <option value="CAT">CAT</option>
                  <option value="GMAT">GMAT</option>
                  <option value="GRE">GRE</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Your Rank</label>
                <input
                  type="number"
                  placeholder="Enter your rank"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  className="input-field"
                  min="1"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Predicting...' : 'Get Recommendations'}
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex gap-3">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-blue-800">
                  Enter your exam rank to get a list of colleges that match your profile based on historical data.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {results.length === 0 ? (
            <div className="card text-center py-20">
              <Search className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-semibold text-dark mb-2">No Results Yet</h3>
              <p className="text-gray-600">
                Fill in your exam details and click &quot;Get Recommendations&quot; to see colleges
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-dark mb-2">
                  Recommended Colleges for {exam} Rank {rank}
                </h2>
                <p className="text-gray-600">Found {results.length} colleges matching your profile</p>
              </div>

              <div className="space-y-4">
                {results.map((college, idx) => (
                  <a
                    key={college.id}
                    href={`/colleges/${college.id}`}
                  >
                    <div className="flex gap-6 p-3 border rounded-lg hover:shadow-lg transition">
                      <div className="flex-1 mb-5 gap-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-block w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </span>
                          <h3 className="font-bold text-lg text-dark hover:text-primary transition">
                            {college.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {college.location} • Est. {college.established || 'N/A'}
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-600">Rating</p>
                            <p className="font-bold text-dark">{(college.rating ?? "Not disclosed").toFixed(1)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Annual Fees</p>
                            <p className="font-bold text-dark">₹{(college.fees / 100000).toFixed(2)}L</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">National Rank</p>
                            <p className="font-bold text-dark">#{college.ranking || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  <br/>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

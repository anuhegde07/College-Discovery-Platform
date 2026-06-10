'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Heart, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/auth/me');

      if (response.status === 401) {
        router.push('/api/auth/login');
        return;
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Logged out successfully!');
        router.push('/');
      }
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  if (loading) {
    return (
      <div className="container-max py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-max py-8 text-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container-max py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="section-title">My Profile</h1>

        <div className="card mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-bold text-lg mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold text-dark">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-dark">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-semibold text-dark">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <a href="/saved" className="card-hover">
            <div className="flex items-center gap-3">
              <Heart className="text-red-600" size={24} />
              <div>
                <h3 className="font-bold text-dark">Saved Colleges</h3>
                <p className="text-sm text-gray-600">Your bookmarked colleges</p>
              </div>
            </div>
          </a>

          <a href="/compare" className="card-hover">
            <div className="flex items-center gap-3">
              <Settings className="text-primary" size={24} />
              <div>
                <h3 className="font-bold text-dark">Comparisons</h3>
                <p className="text-sm text-gray-600">Your saved comparisons</p>
              </div>
            </div>
          </a>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

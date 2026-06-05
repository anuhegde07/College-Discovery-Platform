'use client';

import Link from 'next/link';
import { Search, BarChart3, Compass, Award } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find colleges with advanced filters and search capabilities',
    },
    {
      icon: Compass,
      title: 'Compare Colleges',
      description: 'Compare 2-3 colleges side by side to make better decisions',
    },
    {
      icon: BarChart3,
      title: 'Placement Data',
      description: 'View real placement statistics and salary information',
    },
    {
      icon: Award,
      title: 'AI Predictor',
      description: 'Get college recommendations based on your exam rank',
    },
  ];

  const stats = [
    { label: 'Colleges Listed', value: '500+' },
    { label: 'Students Helped', value: '10K+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Cities Covered', value: '28' },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 py-20">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-dark mb-6">
                Discover Your Perfect College
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Compare colleges, view placements, check reviews, and get AI-powered recommendations.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/colleges" className="btn-primary">
                  Explore Colleges
                </Link>
                <Link href="/predict" className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10">
                  Try Predictor
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-2xl hidden md:block h-96" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container-max">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">Comprehensive tools to make your college decision easier</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card-hover">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your College?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Start exploring thousands of colleges today and make an informed decision.
          </p>
          <Link href="/colleges" className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 font-semibold">
            Browse Colleges Now
          </Link>
        </div>
      </section>
    </div>
  );
}

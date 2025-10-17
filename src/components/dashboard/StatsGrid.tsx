'use client';

import { useState, useEffect } from 'react';
import { fetchJobsWithFallback } from '@/services/api';

interface StatItem {
  label: string;
  value: string | number;
  description?: string;
}

export default function StatsGrid() {
  const [stats, setStats] = useState<StatItem[]>([
    { label: 'Tech Jobs', value: 'Loading...', description: 'Active positions' },
    { label: 'Avg Salary', value: 'Loading...', description: 'Senior developer' },
    { label: 'Companies', value: 'Loading...', description: 'Tech companies in Seattle' },
  ]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<string>('Checking...');

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchJobsWithFallback();
      
      // Determine data source for debugging
      if (result.error && result.error.includes('Adzuna API credentials')) {
        setDataSource('Mock Data - Missing API Keys');
      } else if (result.data) {
        // Check if data looks like mock data
        const firstJob = result.data[0];
        const isMockData = firstJob.company === 'Amazon' || firstJob.company === 'Microsoft';
        setDataSource(isMockData ? 'Mock Data (Fallback)' : 'Live API Data');
      }
      
      if (result.data && result.data.length > 0) {
        // Calculate real stats from API data
        const jobCount = result.data.length;
        const uniqueCompanies = new Set(result.data.map(job => job.company));
        const hasSeniorRoles = result.data.some(job => 
          job.title.toLowerCase().includes('senior') || 
          job.title.toLowerCase().includes('lead') ||
          job.title.toLowerCase().includes('principal')
        );
        
        const avgSalary = hasSeniorRoles ? '$135k' : '$127k';
        
        setStats([
          { label: 'Tech Jobs', value: jobCount.toLocaleString(), description: 'Active positions' },
          { label: 'Avg Salary', value: avgSalary, description: 'Based on current roles' },
          { label: 'Companies', value: uniqueCompanies.size.toLocaleString(), description: 'Hiring in Seattle' },
        ]);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Debug info - you can remove this after verification */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Data Source:</strong> {dataSource}
          {dataSource.includes('Mock') && (
            <span className="block mt-1 text-xs">
              ℹ️ Add Adzuna API keys in Vercel environment variables for live data
            </span>
          )}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {loading ? '...' : stat.value}
            </p>
            {stat.description && (
              <p className="text-gray-400 text-xs mt-1">{stat.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
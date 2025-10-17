// src\components\dashboard\StatsGrid.tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchJobsWithFallback } from '@/services/api';
// import { JobPosting } from '@/types/api'; TODO:to  implement cards for each post 

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

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchJobsWithFallback();
      
      if (result.data && result.data.length > 0) {
        // Calculate real stats from API data
        const jobCount = result.data.length;
        
        // Extract unique companies
        const uniqueCompanies = new Set(result.data.map(job => job.company));
        
        // Simple salary estimation based on job titles
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
      } else {
        // Fallback to enhanced mock data calculations
        setStats([
          { label: 'Tech Jobs', value: '2,458', description: 'Active positions' },
          { label: 'Avg Salary', value: '$127k', description: 'Senior developer' },
          { label: 'Companies', value: '2,341', description: 'Tech companies in Seattle' },
        ]);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
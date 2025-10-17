'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useRef, useEffect, useState } from 'react';
import { fetchJobsWithFallback } from '@/services/api';
// import { JobPosting } from '@/types/api'; TODO:to  implement cards for each post 

// Define types inline for now
interface JobData {
  language: string;
  jobs: number;
}

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Default data with proper typing
const defaultData: JobData[] = [
  { language: 'JavaScript', jobs: 4231 },
  { language: 'Python', jobs: 3876 },
  { language: 'Java', jobs: 3215 },
  { language: 'TypeScript', jobs: 2987 },
  { language: 'C#', jobs: 2456 },
];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#374151',
        font: {
          size: 12,
          weight: 500 as const, // Fixed: Use number instead of string
        }
      }
    },
    title: {
      display: true,
      text: 'Seattle Tech Jobs by Programming Language',
      color: '#111827',
      font: {
        size: 16,
        weight: 600 as const, // Fixed: Use number instead of string
      }
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      titleColor: '#f9fafb',
      bodyColor: '#f9fafb',
      borderColor: '#3b82f6',
      borderWidth: 1,
      cornerRadius: 6,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        color: '#6b7280',
      }
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          weight: 500 as const, // Fixed: Use number instead of string
        }
      },
    },
  },
};

export default function TechJobsChart() {
  const chartRef = useRef<ChartJS<'bar'>>(null);
  const [gradient, setGradient] = useState<CanvasGradient | null>(null);
  const [chartData, setChartData] = useState<JobData[]>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchJobsWithFallback();
      
      if (result.data && result.data.length > 0) {
        // Analyze real job data for programming languages
        const languageCount: { [key: string]: number } = {};
        
        result.data.forEach(job => {
          // Simple keyword analysis - you can enhance this
          const title = job.title.toLowerCase();
          const description = job.description.toLowerCase();
          
          const languages = [
            'javascript', 'python', 'java', 'typescript', 'c#', 
            'react', 'node', 'angular', 'vue', 'php', 'ruby', 'go'
          ];
          
          languages.forEach(lang => {
            if (title.includes(lang) || description.includes(lang)) {
              languageCount[lang] = (languageCount[lang] || 0) + 1;
            }
          });
        });
        
        // Convert to chart format
        const realChartData = Object.entries(languageCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([language, jobs]) => ({ 
            language: language.charAt(0).toUpperCase() + language.slice(1), 
            jobs 
          }));
        
        setChartData(realChartData.length > 0 ? realChartData : defaultData);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  // Gradient effect - this is what creates the beautiful blue-to-emerald colors
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      
      // Create beautiful blue to emerald gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#3b82f6');    // blue-500 - top
      gradient.addColorStop(0.5, '#0ea5e9');  // sky-500  - middle  
      gradient.addColorStop(1, '#10b981');    // emerald-500 - bottom
      
      setGradient(gradient);
    }
  }, [chartData]);

  const chartConfig = {
    labels: chartData.map((item: JobData) => item.language),
    datasets: [
      {
        label: 'Job Postings',
        data: chartData.map((item: JobData) => item.jobs),
        backgroundColor: gradient || 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(16, 185, 129, 0.9)',
        hoverBorderColor: 'rgba(16, 185, 129, 1)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      {loading ? (
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading job data...</p>
          </div>
        </div>
      ) : (
        <Bar 
          ref={chartRef} 
          options={options} 
          data={chartConfig} 
        />
      )}
    </div>
  );
}
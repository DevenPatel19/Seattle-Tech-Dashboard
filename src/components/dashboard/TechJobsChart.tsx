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

// Define types inline for now
interface JobData {
  language: string;
  jobs: number;
}

interface TechJobsChartProps {
  data?: JobData[];
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
    },
    title: {
      display: true,
      text: 'Seattle Tech Jobs by Programming Language',
    },
  },
};

export default function TechJobsChart({ data = defaultData }: TechJobsChartProps) {
  // Transform data for Chart.js with proper typing
  const chartData = {
    labels: data.map((item: JobData) => item.language),
    datasets: [
      {
        label: 'Job Postings',
        data: data.map((item: JobData) => item.jobs),
        backgroundColor: 'gradient: rgb(0, 152, 224, 0.8)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <Bar options={options} data={chartData} />
    </div>
  );
}
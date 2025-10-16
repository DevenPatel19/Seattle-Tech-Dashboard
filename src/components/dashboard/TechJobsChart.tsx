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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const labels = ['JavaScript', 'Python', 'Java', 'TypeScript', 'C#'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Job Postings',
      data: [4231, 3876, 3215, 2987, 2456],
      backgroundColor: 'rgba(79, 70, 229, 0.8)',
    },
  ],
};

export default function TechJobsChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <Bar options={options} data={data} />
    </div>
  );
}
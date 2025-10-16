// Types for your stats data
export interface StatItem {
  label: string;
  value: string | number;
  description?: string;
}

// Types for chart data
export interface JobData {
  language: string;
  jobs: number;
}

// Props for your components
export interface StatsGridProps {
  stats: StatItem[];
}

export interface TechJobsChartProps {
  data?: JobData[]; // Optional with default data
}
// Central API type definitions
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  how_to_apply: string;
  company_logo?: string;
  created_at: string;
}

export interface SeattleEconomicData {
  year: number;
  quarter: number;
  tech_jobs_count: number;
  average_salary: number;
  new_businesses: number;
}
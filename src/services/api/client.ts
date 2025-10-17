// src\services\api\client.ts
import { SeattleEconomicData, ApiResponse } from '@/types/api';

export async function fetchSeattleEconomicData(): Promise<ApiResponse<SeattleEconomicData[]>> {
  // Mock data for now - we'll replace with real Seattle Open Data API later
  const mockData: SeattleEconomicData[] = [
    {
      year: 2024,
      quarter: 1,
      tech_jobs_count: 125000,
      average_salary: 127000,
      new_businesses: 2341,
    },
    {
      year: 2023, 
      quarter: 4,
      tech_jobs_count: 118000,
      average_salary: 125000,
      new_businesses: 2156,
    },
  ];

  return {
    data: mockData,
    error: null,
    loading: false,
  };
}

// Make sure we're exporting the function when we implement it
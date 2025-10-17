import { JobPosting, ApiResponse } from '../../../types/api';

const APP_ID = process.env.NEXT_PUBLIC_ADZUNA_APP_ID;
const APP_KEY = process.env.NEXT_PUBLIC_ADZUNA_APP_KEY;

// Define the exact shape of Adzuna API response
interface AdzunaJob {
  id: string;
  title: string;
  company: {
    display_name: string;
    logo?: string;
  };
  location: {
    display_name: string;
  };
  contract_type?: string;
  description: string;
  redirect_url?: string;
  created: string;
}

interface AdzunaApiResponse {
  results: AdzunaJob[];
}

export async function fetchAdzunaJobs(): Promise<ApiResponse<JobPosting[]>> {
  if (!APP_ID || !APP_KEY) {
    return {
      data: null,
      error: 'Adzuna API credentials not configured',
      loading: false,
    };
  }

  try {
    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=javascript%20react%20typescript&where=seattle&max_days_old=30`
    );

    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.status}`);
    }

    const data: AdzunaApiResponse = await response.json();
    
    // Now we have proper types - no more 'any'!
    const jobs: JobPosting[] = data.results.map((job: AdzunaJob) => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      type: job.contract_type || 'Full Time',
      description: job.description,
      how_to_apply: job.redirect_url || 'Apply on company website',
      company_logo: job.company.logo,
      created_at: job.created,
    }));

    return {
      data: jobs,
      error: null,
      loading: false,
    };
  } catch (error) {
    // Fix for Error 2: Properly handle unknown error type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      data: null,
      error: `Failed to fetch Adzuna jobs: ${errorMessage}`,
      loading: false,
    };
  }
}
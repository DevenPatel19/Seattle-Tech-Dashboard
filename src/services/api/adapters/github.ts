import { JobPosting, ApiResponse } from '@/types/api';

// Define the exact shape of GitHub Jobs API response
interface GitHubJob {
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

export async function fetchGitHubJobs(): Promise<ApiResponse<JobPosting[]>> {
  try {
    const response = await fetch(
      'https://jobs.github.com/positions.json?location=seattle&description=javascript'
    );

    if (!response.ok) {
      throw new Error(`GitHub Jobs API error: ${response.status}`);
    }

    const data: GitHubJob[] = await response.json();
    
    // Now we have proper types - no more 'any'!
    const jobs: JobPosting[] = data.map((job: GitHubJob) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type || 'Full Time',
      description: job.description,
      how_to_apply: job.how_to_apply,
      company_logo: job.company_logo,
      created_at: job.created_at,
    }));

    return {
      data: jobs,
      error: null,
      loading: false,
    };
  } catch (error) {
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return {
      data: null,
      error: `Failed to fetch GitHub jobs: ${errorMessage}`,
      loading: false,
    };
  }
}
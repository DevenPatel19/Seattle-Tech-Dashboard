import { JobPosting, ApiResponse } from '@/types/api';
import { fetchAdzunaJobs } from '../adapters/adzuna';
import { fetchGitHubJobs } from '../adapters/github';

// Enhanced mock data based on real Seattle tech landscape
const enhancedMockData: JobPosting[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'Amazon',
    location: 'Seattle, WA',
    type: 'Full Time',
    description: 'Join AWS building cloud frontend applications with React and TypeScript...',
    how_to_apply: 'Apply via Amazon jobs portal',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Frontend Engineer - TypeScript',
    company: 'Microsoft',
    location: 'Redmond, WA', 
    type: 'Full Time',
    description: 'Work on Microsoft 365 frontend with modern React and GraphQL...',
    how_to_apply: 'Microsoft careers website',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'Starbucks',
    location: 'Seattle, WA',
    type: 'Full Time', 
    description: 'Build digital customer experiences for Starbucks mobile and web platforms...',
    how_to_apply: 'Starbucks careers',
    created_at: new Date().toISOString(),
  },
];

export async function fetchJobsWithFallback(): Promise<ApiResponse<JobPosting[]>> {
  // Try Adzuna first (more comprehensive)
  const adzunaResponse = await fetchAdzunaJobs();
  if (adzunaResponse.data && adzunaResponse.data.length > 0) {
    console.log('Using Adzuna API data');
    return adzunaResponse;
  }

  // Fallback to GitHub Jobs
  const githubResponse = await fetchGitHubJobs();
  if (githubResponse.data && githubResponse.data.length > 0) {
    console.log('Using GitHub Jobs API data (Adzuna failed)');
    return githubResponse;
  }

  // Final fallback to enhanced mock data
  console.log('Using enhanced mock data (all APIs failed)');
  return {
    data: enhancedMockData,
    error: 'All APIs failed, using mock data',
    loading: false,
  };
}
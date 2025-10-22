// __tests__/services/api/fallbacks/jobsFallback.service.test.ts
import { fetchJobsWithFallback } from '../../../../src/services/api/fallbacks/jobsFallback';
import { fetchAdzunaJobs } from '../../../../src/services/api/adapters/adzuna';
import { fetchGitHubJobs } from '../../../../src/services/api/adapters/github';
import { JobPosting, ApiResponse } from '../../../../src/types/api';

// Mock both adapters
jest.mock('../../../../src/services/api/adapters/adzuna');
jest.mock('../../../../src/services/api/adapters/github');

describe('Jobs Fallback Service', () => {
  const mockFetchAdzunaJobs = fetchAdzunaJobs as jest.MockedFunction<typeof fetchAdzunaJobs>;
  const mockFetchGitHubJobs = fetchGitHubJobs as jest.MockedFunction<typeof fetchGitHubJobs>;

  beforeEach(() => {
    mockFetchAdzunaJobs.mockClear();
    mockFetchGitHubJobs.mockClear();
  });

  describe('fetchJobsWithFallback', () => {
    it('should return Adzuna data when API call is successful', async () => {
      const mockAdzunaData: JobPosting[] = [
        {
          id: '1',
          title: 'React Developer',
          company: 'Microsoft',
          location: 'Seattle, WA',
          type: 'Full Time',
          description: 'React development',
          how_to_apply: 'Apply online',
          created_at: '2024-01-15T00:00:00Z'
        }
      ];

      const mockResponse: ApiResponse<JobPosting[]> = {
        data: mockAdzunaData,
        error: null,
        loading: false
      };

      mockFetchAdzunaJobs.mockResolvedValue(mockResponse);
      mockFetchGitHubJobs.mockResolvedValue({ data: [], error: null, loading: false });

      const result = await fetchJobsWithFallback();

      expect(mockFetchAdzunaJobs).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    it('should use fallback data when Adzuna API fails', async () => {
      const mockErrorResponse: ApiResponse<JobPosting[]> = {
        data: null,
        error: 'API credentials not configured',
        loading: false
      };

      mockFetchAdzunaJobs.mockResolvedValue(mockErrorResponse);
      mockFetchGitHubJobs.mockResolvedValue(mockErrorResponse); // GitHub also fails

      const result = await fetchJobsWithFallback();

      expect(mockFetchAdzunaJobs).toHaveBeenCalledTimes(1);
      expect(mockFetchGitHubJobs).toHaveBeenCalledTimes(1);
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data!.length).toBeGreaterThan(0);
      expect(result.error).toBe('All APIs failed, using mock data'); // Updated expectation
    });

    it('should use fallback data when Adzuna API returns empty data', async () => {
      const mockEmptyResponse: ApiResponse<JobPosting[]> = {
        data: [],
        error: null,
        loading: false
      };

      mockFetchAdzunaJobs.mockResolvedValue(mockEmptyResponse);
      mockFetchGitHubJobs.mockResolvedValue(mockEmptyResponse);

      const result = await fetchJobsWithFallback();

      expect(result.data).toBeInstanceOf(Array);
      expect(result.data!.length).toBeGreaterThan(0);
      expect(result.error).toBe('All APIs failed, using mock data'); // Updated expectation
    });

    it('should return generic error message in fallback mode', async () => {
      const mockErrorResponse: ApiResponse<JobPosting[]> = {
        data: null,
        error: 'Network failure',
        loading: false
      };

      mockFetchAdzunaJobs.mockResolvedValue(mockErrorResponse);
      mockFetchGitHubJobs.mockResolvedValue(mockErrorResponse);

      const result = await fetchJobsWithFallback();

      // The actual implementation returns a generic error, not the original
      expect(result.error).toBe('All APIs failed, using mock data');
      expect(result.data).toBeDefined(); // But we still have fallback data
    });
  });
});
// __tests__/services/api/fallbacks/jobsFallback.test.ts
import { fetchJobsWithFallback } from '@/services/api/fallbacks/jobsFallback';

// Mock the adapter functions
jest.mock('@/services/api/adapters/adzuna');
jest.mock('@/services/api/adapters/github');

import { fetchAdzunaJobs } from '@/services/api/adapters/adzuna';
import { fetchGitHubJobs } from '@/services/api/adapters/github';

// Type the mocks for TypeScript
const mockFetchAdzunaJobs = fetchAdzunaJobs as jest.MockedFunction<typeof fetchAdzunaJobs>;
const mockFetchGitHubJobs = fetchGitHubJobs as jest.MockedFunction<typeof fetchGitHubJobs>;

// Mock console.log to track which fallback is used
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('Jobs Fallback System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  describe('fetchJobsWithFallback', () => {
    test('returns Adzuna data when Adzuna API succeeds', async () => {
      // Arrange: Mock Adzuna returning successful data
      const mockAdzunaData = [
        {
          id: 'adzuna-1',
          title: 'Senior React Developer',
          company: 'Amazon',
          location: 'Seattle, WA',
          type: 'Full Time',
          description: 'React development at Amazon',
          how_to_apply: 'Amazon careers',
          created_at: '2024-01-15T00:00:00Z'
        }
      ];

      mockFetchAdzunaJobs.mockResolvedValueOnce({
        data: mockAdzunaData,
        error: null,
        loading: false
      });

      // Act
      const result = await fetchJobsWithFallback();

      // Assert
      expect(mockFetchAdzunaJobs).toHaveBeenCalledTimes(1);
      expect(mockFetchGitHubJobs).not.toHaveBeenCalled(); // Should stop at Adzuna
      expect(mockConsoleLog).toHaveBeenCalledWith('Using Adzuna API data');
      expect(result.data).toEqual(mockAdzunaData);
      expect(result.error).toBeNull();
    });

    test('falls back to GitHub when Adzuna fails but GitHub succeeds', async () => {
      // Arrange: Mock Adzuna failing and GitHub succeeding
      mockFetchAdzunaJobs.mockResolvedValueOnce({
        data: [],
        error: 'Adzuna API unavailable',
        loading: false
      });

      const mockGitHubData = [
        {
          id: 'github-1',
          title: 'Frontend Engineer',
          company: 'Microsoft',
          location: 'Redmond, WA',
          type: 'Full Time',
          description: 'Frontend work at Microsoft',
          how_to_apply: 'Microsoft careers',
          created_at: '2024-01-16T00:00:00Z'
        }
      ];

      mockFetchGitHubJobs.mockResolvedValueOnce({
        data: mockGitHubData,
        error: null,
        loading: false
      });

      // Act
      const result = await fetchJobsWithFallback();

      // Assert
      expect(mockFetchAdzunaJobs).toHaveBeenCalledTimes(1);
      expect(mockFetchGitHubJobs).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith('Using GitHub Jobs API data (Adzuna failed)');
      expect(result.data).toEqual(mockGitHubData);
      expect(result.error).toBeNull();
    });

    test('falls back to mock data when both APIs fail', async () => {
      // Arrange: Mock both APIs failing
      mockFetchAdzunaJobs.mockResolvedValueOnce({
        data: [],
        error: 'Adzuna API unavailable',
        loading: false
      });

      mockFetchGitHubJobs.mockResolvedValueOnce({
        data: [],
        error: 'GitHub API unavailable',
        loading: false
      });

      // Act
      const result = await fetchJobsWithFallback();

      // Assert
      expect(mockFetchAdzunaJobs).toHaveBeenCalledTimes(1);
      expect(mockFetchGitHubJobs).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith('Using enhanced mock data (all APIs failed)');
      expect(result.data).toHaveLength(3); // Should have 3 mock jobs
      expect(result.data?.[0].company).toBe('Amazon');
      expect(result.data?.[1].company).toBe('Microsoft');
      expect(result.data?.[2].company).toBe('Starbucks');
      expect(result.error).toBe('All APIs failed, using mock data');
    });

    test('uses Adzuna data even if GitHub would also succeed (priority order)', async () => {
      // Arrange: Both APIs return data, but Adzuna should be preferred
      const mockAdzunaData = [
        {
          id: 'adzuna-1',
          title: 'Adzuna Job',
          company: 'Adzuna Company',
          location: 'Seattle, WA',
          type: 'Full Time',
          description: 'From Adzuna',
          how_to_apply: 'Adzuna apply',
          created_at: '2024-01-15T00:00:00Z'
        }
      ];

      const mockGitHubData = [
        {
          id: 'github-1',
          title: 'GitHub Job',
          company: 'GitHub Company',
          location: 'Seattle, WA',
          type: 'Full Time',
          description: 'From GitHub',
          how_to_apply: 'GitHub apply',
          created_at: '2024-01-15T00:00:00Z'
        }
      ];

      mockFetchAdzunaJobs.mockResolvedValueOnce({
        data: mockAdzunaData,
        error: null,
        loading: false
      });

      mockFetchGitHubJobs.mockResolvedValueOnce({
        data: mockGitHubData,
        error: null,
        loading: false
      });

      // Act
      const result = await fetchJobsWithFallback();

      // Assert: Should use Adzuna data, not GitHub
      expect(result.data).toEqual(mockAdzunaData);
      expect(mockFetchGitHubJobs).not.toHaveBeenCalled(); // Should not even call GitHub
      expect(mockConsoleLog).toHaveBeenCalledWith('Using Adzuna API data');
    });
  });
});
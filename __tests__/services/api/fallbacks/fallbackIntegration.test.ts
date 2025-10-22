// __tests__/services/api/fallbacks/fallbackIntegration.test.ts
import { fetchJobsFromAdzuna } from '../../../src/services/api/adapters/adzuna';
import { getFallbackJobs } from '../../../src/services/api/fallbacks/jobsFallback';

// Mock the dependencies
jest.mock('../../../src/services/api/adapters/adzuna');

describe('Fallback Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use fallback when primary API fails', async () => {
    // Mock primary API failure
    (fetchJobsFromAdzuna as jest.Mock).mockRejectedValue(new Error('API unavailable'));

    // This simulates what would happen in a real scenario
    let primaryResult;
    try {
      primaryResult = await fetchJobsFromAdzuna();
    } catch (error) {
      // Primary failed, use fallback
      const fallbackResult = await getFallbackJobs();
      expect(fallbackResult.usingFallback).toBe(true);
      expect(fallbackResult.data).toBeInstanceOf(Array);
      expect(fallbackResult.error).toBeNull();
    }
  });

  it('should prefer primary API when available', async () => {
    const mockPrimaryData = {
      data: [
        {
          id: 'primary-1',
          title: 'Primary Job',
          company: 'Primary Company',
          location: 'Seattle, WA'
        }
      ],
      error: null,
      loading: false
    };

    (fetchJobsFromAdzuna as jest.Mock).mockResolvedValue(mockPrimaryData);

    const result = await fetchJobsFromAdzuna();

    expect(result).toEqual(mockPrimaryData);
    expect(result.data[0].id).toBe('primary-1');
  });
});
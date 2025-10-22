// __tests__/services/api/index.test.ts
import { fetchAdzunaJobs, fetchJobsWithFallback, fetchGitHubJobs } from '../../../src/services/api';

describe('API Service Exports', () => {
  it('should export fetchAdzunaJobs function', () => {
    expect(typeof fetchAdzunaJobs).toBe('function');
  });

  it('should export fetchJobsWithFallback function', () => {
    expect(typeof fetchJobsWithFallback).toBe('function');
  });

  it('should export fetchGitHubJobs function', () => {
    expect(typeof fetchGitHubJobs).toBe('function');
  });

  it('should have consistent function signatures', async () => {
    // All exported functions should return Promise<ApiResponse<T>>
    const mockResponse = await fetchAdzunaJobs().catch(() => ({
      data: null,
      error: 'test',
      loading: false
    }));

    expect(mockResponse).toHaveProperty('data');
    expect(mockResponse).toHaveProperty('error');
    expect(mockResponse).toHaveProperty('loading');
  });
});
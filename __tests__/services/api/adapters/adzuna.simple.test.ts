// __tests__/services/api/adapters/adzuna.simple.test.ts
import { fetchAdzunaJobs } from '../../../../src/services/api/adapters/adzuna';

// Mock fetch globally
global.fetch = jest.fn();

// Simple mock for environment variables
jest.mock('../../../../src/services/api/adapters/adzuna', () => {
  const originalModule = jest.requireActual('../../../../src/services/api/adapters/adzuna');
  return {
    ...originalModule,
  };
});

describe('Adzuna API Adapter - Simple Tests', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    // Set environment variables for all tests in this describe block
    process.env.NEXT_PUBLIC_ADZUNA_APP_ID = 'test-app-id';
    process.env.NEXT_PUBLIC_ADZUNA_APP_KEY = 'test-app-key';
  });

  it('should make API call with correct parameters', async () => {
    const mockResponse = {
      results: [
        {
          id: '1',
          title: 'Test Job',
          company: { display_name: 'Test Company' },
          location: { display_name: 'Test Location' },
          description: 'Test Description',
          created: '2024-01-01T00:00:00Z'
        }
      ]
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });

    await fetchAdzunaJobs();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.adzuna.com/v1/api/jobs/us/search/1')
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('app_id=test-app-id')
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('app_key=test-app-key')
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('what=javascript%20react%20typescript')
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('where=seattle')
    );
  });

  it('should transform API response correctly', async () => {
    const mockAdzunaData = {
      results: [
        {
          id: '123',
          title: 'React Developer',
          company: { display_name: 'Microsoft', logo: 'logo.png' },
          location: { display_name: 'Seattle, WA' },
          contract_type: 'permanent',
          description: 'React development',
          redirect_url: 'https://example.com/apply',
          created: '2024-01-15T00:00:00Z'
        }
      ]
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockAdzunaData
    });

    const result = await fetchAdzunaJobs();

    expect(result.data).toEqual([
      {
        id: '123',
        title: 'React Developer',
        company: 'Microsoft',
        location: 'Seattle, WA',
        type: 'permanent',
        description: 'React development',
        how_to_apply: 'https://example.com/apply',
        company_logo: 'logo.png',
        created_at: '2024-01-15T00:00:00Z'
      }
    ]);
    expect(result.error).toBeNull();
    expect(result.loading).toBe(false);
  });

  it('should handle fetch errors', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await fetchAdzunaJobs();

    expect(result.data).toBeNull();
    expect(result.error).toContain('Failed to fetch Adzuna jobs: Network error');
    expect(result.loading).toBe(false);
  });
});
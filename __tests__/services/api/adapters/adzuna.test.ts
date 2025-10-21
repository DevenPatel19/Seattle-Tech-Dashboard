// __tests__/services/api/adapters/adzuna.test.ts
// Mock fetch globally
global.fetch = jest.fn();

describe('Adzuna API Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // This is key - resets module cache
    jest.clearAllMocks();
    process.env = { ...originalEnv }; // Reset env vars
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('fetchAdzunaJobs', () => {
    test('returns error when API credentials are missing', async () => {
      // Arrange: Clear environment variables BEFORE importing
      delete process.env.NEXT_PUBLIC_ADZUNA_APP_ID;
      delete process.env.NEXT_PUBLIC_ADZUNA_APP_KEY;

      // Dynamically import after setting env vars
      const { fetchAdzunaJobs } = await import('@/services/api/adapters/adzuna');

      // Act
      const result = await fetchAdzunaJobs();

      // Assert
      expect(result.data).toBeNull();
      expect(result.error).toBe('Adzuna API credentials not configured');
      expect(result.loading).toBe(false);
    });

    test('returns transformed jobs on successful API response', async () => {
      // Arrange: Set environment variables BEFORE importing
      process.env.NEXT_PUBLIC_ADZUNA_APP_ID = 'test-app-id';
      process.env.NEXT_PUBLIC_ADZUNA_APP_KEY = 'test-app-key';

      const mockApiResponse = {
        results: [
          {
            id: '123',
            title: 'Senior React Developer',
            company: { display_name: 'Microsoft', logo: 'logo.png' },
            location: { display_name: 'Seattle, WA' },
            contract_type: 'Permanent',
            description: 'React and TypeScript development',
            redirect_url: 'https://example.com/apply',
            created: '2024-01-15T00:00:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      // Dynamically import after setting env vars
      const { fetchAdzunaJobs } = await import('@/services/api/adapters/adzuna');

      // Act
      const result = await fetchAdzunaJobs();

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('api.adzuna.com/v1/api/jobs/us/search/1')
      );
      expect(result.data).toEqual([
        {
          id: '123',
          title: 'Senior React Developer',
          company: 'Microsoft',
          location: 'Seattle, WA',
          type: 'Permanent',
          description: 'React and TypeScript development',
          how_to_apply: 'https://example.com/apply',
          company_logo: 'logo.png',
          created_at: '2024-01-15T00:00:00Z'
        }
      ]);
      expect(result.error).toBeNull();
      expect(result.loading).toBe(false);
    });

    test('handles API error responses', async () => {
      // Arrange
      process.env.NEXT_PUBLIC_ADZUNA_APP_ID = 'test-app-id';
      process.env.NEXT_PUBLIC_ADZUNA_APP_KEY = 'test-app-key';

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 429,
      });

      // Dynamically import after setting env vars
      const { fetchAdzunaJobs } = await import('@/services/api/adapters/adzuna');

      // Act
      const result = await fetchAdzunaJobs();

      // Assert
      expect(result.data).toBeNull();
      expect(result.error).toContain('Adzuna API error: 429');
      expect(result.loading).toBe(false);
    });

    test('handles network errors', async () => {
      // Arrange
      process.env.NEXT_PUBLIC_ADZUNA_APP_ID = 'test-app-id';
      process.env.NEXT_PUBLIC_ADZUNA_APP_KEY = 'test-app-key';

      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network failure'));

      // Dynamically import after setting env vars
      const { fetchAdzunaJobs } = await import('@/services/api/adapters/adzuna');

      // Act
      const result = await fetchAdzunaJobs();

      // Assert
      expect(result.data).toBeNull();
      expect(result.error).toContain('Failed to fetch Adzuna jobs: Network failure');
      expect(result.loading).toBe(false);
    });
  });
});
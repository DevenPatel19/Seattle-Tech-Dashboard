// __tests__/services/api/adapters/adzuna.service.test.ts
// We need to use dynamic imports to handle environment variables properly

// Mock fetch globally
global.fetch = jest.fn();

describe('Adzuna API Adapter', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // This is crucial for environment variable tests
    (fetch as jest.Mock).mockClear();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('fetchAdzunaJobs', () => {
    it('should return error when API credentials are not configured', async () => {
      // Clear environment variables
      delete process.env.NEXT_PUBLIC_ADZUNA_APP_ID;
      delete process.env.NEXT_PUBLIC_ADZUNA_APP_KEY;

      // Import after clearing environment variables
      const { fetchAdzunaJobs } = await import('../../../../src/services/api/adapters/adzuna');
      
      const result = await fetchAdzunaJobs();

      expect(result).toEqual({
        data: null,
        error: 'Adzuna API credentials not configured',
        loading: false,
      });
    });

    it('should successfully fetch and transform jobs data', async () => {
      // Set environment variables BEFORE importing
      process.env.NEXT_PUBLIC_ADZUNA_APP_ID = 'test-app-id';
      process.env.NEXT_PUBLIC_ADZUNA_APP_KEY = 'test-app-key';

      const { fetchAdzunaJobs } = await import('../../../../src/services/api/adapters/adzuna');

      const mockAdzunaResponse = {
        results: [
          {
            id: '123',
            title: 'Senior React Developer',
            company: { display_name: 'Microsoft', logo: 'logo.png' },
            location: { display_name: 'Seattle, WA' },
            contract_type: 'permanent',
            description: 'React and TypeScript development',
            redirect_url: 'https://example.com/apply',
            created: '2024-01-15T00:00:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockAdzunaResponse
      });

      const result = await fetchAdzunaJobs();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('api.adzuna.com/v1/api/jobs/us/search/1')
      );
      expect(result.data).toHaveLength(1);
      expect(result.data![0]).toEqual({
        id: '123',
        title: 'Senior React Developer',
        company: 'Microsoft',
        location: 'Seattle, WA',
        type: 'permanent',
        description: 'React and TypeScript development',
        how_to_apply: 'https://example.com/apply',
        company_logo: 'logo.png',
        created_at: '2024-01-15T00:00:00Z'
      });
      expect(result.error).toBeNull();
      expect(result.loading).toBe(false);
    });

    it('should handle API errors gracefully', async () => {
      process.env.NEXT_PUBLIC_ADZUNA_APP_ID = 'test-app-id';
      process.env.NEXT_PUBLIC_ADZUNA_APP_KEY = 'test-app-key';

      const { fetchAdzunaJobs } = await import('../../../../src/services/api/adapters/adzuna');

      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await fetchAdzunaJobs();

      expect(result.data).toBeNull();
      expect(result.error).toContain('Failed to fetch Adzuna jobs: Network error');
      expect(result.loading).toBe(false);
    });

    it('should handle non-OK HTTP responses', async () => {
      process.env.NEXT_PUBLIC_ADZUNA_APP_ID = 'test-app-id';
      process.env.NEXT_PUBLIC_ADZUNA_APP_KEY = 'test-app-key';

      const { fetchAdzunaJobs } = await import('../../../../src/services/api/adapters/adzuna');

      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests'
      });

      const result = await fetchAdzunaJobs();

      expect(result.data).toBeNull();
      expect(result.error).toContain('Adzuna API error: 429');
      expect(result.loading).toBe(false);
    });

    it('should handle missing optional fields in API response', async () => {
      process.env.NEXT_PUBLIC_ADZUNA_APP_ID = 'test-app-id';
      process.env.NEXT_PUBLIC_ADZUNA_APP_KEY = 'test-app-key';

      const { fetchAdzunaJobs } = await import('../../../../src/services/api/adapters/adzuna');

      const mockAdzunaResponse = {
        results: [
          {
            id: '123',
            title: 'Developer',
            company: { display_name: 'Test Corp' },
            location: { display_name: 'Seattle' },
            description: 'Test description',
            created: '2024-01-15T00:00:00Z'
            // Missing contract_type, redirect_url, company.logo
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockAdzunaResponse
      });

      const result = await fetchAdzunaJobs();

      expect(result.data![0]).toEqual({
        id: '123',
        title: 'Developer',
        company: 'Test Corp',
        location: 'Seattle',
        type: 'Full Time', // Default value
        description: 'Test description',
        how_to_apply: 'Apply on company website', // Default value
        company_logo: undefined,
        created_at: '2024-01-15T00:00:00Z'
      });
    });
  });
});
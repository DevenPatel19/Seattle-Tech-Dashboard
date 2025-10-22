// __tests__/services/api/fallbacks/fallbackData.test.ts
import { fetchJobsWithFallback } from '../../../../src/services/api/fallbacks/jobsFallback';

describe('Fallback Data Structure', () => {
  it('should return enhanced mock data with Seattle companies', async () => {
    const result = await fetchJobsWithFallback();
    
    expect(result.data).toBeInstanceOf(Array);
    expect(result.data!.length).toBeGreaterThan(0);
    
    // Verify the mock data structure matches JobPosting interface
    result.data!.forEach(job => {
      expect(job).toHaveProperty('id');
      expect(job).toHaveProperty('title');
      expect(job).toHaveProperty('company');
      expect(job).toHaveProperty('location');
      expect(job).toHaveProperty('type');
      expect(job).toHaveProperty('description');
      expect(job).toHaveProperty('how_to_apply');
      expect(job).toHaveProperty('created_at');
    });
    
    // Check that we have Seattle-area companies
    const companies = result.data!.map(job => job.company);
    expect(companies).toContain('Amazon');
    expect(companies).toContain('Microsoft');
    expect(companies).toContain('Starbucks');
  });
});
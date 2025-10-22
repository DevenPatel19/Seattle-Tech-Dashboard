// __tests__/components/test/AdzunaTest.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdzunaTest from '../../../src/components/test/AdzunaTest';
import { fetchAdzunaJobs } from '../../../src/services/api';
import { ApiResponse, JobPosting } from '../../../src/types/api';

// Mock the API call - use the correct path from the API index
jest.mock('../../../src/services/api', () => ({
  fetchAdzunaJobs: jest.fn(),
  fetchJobsWithFallback: jest.fn(),
  fetchGitHubJobs: jest.fn()
}));

// Import jest-dom for custom matchers
import '@testing-library/jest-dom';

describe('AdzunaTest Component Integration', () => {
  const mockFetchAdzunaJobs = fetchAdzunaJobs as jest.MockedFunction<typeof fetchAdzunaJobs>;
  const user = userEvent.setup();

  beforeEach(() => {
    mockFetchAdzunaJobs.mockClear();
  });

  it('should display loading state and then successful results', async () => {
    const mockJobs: JobPosting[] = [
      {
        id: '1',
        title: 'Senior React Developer',
        company: 'Microsoft',
        location: 'Seattle, WA',
        type: 'Full Time',
        description: 'React and TypeScript development',
        how_to_apply: 'Apply online',
        created_at: '2024-01-15T00:00:00Z'
      }
    ];

    const mockResponse: ApiResponse<JobPosting[]> = {
      data: mockJobs,
      error: null,
      loading: false
    };

    // Use Promise to simulate async delay
    mockFetchAdzunaJobs.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockResponse), 100))
    );

    render(<AdzunaTest />);

    // Find and click the test button
    const button = screen.getByRole('button', { name: /test adzuna api/i });
    await user.click(button);

    // Should show loading state - wait for button text to change
    await waitFor(() => {
      expect(button).toHaveTextContent('Testing...');
    });

    // Wait for API call to complete and check the result
    await waitFor(() => {
      expect(screen.getByText('Result:')).toBeInTheDocument();
    });

    // Should display the results in the pre element
    const resultPre = screen.getByText(/Senior React Developer/);
    expect(resultPre).toBeInTheDocument();
    expect(screen.getByText(/Microsoft/)).toBeInTheDocument();
    
    // Button should be enabled again with original text
    await waitFor(() => {
      expect(button).toBeEnabled();
      expect(button).toHaveTextContent('Test Adzuna API');
    });
  });

  it('should display error message when API call fails', async () => {
    const mockErrorResponse: ApiResponse<JobPosting[]> = {
      data: null,
      error: 'API credentials not configured',
      loading: false
    };

    mockFetchAdzunaJobs.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockErrorResponse), 100))
    );

    render(<AdzunaTest />);

    const button = screen.getByRole('button', { name: /test adzuna api/i });
    await user.click(button);

    // Wait for loading state
    await waitFor(() => {
      expect(button).toHaveTextContent('Testing...');
    });

    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText(/API credentials not configured/)).toBeInTheDocument();
    });

    // Button should be re-enabled
    await waitFor(() => {
      expect(button).toBeEnabled();
      expect(button).toHaveTextContent('Test Adzuna API');
    });
  });

  it('should re-enable button after API call completes', async () => {
    const mockResponse: ApiResponse<JobPosting[]> = {
      data: [],
      error: null,
      loading: false
    };

    mockFetchAdzunaJobs.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockResponse), 100))
    );

    render(<AdzunaTest />);

    const button = screen.getByRole('button', { name: /test adzuna api/i });
    
    // Button should be enabled initially
    expect(button).not.toBeDisabled();

    // Click and wait for loading to start
    await user.click(button);
    
    // Should show loading
    await waitFor(() => {
      expect(button).toHaveTextContent('Testing...');
    });

    // Wait for completion
    await waitFor(() => {
      expect(button).toBeEnabled();
      expect(button).toHaveTextContent('Test Adzuna API');
    });
  });
});
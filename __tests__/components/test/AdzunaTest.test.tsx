// __tests__/components/test/AdzunaTest.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdzunaTest from '@/components/test/AdzunaTest';

// Mock the API service
jest.mock('@/services/api', () => ({
  fetchAdzunaJobs: jest.fn(),
}));

import { fetchAdzunaJobs } from '@/services/api';

const mockFetchAdzunaJobs = fetchAdzunaJobs as jest.MockedFunction<typeof fetchAdzunaJobs>;

describe('AdzunaTest Component - User Interactions', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('button click triggers API call and shows loading state', async () => {
    // Arrange: Mock a delayed API response
    mockFetchAdzunaJobs.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        data: [],
        error: null,
        loading: false
      }), 100))
    );

    render(<AdzunaTest />);

    // Act: Click the button
    const button = screen.getByRole('button', { name: /test adzuna api/i });
    await user.click(button);

    // Assert: Loading state appears
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Testing...');
    expect(mockFetchAdzunaJobs).toHaveBeenCalledTimes(1);
  });

  test('displays API results after successful call', async () => {
    // Arrange: Mock successful API response
    const mockJobs = [
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

    mockFetchAdzunaJobs.mockResolvedValue({
      data: mockJobs,
      error: null,
      loading: false
    });

    render(<AdzunaTest />);

    // Act: Click the button and wait for results
    const button = screen.getByRole('button', { name: /test adzuna api/i });
    await user.click(button);

    // Assert: Results are displayed
    await waitFor(() => {
      expect(screen.getByText('Result:')).toBeInTheDocument();
      expect(screen.getByText(/Senior React Developer/)).toBeInTheDocument();
      expect(screen.getByText(/Microsoft/)).toBeInTheDocument();
    });
  });

  test('displays error message when API call fails', async () => {
    // Arrange: Mock API error
    mockFetchAdzunaJobs.mockResolvedValue({
      data: null,
      error: 'API credentials not configured',
      loading: false
    });

    render(<AdzunaTest />);

    // Act: Click the button
    const button = screen.getByRole('button', { name: /test adzuna api/i });
    await user.click(button);

    // Assert: Error is displayed
    await waitFor(() => {
      expect(screen.getByText('Result:')).toBeInTheDocument();
      expect(screen.getByText(/API credentials not configured/)).toBeInTheDocument();
    });
  });

  test('button is re-enabled after API call completes', async () => {
    // Arrange: Mock API response
    mockFetchAdzunaJobs.mockResolvedValue({
      data: [],
      error: null,
      loading: false
    });

    render(<AdzunaTest />);

    // Act: Click the button and wait for completion
    const button = screen.getByRole('button', { name: /test adzuna api/i });
    await user.click(button);

    // Assert: Button is re-enabled after API call
    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent('Test Adzuna API');
    });
  });
});
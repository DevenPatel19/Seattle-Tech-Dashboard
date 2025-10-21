// __tests__/utils/test-utils.ts
export const mockJobsData = [
  { 
    id: '1', 
    title: 'Senior Software Engineer', 
    company: 'Microsoft', 
    location: 'Seattle, WA',
    salary: 150000,
    description: 'React, TypeScript, Node.js',
    url: 'https://example.com/job1',
    created: '2024-01-15'
  },
  { 
    id: '2', 
    title: 'Frontend Developer', 
    company: 'Amazon', 
    location: 'Seattle, WA',
    salary: 130000,
    description: 'Next.js, AWS, Tailwind',
    url: 'https://example.com/job2',
    created: '2024-01-16'
  },
  { 
    id: '3', 
    title: 'Full Stack Engineer', 
    company: 'Google', 
    location: 'Seattle, WA',
    salary: 140000,
    description: 'Angular, Java, Cloud',
    url: 'https://example.com/job3',
    created: '2024-01-17'
  }
];

export const mockApiResponse = {
  data: mockJobsData,
  error: null
};

export const mockApiError = {
  data: [],
  error: 'API Error: Failed to fetch jobs'
};


// Remove the complex IntersectionObserver mock for now
// We'll add it back later if actually needed
// // Mock IntersectionObserver for tests
// export class MockIntersectionObserver {
//   observe = jest.fn();
//   disconnect = jest.fn();
//   unobserve = jest.fn();
// }

// // Setup global mocks
// beforeAll(() => {
//   // Use type assertion instead of any
//   global.IntersectionObserver = MockIntersectionObserver as typeof IntersectionObserver;
// });
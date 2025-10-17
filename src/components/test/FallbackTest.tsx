'use client';

import { useState } from 'react';
import { fetchJobsWithFallback } from '@/services/api';
import { ApiResponse, JobPosting } from '@/types/api';

interface TestResult {
  data: JobPosting[] | null;
  error: string | null;
  loading: boolean;
  source?: string;
}

export default function FallbackTest() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const testFallback = async () => {
    setLoading(true);
    try {
      const response: ApiResponse<JobPosting[]> = await fetchJobsWithFallback();
      
      // Determine data source for display
      let source = 'Unknown';
      if (response.data && response.data.length > 0) {
        // Check if data looks like mock data or real API data
        const firstJob = response.data[0];
        source = firstJob.company === 'Amazon' || firstJob.company === 'Microsoft' ? 
                 'Mock Data' : 'Live API';
      }
      
      setResult({
        ...response,
        source
      });
      console.log('Fallback System Response:', response);
    } catch (error) {
      // Properly handle unknown error type
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setResult({ 
        data: null, 
        error: errorMessage, 
        loading: false,
        source: 'Error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h3 className="font-bold mb-2">Fallback System Test</h3>
      <button 
        onClick={testFallback}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test Fallback System'}
      </button>
      
      {result && (
        <div className="mt-4 p-3 bg-black rounded border">
          <h4 className="font-semibold">Fallback Result:</h4>
          <p>Data Source: {result.source || (result.data ? 'Live API' : 'Mock Data')}</p>
          <p>Jobs Found: {result.data?.length || 0}</p>
          <p>Error: {result.error || 'None'}</p>
          {result.data && result.data.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Sample Jobs:</p>
              <ul className="text-xs list-disc list-inside">
                {result.data.slice(0, 3).map((job, index) => (
                  <li key={index}>{job.title} at {job.company}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
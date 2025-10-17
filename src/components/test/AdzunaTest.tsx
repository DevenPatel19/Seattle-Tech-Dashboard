'use client';

import { useState } from 'react';
import { fetchAdzunaJobs } from '@/services/api';
import { ApiResponse, JobPosting } from '@/types/api';

interface TestResult {
  data: JobPosting[] | null;
  error: string | null;
  loading: boolean;
}

export default function AdzunaTest() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const testAdzuna = async () => {
    setLoading(true);
    try {
      const response: ApiResponse<JobPosting[]> = await fetchAdzunaJobs();
      setResult(response);
      console.log('Adzuna API Response:', response);
    } catch (error) {
      // Properly handle unknown error type
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setResult({ 
        data: null, 
        error: errorMessage, 
        loading: false 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-blue-50">
      <h3 className="font-bold mb-2">Adzuna API Test</h3>
      <button 
        onClick={testAdzuna}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test Adzuna API'}
      </button>
      
      {result && (
        <div className="mt-4 p-3 bg-black rounded border">
          <h4 className="font-semibold">Result:</h4>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
// src\components\test\ApiTest.tsx

import { useState, useEffect } from 'react';
import { fetchJobsWithFallback } from '@/services/api';
import { JobPosting } from '@/types/api'

export default function ApiTest() {
  const [jobs, setJobs] = useState<JobPosting[]>([]); // Specific type instead of any[]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testApi() {
      const result = await fetchJobsWithFallback();
      console.log('API Test Result:', result);
      setJobs(result.data || []);
      setLoading(false);
    }
    testApi();
  }, []);

  if (loading) return <div>Testing APIs...</div>;

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold">API Test Results:</h3>
      <p>Found {jobs.length} jobs</p>
      <pre className="text-xs mt-2">
        {JSON.stringify(jobs.slice(0, 2), null, 2)}
      </pre>
    </div>
  );
}
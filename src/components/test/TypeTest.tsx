// src\components\test\TypeTest.tsx

import { JobPosting } from '@/types/api';

export default function TypeTest() {
  // This should work if types are exported correctly
  const testJob: JobPosting = {
    id: 'test-1',
    title: 'Test Developer',
    company: 'Test Co',
    location: 'Seattle, WA',
    type: 'Full Time',
    description: 'Test description',
    how_to_apply: 'test@example.com',
    created_at: new Date().toISOString(),
  };

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h3 className="font-bold">Type Test - Working!</h3>
      <p>Job: {testJob.title} at {testJob.company}</p>
    </div>
  );
}
// src\components\test\EnvTest.tsx

'use client';

export default function EnvTest() {
  const appId = process.env.NEXT_PUBLIC_ADZUNA_APP_ID;
  const appKey = process.env.NEXT_PUBLIC_ADZUNA_APP_KEY;

  return (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-bold mb-2">Environment Variables Check</h3>
      <div className="space-y-2">
        <p>Adzuna App ID: {appId ? '✅ Set' : '❌ Missing'}</p>
        <p>Adzuna App Key: {appKey ? '✅ Set' : '❌ Missing'}</p>
        <p className="text-sm text-gray-600">
          Note: Keys are hidden for security, but we can verify they exist
        </p>
        {(!appId || !appKey) && (
          <div className="p-2 bg-red-100 border border-red-300 rounded">
            <p className="text-red-700 text-sm">
              ⚠️ Missing API credentials. The app will use mock data.
              Check your .env.local file.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
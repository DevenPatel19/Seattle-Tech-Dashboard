import StatsGrid from '../components/dashboard/StatsGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-green-950 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg"></div>
            <div>
              <h1 className="text-2xl font-bold text-green-100">
                Seattle Tech Dashboard
              </h1>
              <p className="text-green-300">
                Real-time insights from the Emerald City&apos;s tech scene
              </p>
            </div>
          </div>
        </div>
      </header>
      
     <StatsGrid />
    </main>
  );
}
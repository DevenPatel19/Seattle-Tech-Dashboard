// Simpler version with local flair
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
      
      {/* Simple Stats Preview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 text-sm font-medium">Tech Jobs</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">12,458</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 text-sm font-medium">Avg Salary</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">$127k</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 text-sm font-medium">Companies</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">2,341</p>
          </div>
        </div>
      </div>
    </main>
  );
}
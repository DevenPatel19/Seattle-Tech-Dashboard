export default function StatsGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <h3 className="text-gray-500 text-sm font-medium">Tech Jobs</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">12,458</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <h3 className="text-gray-500 text-sm font-medium">Avg Salary</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">$127k</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      <h3 className="text-gray-500 text-sm font-medium">Companies</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">2,341</p>
    </div>
  </div>
</div>
  );
}
import Header from '@/components/ui/Header';
import StatsGrid from '@/components/dashboard/StatsGrid';
import TechJobsChart from '@/components/dashboard/TechJobsChart';
import AdzunaTest from '@/components/test/AdzunaTest';
import FallbackTest from '@/components/test/FallbackTest';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <StatsGrid />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <TechJobsChart />
        </div>
        
        {/* Temporary Test Section - Remove after testing */}
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <AdzunaTest />
          <FallbackTest />
        </div>
      </main>
    </>
  );
}
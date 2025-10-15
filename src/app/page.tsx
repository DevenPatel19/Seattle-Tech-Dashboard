import Header from '@/components/ui/Header';
import StatsGrid from '@/components/dashboard/StatsGrid';

export default function Home() {
  return (
    <>
      <Header />
    <main className="min-h-screen bg-gray-50">
      <StatsGrid />
    </main>
    </>
  );
}
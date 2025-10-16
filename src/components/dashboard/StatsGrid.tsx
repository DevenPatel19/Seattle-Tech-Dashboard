// Define types inline for now
interface StatItem {
  label: string;
  value: string | number;
  description?: string;
}

interface StatsGridProps {
  stats?: StatItem[];
}

// Default stats data with proper typing
const defaultStats: StatItem[] = [
  { label: 'Tech Jobs', value: '12,458', description: 'Active positions' },
  { label: 'Avg Salary', value: '$127k', description: 'Senior developer' },
  { label: 'Companies', value: '2,341', description: 'Tech companies in Seattle' },
];

export default function StatsGrid({ stats = defaultStats }: StatsGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat: StatItem, index: number) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            {stat.description && (
              <p className="text-gray-400 text-xs mt-1">{stat.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
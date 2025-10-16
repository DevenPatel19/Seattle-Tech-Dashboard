// Even simple components can have typed props for future expansion
interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ 
  title = "Seattle Tech Dashboard", 
  subtitle = "Real-time insights from the Emerald City's tech scene" 
}: HeaderProps) {
  return (
    <header className="bg-green-950 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg"></div>
          <div>
            <h1 className="text-2xl font-bold text-green-100">
              {title}
            </h1>
            <p className="text-green-300">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
'use client'
import { useState, useEffect } from 'react';
import { User, BarChart3, Settings, Bell, Search, Menu, X } from 'lucide-react';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [stats, setStats] = useState({
    users: 0,
    revenue: 0,
    projects: 0,
    growth: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        users: 12543,
        revenue: 89750,
        projects: 156,
        growth: 23.5
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      id: 1,
      title: "Total Users",
      value: stats.users.toLocaleString(),
      icon: <User className="w-8 h-8 text-white" />,
      gradient: "from-blue-400 to-blue-600",
      description: "Active users this month"
    },
    {
      id: 2,
      title: "Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      gradient: "from-indigo-400 to-purple-600",
      description: "Total revenue generated"
    },
    {
      id: 3,
      title: "Projects",
      value: stats.projects.toString(),
      icon: <Settings className="w-8 h-8 text-white" />,
      gradient: "from-cyan-400 to-blue-600",
      description: "Active projects"
    },
    {
      id: 4,
      title: "Growth Rate",
      value: `${stats.growth}%`,
      icon: <Bell className="w-8 h-8 text-white" />,
      gradient: "from-blue-500 to-indigo-600",
      description: "Monthly growth percentage"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="#" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Analytics
                </a>
                <a href="#" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Reports
                </a>
                <a href="#" className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Settings
                </a>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#" className="text-white/80 block px-3 py-2 rounded-md text-base font-medium">Analytics</a>
              <a href="#" className="text-white/80 block px-3 py-2 rounded-md text-base font-medium">Reports</a>
              <a href="#" className="text-white/80 block px-3 py-2 rounded-md text-base font-medium">Settings</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Welcome to Your Dashboard
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Monitor your business metrics and track performance with our beautiful, responsive interface
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/60" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-2xl leading-5 bg-white/10 backdrop-blur-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 ${
                  activeCard === card.id ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg`}>
                    {card.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{card.value}</div>
                    <div className="text-sm text-white/60">{card.title}</div>
                  </div>
                </div>
                <p className="text-white/70 text-sm">{card.description}</p>
                
                {activeCard === card.id && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium">
                      View Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: "New user registration", time: "2 minutes ago", color: "bg-green-500" },
                  { action: "Payment received", time: "15 minutes ago", color: "bg-blue-500" },
                  { action: "Project completed", time: "1 hour ago", color: "bg-purple-500" },
                  { action: "System update", time: "2 hours ago", color: "bg-orange-500" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${activity.color}`}></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-white/60 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Add User", icon: <User className="w-6 h-6" />, color: "from-blue-500 to-cyan-500" },
                  { title: "Generate Report", icon: <BarChart3 className="w-6 h-6" />, color: "from-purple-500 to-pink-500" },
                  { title: "Settings", icon: <Settings className="w-6 h-6" />, color: "from-green-500 to-teal-500" },
                  { title: "Notifications", icon: <Bell className="w-6 h-6" />, color: "from-orange-500 to-red-500" }
                ].map((action, index) => (
                  <button
                    key={index}
                    className={`bg-gradient-to-r ${action.color} p-4 rounded-2xl text-white hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="group-hover:scale-110 transition-transform duration-200">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium">{action.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
import React from 'react';
import { Search, Users, Map, Brain, Target, TrendingUp, Database } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'explore', label: 'Explore Edges', icon: Search },
    { id: 'map', label: 'Idea Space Map', icon: Map },
    { id: 'framework', label: 'Framework', icon: Brain },
    { id: 'problems', label: 'Problem Finding', icon: Target },
    { id: 'community', label: 'Solver Network', icon: Users },
    { id: 'methodology', label: 'LUMA Methods', icon: Brain },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'knowledge', label: 'Knowledge & Fitness', icon: Database },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-lg sm:text-xl font-bold text-white">EdgeFinder</h1>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="ml-4 sm:ml-6 lg:ml-10 flex items-baseline space-x-1 sm:space-x-2 lg:space-x-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center space-x-1 sm:space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-700 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon size={14} />
                    <span className="hidden lg:inline">{tab.label}</span>
                    <span className="lg:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button className="text-slate-300 hover:text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
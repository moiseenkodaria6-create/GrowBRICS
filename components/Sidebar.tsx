import React from 'react';
import { Home, Briefcase, FileText, User, Heart, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Main' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'jobs', icon: Briefcase, label: 'Vacancies' }, // Translated loosely from Russian context
    { id: 'applications', icon: FileText, label: 'Applications' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
  ];

  return (
    <aside className="w-20 lg:w-24 bg-white flex flex-col items-center py-6 shadow-sm z-10 sticky top-0 h-screen">
      <div className="mb-8">
         {/* Logo Placeholder */}
        <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          G
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-6 w-full px-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group ${
                isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4 w-full px-2">
         <button className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-gray-600">
            <Settings size={24} />
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
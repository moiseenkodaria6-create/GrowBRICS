import React from 'react';
import { Bell, Globe, ChevronDown } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md h-16 flex items-center justify-between px-8 sticky top-0 z-20 border-b border-gray-100">
      <div className="flex items-center gap-4">
        {/* Left side spacer or breadcrumbs could go here */}
        <div className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900">
            <Globe size={20} />
            <span className="text-sm font-medium">English</span>
            <ChevronDown size={14} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={22} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
           <div className="text-right hidden md:block">
              <p className="text-xs text-gray-400">Profile last updated on:</p>
              <p className="text-xs font-semibold text-gray-800">Oct 19, 2025</p>
           </div>
           <img 
            src={user.imageUrl} 
            alt={user.name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 shadow-sm"
           />
        </div>
      </div>
    </header>
  );
};

export default Header;
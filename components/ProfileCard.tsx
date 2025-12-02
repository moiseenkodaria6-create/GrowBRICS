import React from 'react';
import { ChevronDown } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileCardProps {
  user: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  // SVG Circle calculations
  const size = 128;
  const strokeWidth = 10;
  // Calculate radius to fit perfectly within the viewBox size, accounting for stroke
  const radius = (size - strokeWidth) / 2 - 2; // -2 for slight padding
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (user.completion / 100) * circumference;
  const center = size / 2;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
        
      {/* Alert Banner */}
      <div className="bg-green-50 rounded-xl p-3 mb-6 flex items-center justify-between flex-wrap gap-4 border border-green-100">
         <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                <span>Your profile can't be found by recruiters because it's missing key information</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-1.5 mt-2">
                <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
         </div>
         <button className="text-xs font-medium text-gray-600 flex items-center gap-1 hover:text-green-700">
            4 steps to complete <span className="text-lg">›</span>
         </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left: User Info */}
        <div className="flex-1 flex gap-5">
            <div className="relative">
                <img 
                    src={user.imageUrl} 
                    alt={user.name} 
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">{user.role}</p>
                <p className="text-xs text-gray-500 mt-1">{user.location}</p>

                <div className="mt-4">
                    <p className="text-xs font-medium text-gray-900 mb-2">Where are you in your job search?</p>
                    <p className="text-[10px] text-gray-400 mb-2">Keep your job status up-to-date to inform employers.</p>
                    
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-semibold text-gray-700">{user.status}</span>
                        <ChevronDown size={14} className="text-gray-400 ml-2" />
                    </button>
                </div>
            </div>
        </div>

        {/* Right: Circular Progress & Status */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            
            <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#E2E8F0"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke="#3B82F6"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center text-center">
                    <span className="text-2xl font-bold text-gray-900">{user.completion}%</span>
                    <span className="text-[10px] text-gray-500 font-medium leading-none mt-1">Profile<br/>Completion</span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                 <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-blue-600 transition-colors whitespace-nowrap">
                    View your public profile <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-[10px]">Edit</span>
                 </button>
                 
                 <div>
                    <label className="text-xs font-semibold text-gray-900 block mb-1">Status</label>
                    <button className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="truncate">Ready to interview</span>
                        </div>
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;
import React from 'react';
import { MapPin, Building2, Sparkles } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onAnalyze: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onAnalyze }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full">
      <div className="h-40 overflow-hidden relative">
        <img 
            src={job.imageUrl} 
            alt={job.company} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-gray-800 uppercase tracking-wide">
            {job.type}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
        <p className="text-sm font-semibold text-gray-600 mb-3">{job.company}</p>
        
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">
            {job.description}
        </p>

        <div className="flex flex-col gap-3 mt-auto">
            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1">
                    <Building2 size={14} />
                    <span>{job.location}</span>
                </div>
                 <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>Remote</span>
                </div>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                    Apply
                </button>
                <button 
                    onClick={() => onAnalyze(job)}
                    className="px-3 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100 flex items-center justify-center"
                    title="Ask AI about this job"
                >
                    <Sparkles size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
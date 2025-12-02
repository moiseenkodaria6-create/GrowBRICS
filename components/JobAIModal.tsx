import React, { useEffect, useState } from 'react';
import { X, Sparkles, Loader2, Target, BookOpen, CheckCircle } from 'lucide-react';
import { Job, UserProfile } from '../types';
import { analyzeJob } from '../services/geminiService';
import Markdown from 'react-markdown';

interface JobAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  user: UserProfile;
}

const JobAIModal: React.FC<JobAIModalProps> = ({ isOpen, onClose, job, user }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && job) {
      setLoading(true);
      analyzeJob(job.title, job.description, user.role)
        .then((result) => setAnalysis(result))
        .catch(() => setAnalysis("Failed to analyze."))
        .finally(() => setLoading(false));
    } else {
        setAnalysis('');
    }
  }, [isOpen, job, user.role]);

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-start justify-between">
            <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={20} className="text-yellow-300" />
                    <h3 className="text-lg font-bold">AI Interview Coach</h3>
                </div>
                <p className="text-blue-100 text-xs">Analyzing match for {job.company}</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
           {loading ? (
             <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <Loader2 size={40} className="animate-spin text-blue-600" />
                <p className="text-sm text-gray-500 font-medium animate-pulse">Analyzing job description...</p>
             </div>
           ) : (
             <div className="space-y-6">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-3 text-sm">
                        <Target size={16} className="text-blue-500"/> 
                        Preparation Strategy
                    </h4>
                    <div className="prose prose-sm prose-blue text-gray-600 text-sm leading-relaxed">
                        <Markdown>{analysis}</Markdown>
                    </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h4 className="flex items-center gap-2 font-semibold text-indigo-900 mb-2 text-sm">
                        <BookOpen size={16} /> 
                        Quick Tip
                    </h4>
                    <p className="text-xs text-indigo-700">
                        Customize your resume to mirror the keywords found in the job description above. 
                        The AI suggests focusing on specific technical skills mentioned.
                    </p>
                </div>
             </div>
           )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
            <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default JobAIModal;
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import JobCard from './components/JobCard';
import Footer from './components/Footer';
import JobAIModal from './components/JobAIModal';
import JobFilters from './components/JobFilters';
import { Job, UserProfile } from './types';

const MOCK_USER: UserProfile = {
  name: 'Daria Moiseenko',
  role: 'Accreditation Manager @ Universiade 2019',
  location: 'Krasnoyarsk',
  completion: 80,
  status: 'Ready to interview',
  imageUrl: 'https://picsum.photos/seed/daria/200/200'
};

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Product Manager',
    company: 'TechGlobal Solutions',
    description: 'Product Manager is a key role in driving product vision. You will work with cross-functional teams to build innovative solutions. We need someone who can translate business goals into technical requirements effectively.',
    location: 'Krasnoyarsk',
    type: 'Full-time',
    imageUrl: 'https://picsum.photos/seed/tech1/600/400'
  },
  {
    id: '2',
    title: 'Senior UX Designer',
    company: 'InnovateNow Inc.',
    description: 'Senior UX Designer needed to lead our design system. You will be responsible for creating intuitive user flows and high-fidelity prototypes. Experience with complex SaaS applications is a huge plus.',
    location: 'Krasnoyarsk',
    type: 'Hybrid',
    imageUrl: 'https://picsum.photos/seed/design2/600/400'
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'DataWave Analytics',
    description: 'We are looking for a Data Scientist to join our growing AI team. You should have strong Python skills and experience with machine learning models. Help us unlock insights from massive datasets.',
    location: 'Moscow',
    type: 'Remote',
    imageUrl: 'https://picsum.photos/seed/data3/600/400'
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'GrowthGurus',
    description: 'Marketing Specialist to oversee our digital campaigns. You will manage social media, SEO, and content strategy. We are looking for a creative mind with an analytical approach to growth.',
    location: 'Saint Petersburg',
    type: 'On-site',
    imageUrl: 'https://picsum.photos/seed/marketing4/600/400'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter States
  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [companyFilters, setCompanyFilters] = useState<string[]>([]);

  const handleAnalyzeJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Get unique filter options from jobs
  const locations = Array.from(new Set(MOCK_JOBS.map(j => j.location)));
  const types = Array.from(new Set(MOCK_JOBS.map(j => j.type)));
  const companies = Array.from(new Set(MOCK_JOBS.map(j => j.company)));

  // Filter Logic
  const filteredJobs = MOCK_JOBS.filter(job => {
    if (locationFilters.length > 0 && !locationFilters.includes(job.location)) return false;
    if (typeFilters.length > 0 && !typeFilters.includes(job.type)) return false;
    if (companyFilters.length > 0 && !companyFilters.includes(job.company)) return false;
    return true;
  });

  return (
    <div className="flex h-screen bg-[#F8F9FB] font-inter text-gray-800">
      
      {/* Sidebar - Fixed Left */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <Header user={MOCK_USER} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                
                <ProfileCard user={MOCK_USER} />

                {/* Jobs Section */}
                <section>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-gray-900">Recommended Jobs</h2>
                        <button className="text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors">
                            Change job preferences
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mb-6">
                        Jobs where you're a top applicant based on your profile job search
                    </p>

                    <JobFilters 
                        locations={locations}
                        types={types}
                        companies={companies}
                        selectedLocations={locationFilters}
                        selectedTypes={typeFilters}
                        selectedCompanies={companyFilters}
                        onLocationChange={setLocationFilters}
                        onTypeChange={setTypeFilters}
                        onCompanyChange={setCompanyFilters}
                    />

                    {filteredJobs.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                            <p className="text-gray-500 text-sm mb-2">No jobs found matching your filters.</p>
                            <button 
                                onClick={() => {
                                    setLocationFilters([]);
                                    setTypeFilters([]);
                                    setCompanyFilters([]);
                                }}
                                className="text-blue-600 text-xs font-medium hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredJobs.map(job => (
                                <JobCard 
                                    key={job.id} 
                                    job={job} 
                                    onAnalyze={handleAnalyzeJob}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <Footer />
            </div>
        </main>
      </div>

      <JobAIModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        job={selectedJob} 
        user={MOCK_USER}
      />

    </div>
  );
}

export default App;
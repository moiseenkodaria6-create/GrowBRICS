import React from 'react';
import { Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Column */}
            <div className="col-span-1">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center text-white font-bold">G</div>
                    <span className="font-bold text-gray-900 text-lg">GrowBRICS</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    Connecting professionals across borders. The premier platform for international career growth.
                </p>
                <p className="text-xs text-gray-400">
                    Email: contact@growbrics.ru
                </p>
            </div>

            {/* Links Columns */}
            <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-sm">Platform</h4>
                <ul className="space-y-3 text-xs text-gray-500">
                    <li><a href="#" className="hover:text-teal-600">Vacancies</a></li>
                    <li><a href="#" className="hover:text-teal-600">Companies</a></li>
                    <li><a href="#" className="hover:text-teal-600">Communities</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-sm">Company</h4>
                <ul className="space-y-3 text-xs text-gray-500">
                    <li><a href="#" className="hover:text-teal-600">About Us</a></li>
                    <li><a href="#" className="hover:text-teal-600">Blog</a></li>
                    <li><a href="#" className="hover:text-teal-600">Contacts</a></li>
                    <li><a href="#" className="hover:text-teal-600">Documentation</a></li>
                </ul>
            </div>

             <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-sm">Follow Us</h4>
                <div className="flex gap-4">
                    <a href="#" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors">
                        <Linkedin size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 hover:bg-sky-100 transition-colors">
                        <Twitter size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-colors">
                        <Facebook size={16} />
                    </a>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400">
            <p>© 2024 GrowBRICS. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-gray-600 underline">User Agreement</a>
                <a href="#" className="hover:text-gray-600 underline">Privacy Policy</a>
                <a href="#" className="hover:text-gray-600 underline">Cookie Settings</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
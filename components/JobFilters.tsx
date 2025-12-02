import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, ListFilter } from 'lucide-react';

interface FilterProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const FilterDropdown: React.FC<FilterProps> = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
          selected.length > 0
            ? 'bg-blue-50 border-blue-200 text-blue-700'
            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
        }`}
      >
        {label}
        {selected.length > 0 && (
          <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full ml-1 min-w-[16px] flex items-center justify-center">
            {selected.length}
          </span>
        )}
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map(option => {
               const isSelected = selected.includes(option);
               return (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className="w-full text-left flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className={isSelected ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}>
                    {option}
                  </span>
                  {isSelected && <Check size={14} className="text-blue-600" />}
                </button>
              );
            })}
          </div>
           {selected.length > 0 && (
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={() => onChange([])}
                className="w-full text-center text-[10px] text-gray-400 hover:text-red-500 py-1 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface JobFiltersProps {
  locations: string[];
  types: string[];
  companies: string[];
  selectedLocations: string[];
  selectedTypes: string[];
  selectedCompanies: string[];
  onLocationChange: (val: string[]) => void;
  onTypeChange: (val: string[]) => void;
  onCompanyChange: (val: string[]) => void;
}

const JobFilters: React.FC<JobFiltersProps> = (props) => {
  const hasFilters = props.selectedLocations.length > 0 || props.selectedTypes.length > 0 || props.selectedCompanies.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
      <div className="px-2 text-xs font-semibold text-gray-500 flex items-center gap-2">
        <ListFilter size={16} />
        Filter by:
      </div>
      <FilterDropdown
        label="Location"
        options={props.locations}
        selected={props.selectedLocations}
        onChange={props.onLocationChange}
      />
      <FilterDropdown
        label="Job Type"
        options={props.types}
        selected={props.selectedTypes}
        onChange={props.onTypeChange}
      />
      <FilterDropdown
        label="Company"
        options={props.companies}
        selected={props.selectedCompanies}
        onChange={props.onCompanyChange}
      />
      
      {hasFilters && (
          <button 
            onClick={() => {
                props.onLocationChange([]);
                props.onTypeChange([]);
                props.onCompanyChange([]);
            }}
            className="text-xs text-red-500 hover:text-red-700 ml-auto px-3 py-1.5 flex items-center gap-1 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={14} /> Reset
          </button>
      )}
    </div>
  );
};

export default JobFilters;
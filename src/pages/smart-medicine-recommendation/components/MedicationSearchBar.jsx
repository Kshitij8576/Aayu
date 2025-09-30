import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const MedicationSearchBar = ({ onSearch, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('medication');

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim(), searchType);
    }
  };

  const searchTypes = [
    { value: 'medication', label: 'Medication Name', icon: 'Pill' },
    { value: 'condition', label: 'Medical Condition', icon: 'Activity' },
    { value: 'symptom', label: 'Symptoms', icon: 'AlertCircle' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-medical">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Search" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Smart Medicine Search</h3>
          <p className="text-sm text-text-secondary">Find medications, check interactions, and get personalized recommendations</p>
        </div>
      </div>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {searchTypes?.map((type) => (
            <button
              key={type?.value}
              type="button"
              onClick={() => setSearchType(type?.value)}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                searchType === type?.value
                  ? 'border-primary bg-primary/5 text-primary' :'border-border bg-background text-text-secondary hover:border-primary/50 hover:text-text-primary'
              }`}
            >
              <Icon name={type?.icon} size={18} />
              <span className="text-sm font-medium">{type?.label}</span>
            </button>
          ))}
        </div>

        <div className="flex space-x-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder={`Search by ${searchTypes?.find(t => t?.value === searchType)?.label?.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Search"
            iconPosition="left"
            className="bg-primary hover:bg-primary/90"
          >
            Search
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-text-secondary">Popular searches:</span>
          {['Aspirin', 'Diabetes', 'Blood Pressure', 'Headache', 'Antibiotics']?.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setSearchQuery(term);
                onSearch(term, searchType);
              }}
              className="text-xs px-2 py-1 bg-muted text-text-secondary rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default MedicationSearchBar;
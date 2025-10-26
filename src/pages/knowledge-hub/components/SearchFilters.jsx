import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchFilters = ({ 
  searchQuery, 
  onSearchChange, 
  activeCategory, 
  onCategoryChange, 
  activeFilters, 
  onFilterChange,
  onClearFilters 
}) => {
  const categories = [
    { id: 'all', name: 'All Content', icon: 'Grid3x3' },
    { id: 'tutorials', name: 'Tutorials', icon: 'Play' },
    { id: 'materials', name: 'Materials', icon: 'Package' },
    { id: 'care', name: 'Care Guide', icon: 'Droplets' },
    { id: 'culture', name: 'Culture', icon: 'BookOpen' },
    { id: 'community', name: 'Community Tips', icon: 'Users' }
  ];

  const filters = {
    difficulty: [
      { id: 'beginner', name: 'Beginner' },
      { id: 'intermediate', name: 'Intermediate' },
      { id: 'advanced', name: 'Advanced' }
    ],
    character: [
      { id: 'watermelon', name: 'Watermelon' },
      { id: 'orange', name: 'Orange' },
      { id: 'grape', name: 'Grape' },
      { id: 'apple', name: 'Apple' },
      { id: 'banana', name: 'Banana' },
      { id: 'strawberry', name: 'Strawberry' },
      { id: 'pineapple', name: 'Pineapple' }
    ],
    duration: [
      { id: 'short', name: 'Under 5 min' },
      { id: 'medium', name: '5-15 min' },
      { id: 'long', name: '15+ min' }
    ]
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(filterArray => filterArray?.length > 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search tutorials, guides, and tips..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Category Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-cta font-medium text-sm transition-all duration-300 spray-paint-hover ${
                activeCategory === category?.id
                  ? 'bg-primary/20 text-primary neon-glow-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50 hover:neon-glow-primary'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Advanced Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-lg text-foreground">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-text-secondary hover:text-primary"
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Difficulty Filter */}
          <div>
            <h4 className="font-cta font-semibold text-sm text-foreground mb-3">Difficulty Level</h4>
            <div className="space-y-2">
              {filters?.difficulty?.map((option) => (
                <label key={option?.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters?.difficulty?.includes(option?.id) || false}
                    onChange={(e) => onFilterChange('difficulty', option?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm font-cta text-text-secondary">{option?.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Character Filter */}
          <div>
            <h4 className="font-cta font-semibold text-sm text-foreground mb-3">Character</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {filters?.character?.map((option) => (
                <label key={option?.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters?.character?.includes(option?.id) || false}
                    onChange={(e) => onFilterChange('character', option?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-accent text-black">{option?.name?.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-cta text-text-secondary">{option?.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <h4 className="font-cta font-semibold text-sm text-foreground mb-3">Duration</h4>
            <div className="space-y-2">
              {filters?.duration?.map((option) => (
                <label key={option?.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters?.duration?.includes(option?.id) || false}
                    onChange={(e) => onFilterChange('duration', option?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm font-cta text-text-secondary">{option?.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)?.map(([filterType, values]) =>
              values?.map((value) => (
                <div key={`${filterType}-${value}`} className="flex items-center space-x-1 px-3 py-1 bg-primary/20 border border-primary/30 rounded-md">
                  <span className="text-xs font-cta text-primary">
                    {filters?.[filterType]?.find(f => f?.id === value)?.name || value}
                  </span>
                  <button
                    onClick={() => onFilterChange(filterType, value, false)}
                    className="text-primary hover:text-primary/70 transition-colors duration-300"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
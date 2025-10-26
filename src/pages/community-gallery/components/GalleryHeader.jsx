import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GalleryHeader = ({ onFilterChange, onChallengeClick, activeFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = [
    { id: 'all', label: 'All Styles', icon: 'Grid3X3' },
    { id: 'watermelon', label: 'Watermelon Crew', icon: 'Users', color: 'text-red-400' },
    { id: 'banana', label: 'Banana Squad', icon: 'Users', color: 'text-yellow-400' },
    { id: 'apple', label: 'Apple Gang', icon: 'Users', color: 'text-green-400' },
    { id: 'orange', label: 'Orange Collective', icon: 'Users', color: 'text-orange-400' },
    { id: 'grape', label: 'Grape Mob', icon: 'Users', color: 'text-purple-400' },
    { id: 'strawberry', label: 'Berry Bunch', icon: 'Users', color: 'text-pink-400' },
    { id: 'pineapple', label: 'Pineapple Posse', icon: 'Users', color: 'text-yellow-300' }
  ];

  const styleCategories = [
    { id: 'street', label: 'Street Style', icon: 'Shirt' },
    { id: 'casual', label: 'Casual Flex', icon: 'Coffee' },
    { id: 'formal', label: 'Elevated Look', icon: 'Briefcase' },
    { id: 'creative', label: 'Creative Expression', icon: 'Palette' }
  ];

  const achievementFilters = [
    { id: 'legend', label: 'Hood Legends', icon: 'Crown' },
    { id: 'creator', label: 'Content Creators', icon: 'Camera' },
    { id: 'ambassador', label: 'Brand Ambassadors', icon: 'Star' },
    { id: 'contributor', label: 'Design Contributors', icon: 'Paintbrush' }
  ];

  return (
    <div className="bg-card/95 backdrop-blur-md border-b border-border sticky top-16 z-30">
      <div className="concrete-texture absolute inset-0 opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title Section */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center neon-glow-primary">
              <Icon name="Image" size={24} className="text-black" />
            </div>
            <div>
              <h1 className="font-headline font-bold text-2xl lg:text-3xl text-primary glitch-text">
                Community Gallery
              </h1>
              <p className="font-body text-text-secondary mt-1">
                Real styles from the hood • Authentic culture showcase
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
            >
              Submit Style
            </Button>
            
            <Button
              variant="default"
              className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
              iconName="Trophy"
              iconPosition="left"
              iconSize={16}
              onClick={onChallengeClick}
            >
              Monthly Challenge
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Quick Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            <span className="font-cta font-medium text-sm text-text-secondary whitespace-nowrap">
              Quick Filter:
            </span>
            {filterOptions?.slice(0, 4)?.map((filter) => (
              <Button
                key={filter?.id}
                variant={activeFilters?.includes(filter?.id) ? "default" : "ghost"}
                size="sm"
                className={`whitespace-nowrap ${
                  activeFilters?.includes(filter?.id) 
                    ? 'neon-glow-primary' :'hover:neon-glow-primary'
                } ${filter?.color || ''}`}
                iconName={filter?.icon}
                iconPosition="left"
                iconSize={14}
                onClick={() => onFilterChange(filter?.id)}
              >
                {filter?.label}
              </Button>
            ))}
          </div>

          {/* Advanced Filter Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-primary"
              iconName={isFilterOpen ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              iconSize={16}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              More Filters
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {isFilterOpen && (
          <div className="mt-4 p-4 bg-surface/50 rounded-lg border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Character Filters */}
              <div>
                <h3 className="font-cta font-semibold text-sm text-foreground mb-3">
                  Character Crews
                </h3>
                <div className="space-y-2">
                  {filterOptions?.slice(1)?.map((filter) => (
                    <button
                      key={filter?.id}
                      onClick={() => onFilterChange(filter?.id)}
                      className={`flex items-center space-x-2 w-full p-2 rounded-lg text-sm font-cta transition-all duration-300 ${
                        activeFilters?.includes(filter?.id)
                          ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                      }`}
                    >
                      <Icon name={filter?.icon} size={16} className={filter?.color} />
                      <span>{filter?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Categories */}
              <div>
                <h3 className="font-cta font-semibold text-sm text-foreground mb-3">
                  Style Categories
                </h3>
                <div className="space-y-2">
                  {styleCategories?.map((category) => (
                    <button
                      key={category?.id}
                      onClick={() => onFilterChange(category?.id)}
                      className={`flex items-center space-x-2 w-full p-2 rounded-lg text-sm font-cta transition-all duration-300 ${
                        activeFilters?.includes(category?.id)
                          ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                      }`}
                    >
                      <Icon name={category?.icon} size={16} />
                      <span>{category?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Achievement Filters */}
              <div>
                <h3 className="font-cta font-semibold text-sm text-foreground mb-3">
                  Community Status
                </h3>
                <div className="space-y-2">
                  {achievementFilters?.map((achievement) => (
                    <button
                      key={achievement?.id}
                      onClick={() => onFilterChange(achievement?.id)}
                      className={`flex items-center space-x-2 w-full p-2 rounded-lg text-sm font-cta transition-all duration-300 ${
                        activeFilters?.includes(achievement?.id)
                          ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                      }`}
                    >
                      <Icon name={achievement?.icon} size={16} />
                      <span>{achievement?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryHeader;
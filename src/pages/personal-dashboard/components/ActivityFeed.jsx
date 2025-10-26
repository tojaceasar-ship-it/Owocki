import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities, onLoadMore }) => {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Activity', icon: 'Activity' },
    { value: 'community', label: 'Community', icon: 'Users' },
    { value: 'achievements', label: 'Achievements', icon: 'Trophy' },
    { value: 'wishlist', label: 'Wishlist', icon: 'Heart' },
    { value: 'style', label: 'Style', icon: 'Palette' }
  ];

  const getActivityIcon = (type) => {
    const iconMap = {
      'achievement': 'Trophy',
      'wishlist_add': 'Heart',
      'community_post': 'MessageSquare',
      'style_share': 'Share2',
      'quiz_complete': 'Brain',
      'collection_view': 'Eye',
      'character_follow': 'UserPlus',
      'event_join': 'Calendar'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'achievement': 'text-primary',
      'wishlist_add': 'text-accent',
      'community_post': 'text-secondary',
      'style_share': 'text-primary',
      'quiz_complete': 'text-secondary',
      'collection_view': 'text-text-secondary',
      'character_follow': 'text-primary',
      'event_join': 'text-accent'
    };
    return colorMap?.[type] || 'text-text-secondary';
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.category === filter);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-xl font-bold text-primary">Activity Feed</h2>
        <div className="flex items-center space-x-2">
          {filterOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={filter === option?.value ? 'default' : 'ghost'}
              size="sm"
              iconName={option?.icon}
              iconSize={14}
              className="hidden sm:flex"
              onClick={() => setFilter(option?.value)}
            >
              {option?.label}
            </Button>
          ))}
          <div className="sm:hidden">
            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              iconSize={14}
            >
              Filter
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredActivities?.map((activity) => (
          <div
            key={activity?.id}
            className="flex items-start space-x-3 p-4 bg-surface/30 border border-border rounded-lg hover:border-primary/30 transition-all duration-300"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-surface border border-border ${getActivityColor(activity?.type)}`}>
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={16} 
                className={getActivityColor(activity?.type)}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-cta text-sm text-foreground">
                    {activity?.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-text-secondary">
                      {activity?.timestamp}
                    </span>
                    {activity?.points && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Zap" size={12} className="text-primary" />
                        <span className="text-xs font-cta text-primary">
                          +{activity?.points} XP
                        </span>
                      </div>
                    )}
                    {activity?.category && (
                      <span className="px-2 py-1 bg-surface/50 border border-border rounded-full text-xs font-cta text-text-secondary">
                        {activity?.category}
                      </span>
                    )}
                  </div>
                </div>
                
                {activity?.image && (
                  <div className="w-12 h-12 ml-3 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={activity?.image}
                      alt="Activity"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              {activity?.metadata && (
                <div className="mt-3 p-3 bg-surface/50 border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    {activity?.metadata?.character && (
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src={activity?.metadata?.character?.image}
                            alt={activity?.metadata?.character?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-cta text-text-secondary">
                          {activity?.metadata?.character?.name}
                        </span>
                      </div>
                    )}
                    {activity?.metadata?.achievement && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Award" size={12} className="text-primary" />
                        <span className="text-xs font-cta text-primary">
                          {activity?.metadata?.achievement}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredActivities?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-surface/50 rounded-full flex items-center justify-center">
            <Icon name="Activity" size={24} className="text-text-secondary" />
          </div>
          <h3 className="font-cta font-semibold text-foreground mb-2">No Activity Yet</h3>
          <p className="text-text-secondary text-sm">
            Start exploring to see your activity feed come to life
          </p>
        </div>
      )}
      {filteredActivities?.length > 0 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}
            onClick={onLoadMore}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Load More Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
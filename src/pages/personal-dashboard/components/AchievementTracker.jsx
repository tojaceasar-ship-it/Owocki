import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementTracker = ({ achievements, recentAchievements, progressStats }) => {
  const getAchievementIcon = (type) => {
    const iconMap = {
      'community': 'Users',
      'quiz': 'Brain',
      'style': 'Palette',
      'collector': 'Trophy',
      'creator': 'Paintbrush',
      'social': 'Share2',
      'streak': 'Flame',
      'explorer': 'Map'
    };
    return iconMap?.[type] || 'Award';
  };

  const getAchievementColor = (rarity) => {
    const colorMap = {
      'common': 'text-text-secondary',
      'rare': 'text-secondary',
      'epic': 'text-primary',
      'legendary': 'text-accent'
    };
    return colorMap?.[rarity] || 'text-text-secondary';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Achievement Progress</h2>
          <p className="text-text-secondary font-cta text-sm">
            {achievements?.filter(a => a?.unlocked)?.length} of {achievements?.length} unlocked
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Trophy"
          iconPosition="left"
          iconSize={14}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          View All
        </Button>
      </div>
      {/* Recent Achievements */}
      {recentAchievements?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-cta font-semibold text-foreground mb-3">Recently Unlocked</h3>
          <div className="space-y-2">
            {recentAchievements?.map((achievement) => (
              <div
                key={achievement?.id}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg neon-glow-primary"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow-primary`}>
                  <Icon 
                    name={getAchievementIcon(achievement?.type)} 
                    size={18} 
                    className="text-black" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-cta font-medium text-foreground text-sm">
                    {achievement?.name}
                  </h4>
                  <p className="text-text-secondary text-xs">
                    {achievement?.description}
                  </p>
                </div>
                <div className="text-xs text-text-secondary">
                  {achievement?.unlockedDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Progress Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {progressStats?.map((stat) => (
          <div key={stat?.id} className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-2">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-surface"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - stat?.progress / 100)}`}
                  className="text-primary transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-cta font-bold text-primary">
                  {stat?.progress}%
                </span>
              </div>
            </div>
            <div className="text-sm font-cta font-medium text-foreground">
              {stat?.name}
            </div>
            <div className="text-xs text-text-secondary">
              {stat?.current}/{stat?.total}
            </div>
          </div>
        ))}
      </div>
      {/* Achievement Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {achievements?.slice(0, 12)?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`relative aspect-square rounded-lg border-2 transition-all duration-300 spray-paint-hover ${
              achievement?.unlocked
                ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 neon-glow-primary' :'border-border bg-surface/30'
            }`}
            title={achievement?.unlocked ? achievement?.name : '???'}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
              <Icon
                name={achievement?.unlocked ? getAchievementIcon(achievement?.type) : 'Lock'}
                size={20}
                className={achievement?.unlocked ? getAchievementColor(achievement?.rarity) : 'text-text-secondary/50'}
              />
              {achievement?.unlocked && (
                <div className="text-xs font-cta text-center mt-1 text-foreground">
                  {achievement?.name}
                </div>
              )}
            </div>
            {achievement?.unlocked && achievement?.rarity === 'legendary' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center neon-glow-accent">
                <Icon name="Star" size={10} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementTracker;
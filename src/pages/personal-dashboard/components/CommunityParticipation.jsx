import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityParticipation = ({ participationData, recentContributions, communityStats }) => {
  const getContributionIcon = (type) => {
    const iconMap = {
      'style_photo': 'Camera',
      'fan_art': 'Paintbrush',
      'poll_vote': 'Vote',
      'design_input': 'Lightbulb',
      'community_post': 'MessageSquare',
      'event_attend': 'Calendar',
      'challenge_entry': 'Trophy'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getContributionColor = (type) => {
    const colorMap = {
      'style_photo': 'text-primary',
      'fan_art': 'text-accent',
      'poll_vote': 'text-secondary',
      'design_input': 'text-primary',
      'community_post': 'text-secondary',
      'event_attend': 'text-accent',
      'challenge_entry': 'text-primary'
    };
    return colorMap?.[type] || 'text-text-secondary';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Community Impact</h2>
          <p className="text-text-secondary font-cta text-sm">
            Your contributions to the culture
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-sm font-cta font-semibold text-primary">
              Level {participationData?.level}
            </div>
            <div className="text-xs text-text-secondary">
              {participationData?.role}
            </div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow-primary">
            <Icon name="Crown" size={16} className="text-black" />
          </div>
        </div>
      </div>
      {/* Community Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {communityStats?.map((stat) => (
          <div key={stat?.id} className="text-center p-4 bg-surface/30 border border-border rounded-lg">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center bg-gradient-to-br ${stat?.gradient}`}>
              <Icon name={stat?.icon} size={20} className="text-black" />
            </div>
            <div className="text-lg font-headline font-bold text-primary">
              {stat?.value}
            </div>
            <div className="text-xs font-cta text-text-secondary uppercase tracking-wider">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Participation Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-cta font-medium text-foreground text-sm">
            Community Level Progress
          </span>
          <span className="text-sm font-cta text-primary">
            {participationData?.currentXP}/{participationData?.nextLevelXP} XP
          </span>
        </div>
        <div className="w-full bg-surface/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full neon-glow-primary transition-all duration-500"
            style={{ width: `${(participationData?.currentXP / participationData?.nextLevelXP) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-text-secondary">
          <span>Level {participationData?.level}</span>
          <span>Level {participationData?.level + 1}</span>
        </div>
      </div>
      {/* Recent Contributions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-cta font-semibold text-foreground">Recent Contributions</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
            className="text-primary hover:text-primary"
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentContributions?.map((contribution) => (
            <div
              key={contribution?.id}
              className="flex items-center space-x-3 p-3 bg-surface/30 border border-border rounded-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-surface border border-border ${getContributionColor(contribution?.type)}`}>
                <Icon 
                  name={getContributionIcon(contribution?.type)} 
                  size={14} 
                  className={getContributionColor(contribution?.type)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-cta text-sm text-foreground truncate">
                    {contribution?.title}
                  </p>
                  <div className="flex items-center space-x-2 ml-2">
                    {contribution?.likes && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={12} className="text-accent" />
                        <span className="text-xs text-accent">{contribution?.likes}</span>
                      </div>
                    )}
                    <span className="text-xs text-text-secondary">
                      {contribution?.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2 py-1 bg-surface/50 border border-border rounded-full text-xs font-cta text-text-secondary">
                    {contribution?.category}
                  </span>
                  {contribution?.xpEarned && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={10} className="text-primary" />
                      <span className="text-xs font-cta text-primary">
                        +{contribution?.xpEarned} XP
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {contribution?.image && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-border flex-shrink-0">
                  <Image
                    src={contribution?.image}
                    alt="Contribution"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-cta font-semibold text-foreground text-sm mb-1">
              Ready to Level Up?
            </h4>
            <p className="text-text-secondary text-xs">
              Share your style or contribute to the community
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold"
          >
            Contribute
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityParticipation;
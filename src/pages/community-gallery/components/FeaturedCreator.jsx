import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedCreator = ({ creator, onViewProfile }) => {
  if (!creator) return null;

  return (
    <div className="bg-gradient-to-br from-surface/80 to-card/80 backdrop-blur-md border border-border rounded-xl p-6 neon-glow-primary">
      <div className="concrete-texture absolute inset-0 opacity-5 rounded-xl"></div>
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={20} className="text-primary" />
            <h2 className="font-headline font-bold text-lg text-primary">
              Featured Creator
            </h2>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={16} className="text-secondary" />
            <span className="font-cta text-sm text-secondary">Trending</span>
          </div>
        </div>

        {/* Creator Profile */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Image & Info */}
          <div className="flex items-center space-x-4 lg:flex-col lg:space-x-0 lg:space-y-4 lg:text-center">
            <div className="relative">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-primary/30 neon-glow-primary">
                <Image
                  src={creator?.avatar}
                  alt={creator?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center border-2 border-background">
                <Icon name={creator?.badgeIcon} size={12} className="text-black" />
              </div>
            </div>
            
            <div className="flex-1 lg:flex-none">
              <h3 className="font-cta font-bold text-lg text-foreground">
                {creator?.name}
              </h3>
              <p className="font-body text-sm text-text-secondary">
                {creator?.title}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="MapPin" size={12} className="text-text-secondary" />
                <span className="font-body text-xs text-text-secondary">
                  {creator?.location}
                </span>
              </div>
            </div>
          </div>

          {/* Stats & Bio */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="font-headline font-bold text-xl text-primary">
                  {creator?.stats?.posts}
                </div>
                <div className="font-body text-xs text-text-secondary">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-headline font-bold text-xl text-secondary">
                  {creator?.stats?.likes}
                </div>
                <div className="font-body text-xs text-text-secondary">Likes</div>
              </div>
              <div className="text-center">
                <div className="font-headline font-bold text-xl text-accent">
                  {creator?.stats?.followers}
                </div>
                <div className="font-body text-xs text-text-secondary">Followers</div>
              </div>
            </div>

            <p className="font-body text-sm text-text-secondary mb-4 line-clamp-3">
              {creator?.bio}
            </p>

            {/* Achievements */}
            <div className="flex flex-wrap gap-2 mb-4">
              {creator?.achievements?.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 px-2 py-1 bg-surface/50 rounded-full border border-border"
                >
                  <Icon name={achievement?.icon} size={12} className={achievement?.color} />
                  <span className="font-cta text-xs text-text-secondary">
                    {achievement?.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                iconName="User"
                iconPosition="left"
                iconSize={14}
                onClick={() => onViewProfile(creator?.id)}
              >
                View Profile
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                iconName="UserPlus"
                iconPosition="left"
                iconSize={14}
              >
                Follow
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Work Preview */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-cta font-semibold text-sm text-foreground mb-3">
            Recent Submissions
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {creator?.recentWork?.map((work, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
              >
                <Image
                  src={work?.image}
                  alt={work?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCreator;
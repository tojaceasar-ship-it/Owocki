import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DashboardHeader = ({ userProfile, currentStreak }) => {
  return (
    <div className="bg-gradient-to-r from-surface to-card border border-border rounded-xl p-6 neon-glow-primary">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary neon-glow-primary">
              <Image
                src={userProfile?.avatar}
                alt={userProfile?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="Crown" size={12} className="text-black" />
            </div>
          </div>
          
          <div>
            <h1 className="font-headline text-2xl font-bold text-primary">
              Welcome back, {userProfile?.name}!
            </h1>
            <p className="text-text-secondary font-cta">
              {userProfile?.title} • Level {userProfile?.level}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Icon name="Flame" size={16} className="text-accent" />
                <span className="text-sm font-cta text-accent">{currentStreak} day streak</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} className="text-secondary" />
                <span className="text-sm font-cta text-secondary">{userProfile?.communityRank}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          <div className="text-center">
            <div className="text-2xl font-headline font-bold text-primary">
              {userProfile?.achievements}
            </div>
            <div className="text-xs font-cta text-text-secondary uppercase tracking-wider">
              Achievements
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-headline font-bold text-secondary">
              {userProfile?.wishlistItems}
            </div>
            <div className="text-xs font-cta text-text-secondary uppercase tracking-wider">
              Wishlist
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-headline font-bold text-accent">
              {userProfile?.contributions}
            </div>
            <div className="text-xs font-cta text-text-secondary uppercase tracking-wider">
              Contributions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
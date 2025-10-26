import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChallengeModal = ({ isOpen, onClose, challenge }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !challenge) return null;

  const tabs = [
    { id: 'details', label: 'Challenge Details', icon: 'Info' },
    { id: 'submissions', label: 'Submissions', icon: 'Image' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'Trophy' }
  ];

  const formatTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffInDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    
    if (diffInDays > 7) return `${Math.floor(diffInDays / 7)} weeks left`;
    if (diffInDays > 0) return `${diffInDays} days left`;
    return 'Ending soon';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card/95 backdrop-blur-md border border-border rounded-xl overflow-hidden neon-glow-primary">
        <div className="concrete-texture absolute inset-0 opacity-5"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center neon-glow-primary">
              <Icon name="Trophy" size={24} className="text-black" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-xl text-primary">
                {challenge?.title}
              </h2>
              <p className="font-body text-sm text-text-secondary">
                {formatTimeRemaining(challenge?.endDate)} • {challenge?.participants} participants
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-text-secondary hover:text-primary"
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Tabs */}
        <div className="relative border-b border-border">
          <div className="flex">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 font-cta font-medium text-sm transition-all duration-300 ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative max-h-[60vh] overflow-y-auto">
          {activeTab === 'details' && (
            <div className="p-6 space-y-6">
              {/* Challenge Banner */}
              <div className="aspect-video rounded-lg overflow-hidden border border-border">
                <Image
                  src={challenge?.bannerImage}
                  alt={challenge?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div>
                <h3 className="font-cta font-semibold text-lg text-foreground mb-3">
                  Challenge Description
                </h3>
                <p className="font-body text-text-secondary leading-relaxed">
                  {challenge?.description}
                </p>
              </div>

              {/* Rules */}
              <div>
                <h3 className="font-cta font-semibold text-lg text-foreground mb-3">
                  Rules & Guidelines
                </h3>
                <ul className="space-y-2">
                  {challenge?.rules?.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-text-secondary">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prizes */}
              <div>
                <h3 className="font-cta font-semibold text-lg text-foreground mb-3">
                  Prizes & Recognition
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {challenge?.prizes?.map((prize, index) => (
                    <div key={index} className="p-4 bg-surface/50 rounded-lg border border-border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name={prize?.icon} size={20} className={prize?.color} />
                        <span className="font-cta font-semibold text-sm text-foreground">
                          {prize?.position}
                        </span>
                      </div>
                      <p className="font-body text-sm text-text-secondary">
                        {prize?.reward}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {challenge?.submissions?.map((submission, index) => (
                  <div key={index} className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">
                    <Image
                      src={submission?.image}
                      alt={submission?.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 w-full">
                        <p className="font-cta font-semibold text-sm text-white truncate">
                          {submission?.username}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Icon name="Heart" size={12} className="text-red-400" />
                          <span className="font-body text-xs text-white">{submission?.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="p-6">
              <div className="space-y-4">
                {challenge?.leaderboard?.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-surface/50 rounded-lg border border-border">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-black font-cta font-bold text-sm">
                      {index + 1}
                    </div>
                    
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                      <Image
                        src={entry?.avatar}
                        alt={entry?.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-cta font-semibold text-sm text-foreground">
                          {entry?.username}
                        </h4>
                        {entry?.isVerified && (
                          <Icon name="BadgeCheck" size={14} className="text-primary" />
                        )}
                      </div>
                      <p className="font-body text-xs text-text-secondary">
                        {entry?.submissions} submissions
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-headline font-bold text-lg text-primary">
                        {entry?.score}
                      </div>
                      <div className="font-body text-xs text-text-secondary">
                        points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-text-secondary" />
                <span className="font-body text-sm text-text-secondary">
                  Ends {new Date(challenge.endDate)?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-text-secondary" />
                <span className="font-body text-sm text-text-secondary">
                  {challenge?.participants} participants
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                iconName="Share"
                iconPosition="left"
                iconSize={16}
              >
                Share Challenge
              </Button>
              
              <Button
                variant="default"
                className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                iconName="Upload"
                iconPosition="left"
                iconSize={16}
              >
                Submit Entry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
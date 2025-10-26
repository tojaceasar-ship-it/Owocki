import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CreatorSpotlight = ({ creator }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden neon-glow-primary">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={creator?.coverImage}
          alt={`${creator?.name} workspace`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-xs font-cta font-semibold text-accent">
            FEATURED CREATOR
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 neon-glow-primary">
            <Image
              src={creator?.avatar}
              alt={creator?.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-headline font-bold text-lg text-foreground mb-1">{creator?.name}</h3>
            <p className="text-primary font-cta font-medium text-sm mb-2">{creator?.role}</p>
            <p className="text-text-secondary text-sm leading-relaxed">{creator?.bio}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">Experience:</span>
            <span className="font-cta font-medium text-foreground">{creator?.experience}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">Specialization:</span>
            <span className="font-cta font-medium text-foreground">{creator?.specialization}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">Projects Completed:</span>
            <span className="font-cta font-medium text-primary">{creator?.projectsCompleted}</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-cta font-semibold text-foreground mb-3">Current Project</h4>
          <div className="bg-surface/50 border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={creator?.currentProject?.image}
                  alt={creator?.currentProject?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h5 className="font-cta font-medium text-foreground mb-1">{creator?.currentProject?.name}</h5>
                <p className="text-text-secondary text-sm mb-2">{creator?.currentProject?.description}</p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="text-text-secondary">Progress: <span className="text-primary">{creator?.currentProject?.progress}%</span></span>
                  <span className="text-text-secondary">Due: <span className="text-foreground">{creator?.currentProject?.dueDate}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-cta font-semibold text-foreground mb-3">Skills & Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {creator?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-cta font-medium text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            iconName="User"
            iconPosition="left"
            iconSize={16}
          >
            View Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 bg-gradient-to-r from-secondary to-accent text-black font-cta font-bold"
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={16}
          >
            Connect
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={16} className="text-red-400" />
                <span className="text-text-secondary">{creator?.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} className="text-secondary" />
                <span className="text-text-secondary">{creator?.followers}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-yellow-400" />
                <span className="text-text-secondary">{creator?.rating}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-primary"
                iconName="Instagram"
                iconSize={16}
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-secondary"
                iconName="Twitter"
                iconSize={16}
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-accent"
                iconName="Globe"
                iconSize={16}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorSpotlight;
import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DesignProcessCard = ({ process }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'in-progress':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'planning':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'completed': return 100;
      case 'in-progress': return 65;
      case 'planning': return 25;
      default: return 0;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden neon-glow-primary hover:neon-pulse transition-all duration-300 spray-paint-hover">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={process.image}
          alt={process.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-cta font-semibold border ${getStatusColor(process.status)}`}>
            {process.status?.replace('-', ' ')?.toUpperCase()}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-cta text-text-secondary">Progress</span>
            <span className="text-xs font-cta text-primary">{getProgressPercentage(process.status)}%</span>
          </div>
          <div className="w-full bg-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 neon-glow-primary"
              style={{ width: `${getProgressPercentage(process.status)}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-headline font-bold text-lg text-foreground mb-2">{process.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{process.description}</p>
          </div>
          <Icon name="Palette" size={20} className="text-primary flex-shrink-0 ml-4" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Designer:</span>
            <span className="font-cta font-medium text-foreground">{process.designer}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Timeline:</span>
            <span className="font-cta font-medium text-foreground">{process.timeline}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Community Votes:</span>
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={16} className="text-red-400" />
              <span className="font-cta font-medium text-foreground">{process.votes}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 bg-gradient-to-r from-secondary to-accent text-black font-cta font-bold"
            iconName="Vote"
            iconPosition="left"
            iconSize={16}
          >
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignProcessCard;
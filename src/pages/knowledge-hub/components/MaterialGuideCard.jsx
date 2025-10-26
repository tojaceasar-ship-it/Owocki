import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaterialGuideCard = ({ guide, onViewDetails, onDownload }) => {
  const getMaterialTypeIcon = (type) => {
    switch (type) {
      case 'Cotton': return 'Shirt';
      case 'Denim': return 'Package';
      case 'Leather': return 'Shield';
      case 'Synthetic': return 'Zap';
      default: return 'Info';
    }
  };

  const getSustainabilityColor = (rating) => {
    switch (rating) {
      case 'Excellent': return 'text-success';
      case 'Good': return 'text-primary';
      case 'Fair': return 'text-warning';
      case 'Poor': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:neon-glow-secondary transition-all duration-300 spray-paint-hover">
      <div className="relative overflow-hidden h-32">
        <Image
          src={guide?.image}
          alt={guide?.materialType}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <div className="w-8 h-8 bg-secondary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon name={getMaterialTypeIcon(guide?.materialType)} size={16} className="text-black" />
          </div>
          <span className="font-cta font-bold text-white text-sm">{guide?.materialType}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-headline font-bold text-lg text-foreground">
            {guide?.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Icon name="Leaf" size={14} className={getSustainabilityColor(guide?.sustainability)} />
            <span className={`text-xs font-cta ${getSustainabilityColor(guide?.sustainability)}`}>
              {guide?.sustainability}
            </span>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {guide?.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-surface/50 rounded-lg p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="Droplets" size={12} className="text-secondary" />
              <span className="text-xs font-cta text-text-secondary">Care Level</span>
            </div>
            <span className="text-sm font-cta font-medium text-foreground">{guide?.careLevel}</span>
          </div>
          <div className="bg-surface/50 rounded-lg p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="MapPin" size={12} className="text-secondary" />
              <span className="text-xs font-cta text-text-secondary">Origin</span>
            </div>
            <span className="text-sm font-cta font-medium text-foreground">{guide?.origin}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(guide)}
            className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Details
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDownload(guide)}
            className="text-text-secondary hover:text-primary"
            iconName="Download"
            iconSize={16}
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialGuideCard;
import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaterialSourceCard = ({ material }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSustainabilityColor = (rating) => {
    switch (rating) {
      case 'excellent':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'good':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'fair':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden neon-glow-secondary hover:neon-pulse transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={material?.image}
          alt={material?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-cta font-semibold border ${getSustainabilityColor(material?.sustainability)}`}>
            {material?.sustainability?.toUpperCase()}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-primary font-cta font-medium text-sm">{material?.origin}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-headline font-bold text-lg text-foreground mb-2">{material?.name}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{material?.description}</p>
          </div>
          <Icon name="Leaf" size={20} className="text-secondary flex-shrink-0 ml-4" />
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Supplier:</span>
            <span className="font-cta font-medium text-foreground">{material?.supplier}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Cost per unit:</span>
            <span className="font-cta font-medium text-primary">${material?.costPerUnit}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Lead time:</span>
            <span className="font-cta font-medium text-foreground">{material?.leadTime}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Quality rating:</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < material?.qualityRating ? 'text-yellow-400' : 'text-gray-600'}
                />
              ))}
              <span className="ml-1 font-cta font-medium text-foreground">{material?.qualityRating}/5</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-cta font-semibold text-foreground">Sustainability Details</h4>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-text-secondary" 
            />
          </button>
          
          {isExpanded && (
            <div className="mt-3 space-y-3">
              <div className="bg-surface/50 border border-border rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Carbon footprint:</span>
                    <span className="font-cta font-medium text-foreground">{material?.carbonFootprint}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Recyclable:</span>
                    <span className={`font-cta font-medium ${material?.recyclable ? 'text-green-400' : 'text-red-400'}`}>
                      {material?.recyclable ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Certifications:</span>
                    <div className="flex flex-wrap gap-1">
                      {material?.certifications?.map((cert, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary/20 border border-secondary/30 rounded text-xs font-cta text-secondary"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            iconName="FileText"
            iconPosition="left"
            iconSize={16}
          >
            View Full Report
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-text-secondary hover:text-primary"
              iconName="Heart"
              iconPosition="left"
              iconSize={16}
            >
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-text-secondary hover:text-secondary"
              iconName="Share2"
              iconPosition="left"
              iconSize={16}
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-text-secondary hover:text-accent"
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={16}
            >
              Discuss
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSourceCard;
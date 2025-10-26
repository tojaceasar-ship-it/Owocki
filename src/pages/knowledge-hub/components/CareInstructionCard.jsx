import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareInstructionCard = ({ instruction, onSetReminder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStepIcon = (type) => {
    switch (type) {
      case 'wash': return 'Droplets';
      case 'dry': return 'Sun';
      case 'iron': return 'Zap';
      case 'store': return 'Package';
      case 'maintain': return 'Settings';
      default: return 'Info';
    }
  };

  const getStepColor = (type) => {
    switch (type) {
      case 'wash': return 'text-secondary';
      case 'dry': return 'text-warning';
      case 'iron': return 'text-accent';
      case 'store': return 'text-primary';
      case 'maintain': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:neon-glow-primary transition-all duration-300">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Shirt" size={20} className="text-black" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-foreground">
                {instruction?.productType}
              </h3>
              <p className="text-sm text-text-secondary">{instruction?.material}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-text-secondary hover:text-primary"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={20}
          />
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-secondary" />
            <span className="font-cta text-text-secondary">Care Time: {instruction?.careTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="AlertTriangle" size={14} className="text-warning" />
            <span className="font-cta text-text-secondary">Difficulty: {instruction?.difficulty}</span>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-4">
            {instruction?.steps?.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 ${getStepColor(step?.type)}`}>
                  <Icon name={getStepIcon(step?.type)} size={14} />
                </div>
                <div className="flex-1">
                  <h4 className="font-cta font-semibold text-foreground mb-1">
                    Step {index + 1}: {step?.title}
                  </h4>
                  <p className="text-sm text-text-secondary mb-2">
                    {step?.description}
                  </p>
                  {step?.warning && (
                    <div className="flex items-start space-x-2 p-2 bg-warning/10 border border-warning/30 rounded-md">
                      <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5" />
                      <p className="text-xs text-warning">{step?.warning}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-secondary" />
                <span className="text-sm font-cta text-text-secondary">
                  Recommended frequency: {instruction?.frequency}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetReminder(instruction)}
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                iconName="Bell"
                iconPosition="left"
                iconSize={14}
              >
                Set Reminder
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareInstructionCard;
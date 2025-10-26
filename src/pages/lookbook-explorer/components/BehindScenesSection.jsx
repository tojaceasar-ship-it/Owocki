import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BehindScenesSection = ({ behindScenesData }) => {
  const [activeTab, setActiveTab] = useState('process');

  const tabs = [
    { id: 'process', label: 'Design Process', icon: 'Palette' },
    { id: 'materials', label: 'Material Sourcing', icon: 'Package' },
    { id: 'interviews', label: 'Creator Interviews', icon: 'Mic' },
    { id: 'timeline', label: 'Development Timeline', icon: 'Calendar' }
  ];

  const renderTabContent = () => {
    const content = behindScenesData?.[activeTab];
    
    switch (activeTab) {
      case 'process':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content?.steps?.map((step, index) => (
                <div key={index} className="bg-surface/50 rounded-lg p-6 border border-border">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="font-cta font-bold text-sm text-black">{index + 1}</span>
                    </div>
                    <h4 className="font-cta font-semibold text-foreground">{step?.title}</h4>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{step?.description}</p>
                  {step?.image && (
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src={step?.image}
                        alt={step?.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'materials':
        return (
          <div className="space-y-6">
            {content?.sources?.map((source, index) => (
              <div key={index} className="bg-surface/50 rounded-lg p-6 border border-border">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={source?.image}
                      alt={source?.material}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-cta font-semibold text-foreground mb-2">{source?.material}</h4>
                    <p className="text-text-secondary text-sm mb-3">{source?.description}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} className="text-primary" />
                        <span className="text-text-secondary">{source?.origin}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Leaf" size={12} className="text-secondary" />
                        <span className="text-text-secondary">{source?.sustainability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'interviews':
        return (
          <div className="space-y-6">
            {content?.interviews?.map((interview, index) => (
              <div key={index} className="bg-surface/50 rounded-lg p-6 border border-border">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={interview?.avatar}
                      alt={interview?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-cta font-semibold text-foreground">{interview?.name}</h4>
                    <p className="text-text-secondary text-sm">{interview?.role}</p>
                  </div>
                </div>
                <blockquote className="text-text-secondary italic leading-relaxed mb-4">
                  "{interview?.quote}"
                </blockquote>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  iconName="Play"
                  iconPosition="left"
                  iconSize={14}
                >
                  Watch Full Interview
                </Button>
              </div>
            ))}
          </div>
        );
      
      case 'timeline':
        return (
          <div className="space-y-4">
            {content?.milestones?.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-primary rounded-full neon-glow-primary"></div>
                  {index < content?.milestones?.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-cta font-semibold text-foreground">{milestone?.title}</h4>
                    <span className="text-xs text-text-secondary bg-surface/50 px-2 py-1 rounded">
                      {milestone?.date}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm">{milestone?.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline font-bold text-4xl text-primary mb-4 glitch-text">
            Behind the Scenes
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Transparency in creation - see how authentic street luxury comes to life from concept to culture
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab?.id)}
              className={`font-cta ${
                activeTab === tab?.id 
                  ? 'bg-gradient-to-r from-primary to-secondary text-black neon-glow-primary' :'border-border text-text-secondary hover:text-primary hover:border-primary'
              }`}
              iconName={tab?.icon}
              iconPosition="left"
              iconSize={16}
            >
              {tab?.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border">
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
};

export default BehindScenesSection;
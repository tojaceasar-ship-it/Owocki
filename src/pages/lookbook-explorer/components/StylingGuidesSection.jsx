import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StylingGuidesSection = ({ stylingGuides }) => {
  const [selectedGuide, setSelectedGuide] = useState(0);
  const [downloadedGuides, setDownloadedGuides] = useState(new Set());

  const handleDownload = (guideId) => {
    setDownloadedGuides(prev => new Set([...prev, guideId]));
    // Simulate download
    setTimeout(() => {
      alert(`"${stylingGuides?.[guideId]?.title}" styling guide downloaded!`);
    }, 500);
  };

  const currentGuide = stylingGuides?.[selectedGuide];

  return (
    <section className="py-16 bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline font-bold text-4xl text-primary mb-4 glitch-text">
            Styling Guides
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Master the art of authentic street luxury with our comprehensive styling guides - from basics to advanced techniques
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Guide Navigation */}
          <div className="space-y-4">
            <h3 className="font-cta font-semibold text-lg text-foreground mb-4">
              Available Guides
            </h3>
            
            {stylingGuides?.map((guide, index) => (
              <div
                key={index}
                onClick={() => setSelectedGuide(index)}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 spray-paint-hover ${
                  selectedGuide === index
                    ? 'border-primary bg-primary/10 neon-glow-primary' :'border-border bg-card/50 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name={guide?.icon} size={20} className="text-primary" />
                  <h4 className="font-cta font-medium text-foreground text-sm">
                    {guide?.title}
                  </h4>
                </div>
                
                <p className="text-text-secondary text-xs mb-3">{guide?.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={12} className="text-secondary" />
                    <span className="text-text-secondary">{guide?.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-accent" />
                    <span className="text-text-secondary">{guide?.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guide Content */}
          <div className="lg:col-span-3">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
              {/* Guide Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={currentGuide?.coverImage}
                  alt={currentGuide?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name={currentGuide?.icon} size={24} className="text-primary" />
                    <span className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs font-cta text-primary">
                      {currentGuide?.category}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-2xl text-white mb-1">
                    {currentGuide?.title}
                  </h3>
                  <p className="text-white/80 text-sm">{currentGuide?.subtitle}</p>
                </div>
              </div>

              {/* Guide Meta */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-secondary" />
                      <span className="text-text-secondary">{currentGuide?.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={16} className="text-accent" />
                      <span className="text-text-secondary">{currentGuide?.difficulty}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Download" size={16} className="text-primary" />
                      <span className="text-text-secondary">{currentGuide?.downloads} downloads</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleDownload(selectedGuide)}
                    disabled={downloadedGuides?.has(selectedGuide)}
                    className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                    iconName={downloadedGuides?.has(selectedGuide) ? "Check" : "Download"}
                    iconPosition="left"
                    iconSize={16}
                  >
                    {downloadedGuides?.has(selectedGuide) ? 'Downloaded' : 'Download Guide'}
                  </Button>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  {currentGuide?.fullDescription}
                </p>
              </div>

              {/* Guide Steps */}
              <div className="p-6">
                <h4 className="font-cta font-semibold text-lg text-foreground mb-6">
                  Step-by-Step Guide
                </h4>
                
                <div className="space-y-6">
                  {currentGuide?.steps?.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <span className="font-cta font-bold text-sm text-black">{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h5 className="font-cta font-semibold text-foreground mb-2">
                          {step?.title}
                        </h5>
                        <p className="text-text-secondary text-sm leading-relaxed mb-3">
                          {step?.description}
                        </p>
                        
                        {step?.tips && (
                          <div className="bg-surface/50 rounded-lg p-3 border border-border">
                            <div className="flex items-start space-x-2">
                              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
                              <div>
                                <p className="text-xs font-cta font-medium text-accent mb-1">Pro Tip:</p>
                                <p className="text-text-secondary text-xs">{step?.tips}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {step?.image && (
                          <div className="mt-4 rounded-lg overflow-hidden">
                            <Image
                              src={step?.image}
                              alt={step?.title}
                              className="w-full h-32 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guide Footer */}
              <div className="p-6 border-t border-border bg-surface/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="ThumbsUp" size={16} className="text-secondary" />
                      <span className="text-text-secondary text-sm">{currentGuide?.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MessageCircle" size={16} className="text-accent" />
                      <span className="text-text-secondary text-sm">{currentGuide?.comments} comments</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                      iconName="Heart"
                      iconSize={16}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                      iconName="Share2"
                      iconSize={16}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StylingGuidesSection;
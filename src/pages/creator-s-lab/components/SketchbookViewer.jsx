import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SketchbookViewer = ({ sketches }) => {
  const [currentSketch, setCurrentSketch] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSketch = () => {
    setCurrentSketch((prev) => (prev + 1) % sketches?.length);
  };

  const prevSketch = () => {
    setCurrentSketch((prev) => (prev - 1 + sketches?.length) % sketches?.length);
  };

  const currentSketchData = sketches?.[currentSketch];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden neon-glow-accent">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="BookOpen" size={24} className="text-accent" />
            <div>
              <h3 className="font-headline font-bold text-lg text-foreground">Open Sketchbook</h3>
              <p className="text-text-secondary text-sm">Behind-the-scenes design process</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">
              {currentSketch + 1} of {sketches?.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-text-secondary hover:text-accent"
              iconName={isFullscreen ? "Minimize2" : "Maximize2"}
              iconSize={16}
            />
          </div>
        </div>
      </div>
      <div className={`relative ${isFullscreen ? 'h-96' : 'h-80'} bg-surface/30`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-2xl mx-auto p-4">
            <Image
              src={currentSketchData?.image}
              alt={currentSketchData?.title}
              className="w-full h-full object-contain rounded-lg"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSketch}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-black/70 hover:border-primary/50 transition-all duration-300 neon-glow-primary"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            
            <button
              onClick={nextSketch}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:bg-black/70 hover:border-primary/50 transition-all duration-300 neon-glow-primary"
            >
              <Icon name="ChevronRight" size={20} />
            </button>

            {/* Sketch Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-cta font-semibold text-foreground mb-1">{currentSketchData?.title}</h4>
                  <p className="text-text-secondary text-sm mb-2">{currentSketchData?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>Stage: <span className="text-primary">{currentSketchData?.stage}</span></span>
                    <span>Date: <span className="text-foreground">{currentSketchData?.date}</span></span>
                    <span>Artist: <span className="text-foreground">{currentSketchData?.artist}</span></span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-text-secondary hover:text-red-400"
                    iconName="Heart"
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-text-secondary hover:text-primary"
                    iconName="MessageCircle"
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-text-secondary hover:text-secondary"
                    iconName="Share2"
                    iconSize={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Thumbnail Navigation */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {sketches?.map((sketch, index) => (
            <button
              key={index}
              onClick={() => setCurrentSketch(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentSketch
                  ? 'border-accent neon-glow-accent' :'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={sketch?.thumbnail || sketch?.image}
                alt={sketch?.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SketchbookViewer;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CharacterSpotlight = ({ characters = [] }) => {
  const [activeCharacter, setActiveCharacter] = useState(0);

  return (
    <section className="py-20 bg-surface relative overflow-hidden">
      <div className="concrete-texture absolute inset-0 opacity-5"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ willChange: 'opacity, transform' }}
        >
          <h2 className="font-headline font-black text-4xl md:text-5xl text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Meet the Crew
            </span>
          </h2>
          <p className="font-cta text-xl text-text-secondary max-w-2xl mx-auto">
            Seven unique personalities, one authentic culture. Each character represents a different aspect of street life and urban creativity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Character Details */}
          {characters.length > 0 && (
            <motion.div 
              className="space-y-8"
              key={activeCharacter}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{ willChange: 'opacity, transform' }}
            >
              {/* Character Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${characters[activeCharacter]?.bgGradient} rounded-full flex items-center justify-center neon-glow-${characters[activeCharacter]?.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ willChange: 'transform' }}
                  >
                    <Icon name="User" size={24} className="text-foreground" />
                  </motion.div>
                  
                  <div>
                    <h3 className="font-headline font-bold text-3xl text-foreground">
                      {characters[activeCharacter]?.name}
                    </h3>
                    <p className="font-cta text-lg text-secondary">
                      {characters[activeCharacter]?.nickname} • {characters[activeCharacter]?.personality}
                    </p>
                  </div>
                </div>

                <div className="bg-card/50 border border-border rounded-lg p-6">
                  <blockquote className="font-cta text-lg text-foreground italic mb-4">
                    "{characters[activeCharacter]?.quote}"
                  </blockquote>
                  <div className="text-text-secondary whitespace-pre-line">
                    {characters[activeCharacter]?.backstory}
                  </div>
                </div>
              </div>

              {/* Character Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-cta font-semibold text-foreground">Personality Traits</h4>
                  <div className="space-y-2">
                    {characters[activeCharacter]?.traits?.map((trait, index) => (
                      <motion.div 
                        key={trait}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        style={{ willChange: 'opacity, transform' }}
                      >
                        <div className="w-2 h-2 bg-primary rounded-full neon-glow-primary"></div>
                        <span className="text-text-secondary">{trait}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-cta font-semibold text-foreground">Character Info</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-text-secondary text-sm">Favorite Spot:</span>
                      <p className="text-foreground">{characters[activeCharacter]?.favoriteSpot}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary text-sm">Signature Style:</span>
                      <p className="text-foreground">{characters[activeCharacter]?.signature}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/character-universe">
                  <Button
                    variant="default"
                    className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                    iconName="Users"
                    iconPosition="left"
                    iconSize={18}
                  >
                    Explore All Characters
                  </Button>
                </Link>

                <Link to="/interactive-experience-center">
                  <Button
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={18}
                  >
                    Which Fruit Are You?
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Character Carousel */}
          <div className="space-y-6">
            {/* Main Character Display */}
            {characters.length > 0 && (
              <motion.div 
                className="relative"
                key={`main-${activeCharacter}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{ willChange: 'opacity, transform' }}
              >
                <div className="relative w-full h-96 rounded-2xl overflow-hidden neon-glow-primary">
                  <Image
                    src={characters[activeCharacter]?.image}
                    alt={`${characters[activeCharacter]?.name} character portrait`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Character Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-headline font-bold text-lg text-primary">
                            {characters[activeCharacter]?.name}
                          </h4>
                          <p className="text-text-secondary text-sm">
                            {characters[activeCharacter]?.nickname}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-secondary font-cta font-semibold">
                            {characters[activeCharacter]?.personality}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Character Navigation */}
            <div className="grid grid-cols-7 gap-2">
              {characters.map((character, index) => (
                <motion.button
                  key={character?.id}
                  onClick={() => setActiveCharacter(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === activeCharacter
                      ? 'border-primary neon-glow-primary' :'border-border hover:border-secondary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ willChange: 'transform' }}
                >
                  <Image
                    src={character?.image}
                    alt={`${character?.name} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  {index === activeCharacter && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ willChange: 'transform' }}
                    >
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center neon-glow-primary">
                        <Icon name="Check" size={12} className="text-black" />
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Navigation Hint */}
            <div className="text-center">
              <p className="text-text-secondary text-sm font-cta">
                Click any character to learn their story
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterSpotlight;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const heroSlides = [
    {
      id: 1,
      character: "Watermelon Willie",
      title: "Rep Your Hood with Pride",
      subtitle: "Fresh from the streets, designed for the culture",
      description: `Every piece tells a story of resilience, creativity, and community.\nJoin the movement that celebrates authentic street culture.`,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      cta: "Meet the Crew",
      ctaLink: "/character-universe",
      bgGradient: "from-primary/20 via-secondary/10 to-accent/20"
    },
    {
      id: 2,
      character: "Apple Annie",
      title: "Art from the Streets",
      subtitle: "Quality for the culture, designed by the community",
      description: `Where graffiti meets fashion, where beats meet threads.\nAuthentic streetwear that never forgets its roots.`,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      cta: "Explore Gallery",
      ctaLink: "/community-gallery",
      bgGradient: "from-secondary/20 via-accent/10 to-primary/20"
    },
    {
      id: 3,
      character: "Banana Bobby",
      title: "Every Fruit Has a Story",
      subtitle: "What\'s yours?",
      description: `Take the quiz, find your character, join your tribe.\nDiscover which fruit represents your street spirit.`,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      cta: "Take Quiz",
      ctaLink: "/interactive-experience-center",
      bgGradient: "from-accent/20 via-primary/10 to-secondary/20"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, heroSlides?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
  };

  const currentHero = heroSlides?.[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${currentHero?.bgGradient}`}
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="concrete-texture absolute inset-0 opacity-10"></div>
        <div className="street-light absolute inset-0"></div>
      </div>
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="text-center lg:text-left"
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="mb-6">
              <motion.span 
                className="inline-block px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary font-cta font-semibold text-sm neon-glow-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {currentHero?.character}
              </motion.span>
            </div>

            <motion.h1 
              className="font-headline font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent neon-glow-primary">
                {currentHero?.title}
              </span>
            </motion.h1>

            <motion.p 
              className="font-cta text-xl md:text-2xl text-secondary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentHero?.subtitle}
            </motion.p>

            <motion.div 
              className="text-text-secondary text-lg mb-8 whitespace-pre-line"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {currentHero?.description}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ willChange: 'opacity, transform' }}
            >
              <Link to={currentHero?.ctaLink}>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary hover:neon-pulse"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={20}
                >
                  {currentHero?.cta}
                </Button>
              </Link>

              <Link to="/lookbook-explorer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
                  iconName="BookOpen"
                  iconPosition="left"
                  iconSize={20}
                >
                  Browse Lookbook
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Character Visual */}
          <motion.div 
            className="relative"
            key={`image-${currentSlide}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden neon-glow-primary">
              <Image
                src={currentHero?.image}
                alt={`${currentHero?.character} street style`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Character Badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg p-4">
                  <h3 className="font-headline font-bold text-lg text-primary mb-1">
                    {currentHero?.character}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Street Legend • Hood Representative
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center neon-glow-accent"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              style={{ willChange: 'transform' }}
            >
              <Icon name="Crown" size={24} className="text-black" />
            </motion.div>

            <motion.div 
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center neon-glow-secondary"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ willChange: 'transform' }}
            >
              <Icon name="Zap" size={16} className="text-black" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4 bg-card/80 backdrop-blur-md border border-border rounded-full px-6 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="text-text-secondary hover:text-primary w-8 h-8"
            iconName="ChevronLeft"
            iconSize={16}
          />

          <div className="flex space-x-2">
            {heroSlides?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary neon-glow-primary w-6' :'bg-text-secondary/50 hover:bg-text-secondary'
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="text-text-secondary hover:text-primary w-8 h-8"
            iconName="ChevronRight"
            iconSize={16}
          />

          <div className="w-px h-6 bg-border mx-2"></div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-text-secondary hover:text-primary w-8 h-8"
            iconName={isPlaying ? "Pause" : "Play"}
            iconSize={16}
          />
        </div>
      </div>
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-4 right-8 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ willChange: 'transform' }}
      >
        <div className="flex flex-col items-center space-y-2 text-text-secondary">
          <span className="text-xs font-cta font-medium">Scroll</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
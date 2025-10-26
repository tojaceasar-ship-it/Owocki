import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LookbookPreview = () => {
  const [activeCollection, setActiveCollection] = useState(0);

  const collections = [
    {
      id: 1,
      title: "Urban Legends",
      season: "Fall 2024",
      theme: "Street Royalty",
      description: `Where the concrete jungle meets high fashion.\nBold statements for those who rule the streets.`,
      mood: "Powerful • Confident • Authentic",
      colorPalette: ["#FFD700", "#000000", "#FF4500", "#FFFFFF"],
      totalLooks: 12,
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop"
      ],
      playlist: "Hood Anthems Vol. 1",
      inspiration: "90s Hip-Hop Culture"
    },
    {
      id: 2,
      title: "Neon Nights",
      season: "Winter 2024",
      theme: "Electric Dreams",
      description: `When the city lights up, so do we.\nGlow-in-the-dark vibes for the night owls.`,
      mood: "Electric • Vibrant • Futuristic",
      colorPalette: ["#00CED1", "#FF4500", "#32CD32", "#000000"],
      totalLooks: 8,
      featured: false,
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=400&h=600&fit=crop"
      ],
      playlist: "Midnight Vibes",
      inspiration: "Cyberpunk Aesthetics"
    },
    {
      id: 3,
      title: "Block Party",
      season: "Spring 2024",
      theme: "Community Celebration",
      description: `Fresh fits for the freshest gatherings.\nWhere style meets celebration.`,
      mood: "Joyful • Community • Fresh",
      colorPalette: ["#32CD32", "#FFD700", "#00CED1", "#FFFFFF"],
      totalLooks: 15,
      featured: false,
      images: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop"
      ],
      playlist: "Block Party Bangers",
      inspiration: "Community Gatherings"
    }
  ];

  const currentCollection = collections?.[activeCollection];

  const behindTheScenes = [
    {
      id: 1,
      title: "Design Process",
      description: "From sketch to street",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      type: "Process"
    },
    {
      id: 2,
      title: "Photoshoot Day",
      description: "Capturing the culture",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
      type: "Behind Scenes"
    },
    {
      id: 3,
      title: "Community Input",
      description: "Your voice, our vision",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      type: "Community"
    }
  ];

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
        >
          <h2 className="font-headline font-black text-4xl md:text-5xl text-foreground mb-4">
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Latest Lookbooks
            </span>
          </h2>
          <p className="font-cta text-xl text-text-secondary max-w-2xl mx-auto">
            Editorial-quality content that positions products within lifestyle contexts, emphasizing culture over commerce.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Collection Details */}
          <motion.div 
            className="space-y-8"
            key={activeCollection}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Collection Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {currentCollection?.featured && (
                  <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-primary text-xs font-cta font-bold neon-glow-primary">
                    FEATURED
                  </div>
                )}
                <div className="px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full text-secondary text-xs font-cta font-semibold">
                  {currentCollection?.season}
                </div>
              </div>

              <h3 className="font-headline font-black text-3xl md:text-4xl text-foreground">
                {currentCollection?.title}
              </h3>
              
              <p className="font-cta text-xl text-secondary">
                {currentCollection?.theme}
              </p>

              <div className="text-text-secondary whitespace-pre-line">
                {currentCollection?.description}
              </div>
            </div>

            {/* Collection Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Palette" size={20} className="text-primary" />
                  <h4 className="font-cta font-semibold text-foreground">Color Palette</h4>
                </div>
                <div className="flex space-x-2">
                  {currentCollection?.colorPalette?.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Image" size={20} className="text-secondary" />
                  <h4 className="font-cta font-semibold text-foreground">Collection Info</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Total Looks:</span>
                    <span className="text-foreground font-semibold">{currentCollection?.totalLooks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Mood:</span>
                    <span className="text-foreground font-semibold">{currentCollection?.mood}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="Music" size={18} className="text-accent" />
                <span className="text-text-secondary">Playlist:</span>
                <span className="text-foreground font-cta font-semibold">{currentCollection?.playlist}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Lightbulb" size={18} className="text-warning" />
                <span className="text-text-secondary">Inspiration:</span>
                <span className="text-foreground font-cta font-semibold">{currentCollection?.inspiration}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/lookbook-explorer">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                  iconName="BookOpen"
                  iconPosition="left"
                  iconSize={20}
                >
                  Explore Full Lookbook
                </Button>
              </Link>

              <Link to="/creator-s-lab">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground neon-glow-accent"
                  iconName="Palette"
                  iconPosition="left"
                  iconSize={20}
                >
                  Behind the Scenes
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Visual Gallery */}
          <div className="space-y-6">
            {/* Main Collection Images */}
            <motion.div 
              className="grid grid-cols-3 gap-4"
              key={`gallery-${activeCollection}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {currentCollection?.images?.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-[3/4] rounded-lg overflow-hidden neon-glow-primary hover:neon-pulse transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Image
                    src={image}
                    alt={`${currentCollection?.title} look ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Look Number */}
                  <div className="absolute top-2 left-2">
                    <div className="w-8 h-8 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-black font-cta font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Collection Navigation */}
            <div className="flex justify-center space-x-2">
              {collections?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCollection(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeCollection
                      ? 'bg-primary neon-glow-primary w-8' :'bg-text-secondary/50 hover:bg-text-secondary'
                  }`}
                />
              ))}
            </div>

            {/* Behind the Scenes */}
            <div className="space-y-4">
              <h4 className="font-cta font-semibold text-foreground flex items-center space-x-2">
                <Icon name="Camera" size={18} className="text-secondary" />
                <span>Behind the Scenes</span>
              </h4>
              
              <div className="grid grid-cols-3 gap-3">
                {behindTheScenes?.map((item, index) => (
                  <motion.div
                    key={item?.id}
                    className="relative aspect-video rounded-lg overflow-hidden border border-border hover:border-secondary transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-3">
                      <div className="text-xs">
                        <div className="text-secondary font-cta font-semibold mb-1">
                          {item?.type}
                        </div>
                        <div className="text-white font-medium">
                          {item?.title}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Collection Navigation Cards */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="font-cta font-semibold text-foreground text-center mb-8">
            All Collections
          </h4>
          
          <div className="grid md:grid-cols-3 gap-6">
            {collections?.map((collection, index) => (
              <motion.button
                key={collection?.id}
                onClick={() => setActiveCollection(index)}
                className={`text-left p-6 rounded-xl border transition-all duration-300 ${
                  index === activeCollection
                    ? 'bg-primary/10 border-primary neon-glow-primary' :'bg-card/30 border-border hover:border-secondary hover:bg-surface/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-headline font-bold text-lg text-foreground">
                    {collection?.title}
                  </h5>
                  {collection?.featured && (
                    <Icon name="Star" size={16} className="text-primary" />
                  )}
                </div>
                
                <p className="text-text-secondary text-sm mb-2">
                  {collection?.season} • {collection?.totalLooks} looks
                </p>
                
                <p className="text-secondary font-cta font-medium">
                  {collection?.theme}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LookbookPreview;
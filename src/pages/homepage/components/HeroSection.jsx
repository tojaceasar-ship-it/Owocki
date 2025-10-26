import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../../../lib/sanity';

const HeroSection = () => {
  const [heroSlides, setHeroSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        setLoading(true);
        const data = await client.fetch('*[_type == "homepageContent"]');
        if (data && data.length > 0 && data[0].heroSlides) {
          setHeroSlides(data[0].heroSlides);
        } else {
          setError('No hero content available at the moment.');
        }
        setLoading(false);
      } catch (err) {
        setError('Error loading hero content. Please try again later.');
        setLoading(false);
        console.error('Error fetching hero slides:', err);
      }
    };

    fetchHeroSlides();
  }, []);

  useEffect(() => {
    if (heroSlides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000); // Auto-rotate every 5 seconds

      return () => clearInterval(interval);
    }
  }, [heroSlides]);

  if (loading) return <div className="text-center py-20 text-white">Loading hero content...</div>;
  if (error || heroSlides.length === 0) return <div className="text-center py-20 text-red-500">{error || 'No hero content available.'}</div>;

  const currentSlideData = heroSlides[currentSlide];

  return (
    <motion.div 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Image with Animation */}
      <motion.img
        src={currentSlideData.imageUrl}
        alt={currentSlideData.title}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5 }}
        key={`bg-${currentSlide}`}
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-neon-pink font-graffiti mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          key={`title-${currentSlide}`}
        >
          {currentSlideData.title}
        </motion.h1>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white font-graffiti mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          key={`subtitle-${currentSlide}`}
        >
          {currentSlideData.subtitle}
        </motion.h2>
        <motion.p
          className="text-xl text-white mb-8 max-w-2xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          key={`desc-${currentSlide}`}
        >
          {currentSlideData.description}
        </motion.p>
        <motion.a
          href={currentSlideData.ctaLink}
          className="inline-block bg-neon-pink text-black px-6 py-3 rounded-md font-bold text-lg hover:bg-neon-pink-dark transition-colors duration-200"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          key={`cta-${currentSlide}`}
        >
          {currentSlideData.cta}
        </motion.a>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-neon-pink' : 'bg-gray-400'}`}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HeroSection;
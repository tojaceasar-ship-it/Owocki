import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialProofMetrics = () => {
  const [counters, setCounters] = useState({
    members: 0,
    designs: 0,
    cities: 0,
    satisfaction: 0
  });

  const finalValues = {
    members: 47200,
    designs: 8900,
    cities: 156,
    satisfaction: 98
  };

  const metrics = [
    {
      id: 'members',
      label: 'Community Members',
      value: counters?.members,
      finalValue: finalValues?.members,
      icon: 'Users',
      color: 'primary',
      suffix: '+',
      description: 'Active creators worldwide'
    },
    {
      id: 'designs',
      label: 'Unique Designs',
      value: counters?.designs,
      finalValue: finalValues?.designs,
      icon: 'Palette',
      color: 'secondary',
      suffix: '+',
      description: 'Community-inspired pieces'
    },
    {
      id: 'cities',
      label: 'Cities Represented',
      value: counters?.cities,
      finalValue: finalValues?.cities,
      icon: 'MapPin',
      color: 'accent',
      suffix: '',
      description: 'Global street culture'
    },
    {
      id: 'satisfaction',
      label: 'Satisfaction Rate',
      value: counters?.satisfaction,
      finalValue: finalValues?.satisfaction,
      icon: 'Heart',
      color: 'success',
      suffix: '%',
      description: 'Customer happiness'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marcus Thompson",
      role: "Street Artist",
      location: "Brooklyn, NY",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      quote: "Finally, a brand that gets it. The quality is premium but the culture is authentic.",
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: "Zara Rodriguez",
      role: "Fashion Blogger",
      location: "Los Angeles, CA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=100&h=100&fit=crop",
      quote: "Every piece tells a story. This isn't just clothing, it's cultural expression.",
      rating: 5,
      verified: true
    },
    {
      id: 3,
      name: "DJ Carlos",
      role: "Music Producer",
      location: "Atlanta, GA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      quote: "The community aspect is unreal. It\'s like wearing your neighborhood with pride.",
      rating: 5,
      verified: true
    }
  ];

  const achievements = [
    {
      title: "Featured in Complex Magazine",
      description: "Recognized as \'Brand to Watch 2024'",
      icon: "Award",
      date: "Dec 2024"
    },
    {
      title: "Community Choice Award",
      description: "Voted #1 by Street Culture Forum",
      icon: "Trophy",
      date: "Nov 2024"
    },
    {
      title: "Sustainability Leader",
      description: "Certified B-Corp for ethical practices",
      icon: "Leaf",
      date: "Oct 2024"
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setCounters(prev => {
        const newCounters = {};
        let allComplete = true;

        Object.keys(finalValues)?.forEach(key => {
          const current = prev?.[key];
          const target = finalValues?.[key];
          const increment = target / steps;
          
          if (current < target) {
            newCounters[key] = Math.min(current + increment, target);
            allComplete = false;
          } else {
            newCounters[key] = target;
          }
        });

        if (allComplete) {
          clearInterval(interval);
        }

        return newCounters;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return Math.round(num)?.toLocaleString();
  };

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
            <span className="bg-gradient-to-r from-success via-primary to-secondary bg-clip-text text-transparent">
              Trusted by the Culture
            </span>
          </h2>
          <p className="font-cta text-xl text-text-secondary max-w-2xl mx-auto">
            Real numbers from real people who represent authentic street culture worldwide.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics?.map((metric, index) => (
            <motion.div
              key={metric?.id}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-card/50 border border-border rounded-2xl p-8 hover:neon-glow-primary transition-all duration-300">
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br from-${metric?.color} to-${metric?.color}/70 rounded-full flex items-center justify-center mx-auto mb-6 neon-glow-${metric?.color}`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon name={metric?.icon} size={24} className="text-black" />
                </motion.div>

                <motion.div 
                  className="font-headline font-black text-4xl md:text-5xl text-foreground mb-2"
                  key={metric?.value}
                >
                  {metric?.id === 'satisfaction' ? 
                    Math.round(metric?.value) : 
                    formatNumber(metric?.value)
                  }{metric?.suffix}
                </motion.div>

                <h3 className="font-cta font-bold text-lg text-foreground mb-2">
                  {metric?.label}
                </h3>

                <p className="text-text-secondary text-sm">
                  {metric?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="font-headline font-bold text-3xl text-foreground text-center mb-12">
            What the Community Says
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <motion.div
                key={testimonial?.id}
                className="bg-card/50 border border-border rounded-2xl p-6 hover:border-primary hover:neon-glow-primary transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-primary fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground mb-6 font-cta text-lg">
                  "{testimonial?.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-12 h-12 rounded-full border-2 border-primary neon-glow-primary"
                    />
                    {testimonial?.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
                        <Icon name="Check" size={10} className="text-black" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-cta font-bold text-foreground">
                      {testimonial?.name}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {testimonial?.role} • {testimonial?.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="font-headline font-bold text-3xl text-foreground text-center mb-12">
            Recognition & Awards
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements?.map((achievement, index) => (
              <motion.div
                key={achievement?.title}
                className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-primary/20 rounded-xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 neon-glow-primary">
                  <Icon name={achievement?.icon} size={20} className="text-black" />
                </div>

                <h4 className="font-cta font-bold text-foreground mb-2">
                  {achievement?.title}
                </h4>

                <p className="text-text-secondary text-sm mb-3">
                  {achievement?.description}
                </p>

                <div className="text-xs text-secondary font-cta font-semibold">
                  {achievement?.date}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-card/30 border border-border rounded-2xl p-8">
            <div className="flex flex-wrap justify-center items-center gap-8 text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="font-cta font-medium">Secure Payments</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={20} className="text-primary" />
                <span className="font-cta font-medium">Free Shipping</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="RotateCcw" size={20} className="text-secondary" />
                <span className="font-cta font-medium">30-Day Returns</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Headphones" size={20} className="text-accent" />
                <span className="font-cta font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofMetrics;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityShowcase = () => {
  const [activeTab, setActiveTab] = useState('featured');

  const featuredMembers = [
    {
      id: 1,
      username: "StreetArtist_Maya",
      realName: "Maya Rodriguez",
      location: "Brooklyn, NY",
      level: "Hood Legend",
      badgeCount: 47,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=150&h=150&fit=crop",
      featuredImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      description: `Maya's street art inspired design just dropped and it's already making waves in the community.\nHer unique blend of graffiti and fashion is pure fire.`,
      achievement: "Community Artist of the Month",
      likes: 2847,
      comments: 156,
      shares: 89,
      tags: ["#StreetArt", "#FreshDesign", "#CommunityLove"]
    },
    {
      id: 2,
      username: "BeatMaker_Carlos",
      realName: "Carlos Johnson",
      location: "Atlanta, GA",
      level: "Culture Creator",
      badgeCount: 32,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      description: `Carlos created the perfect playlist to match our latest drop.\nMusic and fashion coming together like never before.`,
      achievement: "Playlist Curator Champion",
      likes: 1923,
      comments: 98,
      shares: 67,
      tags: ["#MusicMeetsStyle", "#PlaylistCurator", "#VibeCheck"]
    },
    {
      id: 3,
      username: "StyleIcon_Zara",
      realName: "Zara Kim",
      location: "Los Angeles, CA",
      level: "Trendsetter",
      badgeCount: 28,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      description: `Zara's styling game is unmatched. She took our basic pieces and created something extraordinary.\nThis is what community creativity looks like.`,
      achievement: "Style Challenge Winner",
      likes: 3156,
      comments: 203,
      shares: 124,
      tags: ["#StyleChallenge", "#CreativeGenius", "#FashionForward"]
    }
  ];

  const communityStats = [
    {
      label: "Active Members",
      value: "47.2K",
      icon: "Users",
      color: "primary",
      growth: "+12%"
    },
    {
      label: "Styles Shared",
      value: "8.9K",
      icon: "Image",
      color: "secondary",
      growth: "+28%"
    },
    {
      label: "Fan Art Created",
      value: "2.1K",
      icon: "Palette",
      color: "accent",
      growth: "+45%"
    },
    {
      label: "Community Votes",
      value: "156K",
      icon: "Heart",
      color: "success",
      growth: "+67%"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: "DesignMaster_Alex",
      action: "submitted new fan art",
      item: "Watermelon Willie Portrait",
      time: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=50&h=50&fit=crop"
    },
    {
      id: 2,
      user: "StyleGuru_Sam",
      action: "won the weekly style challenge",
      item: "Street Casual Look",
      time: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=50&h=50&fit=crop"
    },
    {
      id: 3,
      user: "ArtCollector_Jamie",
      action: "earned achievement badge",
      item: "Community Supporter",
      time: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=50&h=50&fit=crop"
    },
    {
      id: 4,
      user: "MusicLover_Rio",
      action: "created playlist",
      item: "Hood Vibes Vol. 3",
      time: "2 days ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop"
    }
  ];

  const tabs = [
    { id: 'featured', label: 'Featured Members', icon: 'Star' },
    { id: 'stats', label: 'Community Stats', icon: 'BarChart3' },
    { id: 'activity', label: 'Recent Activity', icon: 'Activity' }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
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
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              Community Culture
            </span>
          </h2>
          <p className="font-cta text-xl text-text-secondary max-w-2xl mx-auto">
            Real people, real style, real culture. See how our community is shaping the future of street fashion.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-card/50 backdrop-blur-md border border-border rounded-full p-2">
            <div className="flex space-x-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-cta font-medium transition-all duration-300 ${
                    activeTab === tab?.id
                      ? 'bg-primary text-black neon-glow-primary' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === 'featured' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMembers?.map((member, index) => (
                <motion.div
                  key={member?.id}
                  className="bg-card/50 border border-border rounded-2xl overflow-hidden neon-glow-primary hover:neon-pulse transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Featured Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={member?.featuredImage}
                      alt={`${member?.username} featured content`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Achievement Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-primary/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-cta font-bold">
                        {member?.achievement}
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <Image
                          src={member?.avatar}
                          alt={`${member?.username} avatar`}
                          className="w-12 h-12 rounded-full border-2 border-primary neon-glow-primary"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-cta font-bold text-foreground">
                          {member?.realName}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          @{member?.username}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-secondary">
                          <Icon name="Award" size={14} />
                          <span className="text-xs font-cta font-semibold">
                            {member?.badgeCount}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary">
                          {member?.level}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-text-secondary text-sm whitespace-pre-line">
                        {member?.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-surface/50 border border-border rounded-full text-xs text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between text-text-secondary text-sm">
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={14} />
                        <span>{member?.likes?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageCircle" size={14} />
                        <span>{member?.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Share" size={14} />
                        <span>{member?.shares}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityStats?.map((stat, index) => (
                <motion.div
                  key={stat?.label}
                  className="bg-card/50 border border-border rounded-2xl p-6 text-center neon-glow-primary"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-${stat?.color} to-${stat?.color}/70 rounded-full flex items-center justify-center mx-auto mb-4 neon-glow-${stat?.color}`}>
                    <Icon name={stat?.icon} size={24} className="text-black" />
                  </div>
                  
                  <h3 className="font-headline font-bold text-3xl text-foreground mb-2">
                    {stat?.value}
                  </h3>
                  
                  <p className="font-cta text-text-secondary mb-2">
                    {stat?.label}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-1 text-success text-sm">
                    <Icon name="TrendingUp" size={14} />
                    <span>{stat?.growth} this month</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-card/50 border border-border rounded-2xl overflow-hidden">
                {recentActivity?.map((activity, index) => (
                  <motion.div
                    key={activity?.id}
                    className="flex items-center space-x-4 p-6 border-b border-border last:border-b-0 hover:bg-surface/30 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Image
                      src={activity?.avatar}
                      alt={`${activity?.user} avatar`}
                      className="w-10 h-10 rounded-full border border-border"
                    />
                    
                    <div className="flex-1">
                      <p className="text-foreground">
                        <span className="font-cta font-semibold text-primary">
                          {activity?.user}
                        </span>
                        {' '}
                        <span className="text-text-secondary">
                          {activity?.action}
                        </span>
                        {' '}
                        <span className="font-cta font-medium text-secondary">
                          "{activity?.item}"
                        </span>
                      </p>
                      <p className="text-text-secondary text-sm">
                        {activity?.time}
                      </p>
                    </div>

                    <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
            <h3 className="font-headline font-bold text-2xl text-foreground mb-4">
              Ready to Join the Culture?
            </h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Share your style, connect with creators, and become part of the most authentic street culture community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/community-gallery">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                  iconName="Users"
                  iconPosition="left"
                  iconSize={20}
                >
                  Join Community
                </Button>
              </Link>

              <Link to="/personal-dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
                  iconName="User"
                  iconPosition="left"
                  iconSize={20}
                >
                  Create Profile
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityShowcase;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import PersonalityProfile from './components/PersonalityProfile';
import WishlistMoodboard from './components/WishlistMoodboard';
import AchievementTracker from './components/AchievementTracker';
import ActivityFeed from './components/ActivityFeed';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import CommunityParticipation from './components/CommunityParticipation';
import DigitalCollection from './components/DigitalCollection';
import Button from '../../components/ui/Button';
import { client } from '../../lib/sanity';


const PersonalDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [dashboardData, setDashboardData] = useState({
    userProfile: {},
    personalityData: {},
    preferredCharacters: [],
    wishlistItems: [],
    achievements: [],
    recentAchievements: [],
    progressStats: [],
    activities: [],
    recommendations: {},
    participationData: {},
    communityStats: [],
    recentContributions: [],
    tradingCards: [],
    seasonalContent: [],
    exclusiveUnlocks: []
  });
  const [loading, setLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch('*[_type == "personalDashboardContent"]');
        if (data.length > 0) {
          setDashboardData({
            userProfile: data[0].userProfile || {},
            personalityData: data[0].personalityData || {},
            preferredCharacters: data[0].preferredCharacters || [],
            wishlistItems: data[0].wishlistItems || [],
            achievements: data[0].achievements || [],
            recentAchievements: data[0].recentAchievements || [],
            progressStats: data[0].progressStats || [],
            activities: data[0].activities || [],
            recommendations: data[0].recommendations || {},
            participationData: data[0].participationData || {},
            communityStats: data[0].communityStats || [],
            recentContributions: data[0].recentContributions || [],
            tradingCards: data[0].tradingCards || [],
            seasonalContent: data[0].seasonalContent || [],
            exclusiveUnlocks: data[0].exclusiveUnlocks || []
          });
          setCurrentStreak(data[0].currentStreak || 0);
        }
      } catch (error) {
        console.error('Error fetching dashboard data from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleRemoveFromWishlist = (itemId) => {
    console.log('Remove item from wishlist:', itemId);
  };

  const handleCreateMoodboard = () => {
    console.log('Create new moodboard');
  };

  const handleLoadMoreActivity = () => {
    console.log('Load more activity');
  };

  const handleAddToWishlist = (item) => {
    console.log('Add to wishlist:', item);
  };

  const handleViewItem = (item) => {
    console.log('View item:', item);
  };

  const layoutOptions = [
    { id: 'default', label: 'Default', icon: 'LayoutGrid' },
    { id: 'compact', label: 'Compact', icon: 'LayoutList' },
    { id: 'focus', label: 'Focus', icon: 'Maximize2' }
  ];

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Personal Dashboard - Fruits From Da Hood</title>
        <meta name="description" content="Your personalized dashboard with wishlists, achievements, and community participation tracking." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard Controls */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-headline text-3xl font-bold text-primary mb-2">
                  Your Dashboard
                </h1>
                <p className="text-text-secondary font-cta">
                  Track your journey through the culture
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-surface/30 p-1 rounded-lg">
                  {layoutOptions?.map((option) => (
                    <Button
                      key={option?.id}
                      variant={dashboardLayout === option?.id ? 'default' : 'ghost'}
                      size="sm"
                      iconName={option?.icon}
                      iconSize={16}
                      onClick={() => setDashboardLayout(option?.id)}
                      title={option?.label}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                  iconSize={16}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Customize
                </Button>
              </div>
            </div>

            {/* Dashboard Header */}
            <div className="mb-8">
              <DashboardHeader 
                userProfile={dashboardData.userProfile}
                currentStreak={currentStreak}
              />
            </div>

            {/* Dashboard Grid */}
            <div className={`grid gap-8 ${
              dashboardLayout === 'compact' ?'grid-cols-1 lg:grid-cols-2' 
                : dashboardLayout === 'focus' ?'grid-cols-1' :'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
            }`}>
              {/* Personality Profile */}
              <div className={dashboardLayout === 'focus' ? 'lg:col-span-1' : 'lg:col-span-1'}>
                <PersonalityProfile 
                  personalityData={dashboardData.personalityData}
                  preferredCharacters={dashboardData.preferredCharacters}
                />
              </div>

              {/* Wishlist Moodboard */}
              <div className={dashboardLayout === 'focus' ? 'lg:col-span-1' : 'lg:col-span-1'}>
                <WishlistMoodboard 
                  wishlistItems={dashboardData.wishlistItems}
                  onRemoveItem={handleRemoveFromWishlist}
                  onCreateMoodboard={handleCreateMoodboard}
                />
              </div>

              {/* Achievement Tracker */}
              <div className={dashboardLayout === 'compact' ? 'lg:col-span-2' : dashboardLayout === 'focus' ? 'lg:col-span-1' : 'xl:col-span-1'}>
                <AchievementTracker 
                  achievements={dashboardData.achievements}
                  recentAchievements={dashboardData.recentAchievements}
                  progressStats={dashboardData.progressStats}
                />
              </div>

              {/* Activity Feed */}
              <div className={dashboardLayout === 'compact' ? 'lg:col-span-1' : dashboardLayout === 'focus' ? 'lg:col-span-1' : 'lg:col-span-1'}>
                <ActivityFeed 
                  activities={dashboardData.activities}
                  onLoadMore={handleLoadMoreActivity}
                />
              </div>

              {/* Personalized Recommendations */}
              <div className={dashboardLayout === 'compact' ? 'lg:col-span-1' : dashboardLayout === 'focus' ? 'lg:col-span-1' : 'lg:col-span-1'}>
                <PersonalizedRecommendations 
                  recommendations={dashboardData.recommendations}
                  onAddToWishlist={handleAddToWishlist}
                  onViewItem={handleViewItem}
                />
              </div>

              {/* Community Participation */}
              <div className={dashboardLayout === 'compact' ? 'lg:col-span-2' : dashboardLayout === 'focus' ? 'lg:col-span-1' : 'xl:col-span-1'}>
                <CommunityParticipation 
                  participationData={dashboardData.participationData}
                  recentContributions={dashboardData.recentContributions}
                  communityStats={dashboardData.communityStats}
                />
              </div>

              {/* Digital Collection */}
              <div className={dashboardLayout === 'focus' ? 'lg:col-span-1' : 'lg:col-span-2 xl:col-span-3'}>
                <DigitalCollection 
                  tradingCards={dashboardData.tradingCards}
                  seasonalContent={dashboardData.seasonalContent}
                  exclusiveUnlocks={dashboardData.exclusiveUnlocks}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-xl neon-glow-primary">
              <div className="text-center mb-6">
                <h2 className="font-headline text-2xl font-bold text-primary mb-2">
                  Ready to Level Up?
                </h2>
                <p className="text-text-secondary font-cta">
                  Explore more ways to engage with the culture and earn rewards
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button
                  variant="default"
                  fullWidth
                  iconName="Users"
                  iconPosition="left"
                  iconSize={16}
                  className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold"
                >
                  Join Community
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Palette"
                  iconPosition="left"
                  iconSize={16}
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  Create Art
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="ShoppingBag"
                  iconPosition="left"
                  iconSize={16}
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Shop Style
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Trophy"
                  iconPosition="left"
                  iconSize={16}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  View Achievements
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PersonalDashboard;
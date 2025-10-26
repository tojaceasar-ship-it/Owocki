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
    // Simulate fetching data from CMS
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Mock CMS data
        const mockData = {
          userProfile: {
            name: "Marcus Rivera",
            title: "Street Style Creator",
            level: 7,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            achievements: 23,
            wishlistItems: 12,
            contributions: 45,
            communityRank: "Hood Legend"
          },
          personalityData: {
            type: "Creative Innovator",
            description: "You blend artistic vision with street authenticity, always pushing boundaries while staying true to your roots.",
            traits: ["Creative", "Authentic", "Trendsetter", "Community-minded"],
            character: {
              name: "Mango Mike",
              image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop"
            }
          },
          preferredCharacters: [
            {
              id: 1,
              name: "Watermelon Wayne",
              image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
              compatibility: 95
            },
            {
              id: 2,
              name: "Apple Annie",
              image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop",
              compatibility: 87
            },
            {
              id: 3,
              name: "Grape Gary",
              image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=100&h=100&fit=crop",
              compatibility: 82
            }
          ],
          wishlistItems: [
            {
              id: 1,
              name: "Hood Classic Hoodie",
              price: 89.99,
              image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
              addedDate: "2 days ago",
              character: {
                name: "Watermelon Wayne",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop"
              }
            },
            {
              id: 2,
              name: "Street Gold Chain",
              price: 129.99,
              image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
              addedDate: "5 days ago",
              character: {
                name: "Mango Mike",
                image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=50&h=50&fit=crop"
              }
            },
            {
              id: 3,
              name: "Urban Kicks",
              price: 159.99,
              image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
              addedDate: "1 week ago",
              character: {
                name: "Apple Annie",
                image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=50&h=50&fit=crop"
              }
            }
          ],
          achievements: [
            {
              id: 1,
              name: "First Steps",
              type: "community",
              rarity: "common",
              unlocked: true
            },
            {
              id: 2,
              name: "Style Master",
              type: "style",
              rarity: "epic",
              unlocked: true
            },
            {
              id: 3,
              name: "Community Hero",
              type: "community",
              rarity: "legendary",
              unlocked: true
            },
            {
              id: 4,
              name: "Quiz Champion",
              type: "quiz",
              rarity: "rare",
              unlocked: true
            },
            {
              id: 5,
              name: "Collector",
              type: "collector",
              rarity: "epic",
              unlocked: false
            },
            {
              id: 6,
              name: "Creator",
              type: "creator",
              rarity: "legendary",
              unlocked: false
            }
          ],
          recentAchievements: [
            {
              id: 1,
              name: "15-Day Streak",
              description: "Visited the platform for 15 consecutive days",
              type: "streak",
              unlockedDate: "Today"
            },
            {
              id: 2,
              name: "Style Influencer",
              description: "Your style post got 50+ likes",
              type: "social",
              unlockedDate: "2 days ago"
            }
          ],
          progressStats: [
            {
              id: 1,
              name: "Community",
              progress: 75,
              current: 15,
              total: 20
            },
            {
              id: 2,
              name: "Style",
              progress: 60,
              current: 12,
              total: 20
            },
            {
              id: 3,
              name: "Collector",
              progress: 40,
              current: 8,
              total: 20
            },
            {
              id: 4,
              name: "Creator",
              progress: 25,
              current: 5,
              total: 20
            }
          ],
          activities: [
            {
              id: 1,
              type: "achievement",
              category: "achievements",
              description: "Unlocked '15-Day Streak' achievement",
              timestamp: "2 hours ago",
              points: 50,
              metadata: {
                achievement: "15-Day Streak"
              }
            },
            {
              id: 2,
              type: "wishlist_add",
              category: "wishlist",
              description: "Added 'Hood Classic Hoodie' to wishlist",
              timestamp: "1 day ago",
              image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop",
              metadata: {
                character: {
                  name: "Watermelon Wayne",
                  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop"
                }
              }
            },
            {
              id: 3,
              type: "community_post",
              category: "community",
              description: "Shared your street style look",
              timestamp: "2 days ago",
              points: 25,
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop"
            },
            {
              id: 4,
              type: "quiz_complete",
              category: "quiz",
              description: "Completed 'Which Fruit Are You?' personality quiz",
              timestamp: "3 days ago",
              points: 30
            }
          ],
          recommendations: {
            characters: [
              {
                id: 1,
                name: "Banana Bob",
                description: "The smooth operator with golden style and laid-back vibes",
                image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop",
                reason: "personality_match",
                matchPercentage: 89
              },
              {
                id: 2,
                name: "Cherry Charlotte",
                description: "Sweet but fierce, bringing bold energy to every look",
                image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=150&h=150&fit=crop",
                reason: "style_history",
                matchPercentage: 76
              }
            ],
            products: [
              {
                id: 1,
                name: "Graffiti Bomber Jacket",
                description: "Hand-painted street art design with premium materials",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop",
                price: 199.99,
                originalPrice: 249.99,
                reason: "character_preference",
                matchPercentage: 92
              },
              {
                id: 2,
                name: "Neon Snapback",
                description: "Electric colors that glow under street lights",
                image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=150&h=150&fit=crop",
                price: 49.99,
                reason: "wishlist_similar",
                matchPercentage: 84
              }
            ],
            content: [
              {
                id: 1,
                name: "Street Photography Guide",
                description: "Master the art of urban photography with pro tips",
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&h=150&fit=crop",
                reason: "community_trending"
              }
            ],
            community: [
              {
                id: 1,
                name: "Weekly Style Challenge",
                description: "Show off your best street look this week",
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop",
                reason: "achievement_unlock"
              }
            ]
          },
          participationData: {
            level: 7,
            role: "Hood Legend",
            currentXP: 2850,
            nextLevelXP: 3500
          },
          communityStats: [
            {
              id: 1,
              icon: "Camera",
              label: "Style Posts",
              value: "23",
              gradient: "from-primary to-secondary"
            },
            {
              id: 2,
              icon: "Heart",
              label: "Likes Given",
              value: "156",
              gradient: "from-accent to-primary"
            },
            {
              id: 3,
              icon: "MessageSquare",
              label: "Comments",
              value: "89",
              gradient: "from-secondary to-accent"
            },
            {
              id: 4,
              icon: "Users",
              label: "Followers",
              value: "342",
              gradient: "from-primary to-accent"
            }
          ],
          recentContributions: [
            {
              id: 1,
              type: "style_photo",
              title: "Street style with Watermelon Wayne hoodie",
              category: "Style",
              date: "2 days ago",
              likes: 47,
              xpEarned: 25,
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop"
            },
            {
              id: 2,
              type: "poll_vote",
              title: "Voted on next character design",
              category: "Community",
              date: "4 days ago",
              xpEarned: 10
            },
            {
              id: 3,
              type: "design_input",
              title: "Suggested color scheme for Apple Annie",
              category: "Creator Lab",
              date: "1 week ago",
              xpEarned: 30
            }
          ],
          tradingCards: [
            {
              id: 1,
              name: "Watermelon Wayne - Origin",
              rarity: "legendary",
              series: "Genesis",
              image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=300&fit=crop",
              unlockDate: "Jan 15, 2025",
              isNew: true,
              shareable: true
            },
            {
              id: 2,
              name: "Mango Mike - Street Artist",
              rarity: "epic",
              series: "Creators",
              image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=300&fit=crop",
              unlockDate: "Jan 10, 2025",
              isNew: false,
              shareable: true
            },
            {
              id: 3,
              name: "Apple Annie - Rebel",
              rarity: "rare",
              series: "Attitude",
              image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=300&fit=crop",
              unlockDate: "Dec 28, 2024",
              isNew: false,
              shareable: true
            }
          ],
          seasonalContent: [
            {
              id: 1,
              name: "Winter Street Collection",
              rarity: "epic",
              series: "Season 1",
              image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop",
              unlockDate: "Dec 1, 2024",
              isNew: false,
              shareable: true
            }
          ],
          exclusiveUnlocks: [
            {
              id: 1,
              name: "Founder's Badge",
              rarity: "legendary",
              series: "Exclusive",
              image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop",
              unlockDate: "Launch Day",
              isNew: false,
              shareable: false
            }
          ]
        };
        setDashboardData(mockData);
        setCurrentStreak(15);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
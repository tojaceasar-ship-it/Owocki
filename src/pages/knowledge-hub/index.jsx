import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TutorialCard from './components/TutorialCard';
import MaterialGuideCard from './components/MaterialGuideCard';
import CareInstructionCard from './components/CareInstructionCard';
import CulturalTimelineCard from './components/CulturalTimelineCard';
import CommunityTipCard from './components/CommunityTipCard';
import SearchFilters from './components/SearchFilters';
import { motion } from 'framer-motion';

const KnowledgeHub = () => {
  const [activeTab, setActiveTab] = useState('tutorials');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState({
    difficulty: [],
    character: [],
    duration: []
  });
  const [bookmarkedTutorials, setBookmarkedTutorials] = useState(new Set());
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState(null);
  const [knowledgeData, setKnowledgeData] = useState({
    tutorials: [],
    materialGuides: [],
    careInstructions: [],
    culturalTimeline: [],
    communityTips: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from CMS
    const fetchKnowledgeData = async () => {
      try {
        setLoading(true);
        // Mock CMS data
        const mockData = {
          tutorials: [
            {
              id: 1,
              title: "Street Style Layering with Watermelon Hoodie",
              description: "Learn how to layer your Watermelon character hoodie with different pieces to create authentic street looks that rep your neighborhood with style.",
              thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
              duration: "8:45",
              difficulty: "Beginner",
              character: "Watermelon",
              views: "12.5K",
              publishedAt: "2 days ago",
              category: "styling"
            },
            {
              id: 2,
              title: "Orange Character Denim Styling Guide",
              description: "Master the art of styling Orange character denim pieces with urban accessories. From chains to caps, create looks that celebrate street culture authenticity.",
              thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
              duration: "12:30",
              difficulty: "Intermediate",
              character: "Orange",
              views: "8.9K",
              publishedAt: "5 days ago",
              category: "styling"
            },
            {
              id: 3,
              title: "Grape Luxury Streetwear Mixing",
              description: "Discover how to mix Grape character luxury pieces with everyday streetwear to achieve that authentic street luxury aesthetic without losing cultural credibility.",
              thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
              duration: "15:20",
              difficulty: "Advanced",
              character: "Grape",
              views: "15.2K",
              publishedAt: "1 week ago",
              category: "styling"
            },
            {
              id: 4,
              title: "Apple Character Seasonal Transitions",
              description: "Learn how to transition your Apple character pieces through different seasons while maintaining that fresh street credibility and neighborhood pride.",
              thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
              duration: "10:15",
              difficulty: "Beginner",
              character: "Apple",
              views: "6.7K",
              publishedAt: "3 days ago",
              category: "seasonal"
            }
          ],
          materialGuides: [
            {
              id: 1,
              title: "Premium Cotton Blend Guide",
              materialType: "Cotton",
              description: "Understanding our premium cotton blend used in character hoodies. Learn about sourcing, quality, and why this material represents authentic street luxury.",
              image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=200&fit=crop",
              sustainability: "Excellent",
              careLevel: "Easy",
              origin: "Organic Farms",
              transparency: "Full supply chain visibility with ethical sourcing from certified organic cotton farms that support local communities."
            },
            {
              id: 2,
              title: "Street-Grade Denim Construction",
              materialType: "Denim",
              description: "Deep dive into our denim construction process. From raw material selection to final character embroidery, discover the craftsmanship behind authentic street style.",
              image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&h=200&fit=crop",
              sustainability: "Good",
              careLevel: "Moderate",
              origin: "Heritage Mills",
              transparency: "Traditional weaving techniques combined with modern sustainability practices for durable street-ready denim."
            },
            {
              id: 3,
              title: "Synthetic Performance Fabrics",
              materialType: "Synthetic",
              description: "Explore our high-performance synthetic materials used in active streetwear pieces. Designed for urban environments and street culture activities.",
              image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
              sustainability: "Fair",
              careLevel: "Easy",
              origin: "Tech Labs",
              transparency: "Innovative synthetic blends designed for performance while maintaining authentic street aesthetic and cultural relevance."
            }
          ],
          careInstructions: [
            {
              id: 1,
              productType: "Character Hoodies",
              material: "Premium Cotton Blend",
              careTime: "45 minutes",
              difficulty: "Easy",
              frequency: "After 3-4 wears",
              steps: [
                {
                  type: "wash",
                  title: "Cold Water Wash",
                  description: "Turn hoodie inside out and wash in cold water (30°C max) to preserve character graphics and fabric integrity.",
                  warning: "Never use bleach or harsh detergents as they can fade character designs and damage premium cotton fibers."
                },
                {
                  type: "dry",
                  title: "Air Dry Method",
                  description: "Lay flat or hang to air dry away from direct sunlight. This preserves the shape and prevents shrinkage of your street luxury piece.",
                  warning: "Avoid tumble drying as high heat can damage character prints and cause unwanted shrinkage."
                },
                {
                  type: "store",
                  title: "Proper Storage",
                  description: "Fold carefully or hang on padded hangers. Store in cool, dry place to maintain that fresh-from-the-hood appearance.",
                  warning: null
                }
              ]
            },
            {
              id: 2,
              productType: "Character Denim",
              material: "Street-Grade Denim",
              careTime: "60 minutes",
              difficulty: "Moderate",
              frequency: "After 5-6 wears",
              steps: [
                {
                  type: "wash",
                  title: "Gentle Cycle Wash",
                  description: "Wash inside out on gentle cycle with cold water. Use mild detergent to preserve the authentic denim texture and character embroidery.",
                  warning: "Wash separately for first few washes to prevent color bleeding onto other garments."
                },
                {
                  type: "dry",
                  title: "Controlled Drying",
                  description: "Air dry flat or hang dry. For faster drying, use low heat tumble dry for maximum 15 minutes then air dry completely.",
                  warning: "High heat can cause excessive shrinkage and damage to character details."
                },
                {
                  type: "iron",
                  title: "Steam Pressing",
                  description: "If needed, iron inside out on medium heat or use steamer. Avoid direct heat on character embroidery and patches.",
                  warning: "Never iron directly over character graphics as heat can cause permanent damage."
                }
              ]
            }
          ],
          culturalTimeline: [
            {
              id: 1,
              year: "1970s",
              title: "Birth of Hip-Hop Culture",
              description: "The emergence of hip-hop culture in the Bronx, establishing the foundation for authentic street expression through music, art, and style.",
              image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
              category: "Music & Culture",
              location: "Bronx, NY",
              isInfluential: true,
              relatedCharacters: ["Watermelon", "Orange"],
              impact: "Established the cultural foundation that inspires our character universe and authentic street luxury aesthetic."
            },
            {
              id: 2,
              year: "1980s",
              title: "Graffiti Art Movement",
              description: "Street art and graffiti culture exploded, transforming urban walls into canvases for creative expression and neighborhood pride.",
              image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
              category: "Visual Art",
              location: "NYC Subway",
              isInfluential: true,
              relatedCharacters: ["Grape", "Apple"],
              impact: "Inspired our spray-paint aesthetic and the visual language used in character design and brand identity."
            },
            {
              id: 3,
              year: "1990s",
              title: "Streetwear Revolution",
              description: "The birth of streetwear as a legitimate fashion category, blending street culture with premium quality and authentic urban aesthetics.",
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop",
              category: "Fashion",
              location: "Global",
              isInfluential: true,
              relatedCharacters: ["Banana", "Strawberry"],
              impact: "Defined the street luxury category that Fruits From Da Hood represents - premium quality with genuine street credibility."
            },
            {
              id: 4,
              year: "2000s",
              title: "Digital Street Culture",
              description: "Street culture embraced digital platforms, creating new ways for communities to connect, share, and celebrate authentic urban creativity.",
              image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop",
              category: "Digital Culture",
              location: "Online Communities",
              isInfluential: false,
              relatedCharacters: ["Pineapple"],
              impact: "Influenced our community-driven approach and digital-first brand experience that connects street culture globally."
            }
          ],
          communityTips: [
            {
              id: 1,
              title: "Mixing Character Pieces Like a Pro",
              content: "Don't be afraid to mix different character pieces in one outfit! I rock my Watermelon hoodie with Grape denim and it creates this dope contrast that shows respect for the whole crew. The key is balancing colors and letting each character's personality shine through without competing.",
              category: "Styling",
              difficulty: "Intermediate",
              author: {
                name: "StreetStyle_Maya",
                avatar: "https://randomuser.me/api/portraits/women/32.jpg",
                level: "Hood Legend",
                verification: "expert"
              },
              timeAgo: "2 hours ago",
              likes: 127,
              shares: 23,
              comments: 18,
              isLiked: false,
              tags: ["mixing", "characters", "styling", "balance"],
              images: [
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=200&fit=crop",
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop"
              ]
            },
            {
              id: 2,
              title: "Keeping Your Hoodies Fresh Longer",
              content: "Real talk - I've been wearing my character hoodies for 2 years and they still look brand new. The secret is washing inside out in cold water and air drying. Never use fabric softener on the character graphics, it can make them crack over time. Also, rotate between pieces so you're not wearing the same one every day.",
              category: "Care",
              difficulty: "Beginner",
              author: {
                name: "FreshFit_Carlos",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
                level: "Street Veteran",
                verification: "verified"
              },
              timeAgo: "1 day ago",
              likes: 89,
              shares: 34,
              comments: 12,
              isLiked: true,
              tags: ["care", "maintenance", "longevity", "hoodies"],
              images: []
            },
            {
              id: 3,
              title: "Cultural Respect in Street Fashion",
              content: "When you wear Fruits From Da Hood, you're representing more than just a brand - you're carrying the culture. Learn the history behind the designs, understand what each character represents, and wear them with pride but also respect. Street fashion is about community, not just looking fly.",
              category: "Culture",
              difficulty: "Beginner",
              author: {
                name: "CultureKeeper_Zoe",
                avatar: "https://randomuser.me/api/portraits/women/28.jpg",
                level: "Community Elder",
                verification: "community"
              },
              timeAgo: "3 days ago",
              likes: 156,
              shares: 67,
              comments: 29,
              isLiked: false,
              tags: ["culture", "respect", "community", "history"],
              images: [
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"
              ]
            }
          ]
        };
        setKnowledgeData(mockData);
      } catch (error) {
        console.error('Error fetching knowledge data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledgeData();
  }, []);

  const tabs = [
    { id: 'tutorials', name: 'Video Tutorials', icon: 'Play', count: knowledgeData.tutorials?.length },
    { id: 'materials', name: 'Material Guides', icon: 'Package', count: knowledgeData.materialGuides?.length },
    { id: 'care', name: 'Care Instructions', icon: 'Droplets', count: knowledgeData.careInstructions?.length },
    { id: 'culture', name: 'Cultural Timeline', icon: 'BookOpen', count: knowledgeData.culturalTimeline?.length },
    { id: 'community', name: 'Community Tips', icon: 'Users', count: knowledgeData.communityTips?.length }
  ];

  // Event handlers
  const handlePlayTutorial = (tutorial) => {
    console.log('Playing tutorial:', tutorial?.title);
    // In a real app, this would open a video player modal or navigate to video page
  };

  const handleBookmarkTutorial = (tutorialId) => {
    setBookmarkedTutorials(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks?.has(tutorialId)) {
        newBookmarks?.delete(tutorialId);
      } else {
        newBookmarks?.add(tutorialId);
      }
      return newBookmarks;
    });
  };

  const handleViewMaterialDetails = (guide) => {
    console.log('Viewing material details:', guide?.title);
    // In a real app, this would open a detailed modal or navigate to details page
  };

  const handleDownloadGuide = (guide) => {
    console.log('Downloading guide:', guide?.title);
    // In a real app, this would trigger a PDF download
  };

  const handleSetReminder = (instruction) => {
    console.log('Setting reminder for:', instruction?.productType);
    // In a real app, this would set up a care reminder notification
  };

  const handleTimelineEventClick = (event) => {
    setSelectedTimelineEvent(selectedTimelineEvent?.id === event?.id ? null : event);
  };

  const handleLikeTip = (tipId, isLiked) => {
    console.log('Tip liked:', tipId, isLiked);
    // In a real app, this would update the like status in the backend
  };

  const handleShareTip = (tip) => {
    console.log('Sharing tip:', tip?.title);
    // In a real app, this would open share modal or copy link
  };

  const handleFilterChange = (filterType, value, isChecked) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: isChecked 
        ? [...prev?.[filterType], value]
        : prev?.[filterType]?.filter(item => item !== value)
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      difficulty: [],
      character: [],
      duration: []
    });
  };

  // Filter content based on search and filters
  const getFilteredContent = () => {
    let content = [];
    
    switch (activeTab) {
      case 'tutorials':
        content = knowledgeData.tutorials;
        break;
      case 'materials':
        content = knowledgeData.materialGuides;
        break;
      case 'care':
        content = knowledgeData.careInstructions;
        break;
      case 'culture':
        content = knowledgeData.culturalTimeline;
        break;
      case 'community':
        content = knowledgeData.communityTips;
        break;
      default:
        content = [];
    }

    // Apply search filter
    if (searchQuery) {
      content = content?.filter(item => 
        item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (activeCategory !== 'all') {
      content = content?.filter(item => 
        item?.category === activeCategory || 
        activeTab === activeCategory
      );
    }

    // Apply advanced filters
    if (activeFilters?.difficulty?.length > 0) {
      content = content?.filter(item => 
        activeFilters?.difficulty?.includes(item?.difficulty?.toLowerCase())
      );
    }

    if (activeFilters?.character?.length > 0) {
      content = content?.filter(item => 
        activeFilters?.character?.includes(item?.character?.toLowerCase()) ||
        item?.relatedCharacters?.some(char => activeFilters?.character?.includes(char?.toLowerCase()))
      );
    }

    if (activeFilters?.duration?.length > 0) {
      content = content?.filter(item => {
        if (!item?.duration) return true;
        const duration = item?.duration;
        return activeFilters?.duration?.some(filter => {
          switch (filter) {
            case 'short': return duration?.includes('5') && !duration?.includes('1');
            case 'medium': return duration?.includes('8') || duration?.includes('10') || duration?.includes('12');
            case 'long': return duration?.includes('15') || duration?.includes('20');
            default: return true;
          }
        });
      });
    }

    return content;
  };

  const filteredContent = getFilteredContent();

  useEffect(() => {
    // Set initial timeline event
    if (activeTab === 'culture' && knowledgeData.culturalTimeline?.length > 0 && !selectedTimelineEvent) {
      setSelectedTimelineEvent(knowledgeData.culturalTimeline?.[0]);
    }
  }, [activeTab]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Knowledge Hub - Fruits From Da Hood</title>
        <meta name="description" content="Educational resources, styling tutorials, material guides, and cultural insights for authentic street luxury fashion. Learn, grow, and rep your neighborhood with knowledge." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <motion.section 
            className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="concrete-texture absolute inset-0 opacity-10"></div>
            <div className="street-light absolute top-0 left-1/4 w-96 h-96"></div>
            
            <div className="relative max-w-7xl mx-auto text-center">
              <div className="mb-8">
                <motion.div 
                  className="inline-flex items-center space-x-3 bg-card/80 backdrop-blur-sm border border-border rounded-full px-6 py-3 mb-6"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Icon name="BookMarked" size={20} className="text-primary" />
                  <span className="font-cta font-semibold text-primary">Knowledge & Culture Hub</span>
                </motion.div>
                
                <motion.h1 
                  className="font-headline font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Learn the
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent ml-4">
                    Culture
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="font-body text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Master authentic street style, understand premium materials, and connect with the culture that inspires every piece. 
                  Knowledge is power - use it to rep your neighborhood with pride and authenticity.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary hover:scale-105 transition-transform"
                  iconName="Play"
                  iconPosition="left"
                  iconSize={20}
                >
                  Watch Tutorials
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary hover:scale-105 transition-transform"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={20}
                >
                  Download Guides
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* Navigation Tabs */}
          <motion.section 
            className="px-4 sm:px-6 lg:px-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-2">
                {tabs?.map((tab) => (
                  <motion.button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-cta font-medium text-sm transition-all duration-300 spray-paint-hover ${
                      activeTab === tab?.id
                        ? 'bg-primary/20 text-primary neon-glow-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50 hover:neon-glow-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab?.id ? 'bg-primary/30 text-primary' : 'bg-surface/50 text-text-secondary'
                    }`}>
                      {tab?.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Search and Filters */}
          <motion.section 
            className="px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto">
              <SearchFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </motion.section>

          {/* Content Sections */}
          <motion.section 
            className="px-4 sm:px-6 lg:px-8 pb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto">
              {/* Video Tutorials */}
              {activeTab === 'tutorials' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContent?.map((tutorial) => (
                    <motion.div
                      key={tutorial?.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <TutorialCard
                        tutorial={tutorial}
                        onPlay={handlePlayTutorial}
                        onBookmark={handleBookmarkTutorial}
                        isBookmarked={bookmarkedTutorials?.has(tutorial?.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Material Guides */}
              {activeTab === 'materials' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContent?.map((guide) => (
                    <motion.div
                      key={guide?.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <MaterialGuideCard
                        guide={guide}
                        onViewDetails={handleViewMaterialDetails}
                        onDownload={handleDownloadGuide}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Care Instructions */}
              {activeTab === 'care' && (
                <div className="space-y-6">
                  {filteredContent?.map((instruction) => (
                    <motion.div
                      key={instruction?.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CareInstructionCard
                        instruction={instruction}
                        onSetReminder={handleSetReminder}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Cultural Timeline */}
              {activeTab === 'culture' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {filteredContent?.map((event) => (
                        <motion.div
                          key={event?.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <CulturalTimelineCard
                            event={event}
                            isActive={selectedTimelineEvent?.id === event?.id}
                            onClick={handleTimelineEventClick}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    {selectedTimelineEvent && (
                      <motion.div 
                        className="bg-card border border-border rounded-lg overflow-hidden neon-glow-primary"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={selectedTimelineEvent?.image}
                            alt={selectedTimelineEvent?.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-md font-cta font-bold text-black text-sm">
                                {selectedTimelineEvent?.year}
                              </span>
                              <span className="px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-md font-cta font-medium text-black text-sm">
                                {selectedTimelineEvent?.category}
                              </span>
                            </div>
                            <h2 className="font-headline font-bold text-2xl text-white mb-2">
                              {selectedTimelineEvent?.title}
                            </h2>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <p className="text-text-secondary leading-relaxed mb-4">
                            {selectedTimelineEvent?.description}
                          </p>
                          
                          <div className="bg-surface/50 rounded-lg p-4 mb-4">
                            <h3 className="font-cta font-semibold text-foreground mb-2">Cultural Impact</h3>
                            <p className="text-sm text-text-secondary">
                              {selectedTimelineEvent?.impact}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Icon name="MapPin" size={16} className="text-secondary" />
                              <span className="text-sm font-cta text-text-secondary">
                                {selectedTimelineEvent?.location}
                              </span>
                            </div>
                            
                            {selectedTimelineEvent?.relatedCharacters && (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-cta text-text-secondary">Related Characters:</span>
                                <div className="flex space-x-1">
                                  {selectedTimelineEvent?.relatedCharacters?.map((character, index) => (
                                    <div key={index} className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                      <span className="text-xs font-accent text-black">{character?.charAt(0)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* Community Tips */}
              {activeTab === 'community' && (
                <div className="space-y-6">
                  {filteredContent?.map((tip) => (
                    <motion.div
                      key={tip?.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CommunityTipCard
                        tip={tip}
                        onLike={handleLikeTip}
                        onShare={handleShareTip}
                        onReport={(tipId) => console.log('Reporting tip:', tipId)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredContent?.length === 0 && (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-24 h-24 bg-surface/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="Search" size={32} className="text-text-secondary" />
                  </div>
                  <h3 className="font-headline font-bold text-xl text-foreground mb-2">
                    No Results Found
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-transform"
                    iconName="RotateCcw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="font-accent text-sm font-bold text-black">F</span>
              </div>
              <span className="font-headline font-bold text-lg text-primary">
                Fruits From Da Hood
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} Fruits From Da Hood. Knowledge is power - use it to rep your culture with authenticity.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default KnowledgeHub;
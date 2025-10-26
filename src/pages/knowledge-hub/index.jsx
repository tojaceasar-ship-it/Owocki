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
import { client } from '../../lib/sanity';

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
    const fetchKnowledgeData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch('*[_type == "knowledgeHubContent"]');
        if (data.length > 0) {
          setKnowledgeData({
            tutorials: data[0].tutorials || [],
            materialGuides: data[0].materialGuides || [],
            careInstructions: data[0].careInstructions || [],
            culturalTimeline: data[0].culturalTimeline || [],
            communityTips: data[0].communityTips || []
          });
        }
      } catch (error) {
        console.error('Error fetching knowledge data from Sanity:', error);
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
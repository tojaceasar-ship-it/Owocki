import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SeasonalCollectionCard from './components/SeasonalCollectionCard';
import ShoppableLookbookSection from './components/ShoppableLookbookSection';
import BehindScenesSection from './components/BehindScenesSection';
import StylingGuidesSection from './components/StylingGuidesSection';
import CulturalPlaylistSection from './components/CulturalPlaylistSection';
import { motion } from 'framer-motion';

const LookbookExplorer = () => {
  const [lookbookData, setLookbookData] = useState({
    seasonalCollections: [],
    shoppableLookbook: [],
    behindScenes: {
      process: { steps: [] },
      materials: { sources: [] },
      interviews: { interviews: [] },
      timeline: { milestones: [] }
    },
    stylingGuides: [],
    culturalPlaylists: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from CMS
    const fetchLookbookData = async () => {
      try {
        setLoading(true);
        // Mock CMS data
        const mockData = {
          seasonalCollections: [
            {
              id: 1,
              slug: 'urban-harvest-fall-2024',
              title: 'Urban Harvest',
              season: 'Fall 2024',
              description: 'Where street meets sophistication - premium hoodies and chains that rep your neighborhood with pride. This collection celebrates the resilience of urban communities.',
              coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
              itemCount: 24,
              playlistTracks: 18,
              readTime: '8 min read',
              isNew: true,
              characterMascot: {
                name: 'Watermelon Willie',
                avatar: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&h=100&fit=crop'
              }
            },
            {
              id: 2,
              slug: 'neon-nights-winter-2024',
              title: 'Neon Nights',
              season: 'Winter 2024',
              description: 'Electric energy meets winter warmth. Glow-in-the-dark accents and premium materials for those who light up the streets even in the coldest nights.',
              coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
              itemCount: 18,
              playlistTracks: 22,
              readTime: '6 min read',
              isNew: false,
              characterMascot: {
                name: 'Grape Gatsby',
                avatar: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&h=100&fit=crop'
              }
            },
            {
              id: 3,
              slug: 'concrete-jungle-spring-2024',
              title: 'Concrete Jungle',
              season: 'Spring 2024',
              description: 'Fresh takes on classic streetwear. Breathable fabrics meet bold graphics in a celebration of urban creativity and artistic expression.',
              coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop',
              itemCount: 32,
              playlistTracks: 15,
              readTime: '10 min read',
              isNew: false,
              characterMascot: {
                name: 'Apple Annie',
                avatar: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&h=100&fit=crop'
              }
            },
            {
              id: 4,
              slug: 'summer-block-party-2024',
              title: 'Summer Block Party',
              season: 'Summer 2024',
              description: 'Lightweight luxury for the hottest season. Tank tops, shorts, and accessories that keep you cool while maintaining that authentic street credibility.',
              coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
              itemCount: 28,
              playlistTracks: 25,
              readTime: '7 min read',
              isNew: false,
              characterMascot: {
                name: 'Orange Oscar',
                avatar: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&h=100&fit=crop'
              }
            }
          ],
          shoppableLookbook: [
            {
              id: 1,
              title: 'Street King Essential',
              description: 'The complete look for neighborhood royalty',
              thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
              mainImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop',
              fullDescription: 'This iconic look represents the essence of authentic street luxury. The watermelon hoodie paired with premium gold chain creates a perfect balance between neighborhood pride and aspirational style.',
              totalPrice: 189,
              styleTags: ['Streetwear', 'Premium', 'Iconic', 'Authentic'],
              products: [
                {
                  name: 'Watermelon Willie Hoodie',
                  category: 'Hoodies',
                  price: 89,
                  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
                  position: { x: 45, y: 35 }
                },
                {
                  name: 'Gold Chain Necklace',
                  category: 'Accessories',
                  price: 65,
                  image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop',
                  position: { x: 50, y: 25 }
                },
                {
                  name: 'Street King Cap',
                  category: 'Headwear',
                  price: 35,
                  image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop',
                  position: { x: 48, y: 15 }
                }
              ]
            }
          ],
          behindScenes: {
            process: {
              steps: [
                {
                  title: 'Street Research',
                  description: 'We spend months in different neighborhoods, talking to local artists, musicians, and style influencers to understand authentic street culture.',
                  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
                },
                {
                  title: 'Character Development',
                  description: 'Each fruit character is developed with a unique personality, backstory, and style that represents different aspects of urban culture.',
                  image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop'
                },
                {
                  title: 'Design Iteration',
                  description: 'Multiple rounds of sketching, digital design, and community feedback ensure every piece authentically represents the culture.',
                  image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop'
                },
                {
                  title: 'Quality Testing',
                  description: 'Rigorous testing in real street conditions ensures our premium materials can handle the demands of urban life.',
                  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
                }
              ]
            },
            materials: {
              sources: [
                {
                  material: 'Organic Cotton Blend',
                  description: 'Sustainably sourced cotton from certified organic farms, providing comfort and durability for everyday wear.',
                  image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=100&h=100&fit=crop',
                  origin: 'California, USA',
                  sustainability: '100% Organic'
                },
                {
                  material: 'Recycled Polyester',
                  description: 'Made from recycled plastic bottles, this material provides moisture-wicking properties while reducing environmental impact.',
                  image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=100&h=100&fit=crop',
                  origin: 'Recycled Materials',
                  sustainability: '95% Recycled'
                },
                {
                  material: 'Premium Gold Chain',
                  description: 'Ethically sourced gold-plated chains that maintain their shine and represent the aspirational aspect of street luxury.',
                  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
                  origin: 'Ethical Suppliers',
                  sustainability: 'Conflict-Free'
                }
              ]
            },
            interviews: {
              interviews: [
                {
                  name: 'Marcus "Street Vision" Johnson',
                  role: 'Lead Designer & Cultural Consultant',
                  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                  quote: 'Every piece we create has to pass the authenticity test. If it doesn\'t feel right on the streets where I grew up, it doesn\'t make it to production. We\'re not just making clothes; we\'re preserving and celebrating culture.'
                },
                {
                  name: 'Zara "Spray Queen" Martinez',
                  role: 'Graphic Artist & Community Liaison',
                  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                  quote: 'The characters aren\'t just mascots - they\'re representations of real people in our communities. Each one has a story that resonates with someone out there who\'s grinding to make their dreams happen.'
                },
                {
                  name: 'DJ Smooth Operator',
                  role: 'Music Curator & Brand Ambassador',
                  avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
                  quote: 'Music and fashion have always been connected in street culture. Our playlists aren\'t just background music - they\'re the soundtrack to the lifestyle we\'re representing.'
                }
              ]
            },
            timeline: {
              milestones: [
                {
                  title: 'Concept Development',
                  date: 'January 2024',
                  description: 'Initial brainstorming sessions with community leaders and local artists to define the collection\'s cultural direction.'
                },
                {
                  title: 'Character Creation',
                  date: 'February 2024',
                  description: 'Development of fruit character personalities, backstories, and visual designs that represent different neighborhood archetypes.'
                },
                {
                  title: 'Community Feedback',
                  date: 'March 2024',
                  description: 'Street-level focus groups and feedback sessions to ensure authentic representation and cultural accuracy.'
                },
                {
                  title: 'Design Finalization',
                  date: 'April 2024',
                  description: 'Final design iterations incorporating community input and technical requirements for premium quality.'
                },
                {
                  title: 'Production Planning',
                  date: 'May 2024',
                  description: 'Sourcing ethical materials and establishing production partnerships that align with our values.'
                },
                {
                  title: 'Collection Launch',
                  date: 'September 2024',
                  description: 'Official release with community events, playlist launches, and cultural celebration activities.'
                }
              ]
            }
          },
          stylingGuides: [
            {
              id: 1,
              title: 'Layering Like a Pro',
              description: 'Master the art of layering for unpredictable urban weather.',
              image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
              steps: ['Start with a base layer', 'Add a statement piece', 'Accessorize with attitude']
            },
            {
              id: 2,
              title: 'Mixing Patterns',
              description: 'Combine bold prints without clashing.',
              image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
              steps: ['Choose a dominant pattern', 'Pair with subtle accents', 'Balance with solids']
            }
          ],
          culturalPlaylists: [
            {
              id: 1,
              title: 'Urban Harvest Vibes',
              description: 'The soundtrack to fall in the city - from classic hip-hop to modern trap',
              coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
              trackCount: 18,
              duration: '1h 12m',
              genre: 'Hip-Hop/R&B',
              streamingLinks: [
                { platform: 'Spotify', icon: 'Music' },
                { platform: 'Apple Music', icon: 'Music2' },
                { platform: 'SoundCloud', icon: 'Music3' }
              ],
              tracks: [
                {
                  title: 'Neighborhood Dreams',
                  artist: 'Street Poet',
                  albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
                  duration: '3:45'
                },
                {
                  title: 'Golden Chain Swagger',
                  artist: 'Hood Royalty',
                  albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
                  duration: '4:12'
                },
                {
                  title: 'Concrete Jungle Flow',
                  artist: 'Urban Legends',
                  albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
                  duration: '3:28'
                },
                {
                  title: 'Fruit Stand Philosophy',
                  artist: 'Corner Store Wisdom',
                  albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
                  duration: '4:01'
                }
              ],
              moodTags: ['Confident', 'Nostalgic', 'Authentic', 'Uplifting']
            },
            {
              id: 2,
              title: 'Neon Nights Energy',
              description: 'Electric beats for late-night city adventures',
              coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
              trackCount: 22,
              duration: '1h 28m',
              genre: 'Electronic/Trap',
              streamingLinks: [
                { platform: 'Spotify', icon: 'Music' },
                { platform: 'Apple Music', icon: 'Music2' }
              ],
              tracks: [
                {
                  title: 'Electric Avenue 2024',
                  artist: 'Neon Collective',
                  albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
                  duration: '3:33'
                },
                {
                  title: 'Midnight Hustle',
                  artist: 'City Lights',
                  albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
                  duration: '4:15'
                }
              ],
              moodTags: ['Energetic', 'Futuristic', 'Bold', 'Intense']
            }
          ]
        };
        setLookbookData(mockData);
      } catch (error) {
        console.error('Error fetching lookbook data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLookbookData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Lookbook Explorer | Fruits From Da Hood</title>
        <meta name="description" content="Dive into the visual world of Fruits From Da Hood. Explore seasonal collections, shoppable looks, behind-the-scenes content, and cultural playlists." />
        <meta property="og:title" content="Lookbook Explorer | Fruits From Da Hood" />
        <meta property="og:description" content="Dive into the visual world of Fruits From Da Hood. Explore seasonal collections, shoppable looks, behind-the-scenes content, and cultural playlists." />
        <meta property="og:image" content="https://example.com/og-image-lookbook.jpg" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <motion.section 
            className="py-20 bg-surface relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="concrete-texture absolute inset-0 opacity-5"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.h2 
                  className="font-headline font-black text-4xl md:text-5xl text-foreground mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Lookbook Explorer
                  </span>
                </motion.h2>
                <motion.p 
                  className="font-cta text-xl text-text-secondary max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Dive into the visual world of Fruits From Da Hood. Explore seasonal collections, shoppable looks, behind-the-scenes content, and cultural playlists.
                </motion.p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.h3 
              className="font-headline font-bold text-3xl text-foreground mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Seasonal Collections
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {lookbookData.seasonalCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <SeasonalCollectionCard collection={collection} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <ShoppableLookbookSection lookbookItems={lookbookData.shoppableLookbook} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <BehindScenesSection behindScenesData={lookbookData.behindScenes} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <StylingGuidesSection guides={lookbookData.stylingGuides} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <CulturalPlaylistSection playlists={lookbookData.culturalPlaylists} />
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default LookbookExplorer;
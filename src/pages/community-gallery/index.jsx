import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import GalleryHeader from './components/GalleryHeader';
import GalleryGrid from './components/GalleryGrid';
import FeaturedCreator from './components/FeaturedCreator';
import SubmissionModal from './components/SubmissionModal';
import ChallengeModal from './components/ChallengeModal';

const CommunityGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [featuredCreator, setFeaturedCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching data from CMS
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        // Mock CMS data for gallery items
        const mockGalleryItems = [
          { id: 1, user: "StreetArtKing", image: "https://images.unsplash.com/photo-1553481187-be93c21473b9?w=600&h=600&fit=crop", likes: 120, comments: 15, timestamp: "2023-10-15T14:30:00Z", tags: ["streetart", "urban"] },
          { id: 2, user: "HoodVibes", image: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=600&h=600&fit=crop", likes: 85, comments: 10, timestamp: "2023-10-14T09:15:00Z", tags: ["hood", "vibes"] },
          { id: 3, user: "GraffitiQueen", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=600&fit=crop", likes: 200, comments: 25, timestamp: "2023-10-13T18:45:00Z", tags: ["graffiti", "art"] },
          { id: 4, user: "UrbanExplorer", image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=600&h=600&fit=crop", likes: 95, comments: 8, timestamp: "2023-10-12T11:20:00Z", tags: ["urban", "explore"] },
          { id: 5, user: "BlockPartyDJ", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop", likes: 150, comments: 18, timestamp: "2023-10-11T20:10:00Z", tags: ["music", "party"] },
          { id: 6, user: "StreetStyleIcon", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop", likes: 110, comments: 12, timestamp: "2023-10-10T16:55:00Z", tags: ["style", "streetwear"] }
        ];
        setGalleryItems(mockGalleryItems);

        // Mock CMS data for featured creator
        const mockFeaturedCreator = {
          name: "GraffitiQueen",
          bio: "A street artist with a passion for transforming urban spaces into vibrant canvases. Known for bold colors and powerful messages.",
          avatar: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=200&h=200&fit=crop",
          portfolio: [
            "https://images.unsplash.com/photo-1553481187-be93c21473b9?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=600&h=600&fit=crop"
          ],
          stats: { followers: 5400, posts: 87, likes: 12500 }
        };
        setFeaturedCreator(mockFeaturedCreator);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Community Gallery | Fruits From Da Hood</title>
        <meta name="description" content="Explore the creativity of the Fruits From Da Hood community. See user submissions, vote on challenges, and get inspired." />
        <meta property="og:title" content="Community Gallery | Fruits From Da Hood" />
        <meta property="og:description" content="Explore the creativity of the Fruits From Da Hood community. See user submissions, vote on challenges, and get inspired." />
        <meta property="og:image" content="https://example.com/og-image-gallery.jpg" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <GalleryHeader 
            onSubmitClick={() => setIsSubmissionModalOpen(true)} 
            onChallengeClick={() => setIsChallengeModalOpen(true)} 
          />
          <GalleryGrid items={galleryItems} />
          {featuredCreator && <FeaturedCreator creator={featuredCreator} />}
          <SubmissionModal 
            isOpen={isSubmissionModalOpen} 
            onClose={() => setIsSubmissionModalOpen(false)} 
          />
          <ChallengeModal 
            isOpen={isChallengeModalOpen} 
            onClose={() => setIsChallengeModalOpen(false)} 
          />
        </main>
      </div>
    </>
  );
};

export default CommunityGallery;
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CreatorSpotlight from './components/CreatorSpotlight';
import DesignProcessCard from './components/DesignProcessCard';
import MaterialSourceCard from './components/MaterialSourceCard';
import VotingPollCard from './components/VotingPollCard';
import CommunityFeedback from './components/CommunityFeedback';
import SketchbookViewer from './components/SketchbookViewer';

const CreatorSLab = () => {
  const [labData, setLabData] = useState({
    creators: [],
    designProcesses: [],
    materialSources: [],
    votingPolls: [],
    communityFeedback: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from CMS
    const fetchLabData = async () => {
      try {
        setLoading(true);
        // Mock CMS data
        const mockData = {
          creators: [
            { id: 1, name: "StreetArtKing", bio: "Urban artist with a passion for graffiti and street culture.", avatar: "https://images.unsplash.com/photo-1553481187-be93c21473b9?w=200&h=200&fit=crop", works: ["https://images.unsplash.com/photo-1553481187-be93c21473b9?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=600&fit=crop"] },
            { id: 2, name: "HoodVibes", bio: "Photographer capturing the essence of the hood.", avatar: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=200&h=200&fit=crop", works: ["https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=600&h=600&fit=crop"] }
          ],
          designProcesses: [
            { id: 1, title: "Concept Sketching", description: "Initial ideas and character concepts.", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=400&fit=crop", steps: ["Brainstorming", "Sketching", "Feedback"] },
            { id: 2, title: "Digital Rendering", description: "Turning sketches into digital art.", image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=600&h=400&fit=crop", steps: ["Digitizing", "Coloring", "Refinement"] },
            { id: 3, title: "Fabric Selection", description: "Choosing materials for production.", image: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&h=400&fit=crop", steps: ["Sampling", "Testing", "Finalizing"] }
          ],
          materialSources: [
            { id: 1, material: "Organic Cotton", source: "Sustainable farms in California", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=400&fit=crop", sustainability: "100% Organic" },
            { id: 2, material: "Recycled Denim", source: "Post-consumer recycled materials", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop", sustainability: "80% Recycled" },
            { id: 3, material: "Eco-Friendly Dye", source: "Plant-based dyes from ethical suppliers", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c84?w=600&h=400&fit=crop", sustainability: "Non-Toxic" }
          ],
          votingPolls: [
            { id: 1, question: "Which design should we produce next?", options: ["Urban Graffiti Tee", "Neon Hoodie", "Retro Jacket"], votes: [120, 85, 60] },
            { id: 2, question: "What color palette for the next drop?", options: ["Earth Tones", "Neon Brights", "Monochrome"], votes: [95, 110, 75] }
          ],
          communityFeedback: [
            { id: 1, user: "UrbanArtist", comment: "Love the new designs, especially the graffiti-inspired tees!", timestamp: "2023-10-15T10:30:00Z", likes: 25 },
            { id: 2, user: "StreetStyleFan", comment: "Can we get more accessories in the next drop?", timestamp: "2023-10-14T14:45:00Z", likes: 18 },
            { id: 3, user: "HoodCreator", comment: "The quality of the materials is top-notch. Keep it up!", timestamp: "2023-10-13T09:15:00Z", likes: 30 }
          ]
        };
        setLabData(mockData);
      } catch (error) {
        console.error('Error fetching lab data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Creator's Lab | Fruits From Da Hood</title>
        <meta name="description" content="Dive into the creative process behind Fruits From Da Hood. Explore designs, vote on concepts, and see how streetwear comes to life." />
        <meta property="og:title" content="Creator's Lab | Fruits From Da Hood" />
        <meta property="og:description" content="Dive into the creative process behind Fruits From Da Hood. Explore designs, vote on concepts, and see how streetwear comes to life." />
        <meta property="og:image" content="https://example.com/og-image-creatorslab.jpg" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <section className="py-20 bg-surface relative overflow-hidden">
            <div className="concrete-texture absolute inset-0 opacity-5"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-headline font-black text-4xl md:text-5xl text-foreground mb-4">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Creator's Lab
                  </span>
                </h2>
                <p className="font-cta text-xl text-text-secondary max-w-2xl mx-auto">
                  Dive into the creative process behind Fruits From Da Hood. Explore designs, vote on concepts, and see how streetwear comes to life.
                </p>
              </div>
            </div>
          </section>

          {labData.creators.length > 0 && <CreatorSpotlight creators={labData.creators} />}
          {labData.designProcesses.length > 0 && <DesignProcessCard processes={labData.designProcesses} />}
          {labData.materialSources.length > 0 && <MaterialSourceCard sources={labData.materialSources} />}
          {labData.votingPolls.length > 0 && <VotingPollCard polls={labData.votingPolls} />}
          {labData.communityFeedback.length > 0 && <CommunityFeedback feedback={labData.communityFeedback} />}
          <SketchbookViewer />
        </main>
      </div>
    </>
  );
};

export default CreatorSLab;
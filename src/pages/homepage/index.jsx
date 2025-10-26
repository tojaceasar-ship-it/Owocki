import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CharacterSpotlight from './components/CharacterSpotlight';
import CommunityShowcase from './components/CommunityShowcase';
import LookbookPreview from './components/LookbookPreview';
import InteractiveQuiz from './components/InteractiveQuiz';
import SocialProofMetrics from './components/SocialProofMetrics';
import { charactersService } from '../../services/charactersService';

const Homepage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await charactersService.getCharacters();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Fruits From Da Hood | Premium Streetwear</title>
        <meta name="description" content="Discover premium streetwear inspired by urban culture. Shop unique designs and join the Fruits From Da Hood movement." />
        <meta property="og:title" content="Fruits From Da Hood | Premium Streetwear" />
        <meta property="og:description" content="Discover premium streetwear inspired by urban culture. Shop unique designs and join the Fruits From Da Hood movement." />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <CharacterSpotlight characters={characters} />
        <CommunityShowcase />
        <LookbookPreview />
        <InteractiveQuiz />
        <SocialProofMetrics />
      </div>
    </>
  );
};

export default Homepage;
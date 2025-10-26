import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CharacterCard from './components/CharacterCard';
import CharacterDetails from './components/CharacterDetails';
import CharacterRecommendations from './components/CharacterRecommendations';
import CommunityShowcase from './components/CommunityShowcase';
import PersonalityQuiz from './components/PersonalityQuiz';
import { charactersService } from '../../services/charactersService';

const CharacterUniverse = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await charactersService.getCharacters();
        setCharacters(data);
        if (data.length > 0) {
          setSelectedCharacter(data[0]);
        }
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
        <title>Character Universe | Fruits From Da Hood</title>
        <meta name="description" content="Explore the unique characters of Fruits From Da Hood. Learn their stories, personalities, and signature styles." />
        <meta property="og:title" content="Character Universe | Fruits From Da Hood" />
        <meta property="og:description" content="Explore the unique characters of Fruits From Da Hood. Learn their stories, personalities, and signature styles." />
        <meta property="og:image" content="https://example.com/og-image-characters.jpg" />
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
                    Character Universe
                  </span>
                </h2>
                <p className="font-cta text-xl text-text-secondary max-w-2xl mx-auto">
                  Meet the Fruits From Da Hood crew. Each character embodies a unique aspect of street culture and urban life.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {characters.map(character => (
                  <CharacterCard 
                    key={character.id} 
                    character={character} 
                    isSelected={selectedCharacter?.id === character.id}
                    onSelect={() => setSelectedCharacter(character)} 
                  />
                ))}
              </div>

              {selectedCharacter && (
                <CharacterDetails character={selectedCharacter} />
              )}

              <CharacterRecommendations characters={characters} />
            </div>
          </section>

          <CommunityShowcase />
          <PersonalityQuiz />
        </main>
      </div>
    </>
  );
};

export default CharacterUniverse;
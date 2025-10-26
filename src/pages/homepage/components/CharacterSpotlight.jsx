import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../../../lib/sanity';

const CharacterSpotlight = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await client.fetch('*[_type == "characterProfile" && status == "active"] | order(name asc)');
        if (data && data.length > 0) {
          setCharacters(data);
        } else {
          setError('No characters available at the moment.');
        }
        setLoading(false);
      } catch (err) {
        setError('Error loading characters. Please try again later.');
        setLoading(false);
        console.error('Error fetching characters:', err);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <div className="text-center py-10 text-white">Loading characters...</div>;
  if (error || characters.length === 0) return <div className="text-center py-10 text-red-500">{error || 'No characters available.'}</div>;

  return (
    <section className="bg-black py-16 px-4">
      <motion.h2
        className="text-4xl font-bold text-neon-pink font-graffiti mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Meet the Crew
      </motion.h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl">
        {characters.map((character, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-neon-pink hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative h-64 bg-black">
              {character.image && character.image.asset && (
                <img
                  src={character.image.asset.url}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-2xl font-bold font-graffiti">{character.name}</h3>
                <p className="text-sm text-neon-pink">{character.slogan}</p>
              </div>
            </div>
            <div className="p-4 text-white">
              <p className="text-sm text-gray-300 mb-4 line-clamp-3">{character.description}</p>
              <motion.a
                href={`/character-universe#${character.name.toLowerCase().replace(/ /g, '-')}`}
                className="inline-block bg-neon-pink text-black px-4 py-2 rounded-md font-bold text-sm hover:bg-neon-pink-dark transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                View Profile
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CharacterSpotlight;
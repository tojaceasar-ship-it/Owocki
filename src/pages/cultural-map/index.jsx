import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MapContainer from './components/MapContainer';
import LocationList from './components/LocationList';
import EventCalendar from './components/EventCalendar';
import StreetArtGallery from './components/StreetArtGallery';
import CommunityPhotos from './components/CommunityPhotos';

const CulturalMap = () => {
  const [mapData, setMapData] = useState({
    locations: [],
    events: [],
    streetArt: [],
    communityPhotos: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from CMS
    const fetchMapData = async () => {
      try {
        setLoading(true);
        // Mock CMS data
        const mockData = {
          locations: [
            { id: 1, name: "Brooklyn Block", description: "Heart of urban street culture.", lat: 40.6782, lng: -73.9442, image: "https://images.unsplash.com/photo-1553481187-be93c21473b9?w=600&h=400&fit=crop" },
            { id: 2, name: "Harlem Hub", description: "Rich history and vibrant art scene.", lat: 40.8116, lng: -73.9465, image: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=600&h=400&fit=crop" },
            { id: 3, name: "Bronx Beats", description: "Birthplace of hip-hop culture.", lat: 40.8448, lng: -73.8648, image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=400&fit=crop" }
          ],
          events: [
            { id: 1, title: "Street Art Festival", date: "2023-11-05", location: "Brooklyn Block", description: "Annual celebration of urban art.", image: "https://images.unsplash.com/photo-1553481187-be93c21473b9?w=600&h=400&fit=crop" },
            { id: 2, title: "Hip-Hop Block Party", date: "2023-11-12", location: "Bronx Beats", description: "Live music and dance battles.", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" },
            { id: 3, title: "Fashion Pop-Up", date: "2023-11-19", location: "Harlem Hub", description: "Showcasing local streetwear designers.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop" }
          ],
          streetArt: [
            { id: 1, title: "Graffiti Wall", artist: "StreetArtKing", location: "Brooklyn Block", image: "https://images.unsplash.com/photo-1553481187-be93c21473b9?w=600&h=600&fit=crop" },
            { id: 2, title: "Urban Mural", artist: "HoodVibes", location: "Harlem Hub", image: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=600&h=600&fit=crop" },
            { id: 3, title: "Street Portrait", artist: "GraffitiQueen", location: "Bronx Beats", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=600&fit=crop" }
          ],
          communityPhotos: [
            { id: 1, user: "UrbanExplorer", image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=600&h=600&fit=crop", caption: "Street vibes in Brooklyn.", likes: 45 },
            { id: 2, user: "BlockPartyDJ", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop", caption: "Live beats at the block party.", likes: 60 },
            { id: 3, user: "StreetStyleIcon", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop", caption: "Rocking the latest drop.", likes: 30 }
          ]
        };
        setMapData(mockData);
      } catch (error) {
        console.error('Error fetching map data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Cultural Map | Fruits From Da Hood</title>
        <meta name="description" content="Explore the cultural hotspots that inspire Fruits From Da Hood. Discover locations, events, and street art in urban communities." />
        <meta property="og:title" content="Cultural Map | Fruits From Da Hood" />
        <meta property="og:description" content="Explore the cultural hotspots that inspire Fruits From Da Hood. Discover locations, events, and street art in urban communities." />
        <meta property="og:image" content="https://example.com/og-image-culturalmap.jpg" />
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
                    Cultural Map
                  </span>
                </h2>
                <p className="font-cta text-xl text-text-secondary max-w-2xl mx-auto">
                  Explore the cultural hotspots that inspire Fruits From Da Hood. Discover locations, events, and street art in urban communities.
                </p>
              </div>
            </div>
          </section>

          <MapContainer locations={mapData.locations} />
          <LocationList locations={mapData.locations} />
          <EventCalendar events={mapData.events} />
          <StreetArtGallery artworks={mapData.streetArt} />
          <CommunityPhotos photos={mapData.communityPhotos} />
        </main>
      </div>
    </>
  );
};

export default CulturalMap;
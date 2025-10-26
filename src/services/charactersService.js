export const charactersService = {
  getCharacters: async () => {
    // Simulate API call to CMS
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Watermelon Willie",
            nickname: "The OG",
            personality: "Leader",
            backstory: "Born and raised in the concrete jungle, Willie represents the heart of the hood. He's the one who keeps everyone together, always looking out for his crew.",
            traits: ["Loyal", "Protective", "Wise", "Respected"],
            favoriteSpot: "Corner of 5th & Main",
            signature: "Red hoodie with gold chain",
            quote: "We rise together or we don't rise at all",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
            color: "primary",
            bgGradient: "from-red-500/20 to-green-500/20"
          },
          {
            id: 2,
            name: "Apple Annie",
            nickname: "The Artist",
            personality: "Creative",
            backstory: "Annie's got the vision and the skills to make it happen. She's the creative force behind the crew's most iconic looks.",
            traits: ["Creative", "Bold", "Innovative", "Inspiring"],
            favoriteSpot: "Underground Art Gallery",
            signature: "Paint-splattered denim jacket",
            quote: "Art is rebellion with purpose",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
            color: "secondary",
            bgGradient: "from-red-500/20 to-yellow-500/20"
          },
          {
            id: 3,
            name: "Banana Bobby",
            nickname: "The Smooth Talker",
            personality: "Charismatic",
            backstory: "Bobby's got the charm and the connections to make things happen. He's the bridge between the streets and the scene.",
            traits: ["Charismatic", "Connected", "Smooth", "Diplomatic"],
            favoriteSpot: "Rooftop Lounge",
            signature: "Yellow bomber with fresh kicks",
            quote: "Style is a language everyone understands",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
            color: "accent",
            bgGradient: "from-yellow-500/20 to-orange-500/20"
          },
          {
            id: 4,
            name: "Orange Oscar",
            nickname: "The Energizer",
            personality: "Dynamic",
            backstory: "Oscar brings the energy and the beats that keep the crew moving. He's the pulse of the street culture scene.",
            traits: ["Energetic", "Musical", "Motivating", "Vibrant"],
            favoriteSpot: "Block Party Central",
            signature: "Orange tracksuit with headphones",
            quote: "Life's a beat, you just gotta find your rhythm",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
            color: "warning",
            bgGradient: "from-orange-500/20 to-red-500/20"
          },
          {
            id: 5,
            name: "Grape Gary",
            nickname: "The Philosopher",
            personality: "Thoughtful",
            backstory: "Gary's the deep thinker of the crew, always dropping wisdom. He sees the bigger picture and keeps everyone grounded.",
            traits: ["Wise", "Thoughtful", "Philosophical", "Grounded"],
            favoriteSpot: "Community Garden",
            signature: "Purple hoodie with vintage glasses",
            quote: "True style comes from understanding yourself",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            color: "secondary",
            bgGradient: "from-purple-500/20 to-blue-500/20"
          },
          {
            id: 6,
            name: "Strawberry Stella",
            nickname: "The Trendsetter",
            personality: "Fashion-Forward",
            backstory: "Stella's always ahead of the curve, setting trends before they're cool. She's the style icon that everyone looks up to.",
            traits: ["Trendy", "Confident", "Stylish", "Influential"],
            favoriteSpot: "Fashion District",
            signature: "Pink leather jacket with statement accessories",
            quote: "Fashion fades, but style is eternal",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
            color: "error",
            bgGradient: "from-pink-500/20 to-red-500/20"
          },
          {
            id: 7,
            name: "Blueberry Blake",
            nickname: "The Tech Savvy",
            personality: "Innovative",
            backstory: "Blake bridges the gap between street culture and digital innovation. He's the tech genius who keeps the crew connected.",
            traits: ["Tech-Savvy", "Innovative", "Connected", "Future-Focused"],
            favoriteSpot: "Digital Hub",
            signature: "Blue tech-wear with smart accessories",
            quote: "The future of street culture is digital",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            color: "info",
            bgGradient: "from-blue-500/20 to-cyan-500/20"
          }
        ]);
      }, 1000);
    });
  }
};
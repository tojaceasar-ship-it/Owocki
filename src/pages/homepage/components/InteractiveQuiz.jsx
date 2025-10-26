import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What\'s your ideal Friday night?",
      options: [
        { id: 'a', text: "Leading the crew at a block party", character: "watermelon", points: 3 },
        { id: 'b', text: "Creating art in an underground gallery", character: "apple", points: 3 },
        { id: 'c', text: "Smooth talking at a rooftop lounge", character: "banana", points: 3 },
        { id: 'd', text: "Bringing energy to the dance floor", character: "orange", points: 3 }
      ]
    },
    {
      id: 2,
      question: "Your style philosophy is:",
      options: [
        { id: 'a', text: "Classic with respect - timeless pieces", character: "watermelon", points: 2 },
        { id: 'b', text: "Bold and artistic - make a statement", character: "apple", points: 2 },
        { id: 'c', text: "Smooth and sophisticated - effortless cool", character: "banana", points: 2 },
        { id: 'd', text: "Bright and energetic - stand out loud", character: "orange", points: 2 }
      ]
    },
    {
      id: 3,
      question: "In your friend group, you're the one who:",
      options: [
        { id: 'a', text: "Keeps everyone together and safe", character: "watermelon", points: 2 },
        { id: 'b', text: "Comes up with creative solutions", character: "apple", points: 2 },
        { id: 'c', text: "Connects people and makes deals", character: "banana", points: 2 },
        { id: 'd', text: "Brings the party wherever you go", character: "orange", points: 2 }
      ]
    },
    {
      id: 4,
      question: "Your dream collaboration would be with:",
      options: [
        { id: 'a', text: "A legendary hip-hop artist", character: "watermelon", points: 1 },
        { id: 'b', text: "A groundbreaking street artist", character: "apple", points: 1 },
        { id: 'c', text: "A smooth jazz musician", character: "banana", points: 1 },
        { id: 'd', text: "An electronic music producer", character: "orange", points: 1 }
      ]
    }
  ];

  const characters = {
    watermelon: {
      name: "Watermelon Willie",
      nickname: "The OG",
      description: `You're the natural leader with authentic street credibility.\nPeople look up to you because you keep it real and always have your crew's back.`,
      traits: ["Leader", "Loyal", "Authentic", "Respected"],
      style: "Classic streetwear with premium touches",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      color: "primary",
      bgGradient: "from-red-500/20 to-green-500/20"
    },
    apple: {
      name: "Apple Annie",
      nickname: "The Artist",
      description: `You're the creative visionary who sees art in everything.\nYour unique perspective and bold choices inspire others to think differently.`,
      traits: ["Creative", "Bold", "Innovative", "Inspiring"],
      style: "Artistic pieces with paint-splattered details",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
      color: "secondary",
      bgGradient: "from-red-500/20 to-yellow-500/20"
    },
    banana: {
      name: "Banana Bobby",
      nickname: "The Smooth Talker",
      description: `You're the charismatic connector who bridges different worlds.\nYour smooth style and diplomatic nature make you everyone's favorite.`,
      traits: ["Charismatic", "Smooth", "Connected", "Diplomatic"],
      style: "Sophisticated streetwear with smooth finishes",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      color: "accent",
      bgGradient: "from-yellow-500/20 to-orange-500/20"
    },
    orange: {
      name: "Orange Oscar",
      nickname: "The Energizer",
      description: `You're the high-energy catalyst who brings life to every situation.\nYour vibrant personality and infectious enthusiasm light up any room.`,
      traits: ["Energetic", "Vibrant", "Motivating", "Dynamic"],
      style: "Bright colors with athletic-inspired cuts",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      color: "warning",
      bgGradient: "from-orange-500/20 to-red-500/20"
    }
  };

  const calculateResult = () => {
    const scores = {};
    
    answers?.forEach(answer => {
      const character = answer?.character;
      scores[character] = (scores?.[character] || 0) + answer?.points;
    });

    const topCharacter = Object.keys(scores)?.reduce((a, b) => 
      scores?.[a] > scores?.[b] ? a : b
    );

    return characters?.[topCharacter];
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const result = showResult ? calculateResult() : null;

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="concrete-texture absolute inset-0 opacity-5"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!quizStarted ? (
            // Quiz Introduction
            (<motion.div
              key="intro"
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-headline font-black text-4xl md:text-5xl text-foreground mb-6">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Which Fruit Are You?
                </span>
              </h2>
              <p className="font-cta text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Discover your street personality and find out which member of our crew represents your vibe. Take the quiz and join your tribe!
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {Object.values(characters)?.map((character, index) => (
                  <motion.div
                    key={character?.name}
                    className="bg-card/50 border border-border rounded-xl p-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${character?.bgGradient} rounded-full mx-auto mb-4 neon-glow-${character?.color}`}>
                      <Image
                        src={character?.image}
                        alt={character?.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <h3 className="font-cta font-bold text-foreground mb-1">
                      {character?.name}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {character?.nickname}
                    </p>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="default"
                size="lg"
                onClick={startQuiz}
                className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary hover:neon-pulse"
                iconName="Play"
                iconPosition="left"
                iconSize={20}
              >
                Start Quiz
              </Button>
            </motion.div>)
          ) : !showResult ? (
            // Quiz Questions
            (<motion.div
              key={`question-${currentQuestion}`}
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary font-cta font-medium">
                    Question {currentQuestion + 1} of {questions?.length}
                  </span>
                  <span className="text-primary font-cta font-bold">
                    {Math.round(((currentQuestion + 1) / questions?.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full neon-glow-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions?.length) * 100}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
              {/* Question */}
              <div className="bg-card/50 border border-border rounded-2xl p-8 mb-8">
                <h3 className="font-headline font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
                  {questions?.[currentQuestion]?.question}
                </h3>

                <div className="space-y-4">
                  {questions?.[currentQuestion]?.options?.map((option, index) => (
                    <motion.button
                      key={option?.id}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 text-left bg-surface/50 border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-black font-cta font-bold group-hover:neon-glow-primary">
                          {option?.id?.toUpperCase()}
                        </div>
                        <span className="font-cta text-foreground group-hover:text-primary">
                          {option?.text}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>)
          ) : (
            // Quiz Result
            (<motion.div
              key="result"
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <motion.div
                  className="w-32 h-32 mx-auto mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${result?.bgGradient} rounded-full neon-glow-${result?.color} neon-pulse`}>
                    <Image
                      src={result?.image}
                      alt={result?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </motion.div>

                <motion.h2
                  className="font-headline font-black text-3xl md:text-4xl text-foreground mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  You're {result?.name}!
                </motion.h2>

                <motion.p
                  className="font-cta text-xl text-secondary mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {result?.nickname}
                </motion.p>

                <motion.div
                  className="bg-card/50 border border-border rounded-2xl p-8 mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="text-text-secondary text-lg mb-6 whitespace-pre-line">
                    {result?.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-cta font-semibold text-foreground mb-3">Your Traits</h4>
                      <div className="space-y-2">
                        {result?.traits?.map((trait, index) => (
                          <motion.div
                            key={trait}
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-primary rounded-full neon-glow-primary"></div>
                            <span className="text-text-secondary">{trait}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-cta font-semibold text-foreground mb-3">Your Style</h4>
                      <p className="text-text-secondary">{result?.style}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link to="/character-universe">
                    <Button
                      variant="default"
                      size="lg"
                      className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                      iconName="Users"
                      iconPosition="left"
                      iconSize={20}
                    >
                      Meet Your Crew
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={resetQuiz}
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
                    iconName="RotateCcw"
                    iconPosition="left"
                    iconSize={20}
                  >
                    Take Again
                  </Button>

                  <Link to="/personal-dashboard">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-accent hover:text-accent hover:bg-accent/10"
                      iconName="User"
                      iconPosition="left"
                      iconSize={20}
                    >
                      Save Result
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>)
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveQuiz;
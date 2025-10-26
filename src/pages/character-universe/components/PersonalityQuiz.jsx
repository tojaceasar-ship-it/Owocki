import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalityQuiz = ({ characters, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 1,
      question: "What\'s your ideal way to spend a Saturday?",
      options: [
        { text: "Creating art in my studio", character: "apple", points: 3 },
        { text: "Hanging with the crew at the park", character: "watermelon", points: 3 },
        { text: "Exploring new neighborhoods", character: "orange", points: 3 },
        { text: "Chilling at home with good music", character: "grape", points: 3 }
      ]
    },
    {
      id: 2,
      question: "Your style philosophy is:",
      options: [
        { text: "Bold and unapologetic", character: "watermelon", points: 3 },
        { text: "Clean and minimalist", character: "apple", points: 3 },
        { text: "Colorful and expressive", character: "orange", points: 3 },
        { text: "Dark and mysterious", character: "grape", points: 3 }
      ]
    },
    {
      id: 3,
      question: "In your friend group, you're the one who:",
      options: [
        { text: "Keeps everyone motivated", character: "apple", points: 3 },
        { text: "Brings the energy and fun", character: "orange", points: 3 },
        { text: "Leads the adventures", character: "watermelon", points: 3 },
        { text: "Provides wisdom and depth", character: "grape", points: 3 }
      ]
    },
    {
      id: 4,
      question: "Your dream collaboration would be with:",
      options: [
        { text: "A legendary street artist", character: "apple", points: 3 },
        { text: "An up-and-coming rapper", character: "watermelon", points: 3 },
        { text: "A fashion designer", character: "orange", points: 3 },
        { text: "A music producer", character: "grape", points: 3 }
      ]
    },
    {
      id: 5,
      question: "When facing challenges, you:",
      options: [
        { text: "Face them head-on with confidence", character: "watermelon", points: 3 },
        { text: "Think strategically and plan", character: "apple", points: 3 },
        { text: "Find creative solutions", character: "orange", points: 3 },
        { text: "Stay calm and adapt", character: "grape", points: 3 }
      ]
    }
  ];

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers) => {
    const scores = {};
    
    allAnswers?.forEach(answer => {
      if (!scores?.[answer?.character]) {
        scores[answer.character] = 0;
      }
      scores[answer.character] += answer?.points;
    });

    const topCharacter = Object.keys(scores)?.reduce((a, b) => 
      scores?.[a] > scores?.[b] ? a : b
    );

    const matchedCharacter = characters?.find(char => 
      char?.name?.toLowerCase()?.includes(topCharacter)
    );

    setResult({
      character: matchedCharacter,
      score: scores?.[topCharacter],
      percentage: Math.round((scores?.[topCharacter] / (questions?.length * 3)) * 100)
    });
    setShowResult(true);
    
    if (onQuizComplete) {
      onQuizComplete(matchedCharacter);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="concrete-texture absolute inset-0 opacity-5"></div>
        {/* Result Header */}
        <div className="relative p-8 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border text-center">
          <div className="mb-6">
            <Icon name="Sparkles" size={48} className="text-primary mx-auto mb-4 neon-glow-primary" />
            <h2 className="font-headline font-bold text-3xl text-primary mb-2 glitch-text">
              Quiz Complete!
            </h2>
            <p className="text-lg text-secondary font-cta">
              You're most like...
            </p>
          </div>
        </div>
        {/* Character Result */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary neon-glow-primary mx-auto">
                <Image
                  src={result?.character?.avatar}
                  alt={result?.character?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow-primary">
                <span className="font-headline font-bold text-black text-lg">
                  {result?.percentage}%
                </span>
              </div>
            </div>
            
            <h3 className="font-headline font-bold text-4xl text-primary mb-2 glitch-text">
              {result?.character?.name}
            </h3>
            <p className="text-xl text-secondary font-cta font-semibold mb-2">
              {result?.character?.title}
            </p>
            <p className="text-sm text-text-secondary">
              {result?.character?.neighborhood}
            </p>
          </div>

          {/* Match Description */}
          <div className="bg-surface/50 rounded-lg p-6 border border-border mb-6">
            <h4 className="font-cta font-semibold text-secondary mb-3">
              Why You Match
            </h4>
            <p className="text-text-secondary leading-relaxed">
              {result?.character?.description}
            </p>
          </div>

          {/* Character Traits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface/50 rounded-lg p-6 border border-border">
              <h4 className="font-cta font-semibold text-secondary mb-3">Your Traits</h4>
              <div className="space-y-2">
                {result?.character?.traits?.slice(0, 4)?.map((trait, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full neon-glow-primary"></div>
                    <span className="text-sm text-text-secondary">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-surface/50 rounded-lg p-6 border border-border">
              <h4 className="font-cta font-semibold text-secondary mb-3">Character Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Style</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-surface rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        style={{ width: `${result?.character?.stats?.style * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-cta text-primary">{result?.character?.stats?.style}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Attitude</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-surface rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-secondary to-accent"
                        style={{ width: `${result?.character?.stats?.attitude * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-cta text-secondary">{result?.character?.stats?.attitude}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Street</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-surface rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-accent to-primary"
                        style={{ width: `${result?.character?.stats?.street * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-cta text-accent">{result?.character?.stats?.street}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="default"
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
              iconName="User"
              iconPosition="left"
              iconSize={16}
            >
              Explore {result?.character?.name?.split(' ')?.[0]}'s World
            </Button>
            
            <Button
              variant="outline"
              className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
              onClick={resetQuiz}
            >
              Take Quiz Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="concrete-texture absolute inset-0 opacity-5"></div>
      {/* Quiz Header */}
      <div className="relative p-8 bg-gradient-to-r from-surface to-card border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-headline font-bold text-2xl text-primary mb-2 glitch-text">
              Which Fruit Are You?
            </h2>
            <p className="text-text-secondary">
              Discover your street fruit personality
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-text-secondary font-cta mb-1">
              Question {currentQuestion + 1} of {questions?.length}
            </div>
            <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions?.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Question Content */}
      <div className="p-8">
        <div className="mb-8">
          <h3 className="font-cta font-semibold text-xl text-foreground mb-6">
            {questions?.[currentQuestion]?.question}
          </h3>
          
          <div className="space-y-4">
            {questions?.[currentQuestion]?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 bg-surface/50 border border-border rounded-lg text-left transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:neon-glow-primary group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 group-hover:neon-glow-primary">
                    <span className="font-headline font-bold text-black text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="font-cta text-foreground group-hover:text-primary">
                    {option?.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2">
          {questions?.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentQuestion
                  ? 'bg-primary neon-glow-primary' :'bg-surface border border-border'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalityQuiz;
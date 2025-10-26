import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizCard = ({ question, options, onAnswer, currentQuestion, totalQuestions, isCompleted }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption) {
      setShowResult(true);
      setTimeout(() => {
        onAnswer(selectedOption);
        setSelectedOption(null);
        setShowResult(false);
      }, 1500);
    }
  };

  if (isCompleted) {
    return (
      <div className="bg-card border border-primary/30 rounded-xl p-8 neon-glow-primary">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 neon-pulse">
            <Icon name="Trophy" size={40} className="text-black" />
          </div>
          <h3 className="font-headline text-2xl text-primary mb-4">Quiz Complete!</h3>
          <p className="text-text-secondary mb-6">Discovering your fruit personality...</p>
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8 spray-paint-hover">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-cta text-sm text-text-secondary">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: totalQuestions })?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < currentQuestion - 1
                    ? 'bg-primary neon-glow-primary'
                    : index === currentQuestion - 1
                    ? 'bg-secondary neon-glow-secondary' :'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="font-headline text-xl text-foreground mb-2">{question?.title}</h3>
        <p className="text-text-secondary">{question?.description}</p>
      </div>
      <div className="space-y-3 mb-8">
        {options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`w-full p-4 rounded-lg border text-left transition-all duration-300 spray-paint-hover ${
              selectedOption?.id === option?.id
                ? 'border-primary bg-primary/20 neon-glow-primary' :'border-border hover:border-secondary hover:bg-surface/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedOption?.id === option?.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedOption?.id === option?.id && (
                  <Icon name="Check" size={14} className="text-black" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-cta font-medium text-foreground mb-1">{option?.text}</h4>
                <p className="text-sm text-text-secondary">{option?.description}</p>
              </div>
              <Icon name={option?.icon} size={24} className="text-secondary" />
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-text-secondary">
          {showResult ? "Processing your answer..." : "Choose an option to continue"}
        </div>
        <Button
          variant="default"
          onClick={handleSubmitAnswer}
          disabled={!selectedOption || showResult}
          loading={showResult}
          className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
          iconName="ArrowRight"
          iconPosition="right"
        >
          {showResult ? "Processing" : "Next Question"}
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
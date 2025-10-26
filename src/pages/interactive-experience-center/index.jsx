import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuizCard from './components/QuizCard';
import QuizResult from './components/QuizResult';
import InteractivePolls from './components/InteractivePolls';
import CustomizationStudio from './components/CustomizationStudio';
import AchievementSystem from './components/AchievementSystem';

const InteractiveExperienceCenter = () => {
  const [experienceData, setExperienceData] = useState({
    quizzes: [],
    polls: [],
    achievements: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    // Simulate fetching data from CMS
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        // Mock CMS data
        const mockData = {
          quizzes: [
            { id: 1, title: "Which Fruit Are You?", description: "Discover your street fruit persona.", image: "https://images.unsplash.com/photo-1553481187-be93c21473b9?w=600&h=400&fit=crop", questions: ["Question 1", "Question 2", "Question 3"] },
            { id: 2, title: "Street Style Match", description: "Find your perfect streetwear style.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop", questions: ["Question 1", "Question 2", "Question 3"] },
            { id: 3, title: "Hood Culture Quiz", description: "Test your knowledge of urban culture.", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=400&fit=crop", questions: ["Question 1", "Question 2", "Question 3"] }
          ],
          polls: [
            { id: 1, question: "Which upcoming event are you most excited for?", options: ["Street Art Festival", "Hip-Hop Block Party", "Fashion Pop-Up"], votes: [50, 30, 20] },
            { id: 2, question: "What’s your favorite streetwear piece?", options: ["Hoodie", "T-Shirt", "Sneakers"], votes: [40, 35, 25] }
          ],
          achievements: [
            { id: 1, name: "Street Cred", description: "Complete your first quiz.", icon: "Star", progress: 50 },
            { id: 2, name: "Style Master", description: "Participate in 5 polls.", icon: "Award", progress: 20 },
            { id: 3, name: "Culture King", description: "Share 3 community photos.", icon: "Trophy", progress: 10 }
          ]
        };
        setExperienceData(mockData);
      } catch (error) {
        console.error('Error fetching experience data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Interactive Experience Center | Fruits From Da Hood</title>
        <meta name="description" content="Engage with Fruits From Da Hood through quizzes, polls, and customization. Discover your street persona and earn achievements." />
        <meta property="og:title" content="Interactive Experience Center | Fruits From Da Hood" />
        <meta property="og:description" content="Engage with Fruits From Da Hood through quizzes, polls, and customization. Discover your street persona and earn achievements." />
        <meta property="og:image" content="https://example.com/og-image-experience.jpg" />
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
                    Interactive Experience Center
                  </span>
                </h2>
                <p className="font-cta text-xl text-text-secondary max-w-2xl mx-auto">
                  Engage with Fruits From Da Hood through quizzes, polls, and customization. Discover your street persona and earn achievements.
                </p>
              </div>
            </div>
          </section>

          {selectedQuiz ? (
            <QuizResult 
              quiz={selectedQuiz} 
              result={quizResult} 
              onBack={() => setSelectedQuiz(null)} 
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                {experienceData.quizzes.map(quiz => (
                  <QuizCard 
                    key={quiz.id} 
                    quiz={quiz} 
                    onSelect={() => setSelectedQuiz(quiz)} 
                  />
                ))}
              </div>
              <InteractivePolls polls={experienceData.polls} />
              <CustomizationStudio />
              <AchievementSystem achievements={experienceData.achievements} />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default InteractiveExperienceCenter;
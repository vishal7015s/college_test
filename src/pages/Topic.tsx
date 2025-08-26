import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen, Trophy, Play, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Topic {
  id: string;
  name: string;
  description: string;
}

interface QuestionCount {
  difficulty_level: string;
  count: number;
}

const Topic = () => {
  const { categoryId, topicId } = useParams<{ categoryId: string; topicId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [questionCounts, setQuestionCounts] = useState<QuestionCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topicId) {
      fetchTopicData();
    }
  }, [topicId]);

  const fetchTopicData = async () => {
    try {
      // Fetch topic details
      const { data: topicData, error: topicError } = await supabase
        .from('topics')
        .select('*')
        .eq('id', topicId)
        .single();

      if (topicError) throw topicError;

      // Fetch question counts by difficulty
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('difficulty_level')
        .eq('topic_id', topicId);

      if (questionsError) throw questionsError;

      // Count questions by difficulty
      const counts = questionsData?.reduce((acc: { [key: string]: number }, question) => {
        acc[question.difficulty_level] = (acc[question.difficulty_level] || 0) + 1;
        return acc;
      }, {}) || {};

      const questionCountsArray = Object.entries(counts).map(([difficulty, count]) => ({
        difficulty_level: difficulty,
        count: count as number
      }));

      setTopic(topicData);
      setQuestionCounts(questionCountsArray);
    } catch (error) {
      console.error('Error fetching topic data:', error);
    } finally {
      setLoading(false);
    }
  };

  const difficultyOrder = ['easy', 'medium', 'hard'];
  const difficultyLabels = {
    easy: 'Basic Level',
    medium: 'Intermediate Level', 
    hard: 'Advanced Level'
  };

  const difficultyDescriptions = {
    easy: 'Foundation level questions to build your concepts',
    medium: 'Medium difficulty questions for skill enhancement',
    hard: 'Challenging questions for competitive exam preparation'
  };

  const sortedQuestionCounts = questionCounts.sort((a, b) => 
    difficultyOrder.indexOf(a.difficulty_level) - difficultyOrder.indexOf(b.difficulty_level)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading topic...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
            <Link to={`/category/${categoryId}`} className="text-brand-primary hover:underline">
              Back to Category
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{topic.name}</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">{topic.description}</p>
          </div>
        </div>
      </section>

      {/* Test Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Practice Tests</h2>
            <p className="text-muted-foreground text-lg">
              Choose your difficulty level and start practicing. Each test contains 15 carefully selected questions.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {sortedQuestionCounts.map((questionCount, index) => {
              const difficulty = questionCount.difficulty_level;
              const label = difficultyLabels[difficulty as keyof typeof difficultyLabels] || difficulty;
              const description = difficultyDescriptions[difficulty as keyof typeof difficultyDescriptions] || 'Practice questions';
              
              return (
                <Card key={difficulty} className="relative group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{topic.name} - {label}</h3>
                        <Badge className={getDifficultyColor(label)}>
                          {label.split(' ')[0]}
                        </Badge>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {description}
                    </p>
                    
                    {/* Test Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="w-4 h-4 mr-2 text-brand-primary" />
                          Questions
                        </div>
                        <span className="font-semibold">{questionCount.count}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2 text-brand-primary" />
                          Duration
                        </div>
                        <span className="font-semibold">{Math.ceil(questionCount.count * 1.5)} mins</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="w-4 h-4 mr-2 text-brand-primary" />
                          Available
                        </div>
                        <span className="font-semibold">Ready</span>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <Link to={`/test/${topicId}/${difficulty}`}>
                      <Button 
                        className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 group-hover:scale-105 transition-transform duration-300"
                        size="lg"
                        disabled={questionCount.count === 0}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {questionCount.count === 0 ? 'No Questions Available' : 'Start Test'}
                      </Button>
                    </Link>
                    
                    {/* Test Number Badge */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-background border-2 border-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-primary">{index + 1}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Test Instructions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Before You Start:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Ensure stable internet connection</li>
                <li>• Find a quiet environment</li>
                <li>• Keep pen and paper ready</li>
                <li>• Read instructions carefully</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">During the Test:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Timer will start automatically</li>
                <li>• Each question has equal marks</li>
                <li>• No negative marking</li>
                <li>• Submit before time expires</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={`/category/${categoryId}`}
            className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Topics
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Topic;
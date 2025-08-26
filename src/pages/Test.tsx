import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
  time_limit_minutes: number;
}

interface Answer {
  questionId: string;
  selectedOption: string;
}

const Test = () => {
  const { topicId, difficulty } = useParams<{ topicId: string; difficulty: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (topicId && difficulty && user) {
      fetchQuestions();
    }
  }, [topicId, difficulty, user]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (testStarted && questionTimeRemaining > 0) {
      interval = setInterval(() => {
        setQuestionTimeRemaining((prev) => {
          if (prev <= 1) {
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [testStarted, questionTimeRemaining]);

  // Set timer when question changes
  useEffect(() => {
    if (testStarted && questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      setQuestionTimeRemaining(currentQuestion.time_limit_minutes * 60);
    }
  }, [currentQuestionIndex, testStarted, questions]);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('topic_id', topicId)
        .eq('difficulty_level', difficulty)
        .limit(15);

      if (error) throw error;

      if (data && data.length > 0) {
        setQuestions(data);
        setQuestionTimeRemaining(data[0].time_limit_minutes * 60);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (questionId: string, selectedOption: string) => {
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = { questionId, selectedOption };
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, { questionId, selectedOption }]);
    }
    
    // Mark question as answered
    setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex]));
  };

  const handleNextQuestion = () => {
    // Mark current question as completed (cannot go back)
    setCompletedQuestions(prev => new Set([...prev, currentQuestionIndex]));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handleSubmitTest = () => {
    const score = calculateScore();
    navigate(`/test-result/${topicId}/${difficulty}`, {
      state: {
        questions,
        answers,
        score,
        timeSpent: answers.length
      }
    });
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question && question.correct_answer.toLowerCase() === answer.selectedOption.toLowerCase()) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCurrentAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return answers.find(a => a.questionId === currentQuestion?.id)?.selectedOption || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading test...</p>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Questions Available</h1>
            <p className="text-muted-foreground mb-4">
              There are no questions available for this difficulty level.
            </p>
            <Button onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Ready to Start Your Test?</h1>
              <p className="text-muted-foreground mb-6">
                You have {questions.length} questions to complete. Each question has {questions[0]?.time_limit_minutes} minutes time limit.
              </p>
              <div className="space-y-4 mb-8">
                <p className="text-sm text-muted-foreground">
                  • Read each question carefully
                </p>
                <p className="text-sm text-muted-foreground">
                  • Once you answer and move to next, you cannot go back
                </p>
                <p className="text-sm text-muted-foreground">
                  • Submit the test before time runs out
                </p>
              </div>
              <Button 
                onClick={handleStartTest}
                size="lg"
                className="bg-gradient-to-r from-brand-primary to-brand-secondary"
              >
                Start Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = getCurrentAnswer();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header with Timer and Submit */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="w-5 h-5 text-brand-primary" />
            <span className={`text-lg font-mono ${questionTimeRemaining < 60 ? 'text-red-500' : ''}`}>
              {formatTime(questionTimeRemaining)}
            </span>
            {answers.length > 0 && (
              <Button
                onClick={handleSubmitTest}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                Submit Test ({answers.length}/{questions.length})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Question Content with Right Sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Question Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-6">
                  {currentQuestion.question_text}
                </h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'a', text: currentQuestion.option_a },
                    { key: 'b', text: currentQuestion.option_b },
                    { key: 'c', text: currentQuestion.option_c },
                    { key: 'd', text: currentQuestion.option_d }
                  ].map((option) => (
                    <div
                      key={option.key}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        currentAnswer === option.key
                          ? 'border-brand-primary bg-brand-primary/10'
                          : 'border-border hover:border-brand-primary/50'
                      }`}
                      onClick={() => handleAnswerSelect(currentQuestion.id, option.key)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          currentAnswer === option.key
                            ? 'border-brand-primary bg-brand-primary text-white'
                            : 'border-muted-foreground'
                        }`}>
                          {option.key.toUpperCase()}
                        </div>
                        <span className="text-lg">{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-end mt-8">
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1 && answers.length === 0}
              >
                {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>

          {/* Question Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Question Progress</h3>
                <div className="grid grid-cols-4 gap-2">
                  {questions.map((_, index) => {
                    const isAnswered = answers.some(a => a.questionId === questions[index].id);
                    const isCurrent = index === currentQuestionIndex;
                    const isCompleted = completedQuestions.has(index);
                    const canAccess = index <= currentQuestionIndex && !isCompleted;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => canAccess && setCurrentQuestionIndex(index)}
                        disabled={!canAccess}
                        className={`w-10 h-10 rounded border flex items-center justify-center text-sm font-medium transition-colors relative ${
                          isCurrent
                            ? 'border-brand-primary bg-brand-primary text-white'
                            : isCompleted
                            ? 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                            : isAnswered
                            ? 'border-green-500 bg-green-100 text-green-700'
                            : !canAccess
                            ? 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                            : 'border-border hover:border-brand-primary/50'
                        }`}
                      >
                        {isAnswered && !isCurrent ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          index + 1
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-col space-y-2 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-muted-foreground" />
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded border bg-muted"></div>
                    <span>Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
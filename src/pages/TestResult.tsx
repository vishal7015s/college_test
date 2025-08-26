import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
}

interface Answer {
  questionId: string;
  selectedOption: string;
}

interface TestResultState {
  questions: Question[];
  answers: Answer[];
  score: number;
  timeSpent: number;
}

const TestResult = () => {
  const { topicId, difficulty } = useParams<{ topicId: string; difficulty: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state as TestResultState;
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }
  }, [user, authLoading, navigate]);

  // Save test attempt to database
  useEffect(() => {
    if (user && resultData && topicId && difficulty) {
      saveTestAttempt();
    }
  }, [user, resultData, topicId, difficulty]);

  const saveTestAttempt = async () => {
    if (!user || !resultData || !topicId || !difficulty) return;

    try {
      const { error } = await supabase
        .from('test_attempts')
        .insert([{
          user_id: user.id,
          topic_id: topicId,
          difficulty: difficulty,
          score: resultData.score,
          total_questions: resultData.questions.length,
          time_taken_seconds: resultData.timeSpent * 60, // Convert minutes to seconds
          questions_data: resultData.questions,
          answers_data: resultData.answers
        }] as any);

      if (error) {
        console.error('Error saving test attempt:', error);
        toast({
          title: "Warning",
          description: "Test completed but could not save to progress history",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error saving test attempt:', error);
    }
  };

  if (!resultData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Test Results Found</h1>
            <Link to="/test-series">
              <Button>Back to Test Series</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { questions, answers, score, timeSpent } = resultData;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Outstanding Performance! 🎉";
    if (score >= 80) return "Excellent Work! 👏";
    if (score >= 70) return "Good Job! 👍";
    if (score >= 60) return "Keep Practicing! 💪";
    return "Need More Practice! 📚";
  };

  const correctAnswers = answers.filter(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    return question && question.correct_answer.toLowerCase() === answer.selectedOption.toLowerCase();
  }).length;

  const incorrectAnswers = answers.filter(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    return question && question.correct_answer.toLowerCase() !== answer.selectedOption.toLowerCase();
  }).length;

  const unanswered = questions.length - answers.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Score Summary */}
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Trophy className="w-16 h-16 mx-auto text-brand-primary mb-4" />
              <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
              <p className="text-muted-foreground">{getScoreMessage(score)}</p>
            </div>
            
            <div className={`inline-flex items-center px-6 py-3 rounded-full text-2xl font-bold mb-6 ${getScoreColor(score)}`}>
              Your Score: {score}%
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{formatTime(timeSpent)}</div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <RotateCcw className="w-6 h-6 text-gray-500" />
                </div>
                <div className="text-2xl font-bold text-gray-600">{unanswered}</div>
                <div className="text-sm text-muted-foreground">Unanswered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Link to={`/test/${topicId}/${difficulty}`}>
            <Button className="bg-brand-primary hover:bg-brand-primary/90">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Test
            </Button>
          </Link>
          
          <Link to="/test-series">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Back to Test Series
            </Button>
          </Link>
        </div>

        {/* Detailed Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Detailed Results</h2>
          
          {questions.map((question, index) => {
            const userAnswer = answers.find(a => a.questionId === question.id);
            const isCorrect = userAnswer && 
              question.correct_answer.toLowerCase() === userAnswer.selectedOption.toLowerCase();
            const isAnswered = !!userAnswer;
            
            return (
              <Card key={question.id} className={`border-l-4 ${
                !isAnswered ? 'border-l-gray-400' : 
                isCorrect ? 'border-l-green-500' : 'border-l-red-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        Question {index + 1}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {question.question_text}
                      </p>
                    </div>
                    <Badge className={
                      !isAnswered ? 'bg-gray-100 text-gray-800' :
                      isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }>
                      {!isAnswered ? 'Not Answered' : isCorrect ? 'Correct' : 'Incorrect'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[
                      { key: 'a', text: question.option_a },
                      { key: 'b', text: question.option_b },
                      { key: 'c', text: question.option_c },
                      { key: 'd', text: question.option_d }
                    ].map((option) => {
                      const isUserChoice = userAnswer?.selectedOption === option.key;
                      const isCorrectAnswer = question.correct_answer.toLowerCase() === option.key.toLowerCase();
                      
                      return (
                        <div
                          key={option.key}
                          className={`p-3 border rounded-lg ${
                            isCorrectAnswer
                              ? 'border-green-500 bg-green-50'
                              : isUserChoice && !isCorrectAnswer
                              ? 'border-red-500 bg-red-50'
                              : 'border-border'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                              isCorrectAnswer
                                ? 'border-green-500 bg-green-500 text-white'
                                : isUserChoice && !isCorrectAnswer
                                ? 'border-red-500 bg-red-500 text-white'
                                : 'border-muted-foreground'
                            }`}>
                              {option.key.toUpperCase()}
                            </div>
                            <span>{option.text}</span>
                            {isCorrectAnswer && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                            {isUserChoice && !isCorrectAnswer && <XCircle className="w-4 h-4 text-red-500 ml-auto" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {question.explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                      <p className="text-blue-800">{question.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestResult;
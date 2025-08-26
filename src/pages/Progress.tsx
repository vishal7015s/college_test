import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { TrendingUp, Calendar, Target, Clock, BookOpen, Trophy, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface TestAttempt {
  id: string;
  topic_id: string;
  difficulty: string;
  score: number;
  total_questions: number;
  time_taken_seconds: number;
  created_at: string;
  topics?: {
    name: string;
  } | null;
}

const Progress = () => {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTests: 0,
    avgScore: 0,
    bestScore: 0,
    totalTimeSpent: 0
  });

  useEffect(() => {
    if (user) {
      fetchTestAttempts();
    }
  }, [user]);

  const fetchTestAttempts = async () => {
    try {
      const { data, error } = await supabase
        .from('test_attempts')
        .select('id, topic_id, difficulty, score, total_questions, time_taken_seconds, created_at')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      // Fetch topic names separately
      const topicIds = [...new Set(data?.map(attempt => attempt.topic_id) || [])];
      const { data: topicsData } = await supabase
        .from('topics')
        .select('id, name')
        .in('id', topicIds);

      const attemptsWithTopics = data?.map(attempt => ({
        ...attempt,
        topics: topicsData?.find(topic => topic.id === attempt.topic_id) || null
      })) || [];

      if (error) throw error;

      setAttempts(attemptsWithTopics);
      calculateStats(attemptsWithTopics);
    } catch (error) {
      console.error('Error fetching test attempts:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (attempts: TestAttempt[]) => {
    if (attempts.length === 0) {
      setStats({ totalTests: 0, avgScore: 0, bestScore: 0, totalTimeSpent: 0 });
      return;
    }

    const totalScore = attempts.reduce((sum, attempt) => {
      const percentage = (attempt.score / attempt.total_questions) * 100;
      return sum + percentage;
    }, 0);

    const avgScore = totalScore / attempts.length;
    const bestScore = Math.max(...attempts.map(attempt => 
      (attempt.score / attempt.total_questions) * 100
    ));
    const totalTimeSpent = attempts.reduce((sum, attempt) => sum + attempt.time_taken_seconds, 0);

    setStats({
      totalTests: attempts.length,
      avgScore: Math.round(avgScore),
      bestScore: Math.round(bestScore),
      totalTimeSpent
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getChartData = () => {
    return attempts
      .slice()
      .reverse()
      .map((attempt, index) => ({
        test: index + 1,
        score: Math.round((attempt.score / attempt.total_questions) * 100),
        date: format(new Date(attempt.created_at), 'MMM dd'),
        topic: attempt.topics?.name || 'Unknown',
        difficulty: attempt.difficulty
      }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'basic': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300';
      case 'intermediate': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300';
      case 'advanced': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Trophy className="h-4 w-4 text-yellow-500" />;
    if (score >= 80) return <Award className="h-4 w-4 text-emerald-500" />;
    if (score >= 60) return <Target className="h-4 w-4 text-amber-500" />;
    return <Target className="h-4 w-4 text-red-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Your Progress Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">Track your test performance and improvements over time</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Tests</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalTests}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Average Score</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-3xl font-bold ${getScoreColor(stats.avgScore)}`}>
                      {stats.avgScore}%
                    </p>
                    {getScoreIcon(stats.avgScore)}
                  </div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded-full">
                  <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Best Score</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-3xl font-bold ${getScoreColor(stats.bestScore)}`}>
                      {stats.bestScore}%
                    </p>
                    {getScoreIcon(stats.bestScore)}
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Time Spent</p>
                  <p className="text-3xl font-bold text-foreground">{formatTime(stats.totalTimeSpent)}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Chart */}
        {attempts.length > 0 && (
          <Card className="mb-8 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-6 w-6 text-primary" />
                Performance Trend Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground">Your score progression over time</p>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" />
                    <XAxis 
                      dataKey="date" 
                      className="text-muted-foreground text-sm"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      className="text-muted-foreground text-sm"
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        padding: '12px'
                      }}
                      formatter={(value: any, name: string) => [
                        `${value}%`,
                        'Score Percentage'
                      ]}
                      labelFormatter={(label: string, payload: any) => {
                        if (payload && payload[0]) {
                          const data = payload[0].payload;
                          return `${data.topic} • ${data.difficulty} • ${data.date}`;
                        }
                        return label;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ 
                        fill: 'hsl(var(--primary))', 
                        strokeWidth: 2, 
                        r: 6,
                        stroke: 'hsl(var(--background))'
                      }}
                      activeDot={{ 
                        r: 8, 
                        stroke: 'hsl(var(--primary))',
                        strokeWidth: 2,
                        fill: 'hsl(var(--background))'
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Tests */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="h-6 w-6 text-primary" />
              Recent Test Attempts
            </CardTitle>
            <p className="text-sm text-muted-foreground">Your latest test performances and detailed breakdown</p>
          </CardHeader>
          <CardContent>
            {attempts.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No test attempts yet</h3>
                <p className="text-muted-foreground">Start taking tests to see your progress and detailed analytics!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {attempts.slice(0, 10).map((attempt) => {
                  const scorePercentage = Math.round((attempt.score / attempt.total_questions) * 100);
                  return (
                    <div key={attempt.id} className="group p-5 border rounded-xl hover:shadow-md transition-all duration-200 hover:border-primary/20">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                              {attempt.topics?.name || 'Unknown Topic'}
                            </h3>
                            <Badge variant="outline" className={getDifficultyColor(attempt.difficulty)}>
                              {attempt.difficulty}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span className="font-medium">
                                {format(new Date(attempt.created_at), 'MMM dd, yyyy')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">
                                {formatTime(attempt.time_taken_seconds)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Target className="h-4 w-4" />
                              <span className="font-medium">
                                {attempt.score}/{attempt.total_questions} correct
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="flex items-center gap-2 mb-2">
                            {getScoreIcon(scorePercentage)}
                            <p className={`text-3xl font-bold ${getScoreColor(scorePercentage)}`}>
                              {scorePercentage}%
                            </p>
                          </div>
                          <ProgressBar 
                            value={scorePercentage} 
                            className="w-24 h-2" 
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Progress;
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Plus, BookOpen, HelpCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  category_id: string;
  categories: { name: string };
}

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
  difficulty_level: string;
  topics: { name: string };
}

export default function FacultyDashboard() {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Topic form state
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [topicForm, setTopicForm] = useState({
    name: '',
    description: '',
    category_id: ''
  });

  // Question form state
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
    explanation: '',
    difficulty_level: 'medium',
    topic_id: ''
  });

  useEffect(() => {
    if (user) {
      checkUserRole();
      fetchData();
    }
  }, [user]);

  const checkUserRole = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return;
    }

    setUserRole(data.role);
  };

  const fetchData = async () => {
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      // Fetch topics with category names
      const { data: topicsData, error: topicsError } = await supabase
        .from('topics')
        .select(`
          *,
          categories!inner(name)
        `)
        .order('created_at', { ascending: false });

      if (topicsError) throw topicsError;
      setTopics(topicsData || []);

      // Fetch questions with topic names
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select(`
          *,
          topics!inner(name)
        `)
        .order('created_at', { ascending: false });

      if (questionsError) throw questionsError;
      setQuestions(questionsData || []);

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('topics')
        .insert([{
          ...topicForm,
          created_by: user.id
        }]);

      if (error) throw error;

      toast({ title: "Success", description: "Topic created successfully" });
      setTopicForm({ name: '', description: '', category_id: '' });
      setIsAddingTopic(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('questions')
        .insert([{
          ...questionForm,
          created_by: user.id
        }]);

      if (error) throw error;

      toast({ title: "Success", description: "Question created successfully" });
      setQuestionForm({
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: '',
        explanation: '',
        difficulty_level: 'medium',
        topic_id: ''
      });
      setIsAddingQuestion(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === null) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (userRole !== 'faculty' && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Faculty Dashboard</h1>

      <Tabs defaultValue="topics" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="topics" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Questions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Manage Topics</h2>
            <Button onClick={() => setIsAddingTopic(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Topic
            </Button>
          </div>

          {isAddingTopic && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTopicSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={topicForm.category_id} 
                      onValueChange={(value) => setTopicForm(prev => ({ ...prev, category_id: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="topicName">Topic Name</Label>
                    <Input
                      id="topicName"
                      value={topicForm.name}
                      onChange={(e) => setTopicForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., LCM, HCF, Percentages"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="topicDescription">Description</Label>
                    <Textarea
                      id="topicDescription"
                      value={topicForm.description}
                      onChange={(e) => setTopicForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Topic description"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Create Topic</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddingTopic(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {topics.map((topic) => (
              <Card key={topic.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{topic.name}</h3>
                      <p className="text-sm text-muted-foreground">Category: {topic.categories.name}</p>
                      <p className="text-muted-foreground mt-1">{topic.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Manage Questions</h2>
            <Button onClick={() => setIsAddingQuestion(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Question
            </Button>
          </div>

          {isAddingQuestion && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Question</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuestionSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Topic</Label>
                    <Select 
                      value={questionForm.topic_id} 
                      onValueChange={(value) => setQuestionForm(prev => ({ ...prev, topic_id: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map(topic => (
                          <SelectItem key={topic.id} value={topic.id}>
                            {topic.name} ({topic.categories.name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="questionText">Question</Label>
                    <Textarea
                      id="questionText"
                      value={questionForm.question_text}
                      onChange={(e) => setQuestionForm(prev => ({ ...prev, question_text: e.target.value }))}
                      placeholder="Enter your question here"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="optionA">Option A</Label>
                      <Input
                        id="optionA"
                        value={questionForm.option_a}
                        onChange={(e) => setQuestionForm(prev => ({ ...prev, option_a: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="optionB">Option B</Label>
                      <Input
                        id="optionB"
                        value={questionForm.option_b}
                        onChange={(e) => setQuestionForm(prev => ({ ...prev, option_b: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="optionC">Option C</Label>
                      <Input
                        id="optionC"
                        value={questionForm.option_c}
                        onChange={(e) => setQuestionForm(prev => ({ ...prev, option_c: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="optionD">Option D</Label>
                      <Input
                        id="optionD"
                        value={questionForm.option_d}
                        onChange={(e) => setQuestionForm(prev => ({ ...prev, option_d: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="correctAnswer">Correct Answer</Label>
                      <Select 
                        value={questionForm.correct_answer} 
                        onValueChange={(value) => setQuestionForm(prev => ({ ...prev, correct_answer: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select 
                        value={questionForm.difficulty_level} 
                        onValueChange={(value) => setQuestionForm(prev => ({ ...prev, difficulty_level: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="explanation">Explanation</Label>
                    <Textarea
                      id="explanation"
                      value={questionForm.explanation}
                      onChange={(e) => setQuestionForm(prev => ({ ...prev, explanation: e.target.value }))}
                      placeholder="Explain the correct answer"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Create Question</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddingQuestion(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {questions.map((question) => (
              <Card key={question.id}>
                <CardContent className="p-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{question.question_text}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Topic: {question.topics.name}</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <p className="text-sm">A) {question.option_a}</p>
                      <p className="text-sm">B) {question.option_b}</p>
                      <p className="text-sm">C) {question.option_c}</p>
                      <p className="text-sm">D) {question.option_d}</p>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Correct: {question.correct_answer}</span>
                      <span>Difficulty: {question.difficulty_level}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
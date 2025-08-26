-- Create table to track user test attempts and scores
CREATE TABLE public.test_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  topic_id UUID NOT NULL,
  difficulty TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken_seconds INTEGER NOT NULL,
  questions_data JSONB,
  answers_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on test_attempts
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies for test_attempts
CREATE POLICY "Users can view their own test attempts"
ON public.test_attempts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test attempts"
ON public.test_attempts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_test_attempts_updated_at
BEFORE UPDATE ON public.test_attempts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
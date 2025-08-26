-- Add time_limit column to questions table
ALTER TABLE public.questions 
ADD COLUMN time_limit_minutes INTEGER DEFAULT 2;

-- Add comment to clarify the column
COMMENT ON COLUMN public.questions.time_limit_minutes IS 'Time limit for this question in minutes';
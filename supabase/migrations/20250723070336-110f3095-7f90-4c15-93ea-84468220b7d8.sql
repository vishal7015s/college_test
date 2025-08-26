-- Create function to get total registered users count
CREATE OR REPLACE FUNCTION get_total_users_count()
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM profiles);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to track live users (presence)
CREATE TABLE IF NOT EXISTS public.live_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  session_id TEXT NOT NULL UNIQUE,
  last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on live_users table
ALTER TABLE public.live_users ENABLE ROW LEVEL SECURITY;

-- Create policies for live_users
CREATE POLICY "Anyone can view live users count" 
ON public.live_users 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert live user session" 
ON public.live_users 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update their session" 
ON public.live_users 
FOR UPDATE 
USING (true);

-- Create function to get live users count (users active in last 5 minutes)
CREATE OR REPLACE FUNCTION get_live_users_count()
RETURNS INTEGER AS $$
BEGIN
  -- Clean up old sessions (older than 5 minutes)
  DELETE FROM live_users WHERE last_seen < now() - INTERVAL '5 minutes';
  
  -- Return count of active sessions
  RETURN (SELECT COUNT(DISTINCT session_id) FROM live_users WHERE last_seen > now() - INTERVAL '5 minutes');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update user presence
CREATE OR REPLACE FUNCTION update_user_presence(session_uuid TEXT, user_uuid UUID DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
  INSERT INTO live_users (user_id, session_id, last_seen)
  VALUES (user_uuid, session_uuid, now())
  ON CONFLICT (session_id) 
  DO UPDATE SET 
    last_seen = now(),
    user_id = COALESCE(EXCLUDED.user_id, live_users.user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
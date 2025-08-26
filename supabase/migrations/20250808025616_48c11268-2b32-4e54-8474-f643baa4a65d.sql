-- Add new fields to profiles table for enhanced user information
ALTER TABLE public.profiles 
ADD COLUMN enrollment_number TEXT,
ADD COLUMN year TEXT,
ADD COLUMN branch TEXT;

-- Add constraints for enrollment number validation
ALTER TABLE public.profiles 
ADD CONSTRAINT enrollment_number_length CHECK (LENGTH(enrollment_number) = 12);

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, enrollment_number, year, branch)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'enrollment_number', ''),
    COALESCE(new.raw_user_meta_data ->> 'year', ''),
    COALESCE(new.raw_user_meta_data ->> 'branch', '')
  );
  RETURN new;
END;
$$;
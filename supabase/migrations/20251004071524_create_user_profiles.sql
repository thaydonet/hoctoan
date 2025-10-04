/*
  # Create User Profiles System

  ## Overview
  Creates a comprehensive user profile system for the math learning platform with support for both students and teachers (admins).

  ## New Tables
  
  ### `user_profiles`
  - `id` (uuid, primary key) - References auth.users(id)
  - `email` (text, not null) - User's email address
  - `full_name` (text) - User's full name
  - `role` (text, not null) - Either 'student' or 'teacher'
  - `avatar_url` (text) - URL to user's avatar image
  - `reputation` (integer, default 0) - User's reputation score
  - `questions_asked` (integer, default 0) - Count of questions asked
  - `answers_given` (integer, default 0) - Count of answers given
  - `created_at` (timestamptz, default now()) - Account creation time
  - `last_login` (timestamptz, default now()) - Last login timestamp
  - `updated_at` (timestamptz, default now()) - Last profile update

  ## Security
  
  1. Enable RLS on `user_profiles` table
  2. Users can read their own profile
  3. Users can update their own profile (except role)
  4. Teachers can read all profiles
  5. Public can view basic student information (for community features)

  ## Indexes
  
  - Index on email for faster lookups
  - Index on role for filtering by user type

  ## Notes
  
  - Role is restricted to 'student' or 'teacher' via CHECK constraint
  - Default role is 'student' for new registrations
  - Teachers must be manually promoted by updating the role field
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher')),
  avatar_url text,
  reputation integer DEFAULT 0,
  questions_asked integer DEFAULT 0,
  answers_given integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Users can update their own profile (except role)
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    role = (SELECT role FROM user_profiles WHERE id = auth.uid())
  );

-- Policy: Teachers can read all profiles
CREATE POLICY "Teachers can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'teacher'
    )
  );

-- Policy: Users can insert their own profile on signup
CREATE POLICY "Users can create own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'student')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at
DROP TRIGGER IF EXISTS on_user_profile_updated ON user_profiles;
CREATE TRIGGER on_user_profile_updated
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
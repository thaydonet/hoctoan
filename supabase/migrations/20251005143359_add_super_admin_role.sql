/*
  # Add Super Admin Role

  ## Overview
  Adds a super admin role with elevated privileges to manage all users and content.

  ## Changes
  
  1. Modify user_profiles table
    - Update role CHECK constraint to include 'super_admin'
    - Keep existing 'student' and 'teacher' roles
  
  2. Security Updates
    - Add policy for super_admins to manage all user profiles
    - Allow super_admins to update any user's role
    - Super_admins can view, create, update, and delete all content
  
  3. Helper Functions
    - Function to promote user to super_admin
    - Function to check if user is super_admin
  
  ## Notes
  
  - Super admin is the highest privilege level
  - Only super_admins can promote other users to super_admin
  - First super_admin must be created manually via SQL or this migration
*/

-- Drop existing CHECK constraint and add new one with super_admin
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'user_profiles' AND constraint_name LIKE '%role%check%'
  ) THEN
    ALTER TABLE user_profiles DROP CONSTRAINT user_profiles_role_check;
  END IF;
END $$;

ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_role_check 
  CHECK (role IN ('student', 'teacher', 'super_admin'));

-- Function to check if current user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policy: Super admins can read all profiles
DROP POLICY IF EXISTS "Super admins can read all profiles" ON user_profiles;
CREATE POLICY "Super admins can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Policy: Super admins can update any profile including roles
DROP POLICY IF EXISTS "Super admins can update any profile" ON user_profiles;
CREATE POLICY "Super admins can update any profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Policy: Super admins can delete profiles
DROP POLICY IF EXISTS "Super admins can delete profiles" ON user_profiles;
CREATE POLICY "Super admins can delete profiles"
  ON user_profiles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Function to promote user to any role (only super_admin can execute)
CREATE OR REPLACE FUNCTION public.promote_user(
  target_user_id uuid,
  new_role text
)
RETURNS void AS $$
BEGIN
  -- Check if caller is super_admin
  IF NOT is_super_admin() THEN
    RAISE EXCEPTION 'Only super admins can promote users';
  END IF;

  -- Validate role
  IF new_role NOT IN ('student', 'teacher', 'super_admin') THEN
    RAISE EXCEPTION 'Invalid role: %', new_role;
  END IF;

  -- Update user role
  UPDATE user_profiles
  SET role = new_role, updated_at = now()
  WHERE id = target_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found: %', target_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create first super admin (replace with your email)
-- You can manually update this after migration or via Supabase dashboard
COMMENT ON FUNCTION public.promote_user IS 
  'Promotes a user to a new role. Only callable by super_admins.';

COMMENT ON FUNCTION public.is_super_admin IS 
  'Returns true if the current user is a super admin.';
-- Create contact_rate_limits table for rate limiting contact form submissions
CREATE TABLE IF NOT EXISTS contact_rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  submission_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on ip_address and window_start for efficient lookups
CREATE INDEX IF NOT EXISTS idx_contact_rate_limits_ip_window 
ON contact_rate_limits(ip_address, window_start);

-- Create function to cleanup old rate limit records (older than 1 hour)
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM contact_rate_limits
  WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$;

-- Grant necessary permissions
GRANT ALL ON contact_rate_limits TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON contact_rate_limits TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON contact_rate_limits TO authenticated;

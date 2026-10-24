CREATE TABLE IF NOT EXISTS citizens (
  user_id BIGINT PRIMARY KEY REFERENCES users(id),
  nik TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('L','P')),
  rp_phone TEXT UNIQUE NOT NULL,
  job_title TEXT DEFAULT 'Pengangguran',
  confirmed BOOLEAN DEFAULT false,
  registered_at TIMESTAMPTZ DEFAULT now()
);

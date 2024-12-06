export const LibrarySchema = `
CREATE TABLE IF NOT EXISTS libraries (
  library_id UUID PRIMARY KEY,
  user_id UUID NULL REFERENCES users(user_id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  desc VARCHAR,
  tags TEXT,
  sync_status TEXT DEFAULT "local",
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
`;

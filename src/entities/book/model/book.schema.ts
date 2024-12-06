export const BookSchema = `
CREATE TABLE IF NOT EXISTS books (
    book_id TEXT PRIMARY KEY,
    user_id TEXT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    author TEXT,
    added_at TEXT DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT,
    tags TEXT,
    desc TEXT,
    file_url TEXT NOT NULL,
    sync_status TEXT DEFAULT "local",
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

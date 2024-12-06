export const UserSchema = `
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    jwt_version INTEGER DEFAULT 1,
    avatar_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

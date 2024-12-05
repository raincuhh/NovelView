CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    jwt_version INT DEFAULT 1,
    avatar_url VARCHAR,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS libraries (
    library_id UUID PRIMARY KEY,
    user_id UUID NULL REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    desc VARCHAR,
    tags TEXT,
    sync_status TEXT DEFAULT "local",
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
    book_id UUID PRIMARY KEY,
    user_id UUID NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    author VARCHAR,
    added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT,
    desc TEXT,
    file_url VARCHAR NOT NULL,
    sync_status TEXT DEFAULT "local",
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS library_books (
    library_id UUID NOT NULL REFERENCES libraries(library_id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (library_id, book_id)
);

CREATE TABLE IF NOT EXISTS library_interactions (
    interaction_id UUID PRIMARY KEY,
    library_id UUID NOT NULL REFERENCES libraries(library_id) ON DELETE CASCADE,
    user_id UUID NULL REFERENCES users(user_id) ON DELETE CASCADE,
    click_count INT DEFAULT 0,
    last_accessed TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

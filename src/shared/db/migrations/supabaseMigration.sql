DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_type') THEN
        CREATE TYPE gender_type AS ENUM ('male', 'female', 'nonBinary', 'other', 'preferNotToSay');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS profiles (
    profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    gender gender_type,
    dob timestamp with time zone,
    synced BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
) WITH (OIDS=FALSE);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'library_type') THEN
        CREATE TYPE library_type AS ENUM ('sync', 'local');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS libraries (
    library_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    cover_url text,
    type library_type NOT NULL DEFAULT 'sync',
    synced BOOLEAN DEFAULT FALSE,
    author text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
) WITH (OIDS=FALSE);
ALTER TABLE libraries ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS books (
    book_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    library_id UUID REFERENCES libraries(library_id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title text NOT NULL,
    author text,
    metadata JSONB,
    toc JSONB,
    cover_image_url text,
    epub_url text,
    is_saved BOOLEAN DEFAULT TRUE,
    read_count INT DEFAULT 0 CHECK (read_count >= 0),
    last_read_at TIMESTAMP WITH TIME ZONE NOT NULL,
    synced BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
) WITH (OIDS=FALSE);
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS book_contents (
    book_content_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES books(book_id) ON DELETE CASCADE,
    content_json JSONB,
    parsing_version INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
) WITH (OIDS=FALSE);
ALTER TABLE book_contents ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_book_contents_book_id ON book_contents(book_id);

CREATE TABLE IF NOT EXISTS user_settings (
    setting_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    app_theme text DEFAULT 'default',
    app_accent text,
    font_size INT DEFAULT 14,
    language text DEFAULT 'en',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
) WITH (OIDS=FALSE);
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

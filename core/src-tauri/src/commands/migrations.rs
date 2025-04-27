use tauri_plugin_sql::{Migration, MigrationKind};

pub fn setup_session_db() -> Vec<Migration> {
    vec![Migration {
        version: 1,
        description: "create session table",
        sql: "
          CREATE TABLE IF NOT EXISTS session (
              id TEXT PRIMARY KEY DEFAULT 'singleton',
              access_token TEXT NOT NULL,
              refresh_token TEXT NOT NULL,
              user_id TEXT NOT NULL,
              expires_at INTEGER NOT NULL,
              created_at TEXT DEFAULT CURRENT_TIMESTAMP,
              updated_at TEXT DEFAULT CURRENT_TIMESTAMP
          );
      ",
        kind: MigrationKind::Up,
    }]
}

pub fn setup_main_db() -> Vec<Migration> {
    vec![
        Migration {
            version: 2,
            description: "create local libraries table",
            sql: "
            CREATE TABLE IF NOT EXISTS libraries (
                  id TEXT PRIMARY KEY,
                  user_id TEXT,
                  name TEXT,
                  description TEXT,
                  cover_url TEXT,
                  type TEXT,
                  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
              );
              ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create local books table",
            sql: "
            CREATE TABLE IF NOT EXISTS books (
                  id TEXT PRIMARY KEY,
                  library_id TEXT,
                  user_id TEXT,
                  title TEXT,
                  cover_image_url TEXT,
                  file_url TEXT,
                  format TEXT,
                  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
              );
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create local book_info table",
            sql: "
            CREATE TABLE IF NOT EXISTS book_info (
                  id TEXT PRIMARY KEY,
                  book_id TEXT,
                  parsing_version INTEGER,
                  metadata TEXT,
                  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
              );
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "add last_opened_at column to books table",
            sql: "
            ALTER TABLE books ADD COLUMN last_opened_at TEXT;
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "create local library_books table",
            sql: "
            ALTER TABLE BOOKS DROP COLUMN library_id;
            CREATE TABLE IF NOT EXISTS library_books (
                id TEXT PRIMARY KEY,
                library_id TEXT NOT NULL,
                book_id TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
            ",
            kind: MigrationKind::Up,
        },
    ]
}

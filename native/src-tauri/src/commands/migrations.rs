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
                  is_saved TEXT,
                  read_count INTEGER,
                  last_read_at TEXT,
                  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                  file_url TEXT,
                  format TEXT
              );
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create local book_contents table",
            sql: "
            CREATE TABLE IF NOT EXISTS book_contents (
                  id TEXT PRIMARY KEY,
                  book_id TEXT,
                  content_json TEXT,
                  parsing_version INTEGER,
                  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                  metadata TEXT,
                  toc TEXT,
                  content_position TEXT
              );
            ",
            kind: MigrationKind::Up,
        },
    ]
}

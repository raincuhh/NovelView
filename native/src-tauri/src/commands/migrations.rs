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
            sql: "",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create local books table",
            sql: "",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create local book_contents table",
            sql: "",
            kind: MigrationKind::Up,
        },
    ]
}

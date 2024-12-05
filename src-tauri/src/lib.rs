use std::sync::Mutex;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::{AppHandle, Listener, WebviewWindowBuilder};
use tauri::{Manager, WebviewWindow};
use tauri_plugin_sql::{Migration, MigrationKind};

static IS_MAIN_VISIBLE: std::sync::Mutex<bool> = Mutex::new(false);

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            let app_handle: &AppHandle = app.app_handle();

            let landing_window: WebviewWindow = match setup_window(
                app_handle,
                "landing",
                "index.html#/",
                "landing",
                true,
                false,
                true,
                false,
                false,
                700.0,
                600.0,
                None,
                None,
            ) {
                Ok(window) => window,
                Err(e) => {
                    eprintln!("Failed to create window: {:?}", e);
                    return Err(Box::new(e));
                }
            };

            let main_window: WebviewWindow = match setup_window(
                app_handle,
                "main",
                "index.html#/home",
                "main",
                false,
                false,
                true,
                false,
                true,
                700.0,
                600.0,
                Some(660.0),
                Some(400.0),
            ) {
                Ok(window) => window,
                Err(e) => {
                    eprintln!("Failed to create window: {:?}", e);
                    return Err(Box::new(e));
                }
            };

            app.listen_any("toggle_window", move |_| {
                let mut is_visible = IS_MAIN_VISIBLE.lock().unwrap();
                if *is_visible {
                    landing_window.show().unwrap();
                    main_window.hide().unwrap();
                    *is_visible = false;
                } else {
                    landing_window.hide().unwrap();
                    main_window.show().unwrap();
                    *is_visible = true;
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_window(
    app_handle: &AppHandle,
    label: &str,
    url: &str,
    title: &str,
    visible: bool,
    transparent: bool,
    centered: bool,
    decorations: bool,
    resizable: bool,
    width: f64,
    height: f64,
    min_width: Option<f64>,
    min_height: Option<f64>,
) -> Result<tauri::WebviewWindow, tauri::Error> {
    let mut window_builder =
        WebviewWindowBuilder::new(app_handle, label, tauri::WebviewUrl::App(url.into()))
            .title(title)
            .visible(visible)
            .transparent(transparent)
            .decorations(decorations)
            .resizable(resizable)
            .inner_size(width, height);

    if let (Some(min_w), Some(min_h)) = (min_width, min_height) {
        window_builder = window_builder.min_inner_size(min_w, min_h);
    }

    if centered {
        window_builder = window_builder.center();
    }

    window_builder.build()
}

pub fn setup_database() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: r"
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
                user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                name VARCHAR NOT NULL,
                desc VARCHAR,
                tags TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS books (
                book_id UUID PRIMARY KEY,
                user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                title VARCHAR NOT NULL,
                author VARCHAR,
                added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                metadata TEXT,
                desc TEXT,
                file_url VARCHAR NOT NULL
            );

            CREATE TABLE IF NOT EXISTS library_books (
                library_id UUID NOT NULL REFERENCES libraries(library_id) ON DELETE CASCADE,
                book_id UUID NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (library_id, book_id)
            );

            CREATE TABLE IF NOT EXISTS libraryInteractions (
                interaction_id UUID PRIMARY KEY,
                library_id UUID NOT NULL REFERENCES libraries(library_id) ON DELETE CASCADE,
                user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                click_count INT DEFAULT 0,
                last_accessed TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
            ",
            kind: MigrationKind::Up,
        }
    ]
}

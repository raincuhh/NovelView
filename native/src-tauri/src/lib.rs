mod commands;

// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// fn run() {
//     run_impl()
// }

#[cfg(mobile)]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    run_impl();
}

#[cfg(not(mobile))]
pub fn run() {
    run_impl();
}

fn run_impl() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:session.db",
                    commands::migrations::setup_session_db(),
                )
                .add_migrations("sqlite:local.db", commands::migrations::setup_main_db())
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::greet::greet,
            commands::fs::hide_file_or_folder,
            commands::epub::parse_epub,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

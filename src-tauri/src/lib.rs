use tauri::{command, Window};
#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::{Listener, WebviewWindowBuilder};

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            //let app_handle = app.handle();

            let login_window: tauri::WebviewWindow = WebviewWindowBuilder::new(
                app,
                "login",
                tauri::WebviewUrl::App("index.html#/login".into()),
            )
            .title("Login")
            .center()
            .decorations(false)
            .build()?;

            let main_window: tauri::WebviewWindow = WebviewWindowBuilder::new(
                app,
                "NovelView",
                tauri::WebviewUrl::App("index.html#/main".into()),
            )
            .title("NovelView")
            .visible(false)
            .build()?;

            app.listen_any("login_success", move |_| {
                login_window.hide().unwrap();
                main_window.show().unwrap();
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            minimize_window,
            close_window,
            maximize_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[command]
fn minimize_window(window: Window) {
    window.minimize().unwrap();
}

#[command]
fn maximize_window(window: Window) {
    window.maximize().unwrap();
}

#[command]
fn close_window(window: Window) {
    window.close().unwrap();
}

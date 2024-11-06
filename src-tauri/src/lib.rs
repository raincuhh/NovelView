use tauri::Listener;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::WebviewWindowBuilder;

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

            let login_window: tauri::WebviewWindow = WebviewWindowBuilder::new(
                app,
                "login",
                tauri::WebviewUrl::App("index.html#/login".into()),
            )
            .title("Login")
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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

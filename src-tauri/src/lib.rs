use tauri::{command, Manager, WebviewWindow, Window};
#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::{AppHandle, Listener, WebviewWindowBuilder};

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
            let app_handle: &AppHandle = app.app_handle();

            let login_window: WebviewWindow = match setup_window(
                app_handle,
                "login",
                "index.html#/login",
                "login",
                true,
                true,
                false,
                false,
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
                "index.html#/dashboard",
                "main",
                false,
                true,
                false,
                true,
            ) {
                Ok(window) => window,
                Err(e) => {
                    eprintln!("Failed to create window: {:?}", e);
                    return Err(Box::new(e));
                }
            };

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

fn setup_window(
    app_handle: &AppHandle,
    label: &str,
    url: &str,
    title: &str,
    visible: bool,
    centered: bool,
    decorations: bool,
    resizable: bool,
) -> Result<tauri::WebviewWindow, tauri::Error> {
    let mut window_builder =
        WebviewWindowBuilder::new(app_handle, label, tauri::WebviewUrl::App(url.into()))
            .title(title)
            .visible(visible)
            .decorations(decorations)
            .resizable(resizable);

    if centered {
        window_builder = window_builder.center();
    }

    window_builder.build()
}

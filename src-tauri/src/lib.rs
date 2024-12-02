#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::{AppHandle, Listener, WebviewWindowBuilder};
use tauri::{Manager, WebviewWindow};

pub fn run() {
    tauri::Builder::default()
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
                "login",
                "index.html#/",
                "login",
                true,
                false,
                true,
                false,
                false,
                700.0, //700.0
                600.0,
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
                false,
                true,
                false,
                true,
                700.0,
                600.0,
            ) {
                Ok(window) => window,
                Err(e) => {
                    eprintln!("Failed to create window: {:?}", e);
                    return Err(Box::new(e));
                }
            };

            app.listen_any("login_success", move |_| {
                landing_window.hide().unwrap();
                main_window.show().unwrap();
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
) -> Result<tauri::WebviewWindow, tauri::Error> {
    let mut window_builder =
        WebviewWindowBuilder::new(app_handle, label, tauri::WebviewUrl::App(url.into()))
            .title(title)
            .visible(visible)
            .transparent(transparent)
            .decorations(decorations)
            .resizable(resizable)
            .inner_size(width, height);

    if centered {
        window_builder = window_builder.center();
    }

    window_builder.build()
}

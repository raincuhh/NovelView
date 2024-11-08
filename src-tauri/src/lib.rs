#[cfg_attr(mobile, tauri::mobile_entry_point)]
use tauri::{AppHandle, Listener, WebviewWindowBuilder};
use tauri::{Manager, WebviewWindow};

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
                1100.0,
                650.0,
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
                950.0,
                650.0,
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
            .decorations(decorations)
            .resizable(resizable)
            .inner_size(width, height);

    if centered {
        window_builder = window_builder.center();
    }

    window_builder.build()
}

/*
#[command]
fn minimize_window(window: Window) {
    window.minimize().unwrap();
}

struct WindowState {
    width: Option<u32>,
    height: Option<u32>,
}

#[command]
fn maximize_window(window: Window, state: tauri::State<'_, std::sync::Mutex<WindowState>>) {
    let mut state = state.lock().unwrap();

    if let Some(width) = state.width {
        window
            .set_size(tauri::Size::Physical(tauri::PhysicalSize {
                width,
                height: state.height.unwrap_or(600),
            }))
            .unwrap();
    } else {
        let size: tauri::PhysicalSize<u32> = window.inner_size().unwrap();

        state.width = Some(size.width);
        state.height = Some(size.height);
        drop(state);

        window.maximize().unwrap();
    }
}

#[command]
fn close_window(window: Window) {
    window.close().unwrap();
}

*/

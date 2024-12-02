use tauri::Manager;
use tauri_plugin_cli::CliExt;
use tauri_plugin_fs::FsExt;

#[tauri::command]
async fn open_edit(app: tauri::AppHandle) {
    if app.get_webview_window("editor").is_none() {
        tauri::WebviewWindowBuilder::from_config(
            &app,
            &app.config().app.windows.get(1).unwrap().clone(),
        )
        .unwrap()
        .build()
        .unwrap();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![open_edit])
        .setup(|app| {
            #[cfg(desktop)]
            let _ = app.handle().plugin(tauri_plugin_cli::init());
            match app.cli().matches() {
                Ok(matches) => {
                    if matches.args["source"].value.is_string() {
                        let source = matches.args["source"].value.as_str().unwrap();
                        let scope = app.fs_scope();
                        scope.allow_file(source);
                    }
                }
                Err(_) => {}
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

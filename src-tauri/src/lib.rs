use tauri_plugin_cli::CliExt;
use tauri_plugin_fs::FsExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
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

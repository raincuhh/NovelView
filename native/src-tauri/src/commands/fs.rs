// use std::env;
// use std::path::Path;

#[tauri::command]
pub async fn hide_file_or_folder(path: String) -> Result<(), String> {
    #[cfg(target_os = "windows")]
    {
        use std::process::Command;

        let output = Command::new("powershell")
            .args([
                "-Command",
                &format!("Set-ItemProperty -Path '{}' -Name Attributes -Value ([System.IO.FileAttributes]::Hidden)", path),
            ])
            .output()
            .map_err(|e| e.to_string())?;

        if !output.status.success() {
            return Err(format!(
                "Failed to hide file: {}",
                String::from_utf8_lossy(&output.stderr)
            ));
        }
    }

    #[cfg(any(target_os = "linux", target_os = "macos"))]
    {
        use std::fs;
        use std::path::Path;
        use std::path::PathBuf;

        let original = PathBuf::from(&path);
        let file_name = original.file_name().ok_or("Invalid path")?;
        if !file_name.to_string_lossy().starts_with('.') {
            let new_name = format!(".{}", file_name.to_string_lossy());
            let new_path = original.with_file_name(new_name);
            fs::rename(&original, &new_path).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}

use std::env;
use std::path::Path;
// use std::process::{exit, Command};

#[tauri::command]
pub fn hide_appdata_folders() {
    let current_dir = env::current_dir().expect("Failed to get current directory");
    //  let script_path = current_dir
    //      .join("../src/features/filesystem/lib/hide_folder.sh")
    //      .to_str()
    //      .expect("Failed to resolve script path");

    let script_path_binding = current_dir.join("../src/features/filesystem/lib/hide_folder.sh");
    let script_path = script_path_binding
        .to_str()
        .expect("Failed to resolve script path");

    println!(
        "current dir: {:?}, script path relative to current dir: {:?}",
        current_dir, script_path
    );

    if Path::new(&script_path).exists() {
        println!("Error: script file does not exist at: {:?}", script_path);
        return;
    }

    println!("Everything works, executing hiding folders...")

    //  let output = Command::new("sh")
    //      .arg(script_path)
    //      .output()
    //      .expect("Failed to execute script");

    //  if output.status.success() {
    //      println!("Hidden folders");
    //  } else {
    //      let stderr = String::from_utf8_lossy(&output.stderr);
    //      let stdout = String::from_utf8_lossy(&output.stdout);
    //      println!("Script failed with status: {}", output.status);
    //      println!("stdout: {}", stdout);
    //      println!("stderr: {}", stderr);
    //      //   exit(1);
    //  }
}

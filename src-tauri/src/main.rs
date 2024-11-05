// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv::dotenv;
use std::env;

fn main() {
    app_lib::run();

    dotenv().ok();

    let env_test = env::var("TEST_ENV").unwrap_or_else(|_| "bye world".to_string());
    println!("TEST_ENV: {}", env_test);
}

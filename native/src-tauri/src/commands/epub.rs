use epub::doc::EpubDoc;
// use std::fs::File;
// use std::io::Write;
// use std::path::Path;
use serde::Serialize;
use tauri::command;

#[derive(Debug, Serialize)]
pub struct Chapter {
    id: String,
    content: String,
}

#[derive(Debug, Serialize)]
struct ResourceInfo {
    id: String,
    path: String,
}

#[derive(Debug, Serialize)]
pub struct EpubInfo {
    title: Option<String>,
    author: Option<String>,
    resources: Vec<ResourceInfo>,
    spine: Vec<String>,
    cover: Option<(Vec<u8>, String)>,
    chapters: Vec<Chapter>,
}

#[command]
pub async fn parse_epub(file_path: String) -> Result<EpubInfo, String> {
    println!("Parsing EPUB at: {}", file_path);

    let mut doc = EpubDoc::new(&file_path)
        .map_err(|e| format!("Failed to open EPUB file '{}': {}", file_path, e))?;

    let title = doc.mdata("title").unwrap_or_default();
    let author = doc.mdata("author").unwrap_or_default();

    //  let resources: Vec<String> = doc
    //      .resources
    //      .iter()
    //      .map(|(id, (path, _))| format!("Resource ID: {}, Path: {}", id, path.display()))
    //      .collect();

    let resources: Vec<ResourceInfo> = doc
        .resources
        .iter()
        .map(|(id, (path, _))| ResourceInfo {
            id: id.clone(),
            path: path.display().to_string(),
        })
        .collect();

    let spine: Vec<String> = doc.spine.iter().map(|s| s.clone()).collect();

    let mut chapters: Vec<Chapter> = Vec::new();

    for spine_id in &spine {
        if let Some((data, _mime)) = doc.get_resource(spine_id) {
            let chapter = Chapter {
                id: spine_id.clone(),
                content: String::from_utf8_lossy(&data).to_string(),
            };
            chapters.push(chapter);
        } else {
            println!("No resource found for spine ID: {}", spine_id);
        }
    }

    let cover = doc.get_cover();

    Ok(EpubInfo {
        title: Some(title),
        author: Some(author),
        resources,
        spine,
        cover,
        chapters,
    })
}

export const DEFAULT_AVATAR_URL = "/assets/images/placeholder/placeholderAvatar1.png";
export const PLACEHOLDER_LIBRARIES_URL = "/assets/images/placeholder/placeholderCat.png";
export const PLACEHOLDER_RECENTLY_READ_URL = "/assets/images/placeholder/shadowSlavePlaceholder.jpg";

// epub tests
const localTestEpubFolderPath = "C:/Dev/Repos/NovelView/native/public/assets/test/epubs/"; // replace for other development env
export const TEST_EPUB_KTS_FILE_NAME = localTestEpubFolderPath + "Kill the Sun (1-384).epub";
export const TEST_EPUB_RED_RISING_FILE_NAME =
	localTestEpubFolderPath + "Red_Rising_Red_Rising_Saga_1_-_Pierce_Brown.epub";
export const TEST_EPUB_SHADOW_SLAVE_VOL_1_FILE_NAME =
	localTestEpubFolderPath + "Shadow Slave - Vol. 1 - Child of Shadows.epub";

export const AVATARS_BUCKET_ALLOWED_MIMETYPE = "image/jpeg, image/png, image/svg, image/webp";
export const LIBRARY_COVERS_BUCKET_ALLOWED_MIMETYPE = "image/jpeg, image/png, image/svg, image/webp";
export const BOOK_FILES_BUCKET_ALLOWED_MIMETYPE = "application/epub+zip, application/pdf";

export const AVATARS_BUCKET_ALLOWED_EXTENSIONS = ["jpeg", "jpg", "png", "svg", "webp"];
export const LIBRARY_COVERS_BUCKET_ALLOWED_EXTENSIONS = ["jpeg", "jpg", "png", "svg", "webp"];
export const BOOK_FILES_BUCKET_ALLOWED_EXTENSIONS = ["epub", "pdf"];

# infrastructure

## general stuff todo that isnt in individual files

-  Refactor session storage to consider using localStorage for web apps and SQLite for native apps (Tauri). For now, continue using SQLite in the native app and revisit when addressing cross-platform storage optimizations.

-  use notification store to create a notification with error.message if an errorboundary gets an error.

-  revisit and refactor drawer navigation with HistoryStore to make drawer state navigable via the history stack and browser back/forward buttons.

# thoughts and ideas.

## 4/19/2025, general flow

user imports an .epub/whatever format, for now just epub. but i might branch to other stuff like amazon book formats etc.

anyways, user imports -> i should then store the epub in localappdata/books/bookId/book.epub (or whatever file format). then i parse the book, and this is the hard part. so i parse the book because i wnat to store the books contents in the /books/ folder in localappdata, so that i can quickly get a books content for loading fast whenenver the user opens a book.

so it creates a metadata.json and a book.epub in the books/bookId/ folder.

where bookId is a uuid btw.

anyways. the flow after the user imports a book and storees it in books/bookid/ should be parsing it because i allow the user to view a unparsed/ the epub itself or a parsed version, for my apps own ui. and for that, i want to parse the book for its contents, and then make a bookid/content/contentId/(then i store the content in here, + images maybe if it has images in that specific chapter) where i store each chapter, or whatever content the book has. and in bookid/metadata, would be where i store stuff like the order, toc. etc.

## 4/20/2025, more plans on archictecture design.

ok im thinking, because books can become very big, what i want is not to save book content. but rather save the metadata ordering of books. because what il save is the epub for "sync" libraries, (libraries can be of type "sync" | "local"). which is whats gonna sync from local to supabase to other device, and then the app will detect any new entries on startup, by polling, or by manual update. and if so, then itl create a new $localappdata/books/{bookId}/ folder. where inside, itl be

/source.epub
/metadata.json
/cover.{ext (jpeg, jpg, png, svg, ...)}
/resources/

and in resources. itl be a folder that contains stuff like the files parsed content, which can be stuff like the html, htmlx, images, covers for epubs, etc, and chapters. and etc.

Where in metadata would be where the spine would be stored if the file is a format: .epub, etc.

so i need a really flexible design for this all. which means the types need to be really broad. so i dont really want to store the bookContent in a json, because that would load the .dbses i have too much, im just synchronizing .epub through supabase buckets and powersync. and otherwise, handling stuff with sqlite, but i want to priorisite fetching from the filesystem before checking remotely with powersync.

il track a positition, (maybe scroll, may be etc.) then just infer position based on current chapter? that means il also need to make a chapter table. that stores the content of a specific chapter. which means il need to have a chapter db, but il only create chapter db locally, and itl be created based on the imported book after its parsing. process. because i only wanna store as little as possible for the storage space efficiency, then infer info based on parsing, etc. for books specifcially.

import, or save book from external collection to library(royalroad, etc.), get file and filetype -> parse book, create a $appdata/books/{bookId}/ folder, bookid being a crypto.uuid(), inside the {bookId}/ a /cover.{ext}, source.{ext} (for example .epub) get put. then a {bookId}/resources/ get created. and if xhtml, html, htm, etc. get detected from the parsed contents, then it would strip away the content except for its p, div, strong, bold, header, h1, h2, h3, etc tags.

so for each file, it would make a /resources/{resourceId}/parsed and cleaned up html document with just the needed tags and content. and if that file is a image, then itl add it to the /resources/images/ folder.

then in the $appdata folder, therel be a resources.db table specifically for these linkings between spine and the order of parsed items.

## directory structure

```
$localappdata/
├── local.db
├── books/
│   ├── {bookId}/
│   │   ├── source.epub
│   │   ├── cover.jpg
│   │   ├── book.db
│   │   └── resources/
│           └── ...
├── libraries/
│   ├── {libraryId}/
│   │   ├── cover.jpg
│   │   └── ...
```

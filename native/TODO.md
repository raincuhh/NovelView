-  Refactor session storage to consider using localStorage for web apps and SQLite for native apps (Tauri). For now, continue using SQLite in the native app and revisit when addressing cross-platform storage optimizations.

-  use notification store to create a notification with error.message if an errorboundary gets an error.

-  revisit and refactor drawer navigation with HistoryStore to make drawer state navigable via the history stack and browser back/forward buttons.

-  general flow:

user imports an .epub/whatever format, for now just epub. but i might branch to other stuff like amazon book formats etc.

anyways, user imports -> i should then store the epub in localappdata/books/bookId/book.epub (or whatever file format). then i parse the book, and this is the hard part. so i parse the book because i wnat to store the books contents in the /books/ folder in localappdata, so that i can quickly get a books content for loading fast whenenver the user opens a book.

so it creates a metadata.json and a book.epub in the books/bookId/ folder.

where bookId is a uuid btw.

anyways. the flow after the user imports a book and storees it in books/bookid/ should be parsing it because i allow the user to view a unparsed/ the epub itself) or a parsed version, for my apps own ui. and for that, i want to parse the book for its contents, and then make a bookid/content/contentId/(then i store the content in here, + images maybe if it has images in that specific chapter) where i store each chapter, or whatever content the book has. and in bookid/metadata, would be where i store stuff like the order, toc. etc.

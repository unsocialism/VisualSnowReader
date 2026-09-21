
# Visual Snow Reader — installable EPUB and PDF reader

An EPUB and PDF reader that breaks walls of text into short blocks, in case you have difficulties with walls of text(for example with visual snow), with low-contrast tinted
themes. Everything runs in the browser: no server, no accounts, no tracking, and your
books never leave your phone.

Once installed it works with the phone in aeroplane mode.

## What's in here

| File | What it is |
|---|---|
| `index.html` | The whole app — reader, library, settings. No libraries or frameworks. |
| `manifest.webmanifest` | Tells Android this is an installable app (name, icon, colours). |
| `sw.js` | Service worker: makes the app work offline, keeps it updated, receives shared files. |
| `pdf-extract.js` | Reads the text out of PDFs and rebuilds the paragraphs. Loaded only when you add a PDF. |
| `icon-*.png` | App icons, including a maskable one for Android's adaptive icon shapes. |

## Putting it on your phone
<img width="300" height="300" alt="qr code vsr" src="https://github.com/user-attachments/assets/70a8574f-8480-4cbe-96d9-3d35213a42e8" />


1. Open that URL in **Chrome**.
2. Menu (⋮) → **Add to Home screen** — or **Install app**, if Chrome offers it.
3. Open it from the home screen. It runs fullscreen, with no address bar.
4. Tap **Add a book** and pick an `.epub` or `.pdf`. You can also share one to Visual Snow Reader
   from Files, Drive or your browser's downloads — the app appears in the share sheet.

After the first visit the app is cached, so it opens and reads with no connection. (step 2 and 3 are only necessary if you want 

## Reading settings

Tap **Aa**.

- **Sentences per block** — how many sentences before a break. Default 2.
- **Leave paragraphs alone up to** — paragraphs this short keep the author's shape,
  so dialogue isn't chopped up. Default 3 sentences.
- **Break blocks longer than** — a single runaway sentence is split at commas, dashes
  and semicolons so it can't become a wall on its own. Default 35 words.
- **Colour** — twelve tinted themes plus custom colours, and a contrast slider that
  softens text against the background. No pure white or pure black anywhere.
- **Highlight text blocks** — gives each block its own tinted background, with the page colour
  showing between blocks. The tint follows the theme; a slider sets how strong it is, and you
  can pick your own colour instead.
- **Type** — typeface, size, line spacing, letter and word spacing, column width,
  gap between blocks, ragged or justified.

Settings apply to every book; your place is remembered per book.

## Sharing it

The page is public — anyone with the address can open it and use the reader, and it is
free to install on their own phone the same way.

Each person gets their own private shelf. Books, reading position and settings live in
that person's own browser storage on their own device and are never uploaded: the app has
no server, no accounts and no analytics, and makes no network requests beyond loading its
own files. So sharing the link shares the reader, never anyone's library.

## PDFs

A PDF isn't really text — it's letters placed at positions on a page, with no paragraphs in
it. So when you add one, the app reads where every word sits and rebuilds the paragraphs from
that: line spacing, first-line indents, the short last line of a paragraph. Then it feeds the
result into the same reader as an EPUB, so blocks, colours and spacing all work the same way.

This happens once, when you add the PDF (a 400-page book takes a few seconds, with a
page counter). After that it opens instantly, and it works offline, including adding new PDFs.

What it handles:

- **Running headers and page numbers** are recognised and removed.
- **Words hyphenated across lines** are rejoined. Real hyphens (`south-westerly`) are kept:
  the app looks at how the rest of the document spells the word, and at whether the PDF
  hyphenates automatically at all (typeset books do; Word and browser exports don't).
- **Chapters** come from the PDF's bookmarks; if it has none, from the chapter headings.
- **Italics, footnote markers** (shown as ¹ ²), **centred verse and epigraphs** (kept line by line),
  **two-column pages** (read left column first), and the **cover** if the first page has one.

What it can't do:

- **Scanned PDFs** — photos of pages — have no text inside them. Reading those would need
  text recognition, which this app doesn't do. You'll get a clear message rather than a blank book.
- **Encrypted PDFs** are refused, again with a message saying so.
- **Heavily designed layouts** — magazines, textbooks with sidebars and boxes — may come out
  in an odd order. It's built for books and long prose, where it's very reliable.

The original page layout isn't shown: the app only ever shows the reflowed text. If a PDF
is mostly diagrams or tables, a normal PDF viewer is the better tool for that one.

## Things worth knowing

- **DRM'd books won't open.** Files from Kindle (`.azw`, `.kfx`) or with Adobe DRM can
  only be read by the vendor's own app. Visual Snow Reader reads ordinary `.epub` and `.pdf` files.
- **Your library lives in this browser's storage on this phone.** Uninstalling the app
  or clearing site data for the domain deletes it. The app asks Android for persistent
  storage so it isn't cleared automatically, but nothing syncs between devices.
- **Sentence detection is heuristic**, tuned for English and German. It knows about
  `Dr.`, `z.B.`, `bzw.`, initials like `J. R. R.` and dates like `am 21. März`. A very
  unusual abbreviation could occasionally cause a break in the wrong place.
- **The text is never rewritten** — only split. Nothing is added, removed or reordered.

## Keyboard (if you ever use it on a desktop)

`←` `→` chapters · `s` settings · `c` contents · `Esc` close


## FAQ

**Does it save the current progress of a book?**

yes, progress is saved, but entirely on the device you are reading it.
if you are on chapter 4 on your phone and open it on the pc, your pc will either start at the beginning or wherever you left of last time on your pc.

**Where is everything stored?**

Everything is saved inside the browser on each device. None of it goes to GitHub or anywhere else.
What gets stored where:
    The books themselves: the full EPUB or PDF file, plus its cover, title and author. For PDFs, the extracted text is kept too, which is why they open instantly after the first import.        These live in the browser's built-in database (IndexedDB) under the name reflow(original name of this reader but i was too lazy to change it here).
    Your reading progress: for each book, which chapter you're in and how far down it. It's in the same database, saved about half a second after you stop scrolling.
    Your settings: block size, colours, highlighting, spacing and so on. These are in the browser's local storage, and they apply to every book.
    The app itself: a copy of the app's own files, so it works offline. It contains no books.

Where that physically ends up on the device:
    Phone (Chrome or Brave on Android): inside the browser's private app data, which you can't browse to in a file manager. Android only clears it if you clear the browser's data for the        site or uninstall the app. The app also asks Android to protect it from automatic clean-up.
    PC: inside the browser's profile folder on your disk, separately for each browser and each browser profile.


**can i use a different browser than chrome?**

Yes. It's an ordinary web page, so any modern browser can open it at unsocialism.github.io/visualsnowreader/. How well it installs depends on the browser:

**On Android:**
    Chrome, Edge, Samsung Internet, Brave: full install. It gets its own app icon and a place in the app switcher, runs fullscreen, works offline, and should show up in the share sheet.     These all run on the same engine as Chrome, which is the one I tested in.
    Firefox: works, including offline, but "installing" only adds a home-screen shortcut rather than a real app (MDN). That means it won't appear in the share sheet, so you add books with     Add a book instead. It needs Firefox 113 or newer.

**On a computer:**
    Chrome and Edge can install it as a desktop app; in Firefox you just use it in a tab. On an iPhone, Safari → Share → Add to Home Screen works, but the share sheet doesn't.

Each browser keeps its own separate library. Books, reading positions and settings are stored inside the browser you used, so if you open the reader in Firefox after using it in Chrome, the shelf is empty. The same goes for a second phone or your computer. Nothing syncs between them, so pick one browser per device for the books you're actually reading.

One caveat: all my testing ran in Chromium, the engine behind Chrome. The code only uses standard features that Firefox and Safari also support, but I haven't run the app in them. If something looks off in another browser, tell me which one.

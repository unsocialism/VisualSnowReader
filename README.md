# Visual Snow Reader — installable EPUB reader

An EPUB reader that breaks walls of text into short blocks, in case you have issues with walls of texts, with low-contrast tinted
themes. Everything runs in the browser: no server, no accounts, no tracking, and your
books never leave your phone or pc.

Once "installed" it works with the phone in aeroplane mode.

## What's in here

| File | What it is |
|---|---|
| `index.html` | The whole app — reader, library, settings. No libraries or frameworks. |
| `manifest.webmanifest` | Tells Android this is an installable app (name, icon, colours). |
| `sw.js` | Service worker: makes the app work offline and receives shared `.epub` files. |
| `icon-*.png` | App icons, including a maskable one for Android's adaptive icon shapes. |

All paths are relative, so it works at a domain root **or** in a subfolder
(`https://you.github.io/reflow/`) with no changes.

## Putting it on your phone

1. Open that URL in **Chrome**.
2. Menu (⋮) → **Add to Home screen** — or **Install app**, if Chrome offers it.
3. Open it from the home screen. It runs fullscreen, with no address bar.
4. Tap **Add a book** and pick an `.epub`. You can also share an `.epub` to Visual Snow Reader
   from Files, Drive or your browser's downloads — the app appears in the share sheet.

After the first visit the app is cached, so it opens and reads with no connection.
Updating later means re-uploading the files and reopening the app once online.

## Reading settings

Tap **Aa**.

- **Sentences per block** — how many sentences before a break. Default 2.
- **Leave paragraphs alone up to** — paragraphs this short keep the author's shape,
  so dialogue isn't chopped up. Default 3 sentences.
- **Break blocks longer than** — a single runaway sentence is split at commas, dashes
  and semicolons so it can't become a wall on its own. Default 35 words.
- **Colour** — twelve tinted themes plus custom colours, and a contrast slider that
  softens text against the background. No pure white or pure black anywhere.
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

## Things worth knowing

- **DRM'd books won't open.** Files from Kindle (`.azw`, `.kfx`) or with Adobe DRM can
  only be read by the vendor's own app. Visual Snow Reader reads ordinary `.epub` files.
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
**can i use/install the reader also in different browser?**

Yes. It's an ordinary web page, so any modern browser can open it at unsocialism.github.io/visualsnowreader/. How well it installs depends on the browser:

**On Android**:
Chrome, Edge, Samsung Internet, Brave: full install. It gets its own app icon and a place in the app switcher, runs fullscreen, works offline, and should show up in the share sheet. These all run on the same engine as Chrome, which is the one I tested in.
Firefox: works, including offline, but "installing" only adds a home-screen shortcut rather than a real app (MDN). That means it won't appear in the share sheet, so you add books with Add a book instead. It needs Firefox 113 or newer.

**On a computer**: 
Chrome and Edge can install it as a desktop app; in Firefox you just use it in a tab. On an iPhone, Safari → Share → Add to Home Screen works, but the share sheet doesn't.

Each browser keeps its own separate library. Books, reading positions and settings are stored inside the browser you used, so if you open the reader in Firefox after using it in Chrome, the shelf is empty. The same goes for a second phone or your computer. Nothing syncs between them, so pick one browser per device for the books you're actually reading.

One caveat: all my testing ran in Chromium, the engine behind Chrome. The code only uses standard features that Firefox and Safari also support, but I haven't run the app in them. If something looks off in another browser, tell me which one.

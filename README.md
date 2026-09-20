# Reflow — installable EPUB reader

An EPUB reader that breaks walls of text into short blocks, with low-contrast tinted
themes. Everything runs in the browser: no server, no accounts, no tracking, and your
books never leave your phone.

Once installed it works with the phone in aeroplane mode.

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

Android will only install a web app served over **https**, so the folder has to live
somewhere on the web first. Any static host works. Two easy free ones:

### GitHub Pages (no command line needed)

1. Create a free account at github.com, then **New repository** → name it `reflow` →
   **Public** → Create.
2. On the empty repo page, click **uploading an existing file**, then drag in all the
   files from this folder (the files themselves, not the folder). Click **Commit changes**.
3. Go to **Settings → Pages**. Under *Branch* pick `main` and `/ (root)`. Save.
4. Wait about a minute, then reload that page — it shows your URL, something like
   `https://yourname.github.io/reflow/`.

### Cloudflare Pages

1. Sign in at pages.cloudflare.com → **Create a project** → **Direct Upload**.
2. Drag this folder in. It gives you a `https://….pages.dev` URL straight away.

### Then, on the phone

1. Open that URL in **Chrome**.
2. Menu (⋮) → **Add to Home screen** — or **Install app**, if Chrome offers it.
3. Open it from the home screen. It runs fullscreen, with no address bar.
4. Tap **Add a book** and pick an `.epub`. You can also share an `.epub` to Reflow
   from Files, Drive or your browser's downloads — Reflow appears in the share sheet.

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

## Things worth knowing

- **DRM'd books won't open.** Files from Kindle (`.azw`, `.kfx`) or with Adobe DRM can
  only be read by the vendor's own app. Reflow reads ordinary `.epub` files.
- **Your library lives in this browser's storage on this phone.** Uninstalling the app
  or clearing site data for the domain deletes it. The app asks Android for persistent
  storage so it isn't cleared automatically, but nothing syncs between devices.
- **Sentence detection is heuristic**, tuned for English and German. It knows about
  `Dr.`, `z.B.`, `bzw.`, initials like `J. R. R.` and dates like `am 21. März`. A very
  unusual abbreviation could occasionally cause a break in the wrong place.
- **The text is never rewritten** — only split. Nothing is added, removed or reordered.

## Keyboard (if you ever use it on a desktop)

`←` `→` chapters · `s` settings · `c` contents · `Esc` close

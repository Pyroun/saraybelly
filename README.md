# Saray Belly Website

A responsive static website concept combining Saray Belly artist promotion with free browser-based utilities.

## Live website
[https://pyroun.github.io/Saray-Belly-/](https://pyroun.github.io/Saray-Belly-/)

## Included features
- Responsive plum, ivory and gold artist website
- Music promotion section with YouTube search links (replace with official channel URL)
- Music distribution offers for DistroKid, Ditto Music and TuneCore (add referral URLs before launch)
- Khmer / English interface toggle for key marketing text
- PDF merge, PDF page extraction, JPG/PNG to PDF
- Image compression and resizing
- Video and audio trimming using FFmpeg WebAssembly (loaded on demand)
- Join audio files sequentially into a WAV in the browser
- Official YouTube Studio and Facebook account links for downloading or exporting your own videos
- Privacy Policy and Terms starter pages
- AdSense placeholder and marked ad slots

## Run locally
For best results, serve the folder through a local web server because media tools use JavaScript modules:
- Python: `python -m http.server 8000`
- Open `http://localhost:8000`

You need an internet connection for the PDF library, Google Fonts and FFmpeg WebAssembly CDN files.

## GitHub Pages
The live website is published from the `Pyroun/Saray-Belly-` repository at [https://pyroun.github.io/Saray-Belly-/](https://pyroun.github.io/Saray-Belly-/).

Keep only one workflow that deploys GitHub Pages. In the repository, remove `.github/workflows/jekyll-gh-pages.yml` and use `.github/workflows/static.yml`. In **Settings → Pages**, set the deployment source to **GitHub Actions**.

The root address `https://pyroun.github.io/` is different and requires the repository to be named `pyroun.github.io`. Use the full live URL above when sharing the current site.

GitHub Pages free hosting is intended for public repositories and static websites. It does not provide a backend, database, private server-side file conversion or user accounts.

## Before launch
- Replace `hello@saraybelly.com` with your real email.
- Replace YouTube search URLs with the exact official Saray Belly channel and video URLs.
- DistroKid and Ditto Music referral buttons are linked. Add your TuneCore referral URL to the remaining deal button in `index.html` before launch.
- Add your artist biography, real approved cover art, release titles and streaming links.
- Review the Privacy Policy and Terms; replace placeholders and add any legally required consent disclosures.
- Test every tool on desktop and mobile, including large-file limits.
- Add helpful original tutorials and contact information.
- Do not add AdSense code until your site is eligible and approved. After approval, use the exact code and publisher ID from your AdSense account and configure consent requirements for your audience.
- Do not click your own ads or encourage visitors to click ads.

## Important limitations
- PDF merge, page extraction, image-to-PDF, image compression and resizing run in the browser.
- Video/audio trim downloads FFmpeg WebAssembly on first use. It may be slow or fail for large files, older devices or unsupported codecs.
- PDF-to-Word is not included in this starter build because high-quality conversion needs more advanced layout/OCR handling.
- YouTube links currently open YouTube search results for Saray Belly. Replace them with your verified official channel links.
- AdSense approval and earnings are not guaranteed.

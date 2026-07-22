# ELASSIOUTY LEGAL — website

Static marketing site for ELASSIOUTY LEGAL (the Cairo-based, Egypt-seated practice of Mohamed Elasuty). Plain HTML/CSS/JS — no build step, no framework, no dependencies. Hosts free on GitHub Pages.

## Files

| File | Purpose |
|------|---------|
| `index.html` | English page (LTR) |
| `ar.html` | Arabic page (RTL) — linked from the header language switch |
| `styles.css` | Design system — colours, fonts, layout, and RTL rules |
| `script.js` | Theme toggle, language-aware messages, mobile menu, practice tabs, FAQ, scroll reveal, intake form |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Bilingual

The site is fully bilingual. `index.html` is English; `ar.html` is the Arabic right-to-left version. The header "العربية / English" button switches between them. If you edit copy in one language, make the matching edit in the other file.

## Intake form

The intake form submits via Formsubmit (a free, no-backend service). Submissions are delivered to the address encoded in `script.js` (currently your inbox). **Activation:** the very first time the form is submitted after going live, Formsubmit sends a one-time confirmation email to that inbox — click the link in it once, and the form is live for good. To change the destination later, replace the base64 string in `script.js` (or swap in a custom-domain address once you have one).

## Edit the text

Open `index.html` and edit directly — every heading, paragraph, practice card and FAQ answer is plain text in the markup. Commit the change and GitHub Pages redeploys within a minute or two. You can edit right in GitHub's web editor (press `.` in the repo, or click a file → the pencil icon).

## Change the contact email

Search `index.html` for `elassiouty@polsia.app` and replace every occurrence with the firm's preferred address.

## Colours & fonts

All colours are CSS variables at the top of `styles.css` (light theme under `:root`, dark theme under `[data-theme="dark"]`). Fonts: Cormorant Garamond (headings), Inter (body), IBM Plex Mono (labels), loaded from Google Fonts.

## Publish on GitHub Pages (free)

1. Create a public repository and upload these files to the root.
2. Repo → **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. Wait ~1 minute; the live URL appears at the top of the Pages settings (e.g. `https://<username>.github.io/<repo>/`).

A custom domain (e.g. `elassiouty-legal.com`) can be added later under the same Pages settings without changing any code.

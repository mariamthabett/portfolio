# Mariam Ahmed Thabet — Portfolio

A personal portfolio website for **Mariam Ahmed Thabet** — Computers & Information graduate,
national volleyball athlete, and tech & marketing enthusiast.

Built as a fast, zero-build static site with **HTML + CSS + vanilla JavaScript**. Features a
**Royal Plum & Champagne** dark glassmorphism theme, a **bilingual English / Arabic toggle** with
full RTL support, scroll-reveal animations (Intersection Observer), smooth scrolling, animated stat
counters, **animated gradient-framed photos**, a project lightbox, a responsive mobile nav, and a
one-page web CV you can print to PDF.

## Structure

```
index.html            # all sections (hero, about, journey, projects, experience, resume, contact)
cv.html               # one-page web CV (Print → Save as PDF)
css/style.css         # design system, components, animations
css/cv.css            # one-page CV styles (screen + print)
js/main.js            # scroll reveal, nav, scroll-spy, counters, lightbox, contact form
js/i18n.js            # English/Arabic translations + language toggle (data-i18n keys)
api/contact.js        # Vercel serverless function — sends the contact form via Nodemailer
images/               # profile, graduation, volleyball + auction screenshots
cv/mariamthabetCV.pdf # original CV PDF (fallback download)
package.json          # nodemailer dependency (for the contact API)
.env.example          # template for the email env vars (copy to .env)
```

## Run locally

**Front-end only** (no contact API) — just serve the static files:

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

**With the contact API** (to test email sending) you need the Vercel CLI, because the form posts
to a serverless function under `/api`:

```bash
npm install            # installs nodemailer (first time only)
npm install -g vercel  # one-time: install the Vercel CLI
cp .env.example .env   # then fill in your Gmail values (see below)
vercel dev             # serves the site + /api/contact at http://localhost:3000
```

## Contact form email (Nodemailer + Gmail)

The contact form posts to `api/contact.js`, which emails you the message using Nodemailer over
Gmail SMTP. It needs three environment variables:

| Variable             | What it is                                                        |
|----------------------|-------------------------------------------------------------------|
| `GMAIL_USER`         | the Gmail address that **sends** the mail                         |
| `GMAIL_APP_PASSWORD` | a 16-char Gmail **App Password** (not your normal password)       |
| `CONTACT_TO`         | inbox that **receives** messages (default `mariamthabet2003@gmail.com`) |

**Create a Gmail App Password:**
1. Turn ON 2-Step Verification: https://myaccount.google.com/security
2. Open App Passwords: https://myaccount.google.com/apppasswords
3. Create one (any name), copy the 16 characters.

**Local:** put these in a `.env` file (copy from `.env.example`). `.env` is git-ignored.

**On Vercel:** Project → Settings → **Environment Variables** → add the same three, then redeploy.
(`node_modules/` and `.env` are git-ignored; Vercel installs deps and reads env vars itself.)

## Editing content

- **CV:** the live CV is `cv.html` (edit the text directly there; open it and use Print → Save as
  PDF to export a one-page PDF). The old `cv/mariamthabetCV.pdf` remains as a fallback download.
- **Theme colors:** all colors are CSS variables in `:root` at the top of `css/style.css`
  (`--violet`, `--gold`, `--rose`, backgrounds) — change them once to re-skin the whole site.
- **Translations (EN/AR):** all text lives in `js/i18n.js` under the `en` / `ar` dictionaries,
  keyed by the `data-i18n="..."` attributes in `index.html`. Edit a value there to change both the
  English and Arabic wording. The toggle remembers the visitor's choice (localStorage).
- **Photos / CV:** replace the files in `images/` and `cv/` (keep the same names), or update the
  paths in `index.html`. Spots to swap are marked with `<!-- Insert Image Here -->` comments.
- **Volleyball details, stat numbers, project architecture, project links:** marked as editable
  placeholders in `index.html` (search for `Edit:`).
- **Contact email:** `mariamthabet2003@gmail.com` (used in the hero and contact links). The contact
  form delivers to `CONTACT_TO` (see the Contact form section above).
- **Phone number:** optional — remove the phone `contact__link` block in `index.html` to hide it.
- **Contact form:** posts to `/api/contact` (Nodemailer). Needs the Gmail env vars configured to
  actually send; otherwise it returns a friendly "not configured" message.

## Deploy (Vercel)

The GitHub repo is linked to Vercel. Pushing to the default branch builds and deploys the static
site from the repo root — no configuration required.

```bash
git add .
git commit -m "Add portfolio website"
git push
```

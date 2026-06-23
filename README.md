# Mariam Ahmed Thabet — Portfolio

A personal portfolio website for **Mariam Ahmed Thabet** — Computers & Information graduate,
national volleyball athlete, and tech & marketing enthusiast.

Built as a fast, zero-build static site with **HTML + CSS + vanilla JavaScript**. Features a
**Royal Plum & Champagne** dark glassmorphism theme, scroll-reveal animations (Intersection
Observer), smooth scrolling, animated stat counters, **animated gradient-framed photos**, a project
lightbox, a responsive mobile nav, and a one-page web CV you can print to PDF.

## Structure

```
index.html            # all sections (hero, about, journey, projects, experience, resume, contact)
cv.html               # one-page web CV (Print → Save as PDF)
css/style.css         # design system, components, animations
css/cv.css            # one-page CV styles (screen + print)
js/main.js            # scroll reveal, nav, scroll-spy, counters, lightbox, contact form
images/               # profile, graduation, volleyball + auction screenshots
cv/mariamthabetCV.pdf # original CV PDF (fallback download)
```

## Run locally

It's a static site — just open `index.html` in a browser. To avoid any local file
restrictions, serve it instead:

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## Editing content

- **CV:** the live CV is `cv.html` (edit the text directly there; open it and use Print → Save as
  PDF to export a one-page PDF). The old `cv/mariamthabetCV.pdf` remains as a fallback download.
- **Theme colors:** all colors are CSS variables in `:root` at the top of `css/style.css`
  (`--violet`, `--gold`, `--rose`, backgrounds) — change them once to re-skin the whole site.
- **Photos / CV:** replace the files in `images/` and `cv/` (keep the same names), or update the
  paths in `index.html`. Spots to swap are marked with `<!-- Insert Image Here -->` comments.
- **Volleyball details, stat numbers, project architecture, project links:** marked as editable
  placeholders in `index.html` (search for `Edit:`).
- **Contact email:** `mariamthabet2003@gmail.com` (used in the hero, contact links, and the form's
  `mailto:` action in `js/main.js`).
- **Phone number:** optional — remove the phone `contact__link` block in `index.html` to hide it.
- **Contact form:** uses a `mailto:` link (no backend needed). To collect submissions server-side,
  point the form `action` at a [Formspree](https://formspree.io) endpoint instead.

## Deploy (Vercel)

The GitHub repo is linked to Vercel. Pushing to the default branch builds and deploys the static
site from the repo root — no configuration required.

```bash
git add .
git commit -m "Add portfolio website"
git push
```

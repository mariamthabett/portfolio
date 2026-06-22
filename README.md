# Maryam Ahmed Thabet — Portfolio

A personal portfolio website for **Maryam Ahmed Thabet** — Computers & Information graduate,
national volleyball athlete, and tech & marketing enthusiast.

Built as a fast, zero-build static site with **HTML + CSS + vanilla JavaScript**. Features a dark
glassmorphism design, scroll-reveal animations (Intersection Observer), smooth scrolling, animated
stat counters, a project lightbox, and a responsive mobile nav.

## Structure

```
index.html            # all sections (hero, about, journey, projects, experience, resume, contact)
css/style.css         # design system, components, animations
js/main.js            # scroll reveal, nav, scroll-spy, counters, lightbox, contact form
images/               # profile, graduation, volleyball + auction screenshots
cv/mariamthabetCV.pdf # downloadable CV
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

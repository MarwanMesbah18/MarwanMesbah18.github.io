# Marwan Mesbah — Portfolio

Animated personal portfolio for **Marwan Mesbah** — CS & AI student, Computer Vision & Full-Stack Developer.

Built with **React + Vite**, a **scroll-driven 3D project sphere** (pure CSS 3D, no WebGL — smooth & high-FPS), **GSAP ScrollTrigger**, **Lenis** smooth scroll, **Framer Motion**, and **Tailwind CSS**. Includes a **dark / light theme toggle**.

## Tech

- React 18 + Vite 5
- Tailwind CSS (class-based dark mode via CSS variables)
- GSAP + ScrollTrigger (pinned 3D sphere scrub)
- Lenis (smooth scrolling)
- Framer Motion (entrance + cross-fade animations)

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & preview

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build
```

## Deploy (GitHub Pages)

The site deploys automatically via `.github/workflows/deploy.yml` on every push to `main`.

One-time setup in GitHub → **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**.

The repo is `MarwanMesbah18.github.io` (user pages), so Vite `base` is set to `'/'`.

## Editing content

All content lives in `src/data/`:

- `profile.js` — name, bio, experience, education, languages, socials
- `skills.js` — skill groups
- `projects.js` — projects (add a project by copying one object; set `image: null` for a text-only card)

## Project structure

```
src/
├── App.jsx
├── main.jsx
├── index.css              # theme tokens (light/dark) + component classes
├── data/                  # editable content
└── components/
    ├── Navbar.jsx         # + ThemeToggle
    ├── Hero.jsx
    ├── About.jsx
    ├── Skills.jsx
    ├── Projects.jsx       # scroll-driven 3D sphere of project cards
    ├── Experience.jsx
    ├── Contact.jsx
    └── Footer.jsx
```

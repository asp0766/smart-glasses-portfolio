# Smart IoT Glasses — Portfolio Site

Production-ready marketing / portfolio site for an **IoT smart glasses** project that detects **drowsiness** via a camera and triggers a **speaker alert** after **4–5 seconds** of eye closure.

## Tech stack

- **React** (Vite)
- **Tailwind CSS** v4 (`@tailwindcss/vite`)
- **React Three Fiber** + **Three.js** (interactive 3D)
- **Framer Motion** (animations)

## Folder structure

```
smart-glasses-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── ModelViewer.jsx
│   │   ├── InfoPanel.jsx
│   │   ├── FlowSection.jsx
│   │   ├── CodeSection.jsx
│   │   ├── GithubSection.jsx
│   │   ├── Contact.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   ├── themeContext.js
│   │   ├── ThemeProvider.jsx
│   │   └── useTheme.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify.toml
├── vite.config.js
└── package.json
```

## Setup

**Requirements:** Node.js 18+ (20+ recommended).

```bash
cd smart-glasses-portfolio
npm install
```

## Commands

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server (Vite)  |
| `npm run build`| Production build → `dist/` |
| `npm run preview` | Preview production build locally |

Dev server: open the URL printed in the terminal (usually `http://localhost:5173`).

## 3D viewer

The interactive glasses are built with **primitive meshes** in `ModelViewer.jsx` (no external GLTF required), with clickable parts and `OrbitControls`. The **Environment** map loads asynchronously inside `<Suspense>`.

## Customization

- **GitHub URL:** `src/components/GithubSection.jsx` — `GITHUB_URL`.
- **Contact:** `src/components/Contact.jsx` — `contact` object.

## Netlify deployment

1. Push this folder to GitHub (or GitLab / Bitbucket).
2. In [Netlify](https://www.netlify.com/), **Add new site** → **Import an existing project**.
3. Connect the repo and use:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy. The included `netlify.toml` sets the same values and SPA fallback for client-side routing.

**Alternative (Netlify CLI):**

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## License

MIT — use freely for your portfolio and interviews.

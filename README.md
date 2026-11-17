# angelayou.com — desktop-themed portfolio

My personal website, styled like a computer desktop. Click around and open the
"applications" to explore my portfolio. All icons and images are drawn by me.

Built with **React + TypeScript + Vite**. Each app opens in a draggable, focusable macOS-style
window managed by a small `useReducer`-based window manager.

~ Angela You

## Tech

- **React 18 + TypeScript** — typed components, context, custom hooks
- **Vite** — dev server & build
- **Window manager** — `useReducer` + Context (`src/context/WindowManager.tsx`)
- **Dragging** — a custom Pointer Events hook (`src/hooks/useDraggable.ts`)

## Develop

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
```

## Editing content (no React needed)

All page content lives in plain data files under `src/data/` — edit these:

| File                    | Controls                                  |
| ----------------------- | ----------------------------------------- |
| `src/data/about.ts`     | About Me: bio, interests, activities      |
| `src/data/skills.ts`    | Skills: technical groups + soft skills    |
| `src/data/hackathons.ts`| Projects window: the hackathon cards      |
| `src/data/projects.ts`  | Projects window: the Projects section     |
| `src/data/notifications.ts` | Notification Center update cards      |
| `src/data/contact.ts`   | Contact links                             |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app
and publishes `dist/` to GitHub Pages.

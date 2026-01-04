# Alert System — React + TypeScript + Vite

A simple, modern Alert Management System built with React, TypeScript and Vite.  
Add, edit and remove alerts with multiple alert types (success, warning, info, danger, default). Styled with SCSS using variables, mixins and smooth animations. Alerts persist to localStorage.

---

## Table of contents

- [Demo](#demo)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Component overview](#component-overview)
- [Type definitions](#type-definitions)
- [Styling (SCSS)](#styling-scss)
- [Persistence & storage](#persistence--storage)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

- Development: `npm run dev` (Vite dev server)
- Example UI includes a list of alerts and a form to add/edit alerts. Each alert shows a colored badge, text, and actions (edit/delete).

---

## Features

- Create new alerts
- Edit existing alerts
- Delete alerts
- Select alert type (Success, Warning, Info, Danger, Default)
- Smooth CSS animations for entering/exiting alerts
- SCSS variables, mixins and reusable styles
- LocalStorage persistence
- Fast dev experience with Vite + TypeScript

---

## Tech stack

- React 18
- TypeScript
- Vite
- SCSS / SASS
- Lucide React Icons (optional, used for UI icons)

---

## Project structure

src/
 ├─ components/
 │   └─ ui/
 │       └─ Alert/
 │           ├─ Alert.tsx
 │           ├─ AlertForm.tsx
 │           ├─ AlertFormWrapper.tsx
 │           └─ alert.scss
 ├─ types/
 │   └─ index.ts
 ├─ App.tsx
 ├─ main.tsx
 └─ styles/
     └─ variables.scss

Notes:
- Keep alert UI components grouped under `components/ui/Alert`.
- Types live in `src/types`.
- SCSS variables and mixins in `src/styles/variables.scss`.

---

## Getting started

Prerequisites:
- Node.js >= 16
- npm or yarn

Install and run:

```bash
# install deps
npm install

# run dev server
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## Available scripts (package.json)

- `dev` — start Vite dev server
- `build` — build production assets
- `preview` — locally preview production build
- `lint` — (optional) run linter
- `format` — (optional) format code

Example package.json scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint --ext .ts,.tsx src",
  "format": "prettier --write ."
}
```

---

## Component overview

- Alert.tsx
  - Renders a single alert item.
  - Props: alert object, onEdit, onDelete.
  - Uses CSS classes based on alert type to style color, icon, and shadow.
  - Includes enter/exit animation (fade + scale).

- AlertForm.tsx
  - Controlled form for creating or editing an alert.
  - Fields: title (optional), message, type (select).
  - Validation: message required.
  - Emits `onSubmit` with alert payload.

- AlertFormWrapper.tsx
  - Handles form state when editing an existing alert or creating a new one.
  - Optionally opens as a panel/modal.

- App.tsx
  - Top-level state management for alerts (add, update, remove).
  - Loads/saves alerts from/to localStorage.
  - Renders AlertFormWrapper and list of Alert components.

Example usage (lazy pseudocode):

```tsx
import React from "react";
import AlertList from "./components/ui/Alert/AlertList";
import AlertFormWrapper from "./components/ui/Alert/AlertFormWrapper";

function App() {
  // state and handlers (add/edit/remove)
  return (
    <div className="app container">
      <h1>Alert Manager</h1>
      <AlertFormWrapper onCreate={handleCreate} />
      <AlertList alerts={alerts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
```

---

## Type definitions

Example `src/types/index.ts`:

```ts
export type AlertType = "default" | "success" | "info" | "warning" | "danger";

export interface AlertItem {
  id: string;        // uuid or timestamp
  title?: string;
  message: string;
  type: AlertType;
  createdAt: string; // ISO date
}
```

---

## Styling (SCSS)

- Central variables in `src/styles/variables.scss`:

```scss
$color-success: #22c55e;
$color-info: #3b82f6;
$color-warning: #f59e0b;
$color-danger: #ef4444;
$color-default: #6b7280;

$radius: 10px;
$soft-shadow: 0 6px 18px rgba(16,24,40,0.08);
```

- Mixin for alert box:

```scss
@mixin alert-box($bg, $border-color) {
  background: $bg;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow: $soft-shadow;
  padding: 0.75rem 1rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
```

- Use animation for enter/exit:

```scss
@keyframes fadeScaleIn {
  from { opacity: 0; transform: translateY(-6px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

- `alert.scss` contains styles for each type using the mixin and variables.

---

## Persistence & storage

Alerts persist to localStorage using a single key (example):

```ts
const STORAGE_KEY = "alert-system-v1";

function saveAlerts(items: AlertItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function loadAlerts(): AlertItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
```

- Consider versioning the key (`-v1`) if you change the data shape later.

---

## Customization

- To add more alert types, update `AlertType` union, SCSS variables, and UI mapping (color/icon).
- To change persistence (server-side), replace localStorage functions with API calls and adapt UI to show loading/error states.
- To use other icon libraries, swap Lucide React with your preferred package.

---

## Troubleshooting

- Alerts not showing:
  - Ensure `message` is provided and AlertList maps items correctly.
- Styles not applied:
  - Confirm SCSS is imported in `main.tsx` or `App.tsx` (e.g., `import './styles/variables.scss'; import './components/ui/Alert/alert.scss'`).
- Type errors:
  - Check `AlertItem` shape and update components’ props accordingly.

---

## Contributing

Contributions welcome — small PRs for:
- Accessibility improvements
- More demo examples (e.g., stacking alerts, auto-dismiss)
- Tests (React Testing Library + Vitest)
- Type / SCSS cleanup

Please follow the repository's contribution guidelines (if present).

---

## License

MIT — feel free to reuse and adapt this example for learning and projects.

---

- or add unit tests example (Vitest + React Testing Library).

Which one would you like next?

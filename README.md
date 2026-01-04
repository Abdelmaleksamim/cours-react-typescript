# Micro Frontend — Example for Learning (React + Vite + Module Federation)

A minimal example showing how to set up a micro-frontend architecture using Vite, React, TailwindCSS and @module-federation/vite.

This repo contains two apps:
- `remote-mfe` — a micro-frontend (remote) that exposes a Dashboard component.
- `shell-app` — a host (shell) application that consumes the remote Dashboard.

This README explains how to run the example locally, how the Module Federation configuration works, and tips for development and production.

---

## Table of contents

- [Prerequisites](#prerequisites)
- [Repository structure](#repository-structure)
- [Configuration overview](#configuration-overview)
  - [Remote (remote-mfe) - vite.config.js](#remote-remote-mfe---viteconfigjs)
  - [Shell (shell-app) - vite.config.js](#shell-shell-app---viteconfigjs)
- [Run locally (development)](#run-locally-development)
- [How the federation works](#how-the-federation-works)
- [Example: Expose & Consume](#example-expose--consume)
  - [remote: Expose component](#remote-expose-component)
  - [shell: Import remote component](#shell-import-remote-component)
- [Production / Build notes](#production--build-notes)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License & Credits](#license--credits)

---

## Prerequisites

- Node.js (>= 16 recommended)
- npm or Yarn
- Basic knowledge of React and Vite

---

## Repository structure

(Adjust names/paths as needed — this is the general layout used by the example.)

- /remote-mfe
  - package.json
  - vite.config.js
  - src/
    - App.jsx        (exposed as Dashboard)
    - main.jsx
    - index.css
- /shell-app
  - package.json
  - vite.config.js
  - src/
    - main.jsx
    - App.jsx        (hosts the remote component)
    - index.css
- README.md

---

## Configuration overview

Two important Vite configs use @module-federation/vite:

### Remote (remote-mfe) - vite.config.js

This app exposes a component other apps can import.

Key parts:
- name: `remote_mfe`
- filename: `remoteEntry.js` (entry used by host apps)
- exposes: map of exported modules (e.g. `./Dashboard`: '/src/App.jsx' or the relative file path)
- shared: `['react', 'react-dom']` — avoid loading duplicate React instances
- dev server should allow CORS and run on a stable port (e.g. 5004)

Example (short):
```js
federation({
  dev: true,
  name: 'remote_mfe',
  filename: 'remoteEntry.js',
  exposes: {
    './Dashboard': '/src/App.jsx',
  },
  shared: ['react', 'react-dom'],
})
```

### Shell (shell-app) - vite.config.js

This app consumes the remote.

Key parts:
- remotes: reference to the remote entry `http://localhost:5004/remoteEntry.js`
- shared: list includes `react`, `react-dom`, maybe `react-router-dom`
- build.target may be tuned for browsers

Example (short):
```js
federation({
  dev: true,
  name: 'shell_app',
  remotes: {
    remote_mfe: {
      type: 'module',
      name: 'remote_mfe',
      entry: 'http://localhost:5004/remoteEntry.js',
      shareScope: 'default',
    },
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
})
```

---

## Run locally (development)

1. Start the remote app first (it must expose remoteEntry.js):

```bash
# from repo root or remote-mfe folder
cd remote-mfe
npm install
npm run dev
# remote app will run on http://localhost:5004 (example)
```

2. Start the shell app:

```bash
cd ../shell-app
npm install
npm run dev
# shell app usually runs on http://localhost:5173 (or a different port shown in console)
```

3. Open the shell app in the browser. The shell should dynamically load and render the Dashboard component from the remote.

Notes:
- `dev: true` in the federation configuration turns on development-friendly behaviors such as serving a `remoteEntry.js` with HMR support.
- Ensure ports and CORS are configured so the shell can access the remote `remoteEntry.js`.

---

## How the federation works

- The remote builds (or serves in dev) a `remoteEntry.js` file which exposes certain modules.
- The shell imports the remote's exposed module at runtime (via dynamic import).
- The `shared` option ensures singletons (React, ReactDOM) are not duplicated across host and remote.
- In development `dev: true` allows module federation to work with Vite dev server (hot reloads).

---

## Example: Expose & Consume

### remote: Expose component

Example `src/App.jsx` (remote-mfe)

```jsx
import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Remote Dashboard</h1>
      <p>This component is served by the remote micro-frontend.</p>
    </div>
  );
}
```

The remote's vite.config `exposes` mapping:
```js
exposes: {
  './Dashboard': '/src/App.jsx',
}
```

### shell: Import remote component

Option A — static host declaration + dynamic import (recommended):

In the shell app, you can dynamically import and render the remote module:

```jsx
// src/App.jsx (shell-app)
import React, { Suspense } from "react";

// Using the exposing key from the remote: './Dashboard'
// Modern Module Federation + Vite allows this dynamic import:
const RemoteDashboard = React.lazy(() => import('remote_mfe/Dashboard'));

export default function App() {
  return (
    <div>
      <h1>Shell App</h1>
      <Suspense fallback={<div>Loading remote...</div>}>
        <RemoteDashboard />
      </Suspense>
    </div>
  );
}
```

Option B — runtime import when needed:
```js
const loadRemote = async () => {
  const mod = await import('remote_mfe/Dashboard');
  const Dashboard = mod.default;
  // render Dashboard in your app or set state to display it
};
```

Important: `remote_mfe` is the remote name used in the shell's `remotes` option; `Dashboard` is the exposed key.

---

## Production / Build notes

- Module federation for production needs careful hosting of built bundles and public paths.
- When building for production, you typically:
  - Build remote(s) and deploy remote static files to a CDN or host.
  - Build shell and reference the remote `remoteEntry.js` URLs pointing to the deployed remote.
- Consider versioning/shared dependency compatibility between host and remotes.
- Configure proper caching headers for the `remoteEntry.js`.
- Ensure shares are configured with `singleton: true` if you must guarantee a single React instance:
```js
shared: {
  react: { singleton: true, eager: false, requiredVersion: '^18.0.0' },
  'react-dom': { singleton: true, eager: false, requiredVersion: '^18.0.0' }
}
```
- For production you may want to turn off `dev: true` and provide exact entry URLs.

---

## Troubleshooting

- Blank screen / module not found:
  - Check the remote's `remoteEntry.js` is reachable from the shell URL (open it directly in your browser).
  - Verify CORS is allowed (remote server must expose remoteEntry to the shell origin).
  - Confirm the exposed path and import path match (e.g. `./Dashboard` vs `remote_mfe/Dashboard`).
- React double-load / errors about invalid hooks:
  - Ensure `react` and `react-dom` are shared and treated as singletons.
- Port conflicts:
  - If the remote or shell port is already used, change the `server.port` in the vite config and restart.
- HMR not working across remotes:
  - HMR with module federation + Vite can be tricky — ensure `dev: true` and that both servers run in dev mode.

---

## Useful tips

- Keep shared libs in sync (matching versions) across remote and host to avoid runtime issues.
- Keep the remote API (the exposed module names) stable to avoid breaking hosts.
- Use `React.lazy` + `Suspense` for clean lazy-loading of remote components.
- For complex setups, consider runtime remote resolution (e.g. fetch remote entry URL from a config service).

---

## Contributing

This repository is a learning/example repo. Contributions, improvements, or PRs to add more examples (routing, multiple remotes, shared utilities) are welcome.

If you find an error or have suggestions, open an issue or submit a PR.

---

## License & Credits

This example is provided for learning and experimentation. Use freely for educational purposes.

Credits:
- @module-federation/vite
- Vite + React + TailwindCSS

---

If you'd like, I can:
- generate complete example files (full vite.config.js, package.json, sample components) for both apps,
- or produce a short quickstart script to bootstrap and run the two apps.

Tell me which of those you'd like next.

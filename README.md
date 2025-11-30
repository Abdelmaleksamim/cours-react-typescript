
# React + TypeScript + Vite Starter

A minimal, blazing-fast starter template for React 19 using Vite, TypeScript, and SWC-powered Fast Refresh.

Ideal for new projects, prototypes, or learning modern React with zero boilerplate.

## Features

- ⚡️ Vite – Instant server start and lightning-fast HMR  
- ⚛️ React 19 + Fast Refresh (via `@vitejs/plugin-react-swc`)  
- TypeScript – Full type safety out of the box  
- ESLint – Pre-configured with sensible defaults  
- No extra build tools – Just `npm install` and go!

## Quick Start

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

npm install
npm run dev
```

Open http://localhost:5173 to see your app.

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Optional: Enable Type-Checked ESLint Rules (Recommended for Production)

Replace or update your `eslint.config.js`:

```js
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked, // optional but nice
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
```

## Optional: Add Advanced React-Specific Lint Rules

```bash
npm install -D eslint-plugin-react-x eslint-plugin-react-dom
```

Then add to your ESLint config:

```js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config(
  // ...other configs
  reactX.configs['recommended-typescript'],
  reactDom.configs.recommended
);
```

## React Compiler (Experimental)

The React Compiler is **not enabled by default** because it currently slows down dev & build performance.

When you're ready to try it, follow the official guide:  
https://react.dev/learn/react-compiler/installation

## Project Structure

```
src/
  ├── assets/        # Images, icons, fonts
  ├── components/    # Your reusable components go here
  ├── App.tsx
  ├── main.tsx
  └── vite-env.d.ts
```

## Built With

- [Vite](https://vitejs.dev)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [SWC](https://swc.rs) (faster than Babel)
- [ESLint](https://eslint.org) + typescript-eslint

## License

MIT © 2025 Your Name (or your GitHub username)

---
Just copy and paste this entire file as your `README.md` — it's ready to go!
```

Just replace `your-username/your-repo-name` and the copyright name if you want. Then paste it directly into your project root as `README.md`. Done!

🚀 React + TypeScript + Vite — Alert System Project

This project is a simple and modern Alert Management System built using React, TypeScript, and Vite.
It allows users to add, edit, and delete alerts with multiple alert types such as:

Success

Warning

Info

Danger

Default

The interface is styled with SCSS, using variables, mixins, animations, and soft shadows for a polished UI.

📌 Features

✔️ Add new alerts

✔️ Edit existing alerts

✔️ Delete alerts

✔️ Select alert type

✔️ Smooth CSS animations

✔️ Clean SCSS-based UI

✔️ LocalStorage persistence

✔️ Fast development with Vite

🧱 Tech Stack

React 18

TypeScript

Vite

SCSS / SASS

Lucide React Icons

📂 Project Structure
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

▶️ Getting Started
1. Install dependencies
npm install

2. Run the development server
npm run dev

3. Build for production
npm run build

🎨 UI & Styling (SCSS)

The project uses:

Color variables

Reusable mixins for alert components

Smooth fade/scale animations

Modern box shadows

Responsive layout

Example SCSS features used:

$color variables

@mixins for alert boxes

Transition animations

Shadows and border styles

Each alert type (danger, info, warning, success, default) is generated using a single SCSS mixin.

💡 About This Project

This project is great for practicing:

React + TypeScript logic

Reusable component design

CRUD state management

Form handling

SCSS mixins & variables

UI animations

Clean file structure

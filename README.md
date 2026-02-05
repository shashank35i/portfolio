# Professional Software Engineer Portfolio

A high-performance, dark-mode portfolio designed for Principal/Senior Engineers. Built with React, Tailwind CSS, Framer Motion, and Three.js.

## 🚀 Quick Start

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 📝 Content Management

**All content is managed in a single file:** `client/src/content/content.ts`

You do not need to touch the React components to update text, projects, or skills.

### How to Edit:
1.  Open `client/src/content/content.ts`.
2.  Update the `hero` section with your name and tagline.
3.  Add your skills in the `skills` arrays.
4.  Add your projects to the `projects` array.
    *   **Images:** Place project images in `client/public/assets/` and reference them like `/assets/my-project.jpg`.
5.  Update your `experience` timeline.
6.  Update `contact` details.

## 🎨 Customization

### Theme & Colors
The design system is defined in `client/src/index.css`.
*   **Colors:** Modified via CSS variables (HSL format).
*   **Fonts:** Uses `Space Grotesk` (Headers) and `Inter` (Body).

### 3D Background
The Hero background is in `client/src/components/sections/HeroBackground.tsx`.
*   You can toggle it off by removing `<HeroBackground />` from `client/src/components/sections/Hero.tsx`.
*   It respects `prefers-reduced-motion`.

## 📦 Deployment

This project is optimized for **Vercel**.

1.  Push to GitHub.
2.  Import project in Vercel.
3.  Framework Preset: **Vite**.
4.  Deploy.

## 📄 Resume

Replace the file at `client/public/resume.pdf` with your actual PDF resume.

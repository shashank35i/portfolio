# Shashank Preetham — Portfolio

Portfolio for Shashank Preetham Pendyala, a Java/backend-focused software engineer. The site highlights OpsPilot-AI and BookMyTicket as detailed engineering case studies and preserves a visual archive of web and Android work.

## Stack

- React 19, TypeScript, and Vite
- Tailwind CSS 4 and shadcn/Radix primitives
- Framer Motion
- Express production server

## Local development

```bash
npm install
npm run dev
```

The client runs through Vite and the server runs with `tsx`.

## Verification and production build

```bash
npm run check
npm run build
npm start
```

`npm run check` performs the TypeScript check. `npm run build` creates the client bundle under `dist/public` and the server bundle at `dist/index.cjs`.

## Content and assets

- Portfolio data: `client/src/content/content.ts`
- Page sections: `client/src/components/sections/`
- Project screenshots and demos: `client/public/projects/`
- Downloadable resume: `client/public/resume.pdf`
- Social preview: `client/public/opengraph.jpg`
- Theme and responsive styles: `client/src/index.css`

Project claims, experience, education, and recognition should remain aligned with the supplied resume. BookMyTicket intentionally uses a QR/OCR system graphic because no product screenshots are included.

## Deployment

Deploy the output of `npm run build` with Node.js 20.19 or newer. Start the production server with `npm start` and provide required environment variables through the hosting platform.

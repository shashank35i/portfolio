# Shashank Preetham — Portfolio

Portfolio for Shashank Preetham Pendyala, a Java/backend-focused software engineer. The site highlights OpsPilot-AI and BookMyTicket as detailed engineering case studies and preserves a visual archive of web and Android work.

## Stack

- React 19, TypeScript, and Vite
- Tailwind CSS 4 and shadcn/Radix primitives
- Framer Motion
- Express production server
- Cloudflare Pages Function backed portfolio assistant using Groq

## Local development

```bash
npm install
npm run dev
```

The client runs through Vite and the server runs with `tsx`.

## Verification and production build

```bash
npm run check
npm run test:chat
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

## Portfolio assistant

The client posts bounded `user`/`assistant` history to `/api/chat`. Production uses `functions/api/chat.ts`; local or Node deployments use the matching Express route. Both use the shared validation, verified knowledge context, model settings, upstream timeout, and response contract in `shared/portfolio-chat.ts`. The Groq key is server-only and must never use a `VITE_` prefix.

Without `GROQ_API_KEY`, the endpoint intentionally returns `503 CHAT_NOT_CONFIGURED` and the interface shows an unavailable state. Rate limits are best-effort in-memory controls per runtime instance; durable global enforcement would require a Cloudflare rate-limiting product or Durable Object.

Cloudflare deployment is disabled by default, so pushes and manual workflow runs perform validation without failing when the repository has no secrets. To enable deployment, first create all three repository secrets from your own terminal so values are never pasted into chat:

```bash
gh secret set GROQ_API_KEY --repo shashank35i/portfolio
gh secret set CLOUDFLARE_API_TOKEN --repo shashank35i/portfolio
gh secret set CLOUDFLARE_ACCOUNT_ID --repo shashank35i/portfolio
```

After all secrets are configured, opt in to deployment with the non-secret repository variable:

```bash
gh variable set ENABLE_CLOUDFLARE_DEPLOY --body true --repo shashank35i/portfolio
```

The `validate` job always runs. The `deploy` job runs for main-branch pushes and manual dispatches only when `ENABLE_CLOUDFLARE_DEPLOY` is exactly `true`; otherwise it is safely skipped and the workflow remains green. Once enabled, the job checks that `GROQ_API_KEY`, `CLOUDFLARE_API_TOKEN`, and `CLOUDFLARE_ACCOUNT_ID` are all present and fails with the missing secret's name—never its value—before any deployment command runs.

To disable deployment again:

```bash
gh variable set ENABLE_CLOUDFLARE_DEPLOY --body false --repo shashank35i/portfolio
```

GitHub Secrets are deployment inputs. The workflow securely pipes `GROQ_API_KEY` into Cloudflare Pages' encrypted runtime secret, then deploys `dist/public` together with `functions/` to the existing `portfolio-2yo` project. `GROQ_MODEL` is a non-secret variable configured in `wrangler.toml`.

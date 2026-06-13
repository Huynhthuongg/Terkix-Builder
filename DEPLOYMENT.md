# Terkix AI public deployment

This repository is prepared to be deployed as the main Terkix/RKIX3 AI launch page.

## Fastest path to a public link

1. Open Vercel: <https://vercel.com/new>
2. Import `https://github.com/Huynhthuongg/Terkix-Builder`.
3. Keep the framework preset as **Next.js**.
4. Use the default build command: `npm run build`.
5. Deploy. Vercel will return a public `*.vercel.app` preview URL first.
6. In **Project Settings → Domains**, add your real domain, for example `terkix.dev` or your `.com` domain.
7. Update DNS records at your domain provider exactly as Vercel shows.

## Current production shell

- App shell: `app/(dashboard)/page.tsx`
- Metadata: `app/layout.tsx`
- Build check: `npm run build`

## Important limitation

A real `.dev` or `.com` URL cannot be created from this coding container unless the Vercel/GitHub account and domain DNS are authenticated. After the repo is imported in Vercel and the DNS owner approves the domain, the same code in this branch can be published to the public URL.

# Cloudflare deployment — Hitungin

Status: proposed / preview. Hosting is not live until Cloudflare build and deployment succeed.

## Architecture
Next.js static export (`output: "export"`) builds `out/`. Cloudflare Workers Static Assets serves those files. No backend, database, or secrets required for MVP landing page.

## Git integration
1. In Cloudflare Dashboard, go to Workers & Pages, create a **Worker** with Git repository integration and select `Irsan-R/hitungin`.
2. Configure build command: `npm run build`. Set deploy command to `npx wrangler deploy` if prompted. Build output is `out/`, declared in `wrangler.jsonc`.
3. Use production branch `main`. Enable preview deployments for PR branches where supported.
4. Ensure the Cloudflare GitHub app is installed for the repository owner `Irsan-R` with repository access.
5. Once CI is green and PR reviewed, merge to main and verify the `*.workers.dev` URL, static routes and 404 behavior.

Cloudflare UI labels can vary; do not use Pages-specific build output configuration in a Workers Git integration.

## Local verification
```bash
npm install
npm run check
npx wrangler dev
```

`npm install` generates `package-lock.json`, which must be committed before GitHub Actions `npm ci` can pass. This initial PR intentionally requires lockfile generation and local validation before merge.

## Security and operations
- No Cloudflare API token in repository or PR.
- Avoid storing user financial inputs or sensitive telemetry.
- Cloudflare custom domain is optional until preview is verified.
- Cloudflare Git integration performs deployment; GitHub Actions performs CI only, avoiding duplicate deploys.
- Never claim a successful production deployment without checking Cloudflare logs and the live URL.

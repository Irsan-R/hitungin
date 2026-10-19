# Two-environment release workflow

## Branches and deployments

| Git branch | Cloudflare Worker | Deploy command |
| --- | --- | --- |
| `main` | `hitungin` | `npx wrangler deploy` |
| `staging` | `hitungin-staging` | `npx wrangler deploy --config wrangler.staging.jsonc` |

Production uses `wrangler.jsonc`. Staging uses `wrangler.staging.jsonc`. **Never** use the default `npx wrangler deploy` command in the staging Worker: it would target the production Worker name.

## Cloudflare setup (manual dashboard step)

1. Keep existing `hitungin` Worker connected to repository `Irsan-R/hitungin`, production branch `main`, build `npm run build`, deploy `npx wrangler deploy`.
2. Disable **Builds for Preview branches** for the production Worker.
3. Create a second Worker through **Workers & Pages → Create application → Import Git repository**, selecting the same repository.
4. Set Worker name `hitungin-staging`, production branch `staging`, build `npm run build`, deploy `npx wrangler deploy --config wrangler.staging.jsonc`, root `/`.
5. Disable **Builds for Preview branches** on the staging Worker too: shared staging updates only after merging into the `staging` branch.
6. Enable the `workers.dev` production URL for `hitungin-staging`. Restrict staging access with Cloudflare Access if desired; do not restrict public production.
7. Verify that staging and production have separate Workers, URLs, and deployment histories.

**Order matters:** merge this setup PR into `staging` before creating/deploying the staging Worker. Until then, the staging branch lacks the staging Wrangler config.

## Release workflow

1. `feature/*` → PR to `staging` → required GitHub Actions `validate`.
2. Merge PR to `staging` → Cloudflare deploys `hitungin-staging`.
3. Test staging site manually (functional, mobile, financial fixtures).
4. PR `staging` → `main` → required GitHub Actions `validate`.
5. Merge to `main` → Cloudflare deploys production `hitungin`.

Protect `main` and `staging` with pull-request and `validate` requirements. Cloudflare preview checks are not required. For a staging release, avoid squash merging feature PRs if a clean ancestry from staging to main is important; choose merge commits consistently. The release PR should contain only intended, tested changes. Rollbacks require a new reviewed PR or a controlled redeploy of a known-good version.

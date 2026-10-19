import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Next.js exports a static website", () => {
  const config = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.match(config, /output:\s*["']export["']/);
});

test("Cloudflare serves the static output directory", () => {
  const config = JSON.parse(readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8"));
  assert.equal(config.assets.directory, "./out");
});

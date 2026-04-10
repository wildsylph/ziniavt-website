// @ts-check
import { defineConfig } from "astro/config";
import { rm } from "node:fs/promises";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/docs
export default defineConfig({
	site: "https://ziniavt.com",
	integrations: [
		{
			name: "exclude-r2-assets",
			hooks: {
				"astro:build:done": async () => {
					// videos are served from R2, remove them from the Workers asset bundle
					await rm("./dist/videos", { recursive: true, force: true });
				},
			},
		},
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});

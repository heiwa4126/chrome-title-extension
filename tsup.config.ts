import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/content.ts", "src/popup.ts"],
	outDir: "dist",
	format: ["iife"],
	target: "chrome110",
	minify: false,
	sourcemap: false,
	clean: true,
	dts: false,
});

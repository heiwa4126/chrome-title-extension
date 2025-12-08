import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/content.ts", "src/popup.ts", "src/background.ts"],
	outDir: "dist",
	format: ["iife"],
	target: "chrome110",
	clean: true,
	sourcemap: false,
	dts: false,
	bundle: true,
	minify: true,
});

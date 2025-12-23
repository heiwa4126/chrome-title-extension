import { defineConfig } from "tsdown";

export default defineConfig([
	{
		clean: true,
		entry: ["src/content.ts"],
		outDir: "dist",
		format: ["iife"],
		target: "chrome110",
		sourcemap: false,
		dts: false,
		minify: true,
	},
	{
		clean: false,
		entry: ["src/background.ts"],
		outDir: "dist",
		format: ["iife"],
		target: "chrome110",
		sourcemap: false,
		dts: false,
		minify: true,
	},
]);

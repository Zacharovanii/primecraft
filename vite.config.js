import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	base: "/primecraft/",
	// остальные настройки
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				about: resolve(__dirname, "about.html"),
				catalog: resolve(__dirname, "catalog.html"),
				// можно добавить ещё страницы
			},
		},
	},
});

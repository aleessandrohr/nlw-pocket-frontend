import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "in.orbit",
				short_name: "in.orbit",
				description: "Acompanhe suas metas e hábitos semanais.",
				lang: "pt-BR",
				start_url: "/",
				scope: "/",
				display: "standalone",
				theme_color: "#09090B",
				background_color: "#09090B",
				icons: [
					{
						src: "/pwa-icon.svg",
						sizes: "192x192",
						type: "image/svg+xml",
						purpose: "any",
					},
					{
						src: "/pwa-icon.svg",
						sizes: "512x512",
						type: "image/svg+xml",
						purpose: "any maskable",
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
		},
	},
});

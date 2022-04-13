import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
const pathAliasMap = {
	"App.css": "/src/App.css",
	App: "/src/App/",
	"App.test": "/src/App.test",
	assets: "/src/assets/",
	config: "/src/config/",
	context: "/src/context/",
	Components: "/src/Components/",
	"favicon.svg": "/src/favicon.svg",
	"index.css": "/src/index.css",
	index: "/src/index/",
	"logo.svg": "/src/logo.svg",
	main: "/src/main/",
	Mobile: "/src/Mobile/",
	myGraphql: "/src/myGraphql/",
	Pages: "/src/Pages/",
	reportWebVitals: "/src/reportWebVitals/",
	Routes: "/src/Routes/",
	"service-worker": "/src/service-worker/",
	serviceWorkerRegistration: "/src/serviceWorkerRegistration/",
	Utils: "/src/Utils/",
};

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			...pathAliasMap,
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});

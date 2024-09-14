import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// biome-ignore lint: This case #root is always exists
createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);

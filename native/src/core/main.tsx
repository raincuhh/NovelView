import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import "@/styles/global.css";
import "react-loading-skeleton/dist/skeleton.css";
// import "@styles/reactSpringBottomSheet.css";
import "react-spring-bottom-sheet/dist/style.css";
import "overlayscrollbars/overlayscrollbars.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const strictMode: boolean = false;

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	if (strictMode) {
		root.render(
			<StrictMode>
				<RouterProvider router={router} />
			</StrictMode>
		);
	} else {
		root.render(<RouterProvider router={router} />);
	}
}

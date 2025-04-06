// export default () => {
// 	throw new Error("SSR is disabled for this app.");
// };

// export default () => async (req: Request) => {
// 	return new Response(
// 		"<html><body><h1>SSR Disabled</h1><script>window.location.href='/'</script></body></html>",
// 		{ status: 200, headers: { "Content-Type": "text/html" } }
// 	);
// };

import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";

import { createRouter } from "./router";

export default createStartHandler({
	createRouter,
	getRouterManifest,
})(defaultStreamHandler);

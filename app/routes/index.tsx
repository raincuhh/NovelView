import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/shared/components/utils/seo";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: "NovelView",
				description: `NovelView is a modern EPub reader made for readers, by readers.`,
			}),
		],
	}),

	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Hello "/"! <Link to="/test">to test</Link>
		</div>
	);
}

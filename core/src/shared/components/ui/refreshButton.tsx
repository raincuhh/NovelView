import { Button } from "./button";

export default function RefreshButton() {
	return (
		<Button variant="accent" rounded="full" onClick={() => window.location.reload()}>
			Refresh
		</Button>
	);
}

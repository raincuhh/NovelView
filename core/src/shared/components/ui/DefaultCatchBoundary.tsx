import { ErrorComponent, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "./button";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();

	console.error(error);

	return (
		<div className="h-screen flex w-full">
			<div className="flex w-full h-full justify-center items-center flex-col">
				<ErrorComponent error={error} />
				<div className="flex flex-col w-sm mx-auto px-4 items-center gap-2">
					<div className="flex flex-col items-center">
						<h1 className="font-bold text-xl">Woops!</h1>
						<h1 className="font-bold text-xl">Something went wrong.</h1>
					</div>
					<Button
						variant="link"
						onClick={() => {
							router.invalidate();
						}}
						className=" text-muted"
					>
						Try Again
					</Button>
				</div>
			</div>
		</div>
	);
}

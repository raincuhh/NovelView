import { Button } from "@/shared/components/ui/button";
import { ErrorBoundary } from "react-error-boundary";
import ReadingNow from "./readingNow";

export default function ReadingNowErrorBoundary() {
	return (
		<ErrorBoundary FallbackComponent={ReadingNowFallback}>
			<ReadingNow />
		</ErrorBoundary>
	);
}

function ReadingNowFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
	return (
		<div className="px-4 w-full group">
			<div className="text-center text-danger bg-primary group-hover:border-border-danger-hover border-border-danger border group-hover:bg-primary-alt rounded-md py-4 w-full flex flex-col justify-center items-center">
				<p className="font-bold text-xl">Something went wrong.</p>
				<Button onClick={resetErrorBoundary} variant="link" className="group-hover:!underline text-muted">
					Try Again.
				</Button>
			</div>
		</div>
	);
}

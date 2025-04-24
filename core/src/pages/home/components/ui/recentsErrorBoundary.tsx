import { ErrorBoundary } from "react-error-boundary";
import QuickAccess from "./quickAccess";
import { Button } from "@/shared/components/ui/button";
import Recents from "./recents";

export default function RecentsErrorBoundary() {
	return (
		<ErrorBoundary FallbackComponent={RecentsFallback}>
			<Recents />
		</ErrorBoundary>
	);
}

function RecentsFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
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

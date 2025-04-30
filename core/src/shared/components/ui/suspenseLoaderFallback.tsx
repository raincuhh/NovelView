export default function SuspenseLoaderFallback() {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="relative w-10 h-10">
				<div className="absolute inset-0 rounded-full border-4 border-primary" />
				<div className="absolute inset-0 rounded-full border-4 border-t-accent border-primary-alt animate-spin" />
			</div>
		</div>
	);
}

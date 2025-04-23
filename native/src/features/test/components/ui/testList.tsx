type TestListProps = {
	count: number;
};

export default function TestList({ count }: TestListProps) {
	return (
		<>
			{Array.from({ length: count }, (_, i) => (
				<div key={i + "test"} className="px-4">
					Item {i + 1}
				</div>
			))}
		</>
	);
}

import useBookInfo from "@/features/books/hooks/useBookInfo";
import { Book } from "@/features/books/types";

type RecentsItemProps = {
	book: Book;
	coverPath: string | null;
};
// @ts-ignore
export default function RecentsItem({ book, coverPath }: RecentsItemProps) {
	const { progress, timeAgo, isLoading } = useBookInfo(book, "percentage");

	return (
		<li className="min-w-56 h-22 relative snap-start pl-4">
			<div className="bg-accent h-full rounded-md px-2 py-2">
				<div>{book.title}</div>
				<div>
					{progress} · {timeAgo}
				</div>
			</div>
		</li>
	);
}

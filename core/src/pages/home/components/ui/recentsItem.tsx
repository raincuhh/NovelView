import useBookInfo from "@/features/books/hooks/useBookInfo";
import { useBookCoverPath } from "@/features/books/model/queries/useBookQuery";
import { Book } from "@/features/books/types";

type RecentsItemProps = {
	book: Book;
};

export default function RecentsItem({ book }: RecentsItemProps) {
	// @ts-ignore
	const { data: coverPath } = useBookCoverPath(book.id);
	const { progress, timeAgo } = useBookInfo(book, "percentage");

	return (
		<li className=" h-42 relative snap-start pl-4">
			<div className=" h-full rounded-md px-2 py-2">
				<h1 className="">{book.title}</h1>
				{progress && timeAgo ? (
					<div>
						{progress} · {timeAgo}
					</div>
				) : null}
			</div>
		</li>
	);
}

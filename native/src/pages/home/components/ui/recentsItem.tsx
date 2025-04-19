import { Book } from "@/shared/lib/appSchema";

type RecentsItemProps = {
	book: Book;
	coverPath: string | null;
};

export default function RecentsItem({ book, coverPath }: RecentsItemProps) {
	return <li>{book.title}</li>;
}

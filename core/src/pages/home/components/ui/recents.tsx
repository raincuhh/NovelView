import RenderList from "@/shared/components/utils/renderList";
import { Book } from "@/features/books/types";
import RecentsItem from "./recentsItem";
import HomeSectionHeader from "./homeSectionHeader";
import { useAuthStore } from "@/features/auth/authStore";
import { useRecentlyOpenedBooksQuery } from "@/features/books/model/queries/useBookQuery";

export default function Recents() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();

	const { data: books } = useRecentlyOpenedBooksQuery(userId);

	const hasBooks = !!books && books.length > 0;
	if (!hasBooks) return null;

	return (
		<RecentsWrapper>
			<HomeSectionHeader label="Recents" SeeMoreto="/home/recents" />
			<RecentsList books={books} />
		</RecentsWrapper>
	);
}

const RecentsWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col">{children}</div>
);

const RecentsList = ({ books }: { books: Book[] }) => {
	return (
		<div className="relative flex flex-col gap-2 w-full">
			<ul className="flex py-2 pr-4 snap-x snap-mandatory overflow-x-scroll">
				<RenderList
					data={books}
					render={(book: Book) => <RecentsItem key={`recents-${book.id}`} book={book} />}
				/>
			</ul>
		</div>
	);
};

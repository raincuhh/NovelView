import ImportBookModal from "@/features/books/components/ui/importBookModal";
import useModalStore from "@/features/modal/modalStore";
import { type Modal as ModalType } from "@/features/modal/types";
import { Button } from "@/shared/components/ui/button";
import { LibraryType } from "@/features/libraries/types";

type EmptyLibraryProps = {
	libraryType: LibraryType;
	libraryId: string;
};

export default function EmptyLibrary({ libraryType, libraryId }: EmptyLibraryProps) {
	const { openModal, closeModal } = useModalStore();

	const handleOpenImportModal = () => {
		const modal: ModalType = {
			id: "import-book",
			closable: true,
			content: <ImportBookModal onClose={closeModal} libraryType={libraryType} libraryId={libraryId} />,
		};

		openModal(modal);
	};

	return (
		<div className="flex flex-col justify-center px-4">
			<div className="mx-auto flex flex-col max-w-3xs">
				<div className="flex flex-col items-center mb-6 gap-2">
					<h1 className="font-bold text-xl">No Books in your library</h1>
				</div>
				<div className="flex flex-col gap-2 w-full px-4">
					<Button variant="accent" onClick={handleOpenImportModal}>
						Import a book
					</Button>
					<Button variant="accent">Browse books</Button>
				</div>
			</div>
		</div>
	);
}

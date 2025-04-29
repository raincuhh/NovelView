import ImportBookModal from "@/features/books/components/ui/importBookModal";
import useModalStore from "@/features/modal/modalStore";
import Icon from "@/shared/components/ui/icon";
import { type Modal as ModalType } from "@/features/modal/types";
import { LibraryType } from "@/features/libraries/types";

type LibraryImportProps = {
	type: LibraryType;
};

export default function LibraryImport({ type }: LibraryImportProps) {
	const { openModal, closeModal } = useModalStore();

	const handleOpenImportModal = () => {
		const modal: ModalType = {
			id: "import-book-from-library",
			closable: true,
			content: <ImportBookModal onClose={closeModal} libraryType={type} />,
		};

		openModal(modal);
	};

	return (
		<div className="p-2 -mr-2 gap-1" onClick={handleOpenImportModal}>
			<Icon.plus className="hover:fill-muted" />
		</div>
	);
}

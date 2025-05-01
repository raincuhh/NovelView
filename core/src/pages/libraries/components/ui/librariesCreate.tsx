import CreateLibraryModal from "@/features/libraries/components/ui/createLibraryModal";
import useModalStore from "@/features/modal/modalStore";
import Icon from "@/shared/components/ui/icon";
import { type Modal as ModalType } from "@/features/modal/types";

export default function LibrariesCreate() {
	const { openModal, closeModal } = useModalStore();

	const handleOpenCreateLibraryModal = () => {
		const modal: ModalType = {
			id: "import-book-from-library",
			closable: true,
			content: <CreateLibraryModal onClose={closeModal} />,
		};

		openModal(modal);
	};

	return (
		<div className="p-2 -mr-2 gap-1" onClick={handleOpenCreateLibraryModal}>
			<Icon.plus className="hover:fill-muted" />
		</div>
	);
}

import { Button } from "@/shared/components/ui/button";
import { type Modal as ModalType } from "@/features/modal/types";
import useModalStore from "@/features/modal/modalStore";
import CreateLibraryModal from "./createLibraryModal";

export default function EmptyLibraries() {
	const { openModal, closeModal } = useModalStore();

	const handleOpenModal = () => {
		const modal: ModalType = {
			id: "create-library",
			closable: true,
			content: <CreateLibraryModal onClose={closeModal} />,
		};

		openModal(modal);
	};

	return (
		<div className="mx-auto flex flex-col">
			<div className="flex flex-col items-center mb-6 gap-2">
				<h1 className="font-bold text-2xl">No libraries yet</h1>
				{/* <p className="text-muted text-sm">Create your first one to get started.</p> */}
			</div>
			<div className="flex flex-col gap-2 px-4">
				<Button variant="accent" onClick={handleOpenModal}>
					Create a Library
				</Button>
			</div>
		</div>
	);
}

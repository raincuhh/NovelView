import { Button } from "@/shared/components/ui/button";
import { type Modal as ModalType } from "@/features/modal/types";
import useModalStore from "@/features/modal/modalStore";
import CreateLibraryModal from "./createLibraryModal";

export default function EmptyLibraries({ value }: { value: string }) {
	const { openModal, closeModal } = useModalStore();

	const handleOpenCreatelibraryModel = () => {
		const modal: ModalType = {
			id: "create-library",
			closable: true,
			content: <CreateLibraryModal onClose={closeModal} />,
		};

		openModal(modal);
	};

	return (
		<div className=" flex flex-col justify-center">
			<div className="mx-auto flex flex-col max-w-3xs">
				<div className="flex flex-col items-center mb-6 gap-2">
					<h1 className="font-bold text-xl">{value}</h1>
				</div>
				<div className="flex flex-col gap-2 w-full px-4">
					<Button variant="accent" onClick={handleOpenCreatelibraryModel}>
						Create a library
					</Button>
				</div>
			</div>
		</div>
	);
}

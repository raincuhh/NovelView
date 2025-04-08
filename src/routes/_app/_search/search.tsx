import { createFileRoute } from "@tanstack/react-router";
import { type Modal as ModalType } from "@/features/modal/types";
import {
	Modal,
	ModalControl,
	ModalDescription,
	ModalTitle,
	ModalSubTitle,
} from "@/features/modal/components/ui/modal";
import useModalStore from "@/features/modal/modalStore";
import { Button } from "@/shared/components/ui/button";

export const Route = createFileRoute("/_app/_search/search")({
	component: RouteComponent,
});

function RouteComponent() {
	const { openModal, closeModal } = useModalStore();

	const handleOpenModal = () => {
		const modal: ModalType = {
			id: "test",
			content: (
				<Modal>
					<ModalTitle>Testing Modal</ModalTitle>
					<ModalSubTitle>subtitle lorem ipsum</ModalSubTitle>
					<ModalDescription>
						currently just testing how this looks for the user and stuff, Lorem ipsum dolor sit amet
						consectetur adipisicing elit.
					</ModalDescription>
					<ModalControl>
						<Button onClick={closeModal} variant="destructive" rounded="full">
							Close
						</Button>
						<Button
							onClick={() => console.log("doing shit?")}
							className="!text-normal"
							variant="outline"
							rounded="full"
						>
							accept
						</Button>
					</ModalControl>
				</Modal>
			),
			onClose: () => console.log("closing"),
			onOpen: () => console.log("opening"),
		};

		openModal(modal);
	};

	return (
		<div className="flex gap-2">
			<div>Hello "/_app/_search/search"!</div>
			<Button variant="accent" rounded="full" onClick={handleOpenModal}>
				test open modal
			</Button>
		</div>
	);
}

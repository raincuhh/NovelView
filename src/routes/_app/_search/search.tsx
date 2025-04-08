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
import ModalBackground from "@/features/modal/components/ui/modalBackground";

export const Route = createFileRoute("/_app/_search/search")({
	component: RouteComponent,
});

function RouteComponent() {
	const { openModal, closeModal } = useModalStore();

	const handleOpenModal = () => {
		let closable: boolean = true;

		const modal: ModalType = {
			id: "test",
			closable: closable,
			content: (
				<ModalBackground>
					<Modal>
						<ModalTitle>Testing a Modal</ModalTitle>
						<ModalSubTitle>subtitle lorem ipsum</ModalSubTitle>
						<ModalDescription>
							currently just testing how this looks for the user and stuff, Lorem ipsum dolor sit amet
							consectetur adipisicing elit.
						</ModalDescription>
						<ModalControl>
							<Button
								onClick={() => (closable ? closeModal() : null)}
								variant="destructive"
								rounded="full"
							>
								Disagree
							</Button>
							<Button
								onClick={() => console.log("awdadwao")}
								className="!text-normal"
								variant="outline"
								rounded="full"
							>
								Accept
							</Button>
						</ModalControl>
					</Modal>
				</ModalBackground>
			),
			onClose: () => console.log("closing"),
			onOpen: () => console.log("opening"),
		};

		openModal(modal);
	};

	return (
		<div className="flex gap-2 flex-col">
			<div>Hello "/_app/_search/search"!</div>
			<Button variant="accent" rounded="full" onClick={handleOpenModal}>
				test open modal
			</Button>
		</div>
	);
}

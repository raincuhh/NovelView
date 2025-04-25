import { Modal } from "@/features/modal/components/ui/modal";

type ImportBookModalProps = {
	onClose: () => void;
};

export default function ImportBookModal({ onClose }: ImportBookModalProps) {
	return (
		<Modal onClose={onClose} className="w-full flex">
			<div className="flex flex-col">
				<header>Import Book</header>
			</div>
		</Modal>
	);
}

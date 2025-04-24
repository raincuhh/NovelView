import { Modal } from "@/features/modal/components/ui/modal";

type ImportBookModalProps = {
	onClose: () => void;
};

export default function ImportBookModal({ onClose }: ImportBookModalProps) {
	return (
		<Modal onClose={onClose} className="w-full flex" innerClassName="">
			<div>yoksosos</div>
		</Modal>
	);
}

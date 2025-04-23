import useModalStore from "../../modalStore";
import RenderList from "@/shared/components/utils/renderList";
import { Modal } from "../../types";

export default function ModalRoot() {
	const modals: Modal[] = useModalStore((s) => s.modals);

	return (
		<div>
			<RenderList
				data={modals}
				render={(modal: Modal, i: number) => (
					<div key={modal.id + i} className="w-screen h-screen absolute top-0 left-0">
						{modal.content}
					</div>
				)}
			/>
		</div>
	);
}

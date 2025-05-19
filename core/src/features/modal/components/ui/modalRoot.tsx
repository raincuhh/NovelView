import useModalStore from "../../modalStore";
import RenderList from "@/shared/components/utils/renderList";
import { Modal } from "../../types";

export default function ModalRoot() {
	const modals: Modal[] = useModalStore((s) => s.modals);
	console.log(
		"Active modals:",
		modals.map((m) => m.id)
	);

	return (
		<div>
			<RenderList
				data={modals}
				getKey={(modal, i) => {
					const fallbackId = modal.id?.trim() || `modal-${i}`;
					const key = `${fallbackId}-${i}`;
					console.log("Rendering modal with key:", key);
					return key;
				}}
				render={(modal: Modal) => (
					<div className="w-screen h-screen absolute top-0 left-0">
						<div className="relative w-full h-full overflow-hidden">{modal.content}</div>
					</div>
				)}
			/>
		</div>
	);
}

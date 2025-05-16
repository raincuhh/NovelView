import useModalStore from "../../modalStore";
import RenderList from "@/shared/components/utils/renderList";
import { Modal } from "../../types";

export default function ModalRoot() {
	const modals: Modal[] = useModalStore((s) => s.modals);

	return (
		<div>
			<RenderList
				data={modals}
				getKey={(modal, i) => `${modal.id || "modal"}-${i}`}
				render={(modal: Modal) => (
					<div className="w-screen h-screen absolute top-0 left-0">
						<div className="relative w-full h-full overflow-hidden">{modal.content}</div>
					</div>
				)}
			/>
		</div>
	);
}

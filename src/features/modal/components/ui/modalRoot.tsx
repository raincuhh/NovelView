import useModalStore from "../../modalStore";
import RenderList from "@/shared/components/utils/renderList";
import { Modal } from "../../types";
import ModalBackground from "./modalBackground";

export default function ModalRoot() {
	const { modals } = useModalStore((state) => state);

	return (
		<div>
			<RenderList
				data={modals}
				render={(modal: Modal, i: number) => (
					<div key={i} className="w-screen h-screen absolute top-0 left-0">
						{modal.content}
					</div>
				)}
			/>
		</div>
	);
}

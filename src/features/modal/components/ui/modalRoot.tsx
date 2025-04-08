import useModalStore from "../../modalStore";
import RenderList from "@/shared/components/utils/renderList";
import { Modal } from "../../types";
import ModalBackground from "./modalBackground";

export default function ModalRoot() {
	const { modals } = useModalStore((state) => state);

	return (
		<RenderList
			data={modals}
			render={(modal: Modal, i: number) => <ModalBackground key={i}>{modal.content}</ModalBackground>}
		/>
	);
}

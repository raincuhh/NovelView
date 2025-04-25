import { useAuthStore } from "@/features/auth/authStore";
import { Modal } from "@/features/modal/components/ui/modal";
import { useBookFilesQueue } from "@/shared/providers/systemProvider";
import { useState } from "react";
import { z } from "zod";

const importBookFormSchema = z.object({
	file: z.instanceof(File),
})

type ImportBookModalProps = {
	onClose: () => void;
};

export default function ImportBookModal({ onClose }: ImportBookModalProps) {
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState<boolean>(false);

	const {getUserId} = useAuthStore();
	const userId = getUserId();
	const bookFilesQueue = useBookFilesQueue();

	const importBook = useImportBookMutation({
		onSuccess: () => onClose(),
		onError: (err) => {
			console.error("Failed to import book: ", err),
		},
	})

	return (
		<Modal onClose={onClose} className="w-full flex">
			<div className="flex flex-col">
				<header>Import Book</header>
				<div></div>
			</div>
		</Modal>
	);
}

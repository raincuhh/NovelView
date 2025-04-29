import { useAuthStore } from "@/features/auth/authStore";
import { Modal, ModalControl } from "@/features/modal/components/ui/modal";
import { useBookFilesQueue } from "@/shared/providers/systemProvider";
import { useState } from "react";
import { z } from "zod";
import { useImportBookMutation } from "../../model/mutations/useBookMutation";
import { LibraryType } from "@/features/libraries/types";
import { Button } from "@/shared/components/ui/button";
import FilePicker from "@/shared/components/ui/filePicker";
import { Form, FormItem, FormLabel } from "@/shared/components/ui/form";

const importBookFormSchema = z.object({
	file: z.instanceof(File),
});

type ImportBookModalProps = {
	onClose: () => void;
	libraryType: LibraryType;
	libraryId: string;
};

export default function ImportBookModal({ onClose, libraryType, libraryId }: ImportBookModalProps) {
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState<boolean>(false);

	const { getUserId } = useAuthStore();
	const userId = getUserId();
	const bookFilesQueue = useBookFilesQueue();

	const importBook = useImportBookMutation({
		onSuccess: () => onClose(),
		onError: (err) => console.error("Failed to import book:", err),
	});

	const handleFileSelect = (f: File | null) => {
		setFile(f);
		const result = importBookFormSchema.safeParse({ file: f });
		setError(result.success ? null : result.error.flatten().fieldErrors.file?.[0]!);
		setIsValid(result.success);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file || !bookFilesQueue) return;

		await importBook.mutateAsync({
			file,
			userId,
			bookFilesQueue,
			sync: libraryType === "synced",
			libraryId,
		});
	};

	return (
		<Modal
			onClose={onClose}
			className="border-none mx-0 h-full flex flex-col justify-top pt-18 w-full"
			innerClassName="w-full mx-auto flex flex-col gap-4"
		>
			<Form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-8">
					<FormItem className="w-full gap-4">
						<FormLabel
							id="importBookLabel"
							htmlFor="importBook"
							className="text-center text-2xl font-bold"
						>
							Import
						</FormLabel>
						<FilePicker accept=".epub" onValidFile={handleFileSelect} />
						{error && <p className="text-danger text-sm text-center">{error}</p>}
					</FormItem>
				</div>
				<ModalControl className="flex justify-center w-full gap-4">
					<Button
						variant="outline"
						type="button"
						rounded="full"
						onClick={onClose}
						disabled={importBook.isPending}
					>
						Cancel
					</Button>
					<Button
						variant="accent"
						type="submit"
						rounded="full"
						disabled={!isValid || importBook.isPending}
					>
						{importBook.isPending ? "Importing..." : "Import"}
					</Button>
				</ModalControl>
			</Form>
		</Modal>
	);
}

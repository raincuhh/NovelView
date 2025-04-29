import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Modal, ModalControl } from "@/features/modal/components/ui/modal";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import CoverPicker from "@/shared/components/ui/coverPicker";
import { useState } from "react";
import { Switch } from "@/shared/components/ui/switch";
import { useAuthStore } from "@/features/auth/authStore";
import Label from "@/shared/components/ui/label";
import { LIBRARY_COVER_MAX_SIZE } from "../../consts";
import { useLibraryCoversQueue } from "@/shared/providers/systemProvider";
import { useCreateLibraryMutation } from "../../model/mutations/useLibrariesMutation";

const libraryCreateFormSchema = z.object({
	name: z.string().min(1, "Library name must be at least 1 character"),
	image: z.instanceof(File).optional(),
	type: z.enum(["sync", "local"]).default("local"),
});

type CreateLibraryModalProps = {
	onClose: () => void;
};

export default function CreateLibraryModal({ onClose }: CreateLibraryModalProps) {
	const [image, setImage] = useState<File | null>(null);
	const [libraryName, setLibraryName] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState<boolean>(false);
	const [synced, setSynced] = useState<boolean>(false);

	const { getUserId } = useAuthStore();
	const userId = getUserId();
	const libraryCoversQueue = useLibraryCoversQueue();

	const createLibrary = useCreateLibraryMutation({
		onSuccess: () => onClose(),
		onError: (err) => {
			console.error("Failed to create library:", err);
		},
	});

	const handleLibraryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setLibraryName(value);

		const result = libraryCreateFormSchema.safeParse({ name: value });
		setError(result.success ? null : (result.error.flatten().fieldErrors.name?.[0] ?? null));
		setIsValid(result.success);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
		e.preventDefault();

		if (!libraryCoversQueue) {
			console.error("Library covers queue not initialized");
			return;
		}

		const result = libraryCreateFormSchema.safeParse({
			name: libraryName,
			file: image,
			synced: synced,
		});

		if (!result.success) {
			const issues = result.error.flatten().fieldErrors;
			setError(issues.name?.[0] ?? null);
			return;
		}

		await createLibrary.mutateAsync({
			name: libraryName,
			cover: image,
			type: synced ? "synced" : "local",
			userId,
			libraryCoversQueue,
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
							id="libraryCoverLabel"
							htmlFor="libraryCover"
							className="text-center text-2xl font-bold"
						>
							Set your library cover
							{/* <span className="text-sm text-muted">(optional)</span> */}
						</FormLabel>
						<CoverPicker
							onValidImage={setImage}
							inputId="libraryCover"
							maxWidth={LIBRARY_COVER_MAX_SIZE}
							maxHeight={LIBRARY_COVER_MAX_SIZE}
						/>
					</FormItem>
					<FormItem className="w-full gap-4">
						<FormLabel
							id="libraryNameLabel"
							htmlFor="libraryName"
							error={error}
							className="text-center text-2xl font-bold"
						>
							Name your library
						</FormLabel>
						<FormControl className="w-full border-solid border-b border-border">
							<Input
								variant="ghost"
								id="libraryName"
								name="libraryName"
								type="text"
								placeholder="test"
								className="text-center"
								autoComplete="off"
								aria-labelledby="libraryNameLabel"
								value={libraryName}
								onChange={handleLibraryNameChange}
							/>
						</FormControl>
						<FormMessage error={error} />
					</FormItem>
					<FormItem>
						<FormControl className="gap-2">
							<Switch onCheckedChange={(checked) => setSynced(checked)} />
							<Label className="font-bold">Synced Library</Label>
						</FormControl>
					</FormItem>
				</div>
				<ModalControl className="flex justify-center w-full gap-4">
					<Button variant="outline" rounded="full" onClick={onClose} disabled={createLibrary.isPending}>
						Cancel
					</Button>
					<Button
						variant="accent"
						rounded="full"
						className="text-normal"
						disabled={!isValid || createLibrary.isPending}
						type="submit"
					>
						{createLibrary.isPending ? "Creating..." : "Create"}
					</Button>
				</ModalControl>
			</Form>
		</Modal>
	);
}

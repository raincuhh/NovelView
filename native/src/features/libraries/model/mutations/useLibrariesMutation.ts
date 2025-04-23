import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewLibrary } from "../../lib/insertLibraries";
import { LibraryCoversAttachmentQueue } from "@/shared/lib/powersync/libraryCoversAttachmentQueue";

type CreateLibraryParams = {
	name: string;
	type: "local" | "synced";
	cover?: File | null;
	userId: string;
	libraryCoversQueue: LibraryCoversAttachmentQueue;
};

type HookOptions = {
	onSuccess?: () => void;
	onError?: (err: unknown) => void;
};

export function useCreateLibraryMutation(options?: HookOptions) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateLibraryParams) => {
			return await createNewLibrary({
				name: data.name,
				cover: data.cover ?? null,
				type: data.type,
				userId: data.userId,
				libraryCoversQueue: data.libraryCoversQueue,
			});
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["mostInteractedLibraries", variables.userId] });
			queryClient.invalidateQueries({ queryKey: ["libraries", variables.userId] });
			queryClient.invalidateQueries({ queryKey: ["library", variables.userId] });
			options?.onSuccess?.();
		},
		onError: (err) => {
			options?.onError?.(err);
		},
	});
}

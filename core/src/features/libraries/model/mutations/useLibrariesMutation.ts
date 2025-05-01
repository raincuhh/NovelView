import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewLibrary } from "../../lib/insertLibraries";
import { LibraryCoversAttachmentQueue } from "@/shared/lib/powersync/libraryCoversAttachmentQueue";
import { LibraryType } from "../../types";

type CreateLibraryParams = {
	name: string;
	type: LibraryType;
	cover?: File | null;
	userId: string;
	libraryCoversQueue: LibraryCoversAttachmentQueue;
};

type CreateLibraryHookOptions = {
	onSuccess?: () => void;
	onError?: (err: unknown) => void;
};

export function useCreateLibraryMutation(options?: CreateLibraryHookOptions) {
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
			queryClient.invalidateQueries({ queryKey: ["allLibraries", variables.userId] });
			options?.onSuccess?.();
		},
		onError: (err) => {
			options?.onError?.(err);
		},
	});
}

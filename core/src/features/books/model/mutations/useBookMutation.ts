import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookFilesAttachmentQueue } from "@/shared/lib/powersync/bookFilesAttachmentQueue";
import { importNewBook } from "../../lib/insertBook";

type ImportBookParams = {
	file: File;
	userId: string;
	bookFilesQueue: BookFilesAttachmentQueue;
	sync: boolean;
};

type ImportBookHookOptions = {
	onSuccess?: () => void;
	onError?: (err: unknown) => void;
};

export function useImportBookMutation(options?: ImportBookHookOptions) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: ImportBookParams) => {
			return await importNewBook({
				file: data.file,
				userId: data.userId,
				bookFilesQueue: data.bookFilesQueue,
				sync: data.sync,
			});
		},
		onSuccess(_data, _variables) {
			options?.onSuccess?.();
		},
	});
}

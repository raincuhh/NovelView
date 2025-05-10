import { forwardRef, useRef, useState, HTMLAttributes, useCallback } from "react";
import { Button } from "@/shared/components/ui/button";
import { z } from "zod";
import { cn } from "@/shared/lib/globalUtils";

type FilePickerProps = {
	accept?: string;
	onValidFile: (file: File) => void;
	schema?: z.ZodType<any>;
	label?: string;
};
const FilePicker = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & FilePickerProps>(
	({ accept = ".epub", onValidFile, schema, label = "Drag and drop file, ", className, ...props }, ref) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const [fileName, setFileName] = useState<string | null>(null);
		const [error, setError] = useState<string | null>(null);
		const [isDragOver, setIsDragOver] = useState(false);

		const validateFile = useCallback(
			(file: File) => {
				const parsed = schema?.safeParse({ file });
				if (parsed?.success === false) {
					const msg = parsed.error.flatten().fieldErrors.file?.[0] ?? "Invalid file.";
					setError(msg);
					setFileName(null);
				} else {
					setError(null);
					setFileName(file.name);
					onValidFile(file);
				}
			},
			[schema, onValidFile]
		);

		const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) validateFile(file);
		};

		const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			setIsDragOver(false);
			const file = e.dataTransfer.files?.[0];
			if (file) validateFile(file);
		};

		return (
			<div
				ref={ref}
				onDrop={handleDrop}
				onDragOver={(e) => {
					e.preventDefault();
					setIsDragOver(true);
				}}
				onDragLeave={() => setIsDragOver(false)}
				className={cn(
					"flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-md text-center transition-colors",
					isDragOver ? "border-interactive-input-border bg-interactive-accent" : "border-border",
					className
				)}
				{...props}
			>
				<p className="text-sm text-muted py-4">
					{label}
					<div>or</div>
					<Button
						type="button"
						variant="link"
						size="default"
						className="px-1 py-1"
						onClick={() => inputRef.current?.click()}
					>
						Select file
					</Button>
				</p>

				{fileName && (
					<p className="text-sm text-muted truncate max-w-xs">
						<strong>{fileName}</strong>
					</p>
				)}

				{error && <p className="text-sm text-red-500">{error}</p>}

				<input
					ref={inputRef}
					type="file"
					accept={accept}
					className="hidden"
					onChange={handleFileChange}
				/>
			</div>
		);
	}
);

FilePicker.displayName = "FilePicker";

export default FilePicker;

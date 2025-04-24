import { forwardRef, HTMLAttributes, useImperativeHandle, useRef, useState } from "react";
import { cn } from "@/shared/lib/globalUtils";
import Icon from "./icon";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;

export type CoverPickerRef = {
	reset: () => void;
};

type CoverPickerProps = {
	onValidImage: (file: File) => void;
	inputId: string;
	maxWidth?: number;
	maxHeight?: number;
	acceptedTypes?: string[];
};

const CoverPicker = forwardRef<CoverPickerRef, HTMLAttributes<HTMLDivElement> & CoverPickerProps>(
	({ onValidImage, className, inputId, maxWidth, maxHeight, acceptedTypes, ...props }, ref) => {
		const fileInputRef = useRef<HTMLInputElement>(null);
		const [previewUrl, setPreviewUrl] = useState<string | null>(null);
		const [error, setError] = useState<string | null>(null);

		useImperativeHandle(ref, () => ({
			reset: () => {
				setPreviewUrl(null);
				setError(null);
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
			},
		}));

		const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file) return;

			if (!(acceptedTypes ?? ACCEPTED_TYPES).includes(file.type)) {
				setError("Only .png, .jpg, or .webp files are allowed");
				setPreviewUrl(null);
				return;
			}

			const img = new Image();
			img.src = URL.createObjectURL(file);

			img.onload = () => {
				if (img.width > (maxWidth ?? MAX_WIDTH) || img.height > (maxHeight ?? MAX_HEIGHT)) {
					setError(
						"Image must be " + (maxWidth ?? MAX_WIDTH) + "x" + (maxHeight ?? MAX_HEIGHT) + " or smaller"
					);
					setPreviewUrl(null);
				} else {
					setError(null);
					setPreviewUrl(img.src);
					onValidImage(file);
				}
			};
		};

		return (
			<div
				className={cn("flex flex-col items-center gap-4 select-all pointer-events-auto", className)}
				{...props}
			>
				<label
					htmlFor={inputId}
					className={cn(
						"w-24 h-24 border border-border border-dashed rounded-full cursor-pointer flex items-center justify-center overflow-hidden",
						previewUrl && "border-transparent"
					)}
				>
					{previewUrl ? (
						<img src={previewUrl} alt="Library cover preview" className="object-cover w-full h-full" />
					) : (
						<div className="flex flex-col gap-1 justify-center items-center select-none">
							<Icon.upload className="fill-muted" />
							<span className="text-sm text-muted text-center">upload</span>
						</div>
					)}
				</label>

				<input
					ref={fileInputRef}
					type="file"
					id={inputId}
					name={inputId}
					accept="image/png, image/jpg, image/jpeg,image/webp"
					className="hidden"
					onChange={handleFileChange}
				/>
				{error && <p className="text-danger text-sm text-center">{error}</p>}
			</div>
		);
	}
);

CoverPicker.displayName = "CoverPicker";

export default CoverPicker;

import { forwardRef, HTMLAttributes, useState } from "react";

type ShowMoreProps = {
	text: string;
	maxLength: number;
};

const ShowMore = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement> & ShowMoreProps>(
	({ text, maxLength, ...props }: ShowMoreProps, ref) => {
		const [isExpanded, setIsExpanded] = useState<boolean>(false);
		const isTruncated = text.length > maxLength;
		const toggleDescription = () => {
			setIsExpanded(!isExpanded);
		};

		return (
			<p ref={ref} {...props} className="text-sm text-muted">
				{isExpanded ? text : `${text.slice(0, maxLength)}${isTruncated ? "..." : ""}`}
				{isTruncated && (
					<span
						onClick={toggleDescription}
						className="text-faint cursor-pointer ml-1 hover:underline underline-offset-2"
					>
						{isExpanded ? "Show less" : "Show more"}
					</span>
				)}
			</p>
		);
	}
);

ShowMore.displayName = "showMore";
export default ShowMore;

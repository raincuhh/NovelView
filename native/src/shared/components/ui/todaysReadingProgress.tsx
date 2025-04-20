import { cn } from "@/shared/lib/globalUtils";
import { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import Separator from "./separator";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const DEFAULT_READING_MINUTES = 30;

const TodaysReadingProgress = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className }, ref) => {
		const [minutesLeft, setMinutesLeft] = useState<number>(DEFAULT_READING_MINUTES);
		const [percentage, setPercentage] = useState<number>(40);

		useEffect(() => {
			setMinutesLeft(9);
			const newPercentage = ((DEFAULT_READING_MINUTES - minutesLeft) / DEFAULT_READING_MINUTES) * 100;
			setPercentage(newPercentage);
		}, [minutesLeft]);

		return (
			<div ref={ref} className={cn("flex flex-col px-4", className)}>
				<div className="flex gap-2 items-center">
					<div className="w-5 h-5">
						<CircularProgressbar
							value={percentage}
							strokeWidth={16}
							styles={buildStyles({
								strokeLinecap: "round",
								pathColor: "var(--color-accent)",
								trailColor: "var(--color-secondary)",
							})}
						/>
					</div>
					<div className="flex items-center text-sm gap-1">
						<span className="text-accent font-bold">Today's Reading</span>
						<span className="text-faint ">
							{minutesLeft} minute{minutesLeft !== 1 ? "s" : ""} left
						</span>
					</div>
				</div>
				<Separator className="my-2" />
			</div>
		);
	}
);

TodaysReadingProgress.displayName = "TodaysReadingProgress";

export default TodaysReadingProgress;

import { cn } from "@/shared/lib/globalUtils";
import { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import Separator from "./separator";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Icon from "./icon";

const DEFAULT_READING_MINUTES = 30;

const TodaysReadingProgress = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className }, ref) => {
		const [minutesLeft, setMinutesLeft] = useState<number>(DEFAULT_READING_MINUTES);
		const [percentage, setPercentage] = useState<number>(40);
		const [goalAchieved, setGoalAchieved] = useState<boolean>(false);

		useEffect(() => {
			setMinutesLeft(0);
			const newPercentage = ((DEFAULT_READING_MINUTES - minutesLeft) / DEFAULT_READING_MINUTES) * 100;
			setPercentage(newPercentage);

			minutesLeft === 0 ? setGoalAchieved(true) : setGoalAchieved(false);
		}, [minutesLeft]);

		return (
			<div ref={ref} className={cn("flex flex-col px-4", className)}>
				<div className="flex gap-2 items-center">
					<div className="w-[20px] h-[20px]">
						{goalAchieved ? (
							<div className="w-full h-full rounded-full bg-accent flex items-center justify-center">
								<Icon.check className="fill-normal w-full h-full mb-0.5" />
							</div>
						) : (
							<CircularProgressbar
								value={percentage}
								strokeWidth={16}
								styles={buildStyles({
									strokeLinecap: "round",
									pathColor: "var(--color-accent)",
									trailColor: "var(--color-secondary)",
								})}
							/>
						)}
					</div>
					<div className="flex items-center text-sm gap-1">
						<span className="text-accent font-bold">Today's Reading</span>
						{goalAchieved ? (
							<span className="text-faint ">Goal achieved</span>
						) : (
							<span className="text-faint ">
								{minutesLeft} minute{minutesLeft !== 1 ? "s" : ""} left
							</span>
						)}
					</div>
				</div>
				<Separator className="my-4" />
			</div>
		);
	}
);

TodaysReadingProgress.displayName = "TodaysReadingProgress";

export default TodaysReadingProgress;

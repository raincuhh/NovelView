import React, { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import RenderList from "../utils/renderList";
import { cn } from "@/shared/lib/utils";

const DOB = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());
	const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
	const [columnWidths, setColumnWidths] = useState<{ day: number; month: number; year: number }>({
		day: 0,
		month: 0,
		year: 0,
	});

	const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
	// const rotateArray = <T,>(array: T[], startIndex: number): T[] => {
	// 	return [...array.slice(startIndex), ...array.slice(0, startIndex)];
	// };

	const generateInfiniteData = <T,>(data: T[]): T[] => {
		return [...data, ...data, ...data];
	};

	const handleDayChange = (newDay: number) => {
		setCurrentDay(newDay);
	};

	const handleMonthChange = (newMonth: number) => {
		setCurrentMonth(newMonth);

		const maxDays = daysInMonth(newMonth, currentYear);
		if (currentDay > maxDays) {
			setCurrentDay(maxDays);
		}
	};

	const handleYearChange = (newYear: number) => {
		setCurrentYear(newYear);
		const maxDays = daysInMonth(currentMonth, newYear);
		if (currentDay > maxDays) {
			setCurrentDay(maxDays);
		}
	};

	useEffect(() => {
		console.log(`Days in month: ${daysInMonth(currentMonth, currentYear)}`);
		console.log(`Selected: ${currentYear}-${currentMonth}-${currentDay}`);
	}, [currentYear, currentMonth, currentDay]);

	useEffect(() => {
		const dayColumn = document.querySelector(".dob-day .dob-item");
		const monthColumn = document.querySelector(".dob-month .dob-item");
		const yearColumn = document.querySelector(".dob-year .dob-item");

		setColumnWidths({
			day: dayColumn ? dayColumn.clientWidth : 0,
			month: monthColumn ? monthColumn.clientWidth : 0,
			year: yearColumn ? yearColumn.clientWidth : 0,
		});
	}, [currentDay, currentMonth, currentYear]);

	return (
		<div className="w-min mx-4 relative" {...props}>
			<div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
				<div
					className="w-full h-full"
					style={{
						WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
						maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
						backgroundColor: "black",
					}}
				></div>
				<div className="flex flex-row w-full gap-2">
					<div
						className="border-t border-b border-border py-[18px] w-full"
						style={{
							width: `${columnWidths.day}px`,
						}}
					></div>
					<div
						className="border-t border-b border-border py-[18px] w-full"
						style={{
							width: `${columnWidths.month}px`,
						}}
					></div>
					<div
						className="border-t border-b border-border py-[18px] w-full"
						style={{
							width: `${columnWidths.year}px`,
						}}
					></div>
				</div>
				<div
					className="w-full h-full"
					style={{
						WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
						maskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
						backgroundColor: "black",
					}}
				></div>
			</div>
			<div className="flex justify-center max-h-36 overflow-y-hidden">
				<DOBScrollbar
					className="dob-day"
					data={generateInfiniteData(
						Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1)
					)}
					selected={currentDay}
					onValueSelect={handleDayChange}
				/>
				<DOBScrollbar
					className="dob-month"
					data={generateInfiniteData(Array.from({ length: 12 }, (_, i) => i + 1))}
					selected={currentMonth}
					onValueSelect={handleMonthChange}
				/>
				<DOBScrollbar
					className="dob-year"
					data={generateInfiniteData(Array.from({ length: 101 }, (_, i) => currentYear - i))}
					selected={currentYear}
					onValueSelect={handleYearChange}
				/>
			</div>
		</div>
	);
});

export default DOB;

type DOBScrollbarProps<T extends number> = {
	data: T[];
	selected: T;
	onValueSelect: (value: T) => void;
};

const DOBScrollbar = forwardRef<
	HTMLUListElement,
	HTMLAttributes<HTMLUListElement> & DOBScrollbarProps<number>
>(({ className, data, selected, onValueSelect, ...props }, ref) => {
	const scrollRef = useRef<HTMLUListElement | null>(null);
	const itemHeight = 36;
	const visibleItems = 3;

	const middleIndex = Math.floor(visibleItems / 2);

	const handleScroll = () => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		const scrollTop = scrollContainer.scrollTop;
		const totalItems = data.length / 3;
		const index = Math.round(scrollTop / itemHeight) % totalItems;

		const normalizedIndex = (index + totalItems) % totalItems;
		onValueSelect(data[normalizedIndex]);
	};

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		const totalItems = data.length / 3;
		const selectedIndex = data.findIndex((item) => item === selected);

		const scrollPosition =
			((selectedIndex + totalItems) % totalItems) * itemHeight - middleIndex * itemHeight;

		scrollContainer.scrollTop = scrollPosition;
	}, [selected, data]);

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (!scrollContainer) return;

		const totalItems = data.length / 3;
		const maxScroll = totalItems * itemHeight;

		const handleBoundaryScroll = () => {
			if (scrollContainer.scrollTop <= 0) {
				scrollContainer.scrollTop = maxScroll;
			} else if (scrollContainer.scrollTop >= maxScroll * 2) {
				scrollContainer.scrollTop = maxScroll;
			}
		};

		scrollContainer.addEventListener("scroll", handleBoundaryScroll);
		return () => scrollContainer.removeEventListener("scroll", handleBoundaryScroll);
	}, [data]);

	return (
		<ul
			ref={(node) => {
				scrollRef.current = node;
				if (ref && typeof ref === "function") ref(node);
				else if (ref && typeof ref === "object") ref.current = node;
			}}
			onScroll={handleScroll}
			className={`flex flex-col snap-y snap-mandatory overflow-y-scroll scrollbar-hidden pt-[14.5px] ${className || ""}`}
			{...props}
		>
			<RenderList
				data={data}
				render={(item, i) => (
					<li
						key={i}
						className={cn(
							"snap-center font-bold text-xl mb-[14px] px-4 flex justify-center items-center dob-item select-none",
							item === selected ? "text-accent" : ""
						)}
						onClick={() => onValueSelect(item)}
					>
						{item}
					</li>
				)}
			/>
		</ul>
		//https://www.lightnovelworld.co/novel/shadow-slave-1365/chapter-2159
	);
});

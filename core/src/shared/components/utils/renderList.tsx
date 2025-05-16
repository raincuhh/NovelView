import React from "react";

type RenderListProps<T> = {
	data: T[];
	render: (item: T, index: number) => React.ReactNode;
	getKey?: (item: T, index: number) => string | number;
};

const RenderList = <T,>({ data, render, getKey }: RenderListProps<T>): React.JSX.Element => {
	return (
		<>
			{data.map((item, i) => {
				const element = render(item, i);
				const key = getKey?.(item, i) ?? i;
				return <React.Fragment key={key}>{element}</React.Fragment>;
			})}
		</>
	);
};

export default RenderList;

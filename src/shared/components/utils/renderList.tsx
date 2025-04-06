import React from "react";

type RenderListProps<T> = {
	data: T[];
	render: (item: T, index: number) => React.ReactNode;
};

const RenderList = <T,>({ data, render }: RenderListProps<T>): React.JSX.Element => {
	return <>{data.map((item, i) => render(item, i))}</>;
};

export default RenderList;

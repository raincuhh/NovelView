type RenderListProps<T> = {
   data: T[];
   render: (item: T, i: number) => React.ReactNode;
};

export default function RenderList<T>({ data, render }: RenderListProps<T>) {
   return <>{data.map((item: T, i: number) => render(item, i))}</>;
}

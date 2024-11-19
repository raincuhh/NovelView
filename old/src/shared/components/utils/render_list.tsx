type RenderListProps<T> = {
   data: T[];
   to_render: (item: T) => React.ReactNode;
};

export default function RenderList<T>({ data, to_render }: RenderListProps<T>) {
   return <>{data.map((item) => to_render(item))}</>;
}

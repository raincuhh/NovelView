type RenderListProps<T> = {
   data: T[];
   renderItem: (item: T, i?: number) => React.ReactNode;
};

export default function RenderList<T>({ data, renderItem }: RenderListProps<T>) {
   return <>{data.map((item: T, i: number) => renderItem(item, i))}</>;
}

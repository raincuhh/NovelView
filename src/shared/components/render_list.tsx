type RenderListProps<T> = {
   data: T[];
   render_item: (item: T) => React.ReactNode;
};

export default function RenderList<T>({
   data,
   render_item,
}: RenderListProps<T>) {
   return <>{data.map((item) => render_item(item))}</>;
}

import { Libraries } from "@/shared/lib/appSchema";

type QuickAccessItemProps = {
	data: Libraries;
};

export default function QuickAccessItem({ data }: QuickAccessItemProps) {
	return (
		<div>
			{data.name}
			{data.type}
		</div>
	);
}

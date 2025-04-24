import Separator from "@/shared/components/ui/separator";
import Icon from "@/shared/components/ui/icon";

export default function TitlebarHelperButtons() {
	return (
		<div className="mr-2 flex pointer-events-auto">
			<div className="flex h-full items-center text-faint text-sm">
				<div className="w-full h-full flex justify-center items-center">
					<Icon.bell className="fill-muted hover:fill-normal" />
				</div>
				<div className="hover:text-normal cursor-pointer ml-4">
					<div className="w-5 h-5 rounded-full bg-muted hover:bg-normal flex justify-center items-center">
						<p className="text-primary font-bold">?</p>
					</div>
				</div>
			</div>
			<div className="py-[6px] ml-4">
				<Separator orientation="vertical" />
			</div>
		</div>
	);
}

import { LibraryType } from "@/features/libraries/types";
import Icon from "@/shared/components/ui/icon";

export default function SyncIcon({ type }: { type: LibraryType }) {
	return type === "synced" ? <Icon.sync className="fill-faint w-5 h-5 group-hover:fill-muted" /> : null;
}

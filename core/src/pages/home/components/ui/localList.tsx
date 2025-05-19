import { useAuthStore } from "@/features/auth/authStore";
import { useLocalLibrariesQuery } from "@/features/libraries/model/queries/useLibrariesQuery";

export default function LocalList() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();

	const { data: localLibraries } = useLocalLibrariesQuery(userId);

	const hasLibraries = !!localLibraries && localLibraries.length > 0;
	if (!hasLibraries) return null;

	return <div>LocalList</div>;
}

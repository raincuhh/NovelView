import { forwardRef, HTMLAttributes, useMemo } from "react";
import { cn } from "@/shared/lib/globalUtils";
import { DEFAULT_AVATAR_URL } from "@/shared/lib/consts";
import { useAuthStore } from "@/features/auth/authStore";

const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	const userAvatarUrl = useAuthStore.getState().user?.profile?.avatar_url;

	const url = useMemo(() => {
		return userAvatarUrl || DEFAULT_AVATAR_URL;
	}, [userAvatarUrl]);

	return (
		<div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
			<img src={url} alt="pfp" className="rounded-full w-full h-full" />
		</div>
	);
});

Avatar.displayName = "Avatar";
export default Avatar;

import { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/shared/lib/globalUtils";
import { DEFAULT_AVATAR_URL } from "@/shared/lib/consts";
import { useAuthStore } from "@/features/auth/authStore";

const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [url, setUrl] = useState<string>(DEFAULT_AVATAR_URL);
	const { user } = useAuthStore();

	useEffect(() => {
		// console.log(user?.profile);
		if (user?.profile.avatar_url) {
			setUrl(user?.profile.avatar_url);
			setLoading(false);
		} else {
			setUrl(DEFAULT_AVATAR_URL);
			setLoading(false);
		}
	}, [user]);

	return (
		<div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
			{loading ? <>...</> : <img src={url} alt="pfp" className="rounded-full w-full h-full" />}
		</div>
	);
});

Avatar.displayName = "Avatar";
export default Avatar;

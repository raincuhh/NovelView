import { db, supabase } from "@/shared/providers/systemProvider";
import { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/shared/lib/globalUtils";
import { DEFAULT_AVATAR_URL } from "@/shared/lib/consts";

const Avatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [url, setUrl] = useState<string>(DEFAULT_AVATAR_URL);

	useEffect(() => {
		let abortController = new AbortController();

		const loadAvatar = async () => {
			try {
				const session = await supabase.getSession();
				if (!session) throw "no session";

				const userId = session?.user.id;

				for await (const result of db.watch("SELECT avatar_url FROM profiles WHERE id = ?", [userId], {
					signal: abortController.signal,
				})) {
					const avatarUrl = result.rows?._array?.[0]?.avatar_url;
					// console.log(result);

					if (avatarUrl && typeof avatarUrl === "string") {
						setUrl(avatarUrl);
					} else {
						setUrl(DEFAULT_AVATAR_URL);
					}
					setLoading(false);
				}
			} catch (err: any) {
				console.error("Error watching avatar: ", err);
				setLoading(false);
				setUrl(DEFAULT_AVATAR_URL);
			}

			return () => abortController.abort();
		};

		loadAvatar();

		return () => abortController.abort();
	}, []);

	return (
		<div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
			{loading ? <>...</> : <img src={url} alt="pfp" className="rounded-full w-full h-full" />}
		</div>
	);
});

Avatar.displayName = "Avatar";
export default Avatar;

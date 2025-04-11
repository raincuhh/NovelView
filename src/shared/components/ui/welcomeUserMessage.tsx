import { useAuthStore } from "@/features/auth/authStore";
import { cn } from "@/shared/lib/globalUtils";
import { forwardRef, HTMLAttributes, useEffect, useState } from "react";

const WelcomeUserMessage = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => {
		const [username, setUsername] = useState<string>("loading...");
		const { user, loading } = useAuthStore();

		useEffect(() => {
			if (!loading && user?.profile?.username) {
				setUsername(user.profile.username);
			} else if (!loading) {
				setUsername("Error");
			}
		}, [user, loading]);

		return (
			<h1 ref={ref} className={cn(className)} {...props}>
				Hello <span className="font-extrabold">{username}.</span>
			</h1>
		);
	}
);

export default WelcomeUserMessage;

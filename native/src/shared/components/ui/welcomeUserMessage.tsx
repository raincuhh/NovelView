import { useAuthStore } from "@/features/auth/authStore";
import { cn } from "@/shared/lib/globalUtils";
import { forwardRef, HTMLAttributes, useMemo } from "react";

const WelcomeUserMessage = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => {
		const { user, loading } = useAuthStore();

		const username = useMemo(() => {
			if (loading) return "loading...";
			if (user?.profile?.username) return user.profile.username;
			return "Error";
		}, [loading, user?.profile?.username]);

		return (
			<h1 ref={ref} className={cn(className)} {...props}>
				Hello <span className="font-bold">{username}!</span>
			</h1>
		);
	}
);

export default WelcomeUserMessage;

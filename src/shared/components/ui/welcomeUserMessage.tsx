import { cn } from "@/shared/lib/globalUtils";
import { db, supabase } from "@/shared/providers/systemProvider";
import { forwardRef, HTMLAttributes, useEffect, useState } from "react";

const WelcomeUserMessage = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => {
		const [username, setUsername] = useState<string>("loading...");

		const fetchUsername = async () => {
			try {
				const session = await supabase.getSession();
				if (!session) throw "no session";

				const userId = session?.user.id;

				const result = await db.getOptional<{ username: string }>(
					"SELECT username FROM profiles WHERE user_id = ?",
					[userId]
				);

				if (result) {
					const name = result.username;
					if (name) {
						setUsername(name);
					} else {
						setUsername("error");
					}
				} else {
					console.debug("no username fetched");
				}
			} catch (err: any) {
				console.error("Error fetching username: ", err);
			} finally {
			}
		};

		useEffect(() => {
			fetchUsername();
		}, [fetchUsername]);

		return (
			<h1 ref={ref} className={cn(className)}>
				Hello <span className="font-extrabold">{username}</span>
			</h1>
		);
	}
);

export default WelcomeUserMessage;

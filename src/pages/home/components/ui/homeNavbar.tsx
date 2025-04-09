import Avatar from "@/shared/components/ui/avatar";
import { db, supabase } from "@/shared/providers/systemProvider";
import { useEffect, useState } from "react";
// import { Button } from "@/shared/components/ui/button";
import { useMediaQuery } from "react-responsive";

export default function HomeNavbar() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const [username, setUsername] = useState<string>("...");

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
		<div className="sticky top-0 z-20 w-full bg-primary border-b border-border md:border-none">
			<div className="flex flex-col pt-12 md:pt-0 px-4 pb-2">
				<h1>
					Hello <span className="font-extrabold">{username}.</span>
				</h1>
			</div>
			<div className="flex px-4 py-4 gap-4 h-full w-full flex-nowrap max-w-full">
				{isMobile ? (
					<Avatar
						className="w-8 h-8"
						onClick={() => {
							console.log("opening sideview");
						}}
					/>
				) : null}
				<div className="flex gap-2 h-full flex-nowrap overflow-y-hidden overflow-x-scroll hide-scrollbar"></div>
			</div>
		</div>
	);
}

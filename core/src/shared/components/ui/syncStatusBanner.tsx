import { useStatus } from "@powersync/react";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function SyncStatusBanner() {
	const status = useStatus();

	const getMessage = () => {
		if (status.connecting) return "Syncing changes…";
		if (!status.connected) return "You’re offline.";
		return null;
	};

	const message = getMessage();

	return (
		<AnimatePresence mode="wait">{message && <Wrapper key={message}>{message}</Wrapper>}</AnimatePresence>
	);
}

const Wrapper = ({ children }: PropsWithChildren) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.12, ease: "easeInOut" }}
			className="w-full text-sm px-4 py-1 text-normal bg-accent flex items-center justify-center"
		>
			{children}
		</motion.div>
	);
};

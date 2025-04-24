import { useStatus } from "@powersync/react";
import { PropsWithChildren } from "react";

export default function SyncStatusBanner() {
	const status = useStatus();

	if (status.connecting) {
		return <Wrapper>Syncing changes…</Wrapper>;
	}

	if (!status.connected) {
		return <Wrapper>You’re offline.</Wrapper>;
	}

	return null; // <Wrapper>Your online.</Wrapper>
}

const Wrapper = ({ children }: PropsWithChildren) => {
	return (
		<div className="w-full text-sm px-4 py-1 text-normal bg-accent flex items-center justify-center">
			{children}
		</div>
	);
};

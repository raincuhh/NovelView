import { useMediaQuery } from "react-responsive";

export default function MobileBottomPadding() {
	const isMobile = useMediaQuery({ query: "(max-width: 786px)" });

	if (isMobile) return <div className="pb-28"></div>;

	return null;
}

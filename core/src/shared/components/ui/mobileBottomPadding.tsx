import { useMediaQuery } from "react-responsive";

export default function MobileBottomPadding() {
	const isMobile = useMediaQuery({ query: "(max-width: 786px)" });
	// pb-28 with the recently read mobile widget navbar component
	// pb-1

	if (isMobile) return <div className="pb-10"></div>;

	return null;
}

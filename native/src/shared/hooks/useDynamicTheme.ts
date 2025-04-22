import { useEffect, useState } from "react";
import { prominent } from "color.js";

type DynamicTheme = {
	backgroundGradient: string;
};

interface UseDynamicThemeProps {
	imageSrc: string;
	amount?: number;
}

const useDynamicTheme = ({ imageSrc, amount = 3 }: UseDynamicThemeProps): DynamicTheme => {
	const [theme, setTheme] = useState<DynamicTheme>({
		backgroundGradient: "linear-gradient(to right, #ffffff, #ffffff)",
	});

	useEffect(() => {
		const fetchColors = async () => {
			try {
				const colors = (await prominent(imageSrc, { amount })) as string[];

				if (colors.length === 1) {
					setTheme({
						backgroundGradient: `linear-gradient(to right, ${colors[0]}, ${colors[0]})`,
					});
				} else {
					setTheme({
						backgroundGradient: `linear-gradient(to right, ${colors.join(", ")})`,
					});
				}
			} catch (error) {
				console.error("Failed to extract prominent colors:", error);
				setTheme({
					backgroundGradient: "linear-gradient(to right, #ffffff, #ffffff)",
				});
			}
		};

		fetchColors();
	}, [imageSrc, amount]);

	return theme;
};

export default useDynamicTheme;

import React, { useReducer, createContext, useContext } from "react";

type ViewTransitionContextType<T> = {
	currentView: T;
	isAnimating: boolean;
	direction: number;
	viewSwitcherNavigate: (targetView: T) => void;
};

const ViewTransitionContext = createContext<ViewTransitionContextType<any> | null>(null);

type ViewTransitionState<T> = {
	currentView: T[keyof T];
	isAnimating: boolean;
	direction: number;
};

type Action<T> =
	| { type: "CHANGE_VIEW"; payload: { view: T[keyof T]; direction: number } }
	| { type: "END_ANIMATION" };

const viewTransitionReducer = <T,>(
	state: ViewTransitionState<T>,
	action: Action<T>
): ViewTransitionState<T> => {
	switch (action.type) {
		case "CHANGE_VIEW":
			return {
				...state,
				currentView: action.payload.view,
				direction: action.payload.direction,
				isAnimating: true,
			};
		case "END_ANIMATION":
			return { ...state, isAnimating: false };
		default:
			return state;
	}
};

type ViewTransitionProviderProps<T extends Record<string, string>> = {
	initialView: T[keyof T];
	duration: number;
	type: T;
	children: React.ReactNode;
};

export const ViewTransitionProvider = <T extends { [key: string]: string }>({
	initialView,
	children,
	duration,
	type,
}: ViewTransitionProviderProps<T>) => {
	const [state, dispatch] = useReducer(viewTransitionReducer<T>, {
		currentView: initialView,
		isAnimating: false,
		direction: 0,
	});

	const getDirection = (targetView: T[keyof T]): number => {
		const views = Object.values(type);
		return views.indexOf(targetView) > views.indexOf(state.currentView) ? 1 : -1;
	};

	const viewSwitcherNavigate = (targetView: T[keyof T]) => {
		if (state.isAnimating) return;
		console.info("Navigating to:", targetView);

		dispatch({ type: "CHANGE_VIEW", payload: { view: targetView, direction: getDirection(targetView) } });
		setTimeout(() => dispatch({ type: "END_ANIMATION" }), duration);
	};

	return (
		<ViewTransitionContext.Provider value={{ ...state, viewSwitcherNavigate }}>
			{children}
		</ViewTransitionContext.Provider>
	);
};

export const useViewTransition = <T,>(): ViewTransitionContextType<T> => {
	const context = useContext(ViewTransitionContext);
	if (!context) throw new Error("useViewTransition must be used within a ViewTransitionProvider");
	return context as ViewTransitionContextType<T>;
};

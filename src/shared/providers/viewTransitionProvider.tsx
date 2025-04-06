import React, { useReducer, createContext, useContext, useCallback, useEffect } from "react";

type ViewTransitionContextType<T> = {
	currentView: T;
	isAnimating: boolean;
	direction: number;
	viewSwitcherNavigate: (targetView: T) => void;
	goBack: () => void;
	canGoBack: boolean;
};

const ViewTransitionContext = createContext<ViewTransitionContextType<any> | null>(null);

type ViewTransitionState<T> = {
	currentView: T[keyof T];
	isAnimating: boolean;
	direction: number;
	historyStack: T[keyof T][];
};

// type Action<T> =
// 	| { type: "CHANGE_VIEW"; payload: { view: T[keyof T]; direction: number } }
// 	| { type: "GO_BACK"; payload: { view: T[keyof T]; direction: number } }
// 	| { type: "END_ANIMATION" }
// 	| { type: "RESET_HISTORY"; payload: T[keyof T][] };

type Action<T> =
	| { type: "CHANGE_VIEW"; payload: { view: T[keyof T]; direction: number; pushToHistory: boolean } }
	| { type: "GO_BACK"; payload: { view: T[keyof T]; direction: number } }
	| { type: "END_ANIMATION" }
	| { type: "RESET_HISTORY"; payload: T[keyof T][] };

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
				historyStack: action.payload.pushToHistory
					? [...state.historyStack, action.payload.view]
					: state.historyStack,
			};
		case "GO_BACK":
			return {
				...state,
				currentView: action.payload.view,
				direction: action.payload.direction,
				isAnimating: true,
				historyStack: state.historyStack.slice(0, -1),
			};
		case "END_ANIMATION":
			return { ...state, isAnimating: false };
		case "RESET_HISTORY":
			return { ...state, historyStack: action.payload };
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
		historyStack: [initialView],
	});

	const getDirection = useCallback(
		(targetView: T[keyof T]): number => {
			const views = Object.values(type);
			return views.indexOf(targetView) > views.indexOf(state.currentView) ? 1 : -1;
		},
		[state.currentView, type]
	);

	const viewSwitcherNavigate = (targetView: T[keyof T]) => {
		if (state.isAnimating || targetView === state.currentView) return;

		const direction = getDirection(targetView);
		dispatch({
			type: "CHANGE_VIEW",
			payload: { view: targetView, direction, pushToHistory: true },
		});
		window.history.pushState({ view: targetView }, "", "");
		setTimeout(() => dispatch({ type: "END_ANIMATION" }), duration);
	};

	const goBack = () => {
		if (state.historyStack.length <= 1) return;

		window.history.back();
	};

	const canGoBack = state.historyStack.length > 1;

	useEffect(() => {
		window.history.replaceState({ view: initialView }, "", "");
	}, [initialView]);

	useEffect(() => {
		const onPopState = (event: PopStateEvent) => {
			const view = event.state?.view;
			if (!view) return;

			const direction = getDirection(view);
			const isBack = state.historyStack.includes(view);

			if (isBack) {
				dispatch({ type: "GO_BACK", payload: { view, direction } });
			} else {
				dispatch({
					type: "CHANGE_VIEW",
					payload: { view, direction, pushToHistory: true },
				});
			}

			setTimeout(() => dispatch({ type: "END_ANIMATION" }), duration);
		};

		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, [duration, getDirection, state.historyStack]);

	return (
		<ViewTransitionContext.Provider
			value={{
				currentView: state.currentView,
				isAnimating: state.isAnimating,
				direction: state.direction,
				viewSwitcherNavigate,
				goBack,
				canGoBack,
			}}
		>
			{children}
		</ViewTransitionContext.Provider>
	);
};

export const useViewTransition = <T,>(): ViewTransitionContextType<T> => {
	const context = useContext(ViewTransitionContext);
	if (!context) throw new Error("useViewTransition must be used within a ViewTransitionProvider");
	return context as ViewTransitionContextType<T>;
};

import { ComponentType, PropsWithChildren } from "react";

const withProvider =
	<P extends {}>(Provider: ComponentType<PropsWithChildren<P>>) =>
	(Component: ComponentType<PropsWithChildren<P>>) =>
	(props: PropsWithChildren<P>) =>
		(
			<Provider {...props}>
				<Component {...props} />
			</Provider>
		);

export default withProvider;

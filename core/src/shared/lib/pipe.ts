import { ComponentType } from "react";

const pipe =
	<P extends {}>(...functions: Array<(component: ComponentType<P>) => ComponentType<P>>) =>
	(component: ComponentType<P>): ComponentType<P> =>
		functions.reduceRight(
			(acc: ComponentType<P>, fn: (component: ComponentType<P>) => ComponentType<P>) => fn(acc),
			component
		);

export default pipe;

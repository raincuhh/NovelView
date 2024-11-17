import React, { ComponentType } from "react";

const pipe =
   <P extends {}>(...functions: Array<(component: ComponentType<P>) => ComponentType<P>>) =>
   (component: ComponentType<P>): ComponentType<P> =>
      functions.reduceRight((acc, fn) => fn(acc), component);

export default pipe;

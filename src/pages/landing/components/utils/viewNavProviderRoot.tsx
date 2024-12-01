import React from "react";
import useViewNav from "../../hooks/useViewNav";

const ViewNavProviderRoot = (): React.JSX.Element => {
   const { nav } = useViewNav();
   return <>{nav}</>;
};

export default ViewNavProviderRoot;

import React, { ReactNode } from "react";
import BaseLayout from "../layout/baseLayout";

const LayoutRegistry: Record<string, React.FC<{ children: ReactNode }>> = {
   base: BaseLayout,
};

export default LayoutRegistry;

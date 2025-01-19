import React, { ReactNode } from "react";

import BaseLayout from "../layout/baseLayout";
import { SingleSidebarLayout } from "../layout";

const LayoutRegistry: Record<string, React.FC<any>> = {
   base: BaseLayout,
   singleSidebar: SingleSidebarLayout,
};

export default LayoutRegistry;

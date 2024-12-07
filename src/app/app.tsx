import React from "react";
import { RouterProvider } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

import appRouter from "./routes/routes";
import AppProviders from "./providers/appProviders";
import { ModalRoot, TooltipRoot } from "@/shared/components/utils";

import "react-loading-skeleton/dist/skeleton.css";

const App = (): React.JSX.Element => {
   const skeletonBaseColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--interactive-base")
      .trim();

   const skeletonHighlightColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--interactive-base-hover")
      .trim();

   return (
      <>
         <AppProviders>
            <SkeletonTheme
               baseColor={skeletonBaseColor || "#121212"}
               highlightColor={skeletonHighlightColor || "#191919"}
            >
               <RouterProvider router={appRouter} />
               <ModalRoot />
               <TooltipRoot />
            </SkeletonTheme>
         </AppProviders>
      </>
   );
};

export default App;

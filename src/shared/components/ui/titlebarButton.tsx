import React, { forwardRef, useCallback } from "react";
import { getCurrentWebviewWindow, WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { XIcon, RectangleIcon, MinusIcon } from "../icons";

type TitlebarButtonType = "minimize" | "maximize" | "close";

const titlebarButtonVariants = cva(
   "fill-titlebar-icon-color px-2 py-[4px] flex items-center justify-center transition-colors z-layer-titlebar-buttons duration-100 ease-in-out",
   {
      variants: {
         variant: {
            minimize: "bg-titlebar-background hover:bg-titlebar-background-focused",
            maximize: "bg-titlebar-background hover:bg-titlebar-background-focused",
            close: "bg-interactive-accent-hover hover:bg-interactive-accent-hover",
         },
      },
      defaultVariants: {
         variant: "minimize",
      },
   },
);

type TitlebarButtonProps = VariantProps<typeof titlebarButtonVariants> & {
   type: TitlebarButtonType;
};

const TitlebarButton = forwardRef<HTMLDivElement, TitlebarButtonProps>(
   ({ type, variant, ...props }, ref) => {
      const handleClick = useCallback(() => {
         const window: WebviewWindow | null = getCurrentWebviewWindow();
         if (!window) return;

         try {
            switch (type) {
               case "minimize":
                  window.minimize();
                  break;
               case "maximize":
                  window.toggleMaximize();
                  break;
               case "close":
                  window.close();
                  break;
               default:
                  break;
            }
         } catch (error) {
            console.error("Error handling titlebar button click:", error);
         }
      }, [type]);

      return (
         <div
            ref={ref}
            className={clsx(titlebarButtonVariants({ variant }))}
            role="button"
            aria-label={type}
            onClick={handleClick}
            {...props}
         >
            <div className="flex items-center justify-center h-full">
               {type === "minimize" && <MinusIcon className="w-6 h-6" />}
               {type === "maximize" && (
                  <div className="px-1">
                     <RectangleIcon className="w-4 h-4" />
                  </div>
               )}
               {type === "close" && <XIcon className="w-6 h-6" />}
            </div>
         </div>
      );
   },
);

export default TitlebarButton;

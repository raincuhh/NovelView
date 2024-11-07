import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faXmark,
   faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { TitleBarButtonTypes } from "../../lib/types";

type TitlebarButtonProps = {
   button_type: TitleBarButtonTypes;
   on_click?: (event: string) => void;
};

export default function TitleBarButton({
   button_type,
   on_click,
}: TitlebarButtonProps): JSX.Element {
   const button_hover = {
      close: "bg-red-500",
      minimize: "bg-base-50",
      maximize: "bg-base-50",
   };

   const icons = {
      close: faXmark,
      minimize: faMinus,
   };

   const button_hover_css: string = "hover:".concat(
      button_hover[button_type]
   );

   return (
      <div
         className={`h-titlebar-height px-4 cursor-pointer flex items-center z-layer-menu bg-base-40  ${button_hover_css} transition-transition-bg duration-100 ease-in-out`}
         onClick={() => {
            on_click?.(button_type);
         }}
      >
         <div className="h-full flex justify-center items-center">
            {button_type ===
            TitleBarButtonTypes.maximize ? (
               <i className="bx bx-rectangle text-white" />
            ) : (
               <FontAwesomeIcon
                  icon={icons[button_type]}
                  className="text-white"
               />
            )}
         </div>
      </div>
   );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
      minimize: "bg-base-40",
      maximize: "bg-base-40",
   };

   const icon_css = {
      maximize: "bx bx-square",
      minimize: "bx bx-minus text-fs-sm",
      close: "bx bx-x text-fs-md",
   };

   const bx_icon_css: string = icon_css[button_type_to_str(button_type)];

   const button_hover_css: string = "hover:".concat(button_hover[button_type]);

   return (
      <div
         className={`${button_hover_css} h-c-titlebar-height z-c-layer-window bg-c-base-35 flex cursor-pointer
            items-center px-3 transition-colors duration-100 ease-in-out`}
         onClick={() => {
            on_click?.(button_type);
         }}
      >
         <div className="flex items-center justify-center h-full">
            <i className={`${bx_icon_css} text-c-text-normal text-c-md`} />
         </div>
      </div>
   );
}

function button_type_to_str(
   button_type: TitleBarButtonTypes,
): "maximize" | "minimize" | "close" {
   switch (button_type) {
      case TitleBarButtonTypes.maximize:
         return "maximize";
      case TitleBarButtonTypes.minimize:
         return "minimize";
      case TitleBarButtonTypes.close:
         return "close";
      default:
         throw new Error("Invalid button type");
   }
}

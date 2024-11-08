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
      maximize: "bx bx-square ",
      minimize: "bx bx-minus text-fs-sm",
      close: "bx bx-x text-fs-md",
   };

   const bx_icon_css: string =
      icon_css[button_type_to_str(button_type)];

   const button_hover_css: string = "hover:".concat(
      button_hover[button_type]
   );

   return (
      <div
         className={`h-titlebar-height px-4 cursor-pointer flex items-center z-layer-menu bg-base-35 ${button_hover_css} transition-transition-bg duration-100 ease-in-out`}
         onClick={() => {
            on_click?.(button_type);
         }}
      >
         <div className="h-full flex justify-center items-center">
            <i className={`${bx_icon_css} text-white`} />
         </div>
      </div>
   );
}

function button_type_to_str(
   button_type: TitleBarButtonTypes
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

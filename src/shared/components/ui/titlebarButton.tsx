import React from "react";

type TitlebarButtonProps = {
   buttonType: string;
};

// const TitleBarButton = React.forwardRef<HTMLDivElement, TitlebarButtonProps>(
//    ({ buttonType }, ref) => {
//       const buttonStyles = {
//          maximize: {
//             hover: "bg-base-40",
//             icon: "bx bx-square",
//          },
//          minimize: {
//             hover: "bg-base-40",
//             icon: "bx bx-minus text-fs-sm",
//          },
//          close: {
//             hover: "bg-red-500",
//             icon: "bx bx-x text-fs-md",
//          },
//       };

//       // const { hover, icon } = buttonStyles[buttonType];

//       return (
//          <div
//             ref={ref}
//             className={`hover:${hover} h-c-titlebar-height z-c-layer-window bg-c-base-35 flex cursor-pointer
//                items-center px-3 transition-colors duration-100 ease-in-out`}
//          >
//             <div className="flex items-center justify-center h-full">
//                <i className={`${icon} text-c-text-normal text-c-md`} />
//             </div>
//          </div>
//       );
//    },
// );

// TitleBarButton.displayName = "TitleBarButton";

// export default TitleBarButton;

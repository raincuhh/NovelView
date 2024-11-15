import { isTauri } from "../../shared/lib/tauri_utils";
import { Link } from "react-router-dom";

export default function LaunchMain(): JSX.Element {
   return (
      <>
         <main className="py-16 mx-auto w-[45rem] max-w-[90%] h-full">
            <div className="flex flex-col select-none h-full justify-end relative c-min-h-668:justify-center">
               <div className="absolute top-0 h-full w-full select-none pointer-events-none">
                  <div className="flex flex-col h-full relative">
                     <div className="h-3/6 z-[11]"></div>
                  </div>
               </div>
               <div className="flex flex-col h-min justify-center items-center mb-10 c-min-h-668:mb-10 gap-2 z-c-layer-content">
                  <img
                     src="../../../public/assets/images/logo_base_90.png"
                     alt="logo"
                     className="w-[60px] md:w-[110px]"
                  />
                  <p
                     className="text-c-xl md:text-c-2xl font-primary flex flex-col items-center"
                     style={{ fontWeight: 700 }}
                  >
                     NovelView
                  </p>
               </div>
               <div className="flex flex-col justify-end z-c-layer-content">
                  <div className=" w-full">
                     <div className="grid grid-cols-1 gap-2">
                        <GridCard href="/register" bg={true} text="Sign up for free" />
                        <GridCard href="/login" text="sign in" />
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   );
}

type GridCardProps = {
   href?: string;
   bg?: boolean;
   text?: string;
};

function GridCard({ href, bg, text }: GridCardProps) {
   return (
      <>
         <div className="flex select-auto cursor-pointer">
            <div
               className={`rounded-[1.5rem] ${
                  bg && "dark:bg-c-brand-button-bg dark:hover:bg-c-brand-button-bg-hover no-underline"
               } underline dark:hover:bg-c-background-secondary w-full py-2 px-4 transition-colors duration-100 ease-in-out`}
            >
               <Link to={href || ""} className="flex justify-center">
                  <p className="font-c-primary text-c-md font-c-weight-md">{text}</p>
               </Link>
            </div>
         </div>
      </>
   );
}

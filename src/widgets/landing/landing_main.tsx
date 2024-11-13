import { Link } from "react-router-dom";

export default function LaunchMain(): JSX.Element {
   return (
      <>
         <main className="py-16 mx-auto w-[45rem] max-w-[90%] h-full">
            <div className="flex flex-col select-none h-full justify-end relative min-h-668:pb-32">
               <div className="absolute top-0 h-full w-full select-none pointer-events-none">
                  <div className="flex flex-col h-full">
                     <div className="h-4/6">test</div>
                     <div className="h-2/6"></div>
                  </div>
               </div>
               <div className="flex flex-col h-min justify-center items-center mb-6 min-h-668:mb-10 gap-6">
                  <img
                     src="../../../public/assets/images/logo_base_90.png"
                     alt="logo"
                     className="w-[60px] md:w-[110px]"
                  />
                  <p
                     className="text-fs-md md:text-fs-lg font-primary flex flex-col items-center"
                     style={{ fontWeight: 700 }}
                  >
                     <span>Dive into novels.</span>
                     <span>Free on NovelView.</span>
                  </p>
               </div>
               <div className="flex flex-col justify-end">
                  <div className=" w-full">
                     <div className="grid grid-cols-1 gap-2">
                        <GridCard
                           link_to="/register"
                           include_bg={true}
                           text="Register"
                        />
                        <GridCard
                           link_to="/login"
                           text="Login"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   );
}

type GridCardProps = {
   link_to?: string;
   include_bg?: boolean;
   text?: string;
};

function GridCard({
   link_to,
   include_bg,
   text,
}: GridCardProps) {
   return (
      <>
         <div className="flex select-auto">
            <div
               className={`rounded-[1.5rem] ${
                  include_bg &&
                  "bg-brand-button-bg hover:bg-brand-button-bg-hover"
               } hover:bg-background-secondary w-full py-2 px-4 transition-colors duration-100 ease-in-out`}
            >
               <Link
                  to={link_to || ""}
                  className="flex justify-center"
               >
                  <p
                     className="font-primary text-fs-xs"
                     style={{ fontWeight: 500 }}
                  >
                     {text}
                  </p>
               </Link>
            </div>
         </div>
      </>
   );
}

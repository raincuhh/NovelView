import { Link } from "react-router-dom";

export default function NotFoundContent(): JSX.Element {
   return (
      <>
         <div id="not-found" className="h-full">
            <div className="flex h-full w-full justify-center items-center flex-col dark:bg-c-base-black">
               <div className="text-fs-lg font-primary font-c-weight-md">
                  The page "/404" wasn't found... lets go back.
               </div>
               <div className="text-fs-lg font-primary font-c-weight-md underline hover:text-text-muted transition-colors duration-100">
                  <Link to="/">back to home</Link>
               </div>
            </div>
         </div>
      </>
   );
}
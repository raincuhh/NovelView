import { Link } from "react-router-dom";

export default function NotFoundContent(): JSX.Element {
   return (
      <>
         <div id="not-found" className="h-full">
            <div className="dark:bg-c-base-black flex h-full w-full flex-col items-center justify-center">
               <div className="font-primary font-c-weight-md text-fs-lg">
                  The page "/404" wasn't found... lets go back.
               </div>
               <div className="font-primary font-c-weight-md hover:text-text-muted text-fs-lg underline transition-colors duration-100">
                  <Link to="/">back to home</Link>
               </div>
            </div>
         </div>
      </>
   );
}

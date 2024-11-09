import { Link } from "react-router-dom";

export default function NotFoundContent(): JSX.Element {
   return (
      <>
         <div id="not-found" className="h-full">
            <div className="flex h-full w-full justify-center items-center flex-col bg-base-black">
               <div
                  className="text-fs-lg font-primary"
                  style={{ fontWeight: 500 }}
               >
                  The page "/404" wasn't found... lets go
                  back.
               </div>
               <div
                  className="text-fs-lg font-primary underline hover:text-text-muted transition-colors duration-100"
                  style={{ fontWeight: 500 }}
               >
                  <Link to="/">back to home</Link>
               </div>
            </div>
         </div>
      </>
   );
}

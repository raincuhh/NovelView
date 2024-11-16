import LandingMain from "./landing_main";

export default function LandingContent(): JSX.Element {
   return (
      <>
         <div id="landing" className="h-full">
            <div className="flex flex-1 h-full lg:flex-row">
               <LandingMain />
            </div>
         </div>
      </>
   );
}

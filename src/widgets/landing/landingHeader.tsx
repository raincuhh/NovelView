import MainLogo from "../../shared/components/ui/mainLogo";
import packageJson from "../../../package.json";

export default function LandingHeader(): React.JSX.Element {
   return (
      <>
         <div className="flex flex-col h-min justify-center items-center mb-10 c-min-h-668:mb-14 gap-1 z-c-layer-content">
            <div className="flex flex-col items-center gap-2">
               <MainLogo variant="white" className="w-[150px] h-auto md:w-[167px]" />
               <h1 className="text-c-fs-xl md:text-c-fs-2xl font-c-weight-lg font-c-family-primary">
                  NovelView
               </h1>
            </div>
            <h3 className="text-c-fs-sm font-c-weight-lg text-c-text-faint font-c-family-primary">
               v{packageJson.version}
            </h3>
         </div>
      </>
   );
}

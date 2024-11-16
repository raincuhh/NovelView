import MainLogo from "../../shared/components/ui/mainLogo";

export default function LandingHeader(): React.JSX.Element {
   return (
      <>
         <div className="flex flex-col h-min justify-center items-center mb-10 c-min-h-668:mb-14 gap-2 z-c-layer-content">
            <MainLogo variant="white" className="w-[150px] h-auto" />
            <h1 className="text-c-fs-xl md:text-c-fs-2xl font-c-weight-lg">NovelView</h1>
         </div>
      </>
   );
}

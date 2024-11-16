export default function LandingHeader(): React.JSX.Element {
   return (
      <>
         <div className="flex flex-col h-min justify-center items-center mb-10 c-min-h-668:mb-14 gap-2 z-c-layer-content">
            <img
               src="../../../public/assets/images/logo_base_90.png"
               alt="landingHeaderIcon"
               className="w-[60px], md:w-[110px]"
            />
            <h1 className="text-c-fs-lg md:text-c-fs-2xl font-c-weight-lg">NovelView</h1>
         </div>
      </>
   );
}

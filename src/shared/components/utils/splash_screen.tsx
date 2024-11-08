export default function SplashScreen() {
   return (
      <>
         <div
            id="splash"
            className="min-h-full min-w-full flex flex-col fixed z-layer-modal overflow-hidden pointer-events-none select-none"
         >
            <div className=" w-[100dvw] h-[100dvh]"></div>
         </div>
      </>
   );
}

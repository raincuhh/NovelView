import { is_tauri } from "../../../../shared/lib/tauri_utils";

type AuthPageAsideProps = {};

export default function AuthPageAside({}: AuthPageAsideProps): JSX.Element {
   return (
      <>
         <aside
            className={`w-full h-full hidden lg:flex bg-base-black border-l-[1.5px] border-base-30 border-solid ${
               is_tauri ? "pt-[30px]" : ""
            } `}
         >
            <div
               className={`w-full h-full px-4 py-6 overflow-hidden`}
            >
               <div className="font-primary text-fs-2xl overflow-hidden"></div>
            </div>
         </aside>
      </>
   );
}

import AuthPageAside from "../../features/auth/components/ui/auth_page_content_aside";
import RegisterMain from "./register_main";

export default function RegisterContent(): JSX.Element {
   return (
      <>
         <div id="register" className="h-full">
            <div className="flex flex-1 h-full lg:flex-row">
               <RegisterMain />
               <AuthPageAside />
            </div>
         </div>
      </>
   );
}

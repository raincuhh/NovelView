import AuthPageAside from "../../features/auth/components/ui/auth_page_content_aside";
import RegisterMain from "./register_main";

export default function RegisterContent(): JSX.Element {
   return (
      <>
         <div id="register" className="h-full">
            <div className="flex h-full flex-1 lg:flex-row">
               <RegisterMain />
               <AuthPageAside />
            </div>
         </div>
      </>
   );
}

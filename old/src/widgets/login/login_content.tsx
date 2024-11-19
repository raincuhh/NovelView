import LoginMain from "./login_main";
import AuthPageAside from "../../features/auth/components/ui/auth_page_content_aside";

export default function LoginContent(): JSX.Element {
   return (
      <>
         <div id="login" className="h-full">
            <div className="flex h-full flex-1 lg:flex-row">
               <LoginMain />
               <AuthPageAside />
            </div>
         </div>
      </>
   );
}

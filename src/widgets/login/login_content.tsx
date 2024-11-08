import LoginMain from "./login_main";
import LoginAside from "./login_aside";

export default function LoginContent(): JSX.Element {
   return (
      <>
         <div id="login" className="h-full">
            <div className="flex flex-1 h-full lg:flex-row">
               <LoginMain />
               <LoginAside />
            </div>
         </div>
      </>
   );
}

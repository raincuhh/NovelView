import AuthFormHeader from "../../features/auth/components/auth_form_header";
import LoginForm from "../../features/auth/components/login_form";

export default function LoginMain(): JSX.Element {
   return (
      <>
         <main className="w-full lg:w-[65%] h-full justify-center items-center flex flex-col">
            <div className="min-w-[320px] w-[320px] h-full px-4 py-6">
               <AuthFormHeader
                  label="Login"
                  desc="login to your account"
               />
               <hr className="h-[1px] bg-base-20" />
               <LoginForm />
            </div>
            <div className="m-w-[320px] w-[330px] px-4 pb-6">
               Lorem ipsum dolor sit, amet consectetur
               adipisicing elit. Reiciendis, numquam!
            </div>
         </main>
      </>
   );
}

import { Link } from "react-router-dom";

export default function AuthFooter() {
   return (
      <div className="pb-16 text-center dark:text-c-text-faint font-c-primary text-c-xs mt-auto font-c-weight-md">
         By continuing, you acknowledge that you have read and agree to NovelView's{" "}
         <Link to="#">
            <span className="md:hover:text-c-text-muted underline transition-colors duration-100 ease-in-out">
               Terms of Service
            </span>
         </Link>{" "}
         and{" "}
         <Link to="#">
            <span className="md:hover:text-c-text-muted underline transition-colors duration-100 ease-in-out">
               Privacy Policy
            </span>
         </Link>
         .
      </div>
   );
}

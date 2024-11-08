import { Link } from "react-router-dom";

export default function AuthFormAgreementFooter() {
   return (
      <div className="pb-6 text-center text-text-faint font-secondary text-[12px]">
         By continuing, you acknowledge that you have read
         and agree to NovelView's{" "}
         <Link to="#">
            <span className="md:hover:text-text-muted underline transition-colors duration-100">
               Terms of Service
            </span>
         </Link>{" "}
         and{" "}
         <Link to="#">
            <span className="md:hover:text-text-muted underline transition-colors duration-100">
               Privacy Policy
            </span>
         </Link>
         .
      </div>
   );
}
